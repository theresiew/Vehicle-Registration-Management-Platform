import { z } from "zod";
import {
  fuelTypes,
  insuranceStatuses,
  ownerTypes,
  plateTypes,
  purposes,
  registrationStatuses,
  vehicleStatuses,
  vehicleTypes,
} from "./constants";
import { getCurrentYear, isPastDate } from "./utils";

const requiredText = (label) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`);

const optionalTrimmedText = () =>
  z.preprocess(
    (value) => {
      if (typeof value !== "string") return value;
      const trimmed = value.trim();
      return trimmed === "" ? undefined : trimmed;
    },
    z.string().optional()
  );

const integerFromForm = (label, { min, max, allowZero = false }) =>
  z.coerce
    .number({
      invalid_type_error: `${label} must be a number.`,
    })
    .int(`${label} must be an integer.`)
    .refine((value) => (allowZero ? value >= 0 : value > 0), {
      message: allowZero ? `${label} must be 0 or greater.` : `${label} must be greater than 0.`,
    })
    .refine((value) => (typeof min === "number" ? value >= min : true), {
      message: `${label} must be at least ${min}.`,
    })
    .refine((value) => (typeof max === "number" ? value <= max : true), {
      message: `${label} must not exceed ${max}.`,
    });

const dateField = (label, { allowPast = true } = {}) =>
  z
    .string()
    .min(1, `${label} is required.`)
    .datetime({ local: true, message: `${label} must be a valid date and time.` })
    .refine((value) => (allowPast ? true : !isPastDate(value)), {
      message: `${label} cannot be in the past.`,
    });

export const vehicleSchema = z
  .object({
    manufacture: requiredText("Manufacture"),
    model: requiredText("Model"),
    bodyType: requiredText("Body type"),
    color: requiredText("Color"),
    vehicleType: z.enum(vehicleTypes, {
      message: "Vehicle type is required.",
    }),
    fuelType: z.enum(fuelTypes, {
      message: "Fuel type is required.",
    }),
    purpose: z.enum(purposes, {
      message: "Purpose is required.",
    }),
    vehicleStatus: z.enum(vehicleStatuses, {
      message: "Vehicle status is required.",
    }),
    year: integerFromForm("Year", {
      min: 1886,
      max: getCurrentYear() + 1,
    }),
    engineCapacity: integerFromForm("Engine capacity", {
      min: 1,
    }),
    odometerReading: integerFromForm("Odometer reading", {
      min: 0,
      allowZero: true,
    }),
    seatingCapacity: integerFromForm("Seating capacity", {
      min: 1,
    }),
    ownerName: requiredText("Owner name"),
    ownerType: z.enum(ownerTypes, {
      message: "Owner type is required.",
    }),
    address: requiredText("Address"),
    nationalId: z.string().regex(/^\d{16}$/, "National ID must be exactly 16 digits."),
    mobileNumber: z.string().regex(/^\d{10}$/, "Mobile number must be exactly 10 digits."),
    email: z.email("Email must be valid."),
    companyRegistrationNumber: optionalTrimmedText(),
    passportNumber: optionalTrimmedText(),
    plateNumber: z
      .string()
      .trim()
      .regex(/^(R[A-Z]{2}|GR|CD)\s?\d{3}\s?[A-Z]?$/i, "Plate number must match a valid Rwandan format."),
    plateType: z.enum(plateTypes, {
      message: "Plate type is required.",
    }),
    registrationStatus: z.enum(registrationStatuses, {
      message: "Registration status is required.",
    }),
    registrationDate: dateField("Registration date"),
    expiryDate: dateField("Expiry date", { allowPast: false }),
    insuranceStatus: z.enum(insuranceStatuses, {
      message: "Insurance status is required.",
    }),
    insuranceExpiryDate: dateField("Insurance expiry date", { allowPast: false }),
    policyNumber: requiredText("Policy number"),
    companyName: requiredText("Insurance company name"),
    insuranceType: requiredText("Insurance type"),
    roadworthyCert: requiredText("Roadworthy certificate"),
    customsRef: requiredText("Customs reference"),
    proofOfOwnership: requiredText("Proof of ownership"),
    state: requiredText("State"),
  })
  .superRefine((data, ctx) => {
    if (data.ownerType === "COMPANY" && !data.companyRegistrationNumber?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["companyRegistrationNumber"],
        message: "Company registration number is required for company owners.",
      });
    }
  });

export const loginSchema = z.object({
  email: z.string().email("Use a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export const stepFieldMap = {
  0: [
    "manufacture",
    "model",
    "bodyType",
    "color",
    "vehicleType",
    "fuelType",
    "purpose",
    "vehicleStatus",
    "year",
    "engineCapacity",
    "odometerReading",
    "seatingCapacity",
  ],
  1: [
    "ownerName",
    "ownerType",
    "address",
    "nationalId",
    "mobileNumber",
    "email",
    "companyRegistrationNumber",
    "passportNumber",
  ],
  2: [
    "plateNumber",
    "plateType",
    "registrationStatus",
    "registrationDate",
    "expiryDate",
    "insuranceStatus",
    "insuranceExpiryDate",
    "policyNumber",
    "companyName",
    "insuranceType",
    "roadworthyCert",
    "customsRef",
    "proofOfOwnership",
    "state",
  ],
};

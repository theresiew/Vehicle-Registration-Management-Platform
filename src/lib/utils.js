export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function formatLabel(value) {
  return value
    ?.toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function isPastDate(dateValue) {
  if (!dateValue) return false;
  const value = new Date(dateValue);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return value < today;
}

export function toDateTimeLocal(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (num) => String(num).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}

export function getInitialFormValues(data) {
  return {
    manufacture: data?.manufacture ?? "",
    model: data?.model ?? "",
    bodyType: data?.bodyType ?? "",
    color: data?.color ?? "",
    vehicleType: data?.vehicleType ?? "SUV",
    fuelType: data?.fuelType ?? "PETROL",
    purpose: data?.purpose ?? data?.vehiclePurpose ?? "PERSONAL",
    vehicleStatus: data?.vehicleStatus ?? "USED",
    year: data?.year ?? "",
    engineCapacity: data?.engineCapacity ?? "",
    odometerReading: data?.odometerReading ?? "",
    seatingCapacity: data?.seatingCapacity ?? "",
    ownerName: data?.ownerName ?? "",
    ownerType: data?.ownerType ?? "INDIVIDUAL",
    address: data?.address ?? "",
    nationalId: data?.nationalId ?? "",
    mobileNumber: data?.mobileNumber ?? data?.mobile ?? "",
    email: data?.email ?? "",
    companyRegistrationNumber: data?.companyRegistrationNumber ?? data?.companyRegNumber ?? "",
    passportNumber: data?.passportNumber ?? "",
    plateNumber: data?.plateNumber ?? "",
    plateType: data?.plateType ?? "PRIVATE",
    registrationStatus: data?.registrationStatus ?? "ACTIVE",
    registrationDate: toDateTimeLocal(data?.registrationDate),
    expiryDate: toDateTimeLocal(data?.expiryDate),
    insuranceStatus: data?.insuranceStatus ?? "ACTIVE",
    insuranceExpiryDate: toDateTimeLocal(data?.insuranceExpiryDate),
    policyNumber: data?.policyNumber ?? "",
    companyName: data?.companyName ?? "",
    insuranceType: data?.insuranceType ?? "",
    roadworthyCert: data?.roadworthyCert ?? "",
    customsRef: data?.customsRef ?? "",
    proofOfOwnership: data?.proofOfOwnership ?? "",
    state: data?.state ?? "",
  };
}

export function mapVehicleFormToApiPayload(values) {
  return {
    manufacture: values.manufacture,
    model: values.model,
    year: Number(values.year),
    vehicleType: values.vehicleType,
    bodyType: values.bodyType,
    color: values.color,
    fuelType: values.fuelType,
    engineCapacity: Number(values.engineCapacity),
    odometerReading: Number(values.odometerReading),
    seatingCapacity: Number(values.seatingCapacity),
    vehiclePurpose: values.purpose,
    vehicleStatus: values.vehicleStatus,
    ownerName: values.ownerName,
    ownerType: values.ownerType,
    nationalId: values.nationalId,
    // The live backend crashes when these are omitted, so we send safe fallbacks.
    passportNumber: values.passportNumber || "NOT-PROVIDED",
    companyRegNumber: values.companyRegistrationNumber || "NOT-APPLICABLE",
    address: values.address,
    mobile: values.mobileNumber,
    email: values.email,
    plateNumber: values.plateNumber,
    registrationStatus: values.registrationStatus,
    registrationDate: values.registrationDate,
    expiryDate: values.expiryDate,
    state: values.state,
    plateType: values.plateType,
    policyNumber: values.policyNumber,
    companyName: values.companyName,
    insuranceExpiryDate: values.insuranceExpiryDate,
    insuranceStatus: values.insuranceStatus,
    insuranceType: values.insuranceType,
    roadworthyCert: values.roadworthyCert,
    customsRef: values.customsRef,
    proofOfOwnership: values.proofOfOwnership,
  };
}

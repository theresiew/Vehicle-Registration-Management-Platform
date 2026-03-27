import { ownerTypes } from "../../../lib/constants";
import Field, { SelectInput, TextInput } from "../../ui/Field";

function OwnerStep({ register, errors, watch }) {
  const ownerType = watch("ownerType");

  return (
    <div className="form-grid">
      <Field label="Owner Name" error={errors.ownerName?.message}>
        <TextInput placeholder="Jane Uwimana" error={errors.ownerName} {...register("ownerName")} />
      </Field>
      <Field label="Owner Type" error={errors.ownerType?.message}>
        <SelectInput error={errors.ownerType} {...register("ownerType")}>
          {ownerTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Address" error={errors.address?.message}>
        <TextInput placeholder="Kicukiro, Kigali" error={errors.address} {...register("address")} />
      </Field>
      <Field label="National ID" error={errors.nationalId?.message}>
        <TextInput placeholder="1199912345678901" error={errors.nationalId} {...register("nationalId")} />
      </Field>
      <Field label="Mobile Number" error={errors.mobileNumber?.message}>
        <TextInput placeholder="0781234567" error={errors.mobileNumber} {...register("mobileNumber")} />
      </Field>
      <Field label="Email" error={errors.email?.message}>
        <TextInput type="email" placeholder="owner@example.com" error={errors.email} {...register("email")} />
      </Field>
      <Field
        label="Company Registration Number"
        error={errors.companyRegistrationNumber?.message}
        hint={ownerType === "COMPANY" ? "Required when owner type is COMPANY." : "Only needed for company-owned vehicles."}
      >
        <TextInput
          placeholder="RDB-2026-001"
          error={errors.companyRegistrationNumber}
          {...register("companyRegistrationNumber")}
        />
      </Field>
      <Field label="Passport Number" error={errors.passportNumber?.message} hint="Optional">
        <TextInput placeholder="PA123456" error={errors.passportNumber} {...register("passportNumber")} />
      </Field>
    </div>
  );
}

export default OwnerStep;

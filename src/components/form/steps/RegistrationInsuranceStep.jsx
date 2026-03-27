import { insuranceStatuses, plateTypes, registrationStatuses } from "../../../lib/constants";
import Field, { SelectInput, TextInput } from "../../ui/Field";

function RegistrationInsuranceStep({ register, errors }) {
  return (
    <div className="form-grid">
      <Field label="Plate Number" error={errors.plateNumber?.message}>
        <TextInput placeholder="RAA 123 A" error={errors.plateNumber} {...register("plateNumber")} />
      </Field>
      <Field label="Plate Type" error={errors.plateType?.message}>
        <SelectInput error={errors.plateType} {...register("plateType")}>
          {plateTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Registration Status" error={errors.registrationStatus?.message}>
        <SelectInput error={errors.registrationStatus} {...register("registrationStatus")}>
          {registrationStatuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Registration Date" error={errors.registrationDate?.message}>
        <TextInput type="datetime-local" error={errors.registrationDate} {...register("registrationDate")} />
      </Field>
      <Field label="Registration Expiry" error={errors.expiryDate?.message}>
        <TextInput type="datetime-local" error={errors.expiryDate} {...register("expiryDate")} />
      </Field>
      <Field label="Insurance Status" error={errors.insuranceStatus?.message}>
        <SelectInput error={errors.insuranceStatus} {...register("insuranceStatus")}>
          {insuranceStatuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Insurance Expiry Date" error={errors.insuranceExpiryDate?.message}>
        <TextInput type="datetime-local" error={errors.insuranceExpiryDate} {...register("insuranceExpiryDate")} />
      </Field>
      <Field label="Policy Number" error={errors.policyNumber?.message}>
        <TextInput placeholder="POL-2026-001" error={errors.policyNumber} {...register("policyNumber")} />
      </Field>
      <Field label="Insurance Company Name" error={errors.companyName?.message}>
        <TextInput placeholder="SONARWA" error={errors.companyName} {...register("companyName")} />
      </Field>
      <Field label="Insurance Type" error={errors.insuranceType?.message}>
        <TextInput placeholder="Comprehensive" error={errors.insuranceType} {...register("insuranceType")} />
      </Field>
      <Field label="Roadworthy Certificate" error={errors.roadworthyCert?.message}>
        <TextInput placeholder="RW-CERT-101" error={errors.roadworthyCert} {...register("roadworthyCert")} />
      </Field>
      <Field label="Customs Reference" error={errors.customsRef?.message}>
        <TextInput placeholder="CUST-9090" error={errors.customsRef} {...register("customsRef")} />
      </Field>
      <Field label="Proof of Ownership" error={errors.proofOfOwnership?.message}>
        <TextInput placeholder="Sales agreement" error={errors.proofOfOwnership} {...register("proofOfOwnership")} />
      </Field>
      <Field label="State" error={errors.state?.message}>
        <TextInput placeholder="Kigali" error={errors.state} {...register("state")} />
      </Field>
    </div>
  );
}

export default RegistrationInsuranceStep;

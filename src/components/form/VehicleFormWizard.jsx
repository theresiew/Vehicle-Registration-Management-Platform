import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { stepLabels } from "../../lib/constants";
import { getInitialFormValues, mapVehicleFormToApiPayload } from "../../lib/utils";
import { stepFieldMap, vehicleSchema } from "../../lib/validation";
import { normalizeApiError } from "../../services/api";
import Button from "../ui/Button";
import SectionCard from "../ui/SectionCard";
import { useToast } from "../ui/ToastProvider";
import OwnerStep from "./steps/OwnerStep";
import RegistrationInsuranceStep from "./steps/RegistrationInsuranceStep";
import VehicleInfoStep from "./steps/VehicleInfoStep";

const steps = [VehicleInfoStep, OwnerStep, RegistrationInsuranceStep];

function VehicleFormWizard({ mode, initialData, mutation, id, vehicles = [] }) {
  const [step, setStep] = useState(0);
  const StepComponent = steps[step];
  const navigate = useNavigate();
  const { showToast } = useToast();

  const methods = useForm({
    resolver: zodResolver(vehicleSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: getInitialFormValues(initialData),
  });

  const {
    formState: { errors },
    clearErrors,
    setError,
    handleSubmit,
    register,
    reset,
    trigger,
    watch,
  } = methods;

  useEffect(() => {
    reset(getInitialFormValues(initialData));
  }, [initialData, reset]);

  const nextStep = async () => {
    const isValid = await trigger(stepFieldMap[step]);
    if (isValid) setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const previousStep = () => setStep((current) => Math.max(current - 1, 0));

  const checkDuplicateValues = (values) => {
    const currentId = String(id ?? initialData?.id ?? initialData?._id ?? "");
    const normalizedPlate = values.plateNumber.trim().toLowerCase();
    const normalizedNationalId = values.nationalId.trim();
    const normalizedMobile = values.mobileNumber.trim();
    const normalizedEmail = values.email.trim().toLowerCase();

    const match = vehicles.find((vehicle) => {
      const vehicleId = String(vehicle?.id ?? vehicle?._id ?? "");

      if (mode === "edit" && currentId && vehicleId === currentId) {
        return false;
      }

      return (
        vehicle?.plateNumber?.trim().toLowerCase() === normalizedPlate ||
        vehicle?.nationalId?.trim() === normalizedNationalId ||
        vehicle?.mobile?.trim() === normalizedMobile ||
        vehicle?.mobileNumber?.trim() === normalizedMobile ||
        vehicle?.email?.trim().toLowerCase() === normalizedEmail
      );
    });

    if (!match) {
      clearErrors(["plateNumber", "nationalId", "mobileNumber", "email"]);
      return false;
    }

    let hasDuplicate = false;

    if (match?.plateNumber?.trim().toLowerCase() === normalizedPlate) {
      setError("plateNumber", {
        type: "manual",
        message: "This plate number already exists in the registry.",
      });
      hasDuplicate = true;
    }

    if (match?.nationalId?.trim() === normalizedNationalId) {
      setError("nationalId", {
        type: "manual",
        message: "This national ID is already linked to another vehicle.",
      });
      hasDuplicate = true;
    }

    if ((match?.mobile ?? match?.mobileNumber)?.trim() === normalizedMobile) {
      setError("mobileNumber", {
        type: "manual",
        message: "This mobile number already exists in the registry.",
      });
      hasDuplicate = true;
    }

    if (match?.email?.trim().toLowerCase() === normalizedEmail) {
      setError("email", {
        type: "manual",
        message: "This email already exists in the registry.",
      });
      hasDuplicate = true;
    }

    if (hasDuplicate) {
      showToast("Please use unique vehicle and owner identifiers before submitting.", "error");
    }

    return hasDuplicate;
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (checkDuplicateValues(values)) {
        return;
      }

      const payload = mapVehicleFormToApiPayload(values);

      const response = await mutation.mutateAsync(payload);
      showToast(mode === "create" ? "Vehicle registered successfully." : "Vehicle updated successfully.", "success");
      const targetId = response?.id ?? response?._id ?? id;
      navigate(targetId ? `/vehicle/${targetId}` : "/dashboard");
    } catch (error) {
      normalizeApiError(error).forEach((message) => showToast(message, "error"));
    }
  });

  return (
    <FormProvider {...methods}>
      <SectionCard
        title={mode === "create" ? "Register New Vehicle" : "Edit Vehicle Record"}
        subtitle="Strict frontend validation mirrors the backend schema to avoid 422 errors."
      >
        <div className="stepper">
          {stepLabels.map((label, index) => (
            <div key={label} className={index === step ? "step step-active" : "step"}>
              <span>{index + 1}</span>
              <strong>{label}</strong>
            </div>
          ))}
        </div>

        <form className="wizard-form" onSubmit={onSubmit}>
          <StepComponent register={register} errors={errors} watch={watch} />

          <div className="wizard-actions">
            <Button type="button" variant="ghost" onClick={previousStep} disabled={step === 0}>
              Previous
            </Button>
            {step < steps.length - 1 ? (
              <Button type="button" onClick={nextStep}>
                Continue
              </Button>
            ) : (
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : mode === "create" ? "Create Vehicle" : "Save Changes"}
              </Button>
            )}
          </div>
        </form>
      </SectionCard>
    </FormProvider>
  );
}

export default VehicleFormWizard;

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { stepLabels } from "../../lib/constants";
import { getInitialFormValues } from "../../lib/utils";
import { stepFieldMap, vehicleSchema } from "../../lib/validation";
import { normalizeApiError } from "../../services/api";
import Button from "../ui/Button";
import SectionCard from "../ui/SectionCard";
import { useToast } from "../ui/ToastProvider";
import OwnerStep from "./steps/OwnerStep";
import RegistrationInsuranceStep from "./steps/RegistrationInsuranceStep";
import VehicleInfoStep from "./steps/VehicleInfoStep";

const steps = [VehicleInfoStep, OwnerStep, RegistrationInsuranceStep];

function VehicleFormWizard({ mode, initialData, mutation, id }) {
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

  const onSubmit = handleSubmit(async (values) => {
    try {
      const payload = {
        ...values,
        year: Number(values.year),
        engineCapacity: Number(values.engineCapacity),
        odometerReading: Number(values.odometerReading),
        seatingCapacity: Number(values.seatingCapacity),
      };

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

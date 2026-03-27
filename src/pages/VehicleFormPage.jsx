import { useParams } from "react-router-dom";
import VehicleFormWizard from "../components/form/VehicleFormWizard";
import LoadingState from "../components/ui/LoadingState";
import { useCreateVehicleMutation, useUpdateVehicleMutation, useVehicleQuery } from "../hooks/useVehicles";

function VehicleFormPage({ mode }) {
  const { id } = useParams();
  const vehicleQuery = useVehicleQuery(mode === "edit" ? id : undefined);
  const createMutation = useCreateVehicleMutation();
  const updateMutation = useUpdateVehicleMutation(id);

  if (mode === "edit" && vehicleQuery.isLoading) {
    return <LoadingState label="Loading vehicle form..." />;
  }

  return (
    <VehicleFormWizard
      mode={mode}
      initialData={vehicleQuery.data?.data ?? vehicleQuery.data}
      mutation={mode === "create" ? createMutation : updateMutation}
      id={id}
    />
  );
}

export default VehicleFormPage;

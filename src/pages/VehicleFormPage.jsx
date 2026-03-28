import { useParams } from "react-router-dom";
import VehicleFormWizard from "../components/form/VehicleFormWizard";
import LoadingState from "../components/ui/LoadingState";
import { useCreateVehicleMutation, useUpdateVehicleMutation, useVehicleQuery, useVehiclesQuery } from "../hooks/useVehicles";

function VehicleFormPage({ mode }) {
  const { id } = useParams();
  const vehicleQuery = useVehicleQuery(mode === "edit" ? id : undefined);
  const vehiclesQuery = useVehiclesQuery();
  const createMutation = useCreateVehicleMutation();
  const updateMutation = useUpdateVehicleMutation(id);
  const vehicles = Array.isArray(vehiclesQuery.data) ? vehiclesQuery.data : vehiclesQuery.data?.data ?? [];

  if (mode === "edit" && vehicleQuery.isLoading) {
    return <LoadingState label="Loading vehicle form..." />;
  }

  return (
    <VehicleFormWizard
      mode={mode}
      initialData={vehicleQuery.data?.data ?? vehicleQuery.data}
      mutation={mode === "create" ? createMutation : updateMutation}
      id={id}
      vehicles={vehicles}
    />
  );
}

export default VehicleFormPage;

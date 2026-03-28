import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DetailTabs from "../components/vehicle/DetailTabs";
import Button from "../components/ui/Button";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import LoadingState from "../components/ui/LoadingState";
import SectionCard from "../components/ui/SectionCard";
import { useDeleteVehicleMutation, useVehicleQuery, useVehicleSegmentQuery } from "../hooks/useVehicles";
import { normalizeApiError } from "../services/api";
import { useToast } from "../components/ui/ToastProvider";

function VehicleDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("info");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const vehicleQuery = useVehicleQuery(id);
  const segmentQuery = useVehicleSegmentQuery(id, activeTab);
  const deleteMutation = useDeleteVehicleMutation();

  const vehicle = vehicleQuery.data?.data ?? vehicleQuery.data ?? {};
  const segmentData = useMemo(() => segmentQuery.data?.data ?? segmentQuery.data ?? {}, [segmentQuery.data]);

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(id);
      showToast("Vehicle deleted successfully.", "success");
      navigate("/dashboard");
    } catch (error) {
      normalizeApiError(error).forEach((message) => showToast(message, "error"));
    }
  };

  if (vehicleQuery.isLoading) {
    return <LoadingState label="Loading vehicle details..." />;
  }

  return (
    <div className="page-grid">
      <SectionCard
        title={`${vehicle.manufacture ?? "Vehicle"} ${vehicle.model ?? "record"}`}
        subtitle={vehicle.plateNumber ?? "Protected detailed view"}
        actions={
          <div className="inline-actions">
            <Link to={`/vehicle/${id}/edit`}>
              <Button variant="secondary">Edit</Button>
            </Link>
            <Button type="button" onClick={() => setConfirmOpen(true)}>
              Delete
            </Button>
          </div>
        }
      >
        <div className="detail-hero">
          <article>
            <span>Owner</span>
            <strong>{vehicle.ownerName ?? "N/A"}</strong>
          </article>
          <article>
            <span>Status</span>
            <strong>{vehicle.registrationStatus ?? vehicle.vehicleStatus ?? "N/A"}</strong>
          </article>
          <article>
            <span>Purpose</span>
            <strong>{vehicle.purpose ?? vehicle.vehiclePurpose ?? "N/A"}</strong>
          </article>
        </div>
        <DetailTabs
          activeTab={activeTab}
          onChange={setActiveTab}
          data={segmentData}
          loading={segmentQuery.isLoading}
        />
      </SectionCard>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete vehicle"
        message="This action removes the current record from the API. Please confirm before continuing."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        busy={deleteMutation.isPending}
      />
    </div>
  );
}

export default VehicleDetailsPage;

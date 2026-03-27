import { Link } from "react-router-dom";
import StatCard from "../components/ui/StatCard";
import SectionCard from "../components/ui/SectionCard";
import VehicleTable from "../components/vehicle/VehicleTable";
import LoadingState from "../components/ui/LoadingState";
import { useVehiclesQuery } from "../hooks/useVehicles";

function DashboardPage() {
  const { data, isLoading } = useVehiclesQuery();
  const vehicles = Array.isArray(data) ? data : data?.data ?? [];

  const activeRegistrations = vehicles.filter((item) => item.registrationStatus === "ACTIVE").length;
  const companyOwned = vehicles.filter((item) => item.ownerType === "COMPANY").length;
  const expiredInsurance = vehicles.filter((item) => item.insuranceStatus === "EXPIRED").length;

  return (
    <div className="page-grid">
      <section className="stats-grid">
        <StatCard label="Registered Vehicles" value={vehicles.length} />
        <StatCard label="Active Registrations" value={activeRegistrations} tone="success" />
        <StatCard label="Company Owned" value={companyOwned} tone="warning" />
        <StatCard label="Expired Insurance" value={expiredInsurance} tone="danger" />
      </section>

      <SectionCard
        title="Management Overview"
        subtitle="Protected administrative view with cached listing data."
        actions={<Link to="/vehicle/new" className="hero-link">Register a vehicle</Link>}
      >
        {isLoading ? <LoadingState label="Building dashboard..." /> : <VehicleTable vehicles={vehicles} showActions />}
      </SectionCard>
    </div>
  );
}

export default DashboardPage;

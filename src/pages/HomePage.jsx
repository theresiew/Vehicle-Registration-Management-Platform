import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import VehicleTable from "../components/vehicle/VehicleTable";
import LoadingState from "../components/ui/LoadingState";
import SectionCard from "../components/ui/SectionCard";
import { useVehiclesQuery } from "../hooks/useVehicles";
import { getApiBaseUrl, getApiConfigurationMessage } from "../services/api";

function HomePage() {
  const { data, isLoading, isError } = useVehiclesQuery();
  const vehicles = Array.isArray(data) ? data : data?.data ?? [];
  const apiConfigurationMessage = getApiConfigurationMessage();

  return (
    <div className="page-grid">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Public access</p>
          <h2>Browse the national registry with a modern control tower feel.</h2>
          <p>
            Guests can view the read-only vehicle registry, while authenticated users can open detailed records,
            register vehicles, and manage updates safely.
          </p>
        </div>
        <Link to="/login" className="hero-link">
          Sign in for protected actions
          <ArrowRight size={18} />
        </Link>
      </section>

      <SectionCard
        title="All Registered Vehicles"
        subtitle="Public GET /vehicle integration with caching via TanStack Query."
      >
        {apiConfigurationMessage ? (
          <div className="state-card">
            {apiConfigurationMessage}
            <br />
            <strong>Current value:</strong> {getApiBaseUrl() || "Not set"}
          </div>
        ) : null}
        {isLoading ? <LoadingState label="Loading vehicle registry..." /> : null}
        {isError && !apiConfigurationMessage ? (
          <div className="state-card">Unable to load vehicles. Check the API base URL and backend CORS settings.</div>
        ) : null}
        {!isLoading && !isError && !apiConfigurationMessage ? <VehicleTable vehicles={vehicles} /> : null}
      </SectionCard>
    </div>
  );
}

export default HomePage;

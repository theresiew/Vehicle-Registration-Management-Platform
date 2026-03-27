import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import VehicleTable from "../components/vehicle/VehicleTable";
import LoadingState from "../components/ui/LoadingState";
import SectionCard from "../components/ui/SectionCard";
import { useVehiclesQuery } from "../hooks/useVehicles";

function HomePage() {
  const { data, isLoading, isError } = useVehiclesQuery();
  const vehicles = Array.isArray(data) ? data : data?.data ?? [];

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
        {isLoading ? <LoadingState label="Loading vehicle registry..." /> : null}
        {isError ? <div className="state-card">Unable to load vehicles. Check the API base URL and try again.</div> : null}
        {!isLoading && !isError ? <VehicleTable vehicles={vehicles} /> : null}
      </SectionCard>
    </div>
  );
}

export default HomePage;

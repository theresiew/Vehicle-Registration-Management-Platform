import { Link } from "react-router-dom";
import { formatLabel } from "../../lib/utils";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";

function VehicleTable({ vehicles = [], showActions = false }) {
  if (!vehicles.length) {
    return <EmptyState title="No vehicles yet" message="Vehicle records will appear here once the API returns data." />;
  }

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Plate</th>
            <th>Owner</th>
            <th>Vehicle</th>
            <th>Type</th>
            <th>Status</th>
            <th>Purpose</th>
            {showActions ? <th>Action</th> : null}
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id ?? vehicle._id ?? vehicle.plateNumber}>
              <td>{vehicle.plateNumber ?? "N/A"}</td>
              <td>{vehicle.ownerName ?? "Unknown owner"}</td>
              <td>
                {vehicle.manufacture} {vehicle.model}
              </td>
              <td>{formatLabel(vehicle.vehicleType ?? "OTHER")}</td>
              <td>{formatLabel(vehicle.registrationStatus ?? vehicle.vehicleStatus ?? "PENDING")}</td>
              <td>{formatLabel(vehicle.purpose ?? vehicle.vehiclePurpose ?? "PERSONAL")}</td>
              {showActions ? (
                <td>
                  <Link to={`/vehicle/${vehicle.id ?? vehicle._id}`}>
                    <Button variant="secondary">View Details</Button>
                  </Link>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleTable;

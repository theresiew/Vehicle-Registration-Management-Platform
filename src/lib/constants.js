export const vehicleTypes = [
  "ELECTRIC",
  "SUV",
  "TRUCK",
  "MOTORCYCLE",
  "BUS",
  "VAN",
  "PICKUP",
  "OTHER",
];

export const fuelTypes = ["PETROL", "DIESEL", "ELECTRIC", "HYBRID", "GAS", "OTHER"];
export const purposes = ["PERSONAL", "COMMERCIAL", "TAXI", "GOVERNMENT"];
export const vehicleStatuses = ["NEW", "USED", "REBUILT"];
export const ownerTypes = ["INDIVIDUAL", "COMPANY", "NGO", "GOVERNMENT"];
export const plateTypes = ["PRIVATE", "COMMERCIAL", "GOVERNMENT", "DIPLOMATIC", "PERSONALIZED"];
export const registrationStatuses = ["ACTIVE", "SUSPENDED", "EXPIRED", "PENDING"];
export const insuranceStatuses = ["ACTIVE", "EXPIRED", "CANCELLED"];

export const queryKeys = {
  vehicles: ["vehicles"],
  vehicle: (id) => ["vehicle", id],
  vehicleInfo: (id) => ["vehicle", id, "info"],
  vehicleOwner: (id) => ["vehicle", id, "owner"],
  vehicleRegistration: (id) => ["vehicle", id, "registration"],
  vehicleInsurance: (id) => ["vehicle", id, "insurance"],
};

export const stepLabels = [
  "Vehicle Information",
  "Owner Information",
  "Registration & Insurance",
];

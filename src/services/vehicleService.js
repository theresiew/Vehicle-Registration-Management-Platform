import { api } from "./api";

const vehicleBasePath = "/api/vehicle-service/vehicle";

export async function fetchVehicles() {
  const { data } = await api.get(vehicleBasePath);
  return data;
}

export async function fetchVehicleById(id) {
  const { data } = await api.get(`${vehicleBasePath}/${id}`);
  return data;
}

export async function fetchVehicleSegment(id, segment) {
  const { data } = await api.get(`${vehicleBasePath}/${id}/${segment}`);
  return data;
}

export async function createVehicle(payload) {
  const { data } = await api.post(vehicleBasePath, payload);
  return data;
}

export async function updateVehicle({ id, payload }) {
  const { data } = await api.put(`${vehicleBasePath}/${id}`, payload);
  return data;
}

export async function deleteVehicle(id) {
  const { data } = await api.delete(`${vehicleBasePath}/${id}`);
  return data;
}

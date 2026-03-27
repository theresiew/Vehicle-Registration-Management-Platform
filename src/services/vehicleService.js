import { api } from "./api";

export async function fetchVehicles() {
  const { data } = await api.get("/vehicle");
  return data;
}

export async function fetchVehicleById(id) {
  const { data } = await api.get(`/vehicle/${id}`);
  return data;
}

export async function fetchVehicleSegment(id, segment) {
  const { data } = await api.get(`/vehicle/${id}/${segment}`);
  return data;
}

export async function createVehicle(payload) {
  const { data } = await api.post("/vehicle", payload);
  return data;
}

export async function updateVehicle({ id, payload }) {
  const { data } = await api.put(`/vehicle/${id}`, payload);
  return data;
}

export async function deleteVehicle(id) {
  const { data } = await api.delete(`/vehicle/${id}`);
  return data;
}

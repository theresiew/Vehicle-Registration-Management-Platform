import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../lib/constants";
import {
  createVehicle,
  deleteVehicle,
  fetchVehicleById,
  fetchVehicleSegment,
  fetchVehicles,
  updateVehicle,
} from "../services/vehicleService";

export function useVehiclesQuery() {
  return useQuery({
    queryKey: queryKeys.vehicles,
    queryFn: fetchVehicles,
  });
}

export function useVehicleQuery(id) {
  return useQuery({
    queryKey: queryKeys.vehicle(id),
    queryFn: () => fetchVehicleById(id),
    enabled: Boolean(id),
  });
}

export function useVehicleSegmentQuery(id, segment) {
  return useQuery({
    queryKey: ["vehicle", id, segment],
    queryFn: () => fetchVehicleSegment(id, segment),
    enabled: Boolean(id && segment),
  });
}

export function useCreateVehicleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.vehicles });
    },
  });
}

export function useUpdateVehicleMutation(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => updateVehicle({ id, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.vehicles });
      queryClient.invalidateQueries({ queryKey: queryKeys.vehicle(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.vehicleInfo(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.vehicleOwner(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.vehicleRegistration(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.vehicleInsurance(id) });
    },
  });
}

export function useDeleteVehicleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVehicle,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.vehicles });
      queryClient.removeQueries({ queryKey: queryKeys.vehicle(id) });
    },
  });
}

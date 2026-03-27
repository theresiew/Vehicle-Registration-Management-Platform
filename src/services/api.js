import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "https://vehicle-registration-api.onrender.com";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function normalizeApiError(error) {
  const payload = error?.response?.data;

  if (Array.isArray(payload?.errors)) {
    return payload.errors.map((item) => item?.message || item).filter(Boolean);
  }

  if (Array.isArray(payload?.message)) {
    return payload.message;
  }

  if (typeof payload?.message === "string") {
    return [payload.message];
  }

  if (typeof error?.message === "string") {
    return [error.message];
  }

  return ["Something went wrong while contacting the API."];
}

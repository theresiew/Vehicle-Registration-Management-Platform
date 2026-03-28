import axios from "axios";

const configuredBaseURL = import.meta.env.VITE_API_BASE_URL?.trim() ?? "";

const missingApiConfigMessage =
  "API base URL is not configured. Add VITE_API_BASE_URL to your .env file and restart the app.";

export const api = axios.create({
  baseURL: configuredBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (!configuredBaseURL) {
    return Promise.reject(new Error(missingApiConfigMessage));
  }

  return config;
});

export function getApiBaseUrl() {
  return configuredBaseURL;
}

export function getApiConfigurationMessage() {
  return configuredBaseURL ? "" : missingApiConfigMessage;
}

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

  if (!error?.response) {
    return [
      configuredBaseURL
        ? `Unable to reach the API at ${configuredBaseURL}. Check the URL and make sure the backend allows CORS/preflight requests from this frontend.`
        : missingApiConfigMessage,
    ];
  }

  if (typeof error?.message === "string") {
    return [error.message];
  }

  return ["Something went wrong while contacting the API."];
}

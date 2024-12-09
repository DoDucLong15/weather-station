const BASE_URL = "http://localhost:8080"

// DEVICE ENDPOINTS
export const deviceEndpoints = {
  GET_DEVICES: BASE_URL + "/devices",
  UPDATE_DEVICE: BASE_URL + "/devices",
  DELETE_DEVICE: BASE_URL + "/devices",
  CREATE_DEVICE: BASE_URL + "/devices",
}

export const historyEndpoints = {
  DASHBOARD: BASE_URL + "/histories/dashboard",
  ANALYTICS: BASE_URL + "/histories/analytics"
}
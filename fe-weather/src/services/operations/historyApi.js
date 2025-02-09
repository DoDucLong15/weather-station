// @ts-check
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { historyEndpoints } from "../apis";

const {DASHBOARD, ANALYTICS} = historyEndpoints

export async function getDashboard(deviceId, token) {
  try {
    const response = await apiConnector("GET", DASHBOARD, null, {
      Authorization: `Bearer ${token}`,
    }, {
      deviceId: Number(deviceId)
    });
    if(!response.data) {
      throw new Error('Get Dashboard failed');
    }
    toast.success('Get Dashboard success');
    return response.data;
  } catch(error) {
    console.log(error?.message);
    toast.error('Get Dashboard failed');
  }
}

export async function getHistory(deviceId, startDate, endDate, token) {
  try {
    const response = await apiConnector("GET", ANALYTICS, null, {
      Authorization: `Bearer ${token}`,
    }, {
      deviceId: Number(deviceId),
      startDate: startDate,
      endDate: endDate
    });
    if(!response.data) {
      throw new Error('Get History failed');
    }
    toast.success('Get History success');
    return response.data;
  } catch(error) {
    console.log(error?.message);
    toast.error('Get History failed');
  }
}
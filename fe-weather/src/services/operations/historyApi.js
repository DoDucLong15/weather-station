// @ts-check
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { historyEndpoints } from "../apis";

const {DASHBOARD} = historyEndpoints

export async function getDashboard(deviceId) {
  try {
    const response = await apiConnector("GET", DASHBOARD, null, null, {
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


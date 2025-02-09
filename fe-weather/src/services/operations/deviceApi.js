import { addDevice, editDevice, setDevices, setLoading, removeDevice } from "../../slices/deviceSlice";
import { apiConnector } from "../apiConnector";
import { deviceEndpoints } from "../apis";
import toast from "react-hot-toast";

const {
  GET_DEVICES,
  UPDATE_DEVICE,
  DELETE_DEVICE,
  CREATE_DEVICE
} = deviceEndpoints;

export function getAllDevices(token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_DEVICES, null, {
        Authorization: `Bearer ${token}`,
      });
      if(!response.data) {
        throw new Error('Get All Devices failed!');
      }
      toast.success('Get all devices success!');
      dispatch(setDevices(response.data));
    } catch (error) {
      toast.error('Get all devices failed!');
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export async function getDevices(token) {
  try {
    const response = await apiConnector("GET", GET_DEVICES, null, {
      Authorization: `Bearer ${token}`,
    });
    if(!response.data) {
      throw new Error('Get All Devices failed!');
    }
    if(!response.data) {
      throw new Error('Get All Devices failed!');
    }
    return response.data;
  } catch (error) {
    return [];
  }
}

export function createDevice(data, navigate, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", CREATE_DEVICE, data, {
        Authorization: `Bearer ${token}`,
      });
      if(!response.data) {
        throw new Error('Create device failed!');
      }
      toast.success('Create device success!');
      dispatch(addDevice(response.data));
      navigate('/devices')
    } catch (error) {
      toast.error('Create device failed!');
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function updateDevice(data, navigate, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("PATCH", UPDATE_DEVICE, data, {
        Authorization: `Bearer ${token}`,
      });
      if(!response.data) {
        throw new Error('Update device failed!');
      }
      toast.success('Update device success!');
      dispatch(editDevice(response.data));
      navigate('/devices')
    } catch (error) {
      toast.error('Update device failed!');
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function deleteDevice(id, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("DELETE", `${DELETE_DEVICE}/${id}`, null, {
        Authorization: `Bearer ${token}`,
      });
      if(!response.data) {
        throw new Error('Delete device failed!');
      }
      toast.success('Delete device success!');
      dispatch(removeDevice(id));
    } catch (error) {
      toast.error('Delete device failed!');
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function sharedDevice(id, sharedMails, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("PATCH", UPDATE_DEVICE, {
        id,
        sharedMails
      }, {
        Authorization: `Bearer ${token}`,
      });
      if(!response.data) {
        throw new Error('Update shared device failed!');
      }
      toast.success('Update shared device success!');
    } catch (error) {
      toast.error('Update shared device failed!');
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}
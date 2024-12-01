import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  devices: [],
  loading: false,
}

const deviceSlice = createSlice({
  name: 'device',
  initialState: initialState,
  reducers: {
    removeDevice(state, value) {
      state.devices = state.devices.filter((device) => device.id !== value.payload);
    },
    addDevice(state, value) {
      state.devices = [...state.devices, value.payload];
    },
    editDevice(state, value) {
      state.devices = state.devices.map((device) => {
        return device.id === value.payload.id ? value.payload : device
      })
    },
    setLoading(state, value) {
      state.loading = value.payload
    },
    setDevices(state, value) {
      state.devices = value.payload
    }
  }
})

export const {removeDevice, addDevice, editDevice, setLoading, setDevices} = deviceSlice.actions;

export default deviceSlice.reducer;
import { combineReducers } from "@reduxjs/toolkit"
import deviceReducer from "../slices/deviceSlice"
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"

const rootReducer= combineReducers({
  device: deviceReducer,
  auth: authReducer,
  profile: profileReducer,
})

export default rootReducer;
import { combineReducers } from "@reduxjs/toolkit"
import deviceReducer from "../slices/deviceSlice"

const rootReducer= combineReducers({
  device: deviceReducer
})

export default rootReducer;
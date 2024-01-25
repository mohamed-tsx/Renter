import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/auth/authSlice";
import propertyReducer from "./Features/property/propertySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertyReducer,
  },
});

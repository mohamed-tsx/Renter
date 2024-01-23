import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/Redux/Features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

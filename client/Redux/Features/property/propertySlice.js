import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import propertyService from "./propertyService";

const initialState = {
  properties: [],
  isError: false,
  isSuccess: false,
  message: "",
  isLoading: false,
};

export const addProperty = createAsyncThunk(
  "property/add",
  async (propertyData, thunkAPI) => {
    try {
      console.log(propertyData);
      const token = localStorage.getItem("token");
      return await propertyService.addProperty(propertyData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.properties.push(action.payload);
        state.isSuccess = true;
      })
      .addCase(addProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message; // Access the error message properly
        console.log("error", state.message);
      });
  },
});

export const { reset } = propertySlice.actions;
export default propertySlice.reducer;

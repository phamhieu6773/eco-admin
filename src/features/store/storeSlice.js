import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import storeService from "./storeService";

export const getStores = createAsyncThunk(
  "store/get-stores",
  async (params, thunkAPI) => {
    try {
      return await storeService.getStores(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getaStore = createAsyncThunk(
  "store/get-a-store",
  async (id, thunkAPI) => {
    try {
      return await storeService.getaStore(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateStatusStore =  createAsyncThunk(
  "store/update-store",
  async (store, thunkAPI) => {
    try {
      return await storeService.updateStatusStore(store);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetStateStore = createAction("Reset_all_store");

const initialState = {
  stores: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStores.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.stores = action.payload;
      })
      .addCase(getStores.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getaStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getaStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.store = action.payload;
      })
      .addCase(getaStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateStatusStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatusStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateStore = action.payload;
      })
      .addCase(updateStatusStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetStateStore, () => initialState);
  },
});
export default storeSlice.reducer;

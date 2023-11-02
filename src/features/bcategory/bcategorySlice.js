import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bcategoryService from "./bcategoryService";

export const getBCategorys = createAsyncThunk(
  "bcategory/get-bcategorys",
  async (thunkAPI) => {
    try {
      return await bcategoryService.getBCategorys();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBCategory = createAsyncThunk(
  "bcategory/create-bcategory",
  async (bcategoryData, thunkAPI) => {
    try {
      return await bcategoryService.createBCategory(bcategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBCategory = createAsyncThunk(
  "bcategory/get-bcategory",
  async (bcategory, thunkAPI) => {
    try {
      return await bcategoryService.getBCategory(bcategory);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBCategory = createAsyncThunk(
  "bcategory/update-bcategory",
  async (bcategoryData, thunkAPI) => {
    try {
      return await bcategoryService.updateBCategory(bcategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBCategory = createAsyncThunk(
  "bcategory/delete-bcategory",
  async (bcategory, thunkAPI) => {
    try {
      return await bcategoryService.deleteBCategory(bcategory);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetStateBCategory = createAction("Reset-all-bcategory");

const initialState = {
  bcategorys: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const bcategorySlice = createSlice({
  name: "bcategorys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBCategorys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBCategorys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bcategorys = action.payload;
      })
      .addCase(getBCategorys.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getBCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryName = action.payload.title;
      })
      .addCase(getBCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBCategory = action.payload;
      })
      .addCase(createBCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateBCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBCategory = action.payload;
      })
      .addCase(updateBCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteBCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBCategory = action.payload;
      })
      .addCase(deleteBCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetStateBCategory, () => initialState);
  },
});
export default bcategorySlice.reducer;

import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import pcategoryService from "./pcategoryService";

export const getPCategorys = createAsyncThunk(
  "pcategory/get-pcategorys",
  async (thunkAPI) => {
    try {
      return await pcategoryService.getPCategorys();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createPCategory = createAsyncThunk(
  "pcategory/create-pcategory",
  async (pcategoryData, thunkAPI) => {
    try {
      return await pcategoryService.createPCategory(pcategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPCategory = createAsyncThunk(
  "pcategory/get-pcategory",
  async (id, thunkAPI) => {
    try {
      return await pcategoryService.getPCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatePCategory = createAsyncThunk(
  "pcategory/update-pcategory",
  async (pcategoryData, thunkAPI) => {
    try {
      return await pcategoryService.updatePCategory(pcategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletePCategory = createAsyncThunk(
  "pcategory/delete-pcategory",
  async (id, thunkAPI) => {
    try {
      return await pcategoryService.deletePCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetStatePCategory = createAction("Reset-all-pcategories");
const initialState = {
  pcategorys: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const pcategorySlice = createSlice({
  name: "pcategorys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPCategorys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPCategorys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pcategorys = action.payload;
      })
      .addCase(getPCategorys.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getPCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryName = action.payload.title;
      })
      .addCase(getPCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createPCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdPCategory = action.payload;
      })
      .addCase(createPCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updatePCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedPCategory = action.payload;
      })
      .addCase(updatePCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deletePCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedPCategory = action.payload;
      })
      .addCase(deletePCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetStatePCategory, () => initialState);
  },
});
export default pcategorySlice.reducer;

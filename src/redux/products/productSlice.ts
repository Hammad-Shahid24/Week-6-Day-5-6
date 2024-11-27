import productService from "./productService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../types/Shopping";
import axios from "axios";

interface productState {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const initialState: productState = {
  products: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => {
      state.products = [];
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;

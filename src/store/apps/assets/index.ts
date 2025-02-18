// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { setLoading } from "../loading";
import { setErr, setErrors, setSuccess } from "../alertMessge";

export interface GetAssets {
  search?: string;
  page?: number;
}

export interface UpdateAsset {
  id: any;
  name: string;
}

export interface GetAssetByID {
  id: number;
}

// ** Add Event
export const addAsset = createAsyncThunk(
  "appAsset/addAsset",
  async (payload: any, { dispatch }: { dispatch: any }) => {
    dispatch(setLoading(true));
    try {
      dispatch(addAsset(payload));
      dispatch(setSuccess("Asset Added Successfully!"));
    } catch (error) {
      dispatch(setLoading(false));

      dispatch(setErrors("Something went wrong"));
    }
  }
);

// ** Update Event
export const updateAsset = createAsyncThunk(
  "appAsset/updateAsset",
  async (params: any, { dispatch }: { dispatch: any }) => {
    dispatch(setLoading(true));
    try {
      dispatch(setUpdateAsset(params));
      dispatch(setSuccess("Asset Updated Successfully!"));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setErrors("Something went wrong"));
    }
  }
);

// ** Delete Event
export const deleteAsset = createAsyncThunk(
  "appAsset/deleteAsset",
  async (id: number | string, { dispatch }: any) => {
    dispatch(setLoading(true));
    try {
      dispatch(setDeleteAsset(id));

      dispatch(setSuccess("Asset Deleted Sucessfully!"));

      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(setLoading(false));
      dispatch(setErrors("Something went wrong"));
    }
  }
);

export const appAssetSlice = createSlice({
  name: "appAsset",
  initialState: {
    add_asset: {},
    delete_asset: {},
    update_asset: {},
    asset_detail: {},
    asset: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    page: 1,
    search: "",
  },
  reducers: {
    setPage: (state, { payload }) => {
      state.page = payload;
    },
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
    setAddAsset: (state, action) => {
      state.add_asset = action.payload;
    },
    setUpdateAsset: (state, action) => {
      const updatedAsset = action.payload;
      state.update_asset = updatedAsset;
    },
    setDeleteAsset: (state, action) => {
      const deletedAsset = action.payload;
      state.delete_asset = deletedAsset;
    },
    setAsset: (state, action) => {
      state.asset = action.payload;
    },
    setAssetDetail: (state, action) => {
      state.asset_detail = action.payload;
    },
  },
});
export const {
  setPage,
  setSearch,
  setAddAsset,
  setUpdateAsset,
  setDeleteAsset,
  setAsset,
  setAssetDetail,
} = appAssetSlice.actions;

export default appAssetSlice.reducer;

// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Types
export interface loadingState {
  loading: boolean
}

export const initialState: loadingState = {
  loading: false
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload
    }
  }
})
export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer

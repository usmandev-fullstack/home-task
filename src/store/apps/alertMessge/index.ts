// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Types
export interface alertMessageState {
  errors?: any | null
  error?: string | null
  success?: any | null
}

export const initialState: alertMessageState = {
  error: null,
  errors: null,
  success: null
}

export const alertMessageSlice = createSlice({
  name: 'alertMessage',
  initialState,
  reducers: {
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setErr: (state, { payload }) => {
      state.error = payload
    },
    setSuccess: (state, { payload }) => {
      state.success = payload
    }
  }
})
export const { setErr, setErrors, setSuccess } = alertMessageSlice.actions

export default alertMessageSlice.reducer

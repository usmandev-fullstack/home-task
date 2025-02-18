// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import alertMessge from "./apps/alertMessge";
import loading from "./apps/loading";
import assets from "./apps/assets";

export const store = configureStore({
  reducer: {
    alertMessge,
    loading,
    assets,
  },

  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

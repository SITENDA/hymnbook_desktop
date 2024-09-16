import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import {backend} from "../util/backend";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, 
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: backend.env === 'production' ? false : true
})
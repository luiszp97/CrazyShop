import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./";
import { productSlice } from "./products/productSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        product: productSlice.reducer
       
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
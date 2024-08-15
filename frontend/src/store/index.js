import {configureStore} from "@reduxjs/toolkit";
import worldSlice from "./world/worldSlice";

export default configureStore({
    reducer:{
        world:worldSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})
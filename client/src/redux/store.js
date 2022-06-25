import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './slice/movieSLice'
import userReducer from './slice/userSlice'
import authReducer from './slice/authSlice'
import categoryReducer from './slice/categorySlice'

export const store = configureStore({
    reducer: {
        movie: movieReducer,
        user: userReducer,
        auth: authReducer,
        category: categoryReducer,
    },
})
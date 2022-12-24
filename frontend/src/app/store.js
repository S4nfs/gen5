import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'

//create a store
export const store = configureStore({
    reducer: {
        authR: authReducer
    }
})


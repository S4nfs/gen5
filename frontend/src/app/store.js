import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'

//create a store
export const store = configureStore({
    reducer: {
        authR: authReducer,
        goalR: goalReducer
    }
})


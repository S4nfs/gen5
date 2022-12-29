import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import goalService from "./goalService"

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//create new goal
export const createGoal = createAsyncThunk('goals/create', async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().authR.user.token //thunk api has a method to access STATE 🥳 
        return await goalService.createGoal(goalData, token)
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.messsage) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//fetch goals
export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().authR.user.token //thunk api has a method to access STATE 🥳 
        return await goalService.getGoals(token)
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.messsage) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//delete goal
export const deleteGoal = createAsyncThunk('goals/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().authR.user.token //thunk api has a method to access STATE 🥳 
        return await goalService.deleteGoal(id, token)
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.messsage) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload)
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.message = action.payload
            })
            //
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.message = action.payload
            })
            //
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.filter((goal) => goal._id !== action.payload.id) //filter out removed id from state or else we need to refresh to check
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.message = action.payload
            })
    }
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer
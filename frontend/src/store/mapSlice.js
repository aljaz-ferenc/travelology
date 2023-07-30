import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPosition: [45, 0],
    data: [],
    activeLog: null,
    user: null
}

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        updateCurrentPosition(state, action) {
            state.currentPosition = action.payload
        },
        setData(state, action) {
            state.data = action.payload
        },
        setActiveLog(state, action) {
            state.activeLog = action.payload
        },
        updateTripTitle(state, action) {
            const id = action.payload.id
            const title = action.payload.title

            state.data.map(log => {
                if (log._id === id) {
                    log.title = title
                }
                return log
            })
        },
        deleteLog(state, action) {
            const id = action.payload
            state.data = state.data.filter(log => log._id !== id)
        }
    }
})

export const mapReducer = mapSlice.reducer
export const { updateCurrentPosition, setData, setActiveLog, updateTripTitle, deleteLog } = mapSlice.actions
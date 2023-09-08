import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    // mapProvider: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
    mapProvider: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    theme: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        setMapProvider(state, action) {
            state.mapProvider = action.payload
        },
        setTheme(state, action) {
            state.theme = action.payload
        }
    }
})

export const { setUser, setMapProvider, setTheme } = userSlice.actions
export const userReducer = userSlice.reducer
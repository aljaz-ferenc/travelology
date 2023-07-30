import { configureStore } from '@reduxjs/toolkit'
import { mapReducer } from './mapSlice'
import { userReducer } from './userSlice'

const store = configureStore({
    reducer: {
        map: mapReducer,
        user: userReducer
    }
})

export default store
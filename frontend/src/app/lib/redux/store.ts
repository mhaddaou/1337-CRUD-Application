import { configureStore } from '@reduxjs/toolkit'
import  UserSlice  from './features/user/userSLice'

export const store = configureStore({
  reducer: {
    user : UserSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
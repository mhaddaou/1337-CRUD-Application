import { configureStore } from '@reduxjs/toolkit'
import  UserSlice  from './features/user/userSLice'
import contactsSlice from './features/contacts/contactsSlice'
export const store = configureStore({
  reducer: {
    user : UserSlice,
    contacts: contactsSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
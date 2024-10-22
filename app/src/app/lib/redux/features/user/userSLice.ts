import { User } from "@/app/lib/interfaces/User.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
  id: "",
  firstname: "",
  lastname: "",
  email: "",
  logged: false,
};

export const UserSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<User>) {
      state.email = action.payload.email;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.id = action.payload.id;
      state.logged = true;
      localStorage.setItem("id", action.payload.id);
      localStorage.setItem("logged", String(state.logged));
    },
    logout(state) {
      (state.firstname = ""), (state.lastname = ""), (state.email = "");
      state.id = "";
      state.logged = false;
      localStorage.removeItem("id");
      localStorage.setItem("logged", String(state.logged));
    },
  },
});

export default UserSlice.reducer;
export const { updateUser, logout } = UserSlice.actions;

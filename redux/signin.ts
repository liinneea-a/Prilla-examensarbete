import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: "",
  id: "",
  email: "",
};

const userSignInSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      console.log("setActiveUser action : ", action.payload.currentUser);
      state.displayName = action.payload.currentUser.displayName;
      state.id = action.payload.currentUser.uid;
      state.email = action.payload.currentUser.email;
      console.log("state: ", state);
    },
    setSignOutState: (state) => {
      state = { displayName: "", id: "", email: "" };
    },
  },
});

export const { setActiveUser, setSignOutState } = userSignInSlice.actions;

export const currentReduxUser = (state: any) => state.user;

export default userSignInSlice.reducer;

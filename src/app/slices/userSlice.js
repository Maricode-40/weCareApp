import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    decodificado: {
      userRole: "",
      name: "",
      email: "",
      id: "",
    },
  },
  // receive a state and an action and return a new state
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    logout: (state, action) => {
      return {
        token: "",
        decodificado: {
          name: "",
          email: "",
          id: "",
        },
      };
    },
  },
});

// export the actions that we will access through useDispatch to write to the storage
export const { login, logout } = userSlice.actions;

// we define and export the methods that will allow us to come to the storage to read information
export const getUserData = (state) => state.user;
// método que nos dice si el usuario logeado es admin o no para uso en rutas de admins
export const amIAdmin = (state) =>
  state.user.decodificado.userRole === "superadmin";

export default userSlice.reducer;

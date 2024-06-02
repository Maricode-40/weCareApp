import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    decodificado: {
      userRole: "",
      firstName: "",
      email: "",
      id: "",
    },
    vecesLogeado: 10,
  },
  // receive a state and an action and return a new state
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        ...action.payload,
        vecesLogeado: state.vecesLogeado + 1,
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
        vecesLogeado: state.vecesLogeado,
      };
    },
    resetCount: (state, action) => {
      return {
        ...state,
        vecesLogeado: 0,
      };
    },
  },
});

// export the actions that we will access through useDispatch to write to the storage
export const { login, logout } = userSlice.actions;

// we define and export the methods that will allow us to come to the storage to read information
export const getUserData = (state) => state.user;
export const getLoggedAmount = (state) => state.user.vecesLogeado;
// método que nos dice si el usuario logeado es admin o no para uso en rutas de admins
export const amIAdmin = (state) =>
  state.user.decodificado.userRole === "superadmin";

export default userSlice.reducer;

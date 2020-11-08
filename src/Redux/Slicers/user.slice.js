import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import {
  signOut as signOutUtility,
  setToken,
  getToken,
} from "../Utils/auth.utils";

const initialState = "";

export const signIn = createAsyncThunk("user/signIn", async (data) => {
  try {
    console.log("data", data);
    const blob = await api.auth.signin(data).then((res) => res.data);
    console.log("blob", blob);
    setToken(blob.tokenString);
    return blob.tokenString;
  } catch (err) {
    console.log(err.response.statusText);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadFromLocaleStorage() {
      const payload = getToken();
      return payload;
    },
    signOut() {
      api.auth.signout();
      signOutUtility();
      return "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      return payload;
    });
  },
});

export const { loadFromLocaleStorage, signOut } = userSlice.actions;
export default userSlice.reducer;

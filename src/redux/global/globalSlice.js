import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalAddOpen: false,
  isModalEditOpen: false,
  isModalImageOpen: false,
  isImage: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleModalAddOpen: (state, action) => {
      state.isModalAddOpen = action.payload;
    },
    toggleModalEditOpen: (state, action) => {
      state.isModalEditOpen = action.payload;
    },
    toggleModalImageOpen: (state, action) => {
      state.isModalImageOpen = action.payload;
    },
    setImage: (state, action) => {
      state.isImage = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  toggleModalAddOpen,
  toggleModalEditOpen,
  toggleModalImageOpen,
  setImage,
} = globalSlice.actions;

export default globalSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface updateState {
  baseinfoUpdate: boolean;
}

const initialState: updateState = {
  baseinfoUpdate: true,
};

const baseinfoUpdateSlice = createSlice({
  name: "baseinfo",
  initialState,
  reducers: {
    updatebaseinfo: (state) => {
      state.baseinfoUpdate = !state.baseinfoUpdate;
    },
  },
});

export const { updatebaseinfo } = baseinfoUpdateSlice.actions;

export default baseinfoUpdateSlice.reducer;

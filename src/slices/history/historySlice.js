import {createSlice} from '@reduxjs/toolkit';

export const historySlice = createSlice({
  name: 'history',
  initialState: [],
  reducers: {
    addHistoryItem: (state, action) => {
      state = state.push(action.payload);
    },
    removeHistoryItem: (state, action) => {
      // Immutable
      //state.splice(
      //  state.findIndex(arrow => arrow.id === action.payload),
      //  1,
      //);

      // Mutable
      state = state.filter(item => item.date !== action.payload);
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addHistoryItem, removeHistoryItem} = historySlice.actions;

export default historySlice.reducer;

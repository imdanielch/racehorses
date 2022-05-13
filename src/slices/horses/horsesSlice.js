import {createSlice} from '@reduxjs/toolkit';

export const horsesSlice = createSlice({
  name: 'horses',
  initialState: [
    {
      id: 0,
      name: 'Lucky',
      multiplier: 2,
    },
    {
      id: 1,
      name: 'Scruffy',
      multiplier: 2,
    },
    {
      id: 2,
      name: 'Billy',
      multiplier: 2,
    },
    {
      id: 3,
      name: 'Bob',
      multiplier: 2,
    },
  ],
  reducers: {
    updateMultiplierByWinnerId: (state, action) => {
      state = state.map(horse => {
        if (horse.id === action.payload) {
          if (horse.multiplier > 2) {
            horse.multiplier = parseFloat((horse.multiplier - 0.1).toFixed(1));
          }
        } else {
          if (horse.multiplier < 5) {
            horse.multiplier = parseFloat((horse.multiplier + 0.1).toFixed(1));
          }
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateMultiplierByWinnerId} = horsesSlice.actions;

export default horsesSlice.reducer;

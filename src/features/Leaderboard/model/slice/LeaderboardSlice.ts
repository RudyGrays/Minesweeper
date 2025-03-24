import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Leader, LeaderboardSchema } from "../types/LeaderboardTypes";

const initialState: LeaderboardSchema = {
  leaders: [],
  maxLeadersLength: 10,
};

export const LeaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    addLeader: (state, action: PayloadAction<Leader>) => {
      state.leaders = [...state.leaders, action.payload]
        .sort((a, b) => a.statistics.time - b.statistics.time)
        .slice(0, state.maxLeadersLength);
    },
  },
});

export const { actions: LeaderboardActions, reducer: LeaderboardReducer } =
  LeaderboardSlice;

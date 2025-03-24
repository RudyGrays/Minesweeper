import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { StateSchema } from "../types/Schema";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { gameReducer } from "@/features/Game/model/slice/GameSlice";
import storage from "redux-persist/lib/storage";
import { LeaderboardReducer } from "@/features/Leaderboard/model/slice/LeaderboardSlice";

const rootReducer = combineReducers({
  game: gameReducer,
  leaderboard: LeaderboardReducer,
});

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export type rootState = StateSchema;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<rootState> = useSelector;

import { StateSchema } from "@/app/providers/StoreProvider/model/types/Schema";
import { createSelector } from "@reduxjs/toolkit";

const gameSelectors = {
  getGameMode: (state: StateSchema) => state.game.mode,
  getGameBombChance: (state: StateSchema) => state.game.bombChance,
  getGameStatus: (state: StateSchema) => state.game.status,
  getFlagsCount: (state: StateSchema) => state.game.flagsCount,
  getBombsCount: (state: StateSchema) => state.game.bombsCount,
  getCells: (state: StateSchema) => state.game.cells,
  getVisibleMode: (state: StateSchema) => state.game.visibleMode,
  getColsCount: (state: StateSchema) => state.game.colsCount,
  getTime: (state: StateSchema) => state.game.time,
  getScore: createSelector(
    [
      (state: StateSchema) => state.game.bombsCount,
      (state: StateSchema) => state.game.flagsCount,
    ],
    (bombs, flags) => bombs - flags
  ),
};

export { gameSelectors };

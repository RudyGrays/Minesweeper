import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GameComplexityEnum,
  GameConfigSchema,
  GameStatus,
} from "../types/GameTypes";
import { getCellsSkeletons } from "../helpers/getCellsSkeletons";
import { fillCells } from "../helpers/fillCells";
import { updateCells } from "../helpers/updateCells";
import { openCellRecursively } from "../helpers/openCell";

type TGameComplexity = Record<
  Partial<GameComplexityEnum>,
  { columns: number; rows: number }
>;
export const GameComplexity: TGameComplexity = {
  EASY: {
    columns: 8,
    rows: 8,
  },
  MEDIUM: {
    columns: 16,
    rows: 16,
  },
  HARD: {
    columns: 16,
    rows: 32,
  },
};

export function getComplexityNumber(complexity: GameComplexityEnum) {
  return GameComplexity[complexity].columns * GameComplexity[complexity].rows;
}

const initialState: GameConfigSchema = {
  cells: getCellsSkeletons(
    GameComplexity[GameComplexityEnum.EASY].columns,
    getComplexityNumber(GameComplexityEnum.EASY)
  ),
  time: 0,
  openedCells: 0,
  colsCount: GameComplexity[GameComplexityEnum.EASY].columns,
  flagsCount: 0,
  bombsCount: 0,
  visibleMode: false,
  status: GameStatus.WAITING,
  bombChance: 0.1,
  mode: GameComplexityEnum.EASY,
};

export const GameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    _init: (state, action: PayloadAction<number>) => {
      if (state.status !== GameStatus.WAITING) return state;
      const cells = fillCells(
        getComplexityNumber(state.mode),
        state.bombChance,
        action.payload,
        GameComplexity[state.mode].columns
      );
      state.openedCells++;
      state.cells = cells;

      state.bombsCount = cells.reduce((count, cell) => {
        if (cell.isBomb) {
          return count + 1;
        }
        return count;
      }, 0);
      const cell = state.cells[action.payload - 1];
      state.cells[action.payload - 1] = state.cells[action.payload - 1] = {
        ...cell,
        isOpened: true,
      };
      state.status = GameStatus.STARTED;
    },
    setIsVisible: (state) => {
      state.visibleMode = !state.visibleMode;
    },
    gameReset: (state) => {
      state.cells = getCellsSkeletons(
        state.colsCount,
        getComplexityNumber(state.mode)
      );
      state.time = 0;
      state.status = GameStatus.WAITING;
      state.bombsCount = 0;
      state.flagsCount = 0;
      state.openedCells = 0;
      state.visibleMode = false;
    },
    setMode: (state, action: PayloadAction<GameComplexityEnum>) => {
      state.mode = action.payload;
      state.colsCount = GameComplexity[action.payload].columns;
      state.cells = getCellsSkeletons(
        GameComplexity[action.payload].columns,
        getComplexityNumber(action.payload)
      );
      state.time = 0;
      state.bombsCount = 0;
      state.flagsCount = 0;
      state.openedCells = 0;
      state.status = GameStatus.WAITING;
      state.visibleMode = false;
    },
    setBombChance: (state, action: PayloadAction<number>) => {
      state.bombChance = action.payload;
    },
    updateCells: (state) => {
      state.cells = updateCells(
        state.cells,
        state.colsCount,
        state.visibleMode
      );
    },

    setColumnsCount: (state, action) => {
      state.colsCount = action.payload;
    },
    openCell: (state, action: PayloadAction<number>) => {
      const cell = state.cells[action.payload - 1];

      if (cell.isBomb) {
        state.status = GameStatus.LOSE;
        state.cells = getCellsSkeletons(
          state.colsCount,
          getComplexityNumber(state.mode)
        );
        return;
      }

      if (cell.isOpened) return;

      const cells = [...state.cells];

      const openedCells = openCellRecursively(cells, cell.id);

      state.openedCells += openedCells;

      state.cells = cells;

      if (
        (state.openedCells === getComplexityNumber(state.mode) &&
          state.bombsCount - state.flagsCount === 0) ||
        state.openedCells === getComplexityNumber(state.mode) - state.bombsCount
      ) {
        state.status = GameStatus.WIN;
      }
    },
    setTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
    },
    setFlag: (state, action: PayloadAction<number>) => {
      const cell = state.cells[action.payload - 1];
      if (cell.isFlag) {
        state.cells[action.payload - 1] = { ...cell, isFlag: false };
        state.flagsCount--;
        state.openedCells--;
        return;
      }
      state.cells[action.payload - 1] = { ...cell, isFlag: true };
      state.flagsCount++;
      state.openedCells++;

      if (
        (state.openedCells === getComplexityNumber(state.mode) &&
          state.bombsCount - state.flagsCount === 0) ||
        state.openedCells === getComplexityNumber(state.mode) - state.bombsCount
      ) {
        state.status = GameStatus.WIN;
      }
    },
  },
});

export const { reducer: gameReducer, actions: gameActions } = GameSlice;

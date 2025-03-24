import { ICell } from "@/entities/Cell/model/types/Cell";

export const enum GameStatus {
  STARTED = "STARTED",
  LOSE = "LOSE",
  WIN = "WIN",
  PAUSE = "PAUSE",
  WAITING = "WAITING",
}

export enum GameComplexityEnum {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}
export interface GameConfigSchema {
  time: number;
  openedCells: number;
  colsCount: number;
  status: GameStatus;
  cells: ICell[];
  flagsCount: number;
  bombChance: number;
  mode: GameComplexityEnum;
  bombsCount: number;
  visibleMode: boolean;
}

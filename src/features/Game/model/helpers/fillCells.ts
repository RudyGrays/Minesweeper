import { ICell } from "@/entities/Cell/model/types/Cell";
import { getChance } from "@/shared/lib/utils";

export function fillCells(
  cellsCount: number,
  bombChance: number,
  emptyCellId: number,
  columnsCount: number
) {
  const mappa: Record<number, number> = {};

  const cellsInitArray = new Array(cellsCount).fill(null).map((_, idx) => {
    const id = idx + 1;
    mappa[id] = id;
    return {
      id: id,
      isBomb: id !== emptyCellId ? getChance(bombChance) : false,
    };
  });
  const cellsWithoutExternalBombs = cellsInitArray.map((cell) => {
    const top = mappa[cell.id - columnsCount];
    const bottom = mappa[cell.id + columnsCount];
    const left =
      mappa[cell.id - 1] && (cell.id - 1) % columnsCount == 0
        ? undefined
        : cell.id - 1;

    const right =
      mappa[cell.id + 1] && cell.id % columnsCount == 0
        ? undefined
        : cell.id + 1;

    const leftBottom =
      mappa[cell.id + columnsCount - 1] && (cell.id - 1) % columnsCount == 0
        ? undefined
        : cell.id + columnsCount - 1;

    const leftTop =
      mappa[cell.id - columnsCount - 1] && (cell.id - 1) % columnsCount == 0
        ? undefined
        : cell.id - columnsCount - 1;

    const rightBottom =
      mappa[cell.id + columnsCount + 1] && cell.id % columnsCount == 0
        ? undefined
        : cell.id + columnsCount + 1;

    const rightTop =
      mappa[cell.id - columnsCount + 1] && cell.id % columnsCount == 0
        ? undefined
        : cell.id - columnsCount + 1;

    return {
      isBomb: cell.isBomb,
      isVisibleBombMode: false,
      isFlag: false,
      isOpened: false,
      size: {
        cellCountX: columnsCount,
        cellCountY: columnsCount,
      },
      externalBombs: 10,
      id: cell.id,
      externalCells: {
        top,
        bottom,
        left,
        right,
        leftBottom,
        leftTop,
        rightBottom,
        rightTop,
      },
    } as ICell;
  });

  const cells = cellsWithoutExternalBombs.map((cell) => {
    cell.externalBombs = Object.entries(cell.externalCells).reduce(
      (bombs, [_, id]) => {
        const cell = cellsWithoutExternalBombs.find((cell) => cell.id === id);
        if (cell && cell.isBomb) {
          return bombs + 1;
        }
        return bombs;
      },
      0
    );
    return cell;
  });
  return cells;
}

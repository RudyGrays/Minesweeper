import { ICell } from "@/entities/Cell/model/types/Cell";

export function updateCells(
  cellsInitArray: ICell[],
  columnsCount: number,
  isVisibleBombMode: boolean
) {
  const mappa: Record<number, number> = {};
  cellsInitArray.forEach((cell) => (mappa[cell.id] = cell.id));

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
      isVisibleBombMode,
      isFlag: cell.isFlag,
      isOpened: cell.isOpened,
      size: {
        cellCountX: columnsCount,
        cellCountY: Math.sqrt(cellsInitArray.length),
      },
      externalBombs: cell.externalBombs,
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

import { ICell } from "@/entities/Cell/model/types/Cell";

export function openCellRecursively(
  cells: ICell[],
  cellId: number,
  openedCells: number = 0
) {
  const currentCell = cells.find((cell) => cell.id === cellId);

  if (!currentCell || currentCell.isOpened) {
    return openedCells;
  }

  currentCell.isOpened = true;
  openedCells += 1;
  if (currentCell.externalBombs > 0) {
    return openedCells;
  }

  const { externalCells } = currentCell;
  const neighborIds = Object.values(externalCells).filter(
    (id) => id !== undefined
  ) as number[];

  for (const neighborId of neighborIds) {
    openedCells = openCellRecursively(cells, neighborId, openedCells);
  }

  return openedCells;
}

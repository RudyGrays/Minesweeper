import { ICell } from "@/entities/Cell/model/types/Cell";

export function getCellsSkeletons(columnsCount: number, cellsCount: number) {
  return new Array(cellsCount).fill(null).map((_, idx) => ({
    id: idx + 1,
    size: {
      cellCountX: columnsCount,
      cellCountY: columnsCount,
    },
  })) as ICell[];
}

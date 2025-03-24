export interface ICell {
  id: number;
  size: {
    cellCountY: number;
    cellCountX: number;
  };
  isBomb: boolean;
  isOpened: boolean;
  isFlag: boolean;
  externalBombs: number;
  externalCells: {
    right: number | undefined;
    left: number | undefined;
    top: number | undefined;
    bottom: number | undefined;
    rightTop: number | undefined;
    rightBottom: number | undefined;
    leftTop: number | undefined;
    leftBottom: number | undefined;
  };
}

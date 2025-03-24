import { FC } from "react";
import { cn } from "@/shared/lib/utils.ts";
import { Bomb, Flag } from "lucide-react";
import { ICell } from "../model/types/Cell";
import { Button } from "@/shared/ui/button";
import openSound from "@/shared/assets/audio/openCell.mp3";
import flagSound from "@/shared/assets/audio/setFlag.mp3";
interface CellProps {
  className?: string;
  cell: ICell;
  visibleMode: boolean;
  onLeftClick: (id: number) => void;
  onRightClick: (id: number, cell: ICell) => void;
}

const Cell: FC<CellProps> = ({
  className,
  cell,
  visibleMode,
  onLeftClick,
  onRightClick,
}) => {
  const {
    isBomb,
    externalBombs,
    isOpened,
    isFlag,
    size: { cellCountX, cellCountY },
  } = cell;

  const openCellSound = () => {
    const audio = new Audio(openSound);
    audio.volume = 0.3;
    audio.play();
  };
  const setFlagSound = () => {
    const audio = new Audio(flagSound);
    audio.volume = 0.3;
    audio.play();
  };

  const setFlag = (cell: ICell) => {
    onRightClick(cell.id, cell);
    if (cell.isOpened) return;
    setFlagSound();
  };

  const openCell = (cell: ICell) => {
    if (!cell.isOpened && !cell.isBomb && !cell.isFlag) {
      openCellSound();
    }
    if (cell.isFlag) return;
    onLeftClick(cell.id);
  };
  return (
    <Button
      variant={"ghost"}
      onClick={() => openCell(cell)}
      onContextMenu={(e) => {
        e.preventDefault();
        setFlag(cell);
      }}
      style={{
        width: `calc(100% / ${cellCountX})`,
        height: `calc(100% / ${cellCountY})`,
      }}
      className={cn(
        `border box-border min-w-10 min-h-10 flex cursor-pointer relative hover:bg-accent items-center justify-center ${
          isOpened && !isFlag ? " bg-accent " : ""
        }`,
        {
          ["text-blue-500"]: externalBombs === 1 && !isBomb && !isFlag,
          ["text-green-500"]: externalBombs === 2 && !isBomb && !isFlag,
          ["text-red-500"]: externalBombs === 3 && !isBomb && !isFlag,
          ["text-blue-700"]: externalBombs === 4 && !isBomb && !isFlag,
          ["text-amber-500"]: externalBombs === 5 && !isBomb && !isFlag,
          ["text-teal-500"]: externalBombs === 6 && !isBomb && !isFlag,
          ["text-black"]: externalBombs === 7 && !isBomb && !isFlag,
          ["text-white"]: externalBombs === 8 && !isBomb && !isFlag,
        },
        [className]
      )}
    >
      {isBomb && visibleMode && !isFlag && <Bomb />}
      {(!isBomb && isOpened && externalBombs != 0 && externalBombs) ||
        (visibleMode && !isBomb && !isFlag && externalBombs)}

      {isFlag && <Flag />}
    </Button>
  );
};

export { Cell };

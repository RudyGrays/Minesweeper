import { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { GameField } from "@/features/Game/ui/GameField";

interface GameProps {
  className?: string;
}

const Game: FC<GameProps> = ({ className }) => {
  return (
    <div
      className={cn("w-full h-full flex items-center justify-center", [
        className,
      ])}
    >
      <GameField />
    </div>
  );
};

export { Game };

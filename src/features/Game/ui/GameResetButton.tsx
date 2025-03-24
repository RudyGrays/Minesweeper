import { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { useAppDispatch } from "@/app/providers/StoreProvider/model/config/Store";

import { gameActions } from "../model/slice/GameSlice";
import { RotateCcw } from "lucide-react";

interface GameResetButtonProps {
  className?: string;
  text?: string;
}

const GameResetButton: FC<GameResetButtonProps> = ({
  className,
  text = "Restart",
}) => {
  const dispatch = useAppDispatch();

  return (
    <RotateCcw
      onClick={() => dispatch(gameActions.gameReset())}
      className={cn(
        "cursor-pointer hover:rotate-z-[-180deg] duration-500 transition h-5",
        [className]
      )}
    />
  );
};

export { GameResetButton };

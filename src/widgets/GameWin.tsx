import { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { GameResetButton } from "@/features/Game/ui/GameResetButton";

import { SaveStatisticsModal } from "./SaveStatisticsModal";

interface GameWinProps {
  className?: string;
}

const GameWin: FC<GameWinProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "h-full w-full flex items-center flex-col gap-3 justify-center",
        [className]
      )}
    >
      <div translate="no">Win</div>
      <SaveStatisticsModal />
      <GameResetButton />
    </div>
  );
};

export { GameWin };

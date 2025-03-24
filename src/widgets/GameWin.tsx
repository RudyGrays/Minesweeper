import { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { GameResetButton } from "@/features/Game/ui/GameResetButton";
import { useAppSelector } from "@/app/providers/StoreProvider/model/config/Store";
import { gameSelectors } from "@/features/Game/model/selectors/selectors";
import { SaveStatisticsModal } from "./SaveStatisticsModal";

interface GameWinProps {
  className?: string;
}

const GameWin: FC<GameWinProps> = ({ className }) => {
  const time = useAppSelector(gameSelectors.getTime);

  return (
    <div
      className={cn(
        "h-full w-full flex items-center flex-col gap-3 justify-center",
        [className]
      )}
    >
      Win
      <SaveStatisticsModal />
      <GameResetButton />
    </div>
  );
};

export { GameWin };

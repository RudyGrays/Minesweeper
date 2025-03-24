import { FC, useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { GameResetButton } from "@/features/Game/ui/GameResetButton";
import wastedAudio from "@/shared/assets/audio/wasted.mp3";
interface GameLoseProps {
  className?: string;
}

const GameLose: FC<GameLoseProps> = ({ className }) => {
  const audio = new Audio(wastedAudio);
  audio.volume = 0.06;
  useEffect(() => {
    audio.play();
  }, []);
  return (
    <div
      className={cn(
        "w-full h-full flex flex-col gap-3 items-center justify-center",
        [className]
      )}
    >
      <div>Lose</div>
      <GameResetButton text={"Restart"} />
    </div>
  );
};

export { GameLose };

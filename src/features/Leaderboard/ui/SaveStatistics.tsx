import { FC, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/ui/input";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/providers/StoreProvider/model/config/Store";
import { gameSelectors } from "@/features/Game/model/selectors/selectors";
import { Button } from "@/shared/ui/button";
import { Leader } from "../model/types/LeaderboardTypes";
import { nanoid } from "@reduxjs/toolkit";
import { LeaderboardActions } from "../model/slice/LeaderboardSlice";
import { gameActions } from "@/features/Game/model/slice/GameSlice";

interface SaveStatisticsProps {
  className?: string;
  onSaveHandler: () => void;
}

const SaveStatistics: FC<SaveStatisticsProps> = ({
  className,
  onSaveHandler,
}) => {
  const [username, setUsername] = useState("");
  const gameMode = useAppSelector(gameSelectors.getGameMode);
  const time = useAppSelector(gameSelectors.getTime);
  const dispatch = useAppDispatch();

  const saveStatsHandler = () => {
    const user: Leader = {
      id: nanoid(),
      statistics: {
        mode: gameMode,
        time,
      },
      username,
    };
    dispatch(LeaderboardActions.addLeader(user));
    dispatch(gameActions.gameReset());
    onSaveHandler();
  };
  return (
    <div className={cn("flex flex-col gap-4", [className])}>
      <Input
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        placeholder="Username"
      />
      <Button onClick={saveStatsHandler}>Save</Button>
    </div>
  );
};

export { SaveStatistics };

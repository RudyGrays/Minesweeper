import { useAppSelector } from "@/app/providers/StoreProvider/model/config/Store";
import { gameSelectors } from "@/features/Game/model/selectors/selectors";
import { GameStatus } from "@/features/Game/model/types/GameTypes";
import { GameChanceInput } from "@/features/Game/ui/GameChanceInput";
import { GameModeSelect } from "@/features/Game/ui/GameModeSelect";
import { GameResetButton } from "@/features/Game/ui/GameResetButton";
import { VisibleModeSwitcher } from "@/features/Game/ui/VisibleModeSwitcher";
import useTimer from "@/shared/hooks/useTimer";
import { useWindowWidth } from "@/shared/hooks/useWindowWidth";
import { NavLink, useLocation } from "react-router";

import { Label } from "@/shared/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Bomb, Crown, Joystick, Settings } from "lucide-react";

import {
  RoutePaths,
  Routes,
} from "@/app/providers/RouterProvider/model/config/RouterConfig";
import { ModeToggle } from "./ThemeSwitcher";

export const Header = () => {
  const score = useAppSelector(gameSelectors.getScore);
  const gameStatus = useAppSelector(gameSelectors.getGameStatus);
  const time = useAppSelector(gameSelectors.getTime);
  const { formatTime } = useTimer();
  const windowWidth = useWindowWidth();
  const location = useLocation();

  const isGamePath = location.pathname === RoutePaths.GAME;
  const isLeaderboardPath = location.pathname === RoutePaths.LEADERBOARD;

  return (
    <header className="w-full max-w-[1400px] px-3 mx-auto border h-[70px] flex gap-4 items-center justify-between">
      {windowWidth > 350 ? (
        <span translate="no">Minesweeper</span>
      ) : (
        <Bomb className="h-9" />
      )}

      {windowWidth > 800
        ? isGamePath && (
            <div className="flex gap-4 items-center flex-row-reverse justify-start h-full">
              {gameStatus === GameStatus.STARTED && <VisibleModeSwitcher />}

              <GameModeSelect />
              <GameChanceInput />
              <GameResetButton />
              <Label>
                <span translate="no">Time:{` `}</span>
                <span translate="no">{formatTime(time)}</span>
              </Label>

              <div translate="no">Score: {score}</div>
            </div>
          )
        : isGamePath && (
            <div className="w-full flex h-full gap-3 justify-end items-center">
              <div className="text-sm" translate="no">
                Score: {score}
              </div>
              <Label className="text-sm">
                <span translate="no">Time:{` `}</span>
                <span translate="no">{formatTime(time)}</span>
              </Label>

              <GameResetButton />
              <Popover>
                <PopoverTrigger asChild>
                  <Settings className="h-6 cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="w-full flex gap-3 flex-col">
                  <div className="flex w-full justify-between  gap-3 items-center">
                    <span translate="no">Mode</span>
                    <GameModeSelect haveText={false} />
                  </div>
                  <div className="flex w-full  justify-between gap-3 items-center">
                    <span translate="no">Chance</span>
                    <GameChanceInput haveText={false} />
                  </div>
                  {gameStatus === GameStatus.STARTED && (
                    <div className="flex w-full  justify-between gap-3 items-center">
                      <span translate="no">VisibleBombs</span>
                      <VisibleModeSwitcher />
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          )}
      <div className="flex gap-3 h-full items-center">
        {isGamePath && (
          <NavLink translate="no" to={RoutePaths[Routes.LEADERBOARD]}>
            <Crown />
          </NavLink>
        )}
        {isLeaderboardPath && (
          <NavLink translate="no" to={RoutePaths[Routes.GAME]}>
            <Joystick />
          </NavLink>
        )}
        <ModeToggle />
      </div>
    </header>
  );
};

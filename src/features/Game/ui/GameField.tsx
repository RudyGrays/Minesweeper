import {
  useAppDispatch,
  useAppSelector,
} from "@/app/providers/StoreProvider/model/config/Store";
import { Cell } from "@/entities/Cell/ui/Cell";
import { gameSelectors } from "../model/selectors/selectors";

import { gameActions } from "../model/slice/GameSlice";
import { GameStatus } from "../model/types/GameTypes";

import { GameLose } from "@/widgets/GameLose";
import { GameWin } from "@/widgets/GameWin";
import { ICell } from "@/entities/Cell/model/types/Cell";
import useTimer from "@/shared/hooks/useTimer";
import { useEffect, useLayoutEffect } from "react";

export const GameField = () => {
  const cells = useAppSelector(gameSelectors.getCells);
  const status = useAppSelector(gameSelectors.getGameStatus);

  const { start, stop, time, reset } = useTimer();
  const visibleMode = useAppSelector(gameSelectors.getVisibleMode);
  const columnsCount = useAppSelector(gameSelectors.getColsCount);
  const dispatch = useAppDispatch();
  const initGame = (id: number) => dispatch(gameActions._init(id));
  const openCell = (id: number) => dispatch(gameActions.openCell(id));
  const setFlag = (id: number) => dispatch(gameActions.setFlag(id));

  const handleLeftClick = (id: number) => {
    if (status === GameStatus.PAUSE) return;
    if (status === GameStatus.STARTED) return openCell(id);
    if (status === GameStatus.WAITING) return initGame(id);
  };

  const handleRightClick = (id: number, cell: ICell) => {
    if (status === GameStatus.PAUSE) return;
    if (status === GameStatus.STARTED && !cell.isOpened) return setFlag(id);
    if (status === GameStatus.WAITING) return initGame(id);
  };

  useLayoutEffect(() => {
    dispatch(gameActions.gameReset());
  }, [dispatch]);

  useEffect(() => {
    dispatch(gameActions.setTime(time));
  }, [time, dispatch]);

  useEffect(() => {
    if (status === GameStatus.WAITING) return reset();
    if (status === GameStatus.LOSE) return stop();
    if (status === GameStatus.WIN) return stop();
    if (status !== GameStatus.STARTED) return;

    reset();
    start();
    return () => {
      stop();
    };
  }, [status]);

  if (status === GameStatus.LOSE) {
    return <GameLose />;
  }

  if (status === GameStatus.WIN) {
    return <GameWin />;
  }
  return (
    <div
      className={`w-full h-full overflow-y-auto border flex flex-wrap scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400`}
    >
      {cells.map((cell) => {
        return (
          <Cell
            onLeftClick={() => handleLeftClick(cell.id)}
            onRightClick={handleRightClick}
            cell={cell}
            key={cell.id}
            visibleMode={visibleMode}
          />
        );
      })}
    </div>
  );
};

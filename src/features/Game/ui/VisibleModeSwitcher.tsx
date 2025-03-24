import { FC } from "react";

import { Button } from "@/shared/ui/button";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/providers/StoreProvider/model/config/Store";
import { gameSelectors } from "../model/selectors/selectors";

import { Eye, EyeClosed } from "lucide-react";
import { gameActions } from "../model/slice/GameSlice";

interface VisibleModeSwitcherProps {
  className?: string;
}

const VisibleModeSwitcher: FC<VisibleModeSwitcherProps> = () => {
  const dispatch = useAppDispatch();

  const isVisible = useAppSelector(gameSelectors.getVisibleMode);

  const setCheckMode = () => {
    dispatch(gameActions.setIsVisible());
  };

  return (
    <Button variant={"ghost"} onClick={setCheckMode}>
      {isVisible ? <Eye /> : <EyeClosed />}
    </Button>
  );
};

export { VisibleModeSwitcher };

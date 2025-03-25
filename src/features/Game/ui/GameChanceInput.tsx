import { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useSelector } from "react-redux";
import { gameSelectors } from "../model/selectors/selectors";
import { useAppDispatch } from "@/app/providers/StoreProvider/model/config/Store";
import { gameActions } from "../model/slice/GameSlice";

interface GameChanceInputProps {
  className?: string;
  haveText?: boolean;
}

const GameChanceInput: FC<GameChanceInputProps> = ({
  className,
  haveText = true,
}) => {
  const chance = useSelector(gameSelectors.getGameBombChance);
  const dispatch = useAppDispatch();
  const changeChanceHandler = (value: number) => {
    dispatch(gameActions.setBombChance(value));
  };
  return (
    <Label>
      {haveText && "Chance"}
      <Input
        type="number"
        step={0.1}
        min={0.1}
        max={1}
        className={cn("", [className])}
        onChange={(e) => changeChanceHandler(+e.target.value)}
        value={chance}
      />
    </Label>
  );
};

export { GameChanceInput };

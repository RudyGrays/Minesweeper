import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import { GameComplexityEnum } from "../model/types/GameTypes";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/providers/StoreProvider/model/config/Store";
import { gameSelectors } from "../model/selectors/selectors";
import { gameActions } from "../model/slice/GameSlice";
import { Label } from "@/shared/ui/label";

const GameModeSelect = ({ haveText = true }: { haveText?: boolean }) => {
  const dispatch = useAppDispatch();
  const complexity = useAppSelector(gameSelectors.getGameMode);

  const handleSelect = (value: GameComplexityEnum) => {
    dispatch(gameActions.setMode(value));
  };

  return (
    <Label>
      {haveText && <span translate="no">Mode</span>}
      <Select
        onValueChange={(value: GameComplexityEnum) => handleSelect(value)}
        value={complexity}
      >
        <SelectTrigger>
          <SelectValue translate="no" placeholder="Select a game complexity" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(GameComplexityEnum).map((complexity) => {
            return (
              <SelectItem translate="no" key={complexity} value={complexity}>
                {complexity}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </Label>
  );
};

export { GameModeSelect };

import { StateSchema } from "@/app/providers/StoreProvider/model/types/Schema";

export const LeaderBoardSelectors = {
  leaders: (state: StateSchema) => state.leaderboard.leaders,
  leadersLength: (state: StateSchema) => state.leaderboard.maxLeadersLength,
};

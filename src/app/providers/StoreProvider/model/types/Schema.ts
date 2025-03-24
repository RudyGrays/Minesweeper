import { GameConfigSchema } from "@/features/Game/model/types/GameTypes";
import { LeaderboardSchema } from "@/features/Leaderboard/model/types/LeaderboardTypes";

export interface StateSchema {
  game: GameConfigSchema;
  leaderboard: LeaderboardSchema;
}

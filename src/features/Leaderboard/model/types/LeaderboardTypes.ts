import { GameComplexityEnum } from "@/features/Game/model/types/GameTypes";

export interface GameStatistics {
  time: number;
  mode: GameComplexityEnum;
}

export interface Leader {
  id: string;
  username: string;
  statistics: GameStatistics;
}

export interface LeaderboardSchema {
  leaders: Leader[];
  maxLeadersLength: number;
}

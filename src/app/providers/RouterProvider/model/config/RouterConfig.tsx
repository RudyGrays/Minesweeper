import { Game } from "@/pages/Game";
import { Leaderboard } from "@/pages/Leaderboard";
import { Settings } from "@/pages/Settings";
import { Layout } from "@/widgets/Layout";

import { createBrowserRouter } from "react-router";

export const enum Routes {
  GAME = "GAME",
  SETTINGS = "SETTINGS",
  LEADERBOARD = "LEADERBOARD",
}

type TRoutePaths = Record<Routes, string>;
export const RoutePaths: TRoutePaths = {
  [Routes.GAME]: "/",
  [Routes.LEADERBOARD]: "/leaderboard",
  [Routes.SETTINGS]: "/settings",
};
export const RouterConfig = createBrowserRouter([
  {
    path: RoutePaths[Routes.GAME],
    element: <Layout />,
    children: [
      {
        path: RoutePaths[Routes.GAME],
        element: <Game />,
      },
      {
        path: RoutePaths[Routes.LEADERBOARD],
        element: <Leaderboard />,
      },
      {
        path: RoutePaths[Routes.SETTINGS],
        element: <Settings />,
      },
    ],
  },
]);

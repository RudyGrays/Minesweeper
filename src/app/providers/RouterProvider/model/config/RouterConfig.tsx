import { Game } from "@/pages/Game";
import { Leaderboard } from "@/pages/Leaderboard";

import { Layout } from "@/widgets/Layout";

import { createBrowserRouter } from "react-router";

export const enum Routes {
  GAME = "GAME",

  LEADERBOARD = "LEADERBOARD",
}

type TRoutePaths = Record<Routes, string>;
export const RoutePaths: TRoutePaths = {
  [Routes.GAME]: "/",
  [Routes.LEADERBOARD]: "/leaderboard",
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
    ],
  },
]);

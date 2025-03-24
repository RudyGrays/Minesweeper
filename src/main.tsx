import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { AppProvider } from "./widgets/AppProvider.tsx";
import { RouterProvider } from "react-router";
import { RouterConfig } from "./app/providers/RouterProvider/model/config/RouterConfig.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={RouterConfig} />
    </AppProvider>
  </StrictMode>
);

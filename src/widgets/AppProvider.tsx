import {
  persistor,
  store,
} from "@/app/providers/StoreProvider/model/config/Store";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

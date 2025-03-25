import {
  persistor,
  store,
} from "@/app/providers/StoreProvider/model/config/Store";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ErrorFallback } from "./ErrorFallback";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error: Error, info) => {
        const stack = info.componentStack || "No stack available";
        console.log("Error:", error.message, "\nStack:", stack);
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            {children}
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};

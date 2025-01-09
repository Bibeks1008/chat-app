import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import { BrowserRouter } from "react-router-dom";
import SocketContextProvider from "./context/SocketContext.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SocketContextProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </SocketContextProvider>
  </StrictMode>
);

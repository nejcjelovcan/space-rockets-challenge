import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import App from "./components/app";
import { initDB } from "react-indexed-db";
import { DBConfig } from "./utils/use-favorites";
import { FavoritesProvider } from "./utils/use-favorites";

initDB(DBConfig);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <FavoritesProvider>
          <CSSReset />
          <App />
        </FavoritesProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

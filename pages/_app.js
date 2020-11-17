import { CSSReset, theme } from "@chakra-ui/core";
import { ThemeProvider } from "emotion-theming";
import React from "react";
import { FavoritesProvider } from "../src/utils/use-favorites";

function App({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <FavoritesProvider>
          <CSSReset />
          <Component {...pageProps} />
        </FavoritesProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;

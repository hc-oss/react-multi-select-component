import { ThemeProvider } from "emotion-theming";
import React from "react";

import { defaultTheme } from "./lib/constants";

const DropdownThemeProvider = ({ children, theme = {} }) => (
  <ThemeProvider theme={{ ...defaultTheme, ...theme }}>
    {children}
  </ThemeProvider>
);

export default DropdownThemeProvider;

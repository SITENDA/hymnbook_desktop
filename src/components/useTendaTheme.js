//useTendaTheme.js
import { darkColor, lightColor } from "../util/initials";
import { useSelector } from "react-redux";
import { selectIsDarkTheme } from "../features/auth/authSlice";
import {createTheme} from "@mui/material";

// Custom hook for theme creation
export const useTendaTheme = () => {
  const isDarkTheme = useSelector(selectIsDarkTheme);
  const blackColor = "#000000";
  return createTheme({
    palette: {
      mode: isDarkTheme ? 'dark' : 'light',
      background: {
        paper: isDarkTheme ? darkColor : lightColor,
      },
      text: {
        primary: isDarkTheme ? lightColor : darkColor,
      },
    },
  });
};

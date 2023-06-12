import React, { createContext, useState } from 'react';
import {DefaultTheme} from "@react-navigation/native";

export const themes = {
    light: {
        dark: false,
        colors: {
            primary: 'rgb(0, 122, 255)',
            background: 'rgb(242, 242, 242)',
            card: 'rgb(255, 255, 255)',
            text: 'rgb(28, 28, 30)',
            border: 'rgb(216, 216, 216)',
            notification: 'rgb(255, 59, 48)',
        },
    },
    dark: {
        dark: true,
        colors: {
            primary: 'rgb(10, 132, 255)',
            background: 'rgb(1, 1, 1)',
            card: 'rgb(18, 18, 18)',
            text: 'rgb(229, 229, 231)',
            border: 'rgb(39, 39, 41)',
            notification: 'rgb(255, 69, 58)',
        }
    }
};


export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const setTheme = (isDark) => {
        setIsDarkMode(isDark);
    };

    const theme = {
        isDarkMode,
        setTheme,
    };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

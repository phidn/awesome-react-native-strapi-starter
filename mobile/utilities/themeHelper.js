import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper'
import { themeColors, themeFonts } from '@config/theme'

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  light: NavigationDefaultTheme,
  dark: NavigationDarkTheme,
})

export const getCombined = (label) => {
  const themeColor = themeColors.find(x => x.label === label) || themeColors[0]

  const combinedLightTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...LightTheme.colors,
      ...themeColor.value.light.colors,
    },
    fonts: themeFonts,
  }

  const combinedDarkTheme = {
    ...MD3DarkTheme,
    ...DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      ...DarkTheme.colors,
      ...themeColor.value.dark.colors,
    },
    fonts: themeFonts,
  }

  return { light: combinedLightTheme, dark: combinedDarkTheme }
}

export const getCombinedThemeMode = (label, isDarkMode) => {
  const { light, dark } = getCombined(label)
  return isDarkMode? dark: light
}

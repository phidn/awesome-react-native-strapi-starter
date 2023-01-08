import { StyleSheet, ScrollView, View } from 'react-native'
import React from 'react'
import { List, Avatar, useTheme } from 'react-native-paper'
import SchemeColor from '@components/SchemeColor/SchemeColor'
import { colorShade } from '@utilities/colorShade'
import { useDispatch, useSelector } from 'react-redux'
import { changeThemeColor } from '@store/slices/themeSlice'
import { themeColors } from '@config/theme'

const ThemeColorsSettingScreen = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const { isDarkTheme, themeColor } = useSelector((state) => state.theme)

  const renderListColor = (color) => {
    const sourceColor = color.source
    const lightColor = color.light.colors
    const darkColor = color.dark.colors

    const colors = isDarkTheme
      ? [
          sourceColor,
          darkColor.primary,
          darkColor.onPrimary,
          darkColor.primaryContainer,
          darkColor.onPrimaryContainer,
          darkColor.secondary,
          darkColor.onSecondary,
          darkColor.secondaryContainer,
          darkColor.onSecondaryContainer,
        ]
      : [
          sourceColor,
          lightColor.primary,
          lightColor.onPrimary,
          lightColor.primaryContainer,
          lightColor.onPrimaryContainer,
          lightColor.secondary,
          lightColor.onSecondary,
          lightColor.secondaryContainer,
          lightColor.onSecondaryContainer,
        ]

    return <SchemeColor colors={colors} gap={5} style={{ marginTop: 5 }} />
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {themeColors.map(({ label, value }) => (
          <List.Item
            onPress={() => dispatch(changeThemeColor(label))}
            key={label}
            title={label}
            description={() => renderListColor(value)}
            left={(props) => (
              <Avatar.Text
                {...props}
                size={40}
                style={{ backgroundColor: value.source, marginLeft: 10, marginTop: 5 }}
              />
            )}
            right={(props) =>
              label === themeColor ? (
                <List.Icon {...props} icon="check" />
              ) : (
                <List.Icon {...props} icon="check" style={styles.invisible} />
              )
            }
            style={[
              styles.listItem,
              {
                borderColor: theme.colors.onSurface,
                backgroundColor: isDarkTheme
                  ? colorShade(value.source, -70)
                  : colorShade(value.source, -30),
              },
            ]}
          />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  listItem: {
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 10,
  },
  invisible: {
    opacity: 0,
  },
})

export default ThemeColorsSettingScreen

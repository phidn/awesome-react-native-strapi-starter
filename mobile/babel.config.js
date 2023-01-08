module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@actions': './actions',
            '@assets': './assets',
            '@components': './components',
            '@config': './config',
            '@constants': './constants',
            '@navigation': './navigation',
            '@reducers': './reducers',
            '@screens': './screens',
            '@services': './services',
            '@store': './store',
            '@translations': './translations',
            '@utilities': './utilities',
          },
        },
      ],
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  }
}

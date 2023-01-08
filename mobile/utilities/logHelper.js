import { logger, consoleTransport } from 'react-native-logs'

const defaultConfig = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: 'debug',
  transport: consoleTransport,
  transportOptions: {
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
  },
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  enabled: true,
}

const log = logger.createLogger(defaultConfig)

const logHelper = (prefix, message, level = 'info') => {
  log[level](`>> ${prefix}:`, message)
}

export default logHelper

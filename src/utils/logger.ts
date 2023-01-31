import pino from 'pino'

const today = new Date()

const loggerProd = {
  level: 'info',
  transport: {
    target: 'pino/file',
    options: {
      destination: `logs/${today
        .toLocaleDateString('ja-JP')
        .replace(/\//g, '-')}.log`,
      mkdir: true,
    },
  },
}

const loggerDev = {
  level: 'debug',
  transport: {
    target: 'pino-pretty',
  },
}

const Logger = pino(
  process.env.NODE_ENV === 'development' ? loggerDev : loggerProd,
)

export default Logger

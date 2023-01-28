import pino from 'pino'

const today = new Date()

const LoggerProd = {
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

const LoggerDev = {
  level: 'debug',
  transport: {
    target: 'pino-pretty',
  },
}

export const logger = pino(
  process.env.NODE_ENV === 'development' ? LoggerDev : LoggerProd,
)

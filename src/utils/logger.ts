import pino, { Logger } from 'pino'

const today = new Date()

export const logger = pino({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  transport: {
    target: 'pino/file',
    options: {
      destination: `logs/${today
        .toLocaleDateString('ja-JP')
        .replace(/\//g, '-')}.log`,
      mkdir: true,
    },
    // target: 'pino-pretty',
  },
})

import { pino } from 'pino';
import pretty from 'pino-pretty';

const devStream = pretty({
  colorize: false,
  levelFirst: true,
  translateTime: 'yyyy-dd-mm, h:MM:ss TT',
  // destination: 'logs/app.log',
  append: false,
});

const stream = pretty({
  colorize: false,
  levelFirst: true,
  translateTime: 'yyyy-dd-mm, h:MM:ss TT',
  // destination: 'logs/app.log',
  append: true,
});

// TODO: make logger configurable
export const devFileLogger = pino({}, devStream);

export const logger = pino({}, stream);

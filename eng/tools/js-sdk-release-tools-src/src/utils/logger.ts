/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import winston from 'winston';

const pipeline = winston.format((info, opts) => {
  info.level = `[${info.level.toUpperCase()}]`;
  return info;
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.json(), pipeline()),
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { logger } from "./logger";

export function getTestcase(filename: string): string {
  logger.info(`getTestcase for Browser`);
  logger.info(`filename: ${filename}`);
  logger.info(`window: ${window}`);
  logger.info(`window[\"__json__\"]["${filename}"]: ${(window as any)["__json__"][filename]}`);
  const data: JSON = (window as any)["__json__"][filename];
  logger.info(`data: ${JSON.stringify(data)}`);
  return JSON.stringify(data);
}

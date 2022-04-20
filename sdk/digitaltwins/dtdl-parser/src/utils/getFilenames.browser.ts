// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { logger } from "./logger";

export const getFilenames = function(_testCaseFolder: string): string[] {
  logger.info(`getFilenames for Browser`);
  const filenames = Object.keys((globalThis as any)["__json__"]).filter((value, idx, array) => {
    return !value.startsWith("$");
  });
  logger.info(`filenames: ${filenames}`);
  return filenames;
};

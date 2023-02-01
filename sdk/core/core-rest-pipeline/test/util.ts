// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureLogger } from "@azure/logger";

export function makeTestLogger(): {
  logger: AzureLogger;
  params: { info: string[]; error: string[] };
} {
  const logParams: {
    info: string[];
    error: string[];
  } = {
    info: [],
    error: [],
  };

  const logger: AzureLogger = {
    info(...params) {
      logParams.info.push(params.join(" "));
    },
    error(...params) {
      logParams.error.push(params.join(" "));
    },
  } as AzureLogger;

  return {
    logger,
    params: logParams,
  };
}

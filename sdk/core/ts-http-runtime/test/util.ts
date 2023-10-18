// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TypeSpecRuntimeLogger } from "../src/logger/logger";

export function makeTestLogger(): {
  logger: TypeSpecRuntimeLogger;
  params: { info: string[]; error: string[] };
} {
  const logParams: {
    info: string[];
    error: string[];
  } = {
    info: [],
    error: [],
  };

  const logger: TypeSpecRuntimeLogger = {
    info(...params) {
      logParams.info.push(params.join(" "));
    },
    error(...params) {
      logParams.error.push(params.join(" "));
    },
  } as TypeSpecRuntimeLogger;

  return {
    logger,
    params: logParams,
  };
}

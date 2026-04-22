// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "vitest";
import type { TypeSpecRuntimeLogger } from "../src/index.js";

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

export function assertUint8ArraySame(
  actual: Uint8Array,
  expected: Uint8Array,
  message?: string,
): void {
  assert.sameOrderedMembers([...actual], [...expected], message);
}

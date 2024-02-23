// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "vitest";
import { TypeSpecRuntimeLogger } from "../src/logger/logger.js";
import { RequestBodyType } from "../src/interfaces.js";
import { isNodeReadableStream, isWebReadableStream } from "../src/util/typeGuards.js";

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

export async function assertBodyMatches(
  resettableActual: RequestBodyType | undefined,
  expected: Uint8Array,
): Promise<void> {
  if (!resettableActual) {
    assert.fail("Expected a request body");
  }

  const actual = typeof resettableActual === "function" ? resettableActual() : resettableActual;

  if (isWebReadableStream(actual)) {
    const actualBytes = new Uint8Array(await new Response(actual).arrayBuffer());
    assertUint8ArraySame(actualBytes, expected, "body does not match");
  } else if (isNodeReadableStream(actual)) {
    const buffers: Buffer[] = [];
    for await (const buffer of actual) {
      buffers.push(buffer as Buffer);
    }

    const actualBytes = new Uint8Array(Buffer.concat(buffers));
    assertUint8ArraySame(actualBytes, expected, "body does not match");
  } else {
    assert.fail(`Requst body of unexpected type: ${actual.toString()}`);
  }
}

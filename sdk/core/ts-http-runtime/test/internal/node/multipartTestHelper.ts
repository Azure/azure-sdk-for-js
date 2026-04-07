// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "vitest";
import type { RequestBodyType } from "../../../src/index.js";
import { isNodeReadableStream } from "../../../src/util/typeGuards.js";
import { assertUint8ArraySame } from "../../util.js";

export async function assertBodyMatches(
  resettableActual: RequestBodyType | undefined,
  expected: Uint8Array,
): Promise<void> {
  if (!resettableActual) {
    assert.fail("Expected a request body");
  }

  const actual = typeof resettableActual === "function" ? resettableActual() : resettableActual;

  if (isNodeReadableStream(actual)) {
    const chunks: Buffer[] = [];
    for await (const chunk of actual) {
      chunks.push(Buffer.from(chunk));
    }
    const actualBytes = new Uint8Array(Buffer.concat(chunks));
    assertUint8ArraySame(actualBytes, expected, "body does not match");
  } else if (actual instanceof Blob) {
    const actualBytes = new Uint8Array(await actual.arrayBuffer());
    assertUint8ArraySame(actualBytes, expected, "body does not match");
  } else {
    assert.fail(`Request body of unexpected type: ${actual.toString()}`);
  }
}

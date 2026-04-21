// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestBodyType } from "../src/interfaces.js";
import { assert } from "vitest";

function isAsyncIterable(value: unknown): value is AsyncIterable<Uint8Array> {
  return Symbol.asyncIterator in Object(value);
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

  let actualBytes: Uint8Array;
  if (actual instanceof Uint8Array) {
    actualBytes = actual;
  } else if (actual instanceof Blob) {
    actualBytes = new Uint8Array(await new Response(actual).arrayBuffer());
  } else if (isAsyncIterable(actual)) {
    // ReadableStream or NodeJS.ReadableStream — collect chunks via async iteration.
    const chunks: Uint8Array[] = [];
    for await (const chunk of actual) {
      chunks.push(chunk instanceof Uint8Array ? chunk : new TextEncoder().encode(String(chunk)));
    }
    const totalLength = chunks.reduce((sum, c) => sum + c.byteLength, 0);
    actualBytes = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      actualBytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
  } else {
    assert.fail(`Unexpected body type: ${typeof actual}`);
  }
  assertUint8ArraySame(actualBytes, expected, "body does not match");
}

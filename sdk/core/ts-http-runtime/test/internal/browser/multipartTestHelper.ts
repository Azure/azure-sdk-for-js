// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "vitest";
import type { RequestBodyType } from "../../../src/index.js";
import { assertUint8ArraySame } from "../../util.js";

export async function assertBodyMatches(
  resettableActual: RequestBodyType | undefined,
  expected: Uint8Array,
): Promise<void> {
  if (!resettableActual) {
    assert.fail("Expected a request body");
  }

  const actual = typeof resettableActual === "function" ? resettableActual() : resettableActual;

  if (actual instanceof Blob) {
    const actualBytes = new Uint8Array(await actual.arrayBuffer());
    assertUint8ArraySame(actualBytes, expected, "body does not match");
  } else {
    assert.fail(`Request body of unexpected type: ${actual.toString()}`);
  }
}

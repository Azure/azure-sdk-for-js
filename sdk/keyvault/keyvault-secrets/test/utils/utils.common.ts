// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";

export async function assertThrowsAbortError(cb: () => Promise<any>): Promise<void> {
  let passed = false;
  try {
    await cb();
    passed = true;
  } catch (e) {
    console.log(`name: ${e.name}, message: ${e.message}`);
    assert.equal(e.name, "AbortError");
    assert.equal(e.message, "The operation was aborted.");
  }

  if (passed) {
    throw new Error("Expected cb to throw an AbortError");
  }
}

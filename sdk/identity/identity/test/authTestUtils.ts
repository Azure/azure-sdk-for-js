// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";

// Node's `assert.rejects` doesn't appear until 8.13.0 so we'll
// use our own simple implementation here
export async function assertRejects(
  promise: Promise<any>,
  expected: (error: any) => boolean,
  message?: string
): Promise<any> {
  try {
    await promise;
  } catch (error) {
    assert.ok(expected(error), message || "The error didn't pass the assertion predicate.");
  }
}

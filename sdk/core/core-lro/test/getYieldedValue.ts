// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "vitest";

/**
 * Returns the currently yielded value from an iterator if it exists, otherwise, it throws an assertion failure.
 * @param iteratorResult - The result of the current iteration
 * @returns the currently yielded value
 */
export function getYieldedValue<YT, RT>(iteratorResult: IteratorResult<YT, RT>): YT {
  if (iteratorResult.done) {
    assert.fail(`Expected an item but did not get any`);
  }
  return iteratorResult.value;
}

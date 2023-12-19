// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";

export async function assertError<T>(
  p: Promise<T>,
  expectations: {
    causeMessage?: RegExp;
    message?: RegExp;
  } = {}
): Promise<void> {
  const { causeMessage, message } = expectations;
  try {
    await p;
    assert.fail(`Expected promise to error, but resolved successfully`);
  } catch (e) {
    assert.instanceOf(e, Error);
    const error = e as any;
    if (message) {
      assert.match(error.message, message);
    }
    if (causeMessage && error.cause) {
      assert.match((error.cause as Error).message, causeMessage);
    }
  }
}

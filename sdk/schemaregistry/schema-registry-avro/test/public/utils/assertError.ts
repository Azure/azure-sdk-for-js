// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, expect } from "vitest";

export async function assertError<T>(
  p: Promise<T>,
  expectations: {
    causeMessage?: RegExp;
    message?: RegExp;
  } = {},
): Promise<void> {
  const { causeMessage, message } = expectations;
  try {
    await p;
    assert.fail(`Expected promise to error, but resolved successfully`);
  } catch (e) {
    expect(e).toBeInstanceOf(Error);
    const error = e as any;
    if (message) {
      expect(error.message).toMatch(message);
    }
    if (causeMessage && error.cause) {
      expect((error.cause as Error).message).toMatch(causeMessage);
    }
  }
}

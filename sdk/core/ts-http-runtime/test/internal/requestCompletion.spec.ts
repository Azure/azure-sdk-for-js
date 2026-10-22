// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import { getRequestCompletion, setRequestCompletion } from "../../src/util/requestCompletion.js";

function deferred(): { promise: Promise<void>; resolve: () => void } {
  let resolveCompletion!: () => void;
  const promise = new Promise<void>((resolve) => {
    resolveCompletion = resolve;
  });
  return { promise, resolve: resolveCompletion };
}

describe("request completion", () => {
  it("removes completion metadata after the request completes", async () => {
    const response = {};
    const completion = deferred();
    setRequestCompletion(response, completion.promise);
    expect(getRequestCompletion(response)).toBe(completion.promise);

    completion.resolve();
    await completion.promise;

    expect(getRequestCompletion(response)).toBeUndefined();
  });

  it("does not remove newer completion metadata when an older request completes", async () => {
    const response = {};
    const first = deferred();
    const second = deferred();
    setRequestCompletion(response, first.promise);
    setRequestCompletion(response, second.promise);

    first.resolve();
    await first.promise;

    expect(getRequestCompletion(response)).toBe(second.promise);
    second.resolve();
    await second.promise;
    expect(getRequestCompletion(response)).toBeUndefined();
  });
});

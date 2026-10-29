// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getRequestCompletion,
  getResponseBodyCompletion,
  setRequestCompletion,
  setResponseBodyCompletion,
} from "../../src/util/responseBody.js";
import { logger } from "../../src/log.js";

function deferred(): { promise: Promise<void>; resolve: () => void } {
  let resolveCompletion!: () => void;
  const promise = new Promise<void>((resolve) => {
    resolveCompletion = resolve;
  });
  return { promise, resolve: resolveCompletion };
}

describe.each([
  { name: "request", set: setRequestCompletion, get: getRequestCompletion },
  { name: "response body", set: setResponseBodyCompletion, get: getResponseBodyCompletion },
])("$name completion", ({ name, set, get }) => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("logs an unexpected completion rejection", async () => {
    const failure = new Error("unexpected completion failure");
    const warning = vi.spyOn(logger, "warning").mockImplementation(() => {});
    const completion = Promise.reject<void>(failure);

    set({}, completion);
    await expect(completion).rejects.toBe(failure);
    await Promise.resolve();

    expect(warning).toHaveBeenCalledExactlyOnceWith(`Error tracking ${name} completion`, failure);
  });

  it("removes completion metadata after completion", async () => {
    const response = {};
    const completion = deferred();
    set(response, completion.promise);
    expect(get(response)).toBe(completion.promise);

    completion.resolve();
    await completion.promise;

    expect(get(response)).toBeUndefined();
  });

  it("does not remove newer completion metadata when an older request completes", async () => {
    const response = {};
    const first = deferred();
    const second = deferred();
    set(response, first.promise);
    set(response, second.promise);

    first.resolve();
    await first.promise;

    expect(get(response)).toBe(second.promise);
    second.resolve();
    await second.promise;
    expect(get(response)).toBeUndefined();
  });
});

it("tracks request and response-body completion independently", async () => {
  const response = {};
  const request = deferred();
  const body = deferred();
  setRequestCompletion(response, request.promise);
  setResponseBodyCompletion(response, body.promise);

  expect(getRequestCompletion(response)).toBe(request.promise);
  expect(getResponseBodyCompletion(response)).toBe(body.promise);

  request.resolve();
  await request.promise;

  expect(getRequestCompletion(response)).toBeUndefined();
  expect(getResponseBodyCompletion(response)).toBe(body.promise);

  body.resolve();
  await body.promise;

  expect(getResponseBodyCompletion(response)).toBeUndefined();
});

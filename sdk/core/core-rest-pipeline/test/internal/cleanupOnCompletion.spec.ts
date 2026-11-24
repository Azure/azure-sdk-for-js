// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  getRequestCompletion,
  getResponseBodyCompletion,
} from "@typespec/ts-http-runtime/internal/util";
import { cleanupOnRequestResponseCompletion } from "../../src/util/cleanupOnCompletion.js";
import { logger } from "../../src/log.js";

vi.mock(import("@typespec/ts-http-runtime/internal/util"), async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    getRequestCompletion: vi.fn(original.getRequestCompletion),
    getResponseBodyCompletion: vi.fn(original.getResponseBodyCompletion),
  };
});

function deferred(): { promise: Promise<void>; resolve: () => void } {
  let resolveCompletion!: () => void;
  const promise = new Promise<void>((resolve) => {
    resolveCompletion = resolve;
  });
  return { promise, resolve: resolveCompletion };
}

function createResponseStream(): {
  stream: {
    readable: boolean;
    once(event: string, listener: () => void): void;
    removeListener(event: string): void;
  };
  complete(event?: string): void;
} {
  const listeners = new Map<string, () => void>();
  const stream = {
    readable: true,
    once(event: string, listener: () => void) {
      listeners.set(event, listener);
    },
    removeListener(event: string) {
      listeners.delete(event);
    },
  };
  return {
    stream,
    complete(event = "end") {
      stream.readable = false;
      listeners.get(event)?.();
    },
  };
}

describe("cleanupOnRequestResponseCompletion", () => {
  beforeEach(() => {
    vi.mocked(getRequestCompletion).mockReset();
    vi.mocked(getResponseBodyCompletion).mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([
    {
      completionType: "request",
      getCompletion: getRequestCompletion,
      message: "Error cleaning up after request completion",
    },
    {
      completionType: "response body",
      getCompletion: getResponseBodyCompletion,
      message: "Error cleaning up after response body completion",
    },
  ])("logs cleanup errors after $completionType completion", async ({ getCompletion, message }) => {
    const completion = deferred();
    vi.mocked(getCompletion).mockReturnValueOnce(completion.promise);
    const failure = new Error("cleanup failed");
    const cleanup = vi.fn(() => {
      throw failure;
    });
    const warning = vi.spyOn(logger, "warning").mockImplementation(() => {});

    cleanupOnRequestResponseCompletion({}, cleanup);
    expect(cleanup).not.toHaveBeenCalled();

    completion.resolve();
    await completion.promise;
    await Promise.resolve();

    expect(cleanup).toHaveBeenCalledOnce();
    expect(warning).toHaveBeenCalledExactlyOnceWith(message, failure);
  });

  it.each(["end", "close", "error"])(
    "logs cleanup errors when the response stream completes last via %s",
    (event) => {
      const responseStream = createResponseStream();
      const failure = new Error("cleanup failed");
      const cleanup = vi.fn(() => {
        throw failure;
      });
      const warning = vi.spyOn(logger, "warning").mockImplementation(() => {});

      cleanupOnRequestResponseCompletion({ readableStreamBody: responseStream.stream }, cleanup);

      expect(() => responseStream.complete(event)).not.toThrow();
      expect(cleanup).toHaveBeenCalledOnce();
      expect(warning).toHaveBeenCalledExactlyOnceWith(
        "Error cleaning up after response stream completion",
        failure,
      );

      responseStream.complete(event);
      expect(cleanup).toHaveBeenCalledOnce();
      expect(warning).toHaveBeenCalledOnce();
    },
  );

  it("waits for response stream completion", async () => {
    const responseStream = createResponseStream();
    const response = { readableStreamBody: responseStream.stream };
    const cleanup = vi.fn();

    cleanupOnRequestResponseCompletion(response, cleanup);
    expect(cleanup).not.toHaveBeenCalled();

    responseStream.complete();
    await Promise.resolve();
    expect(cleanup).toHaveBeenCalledOnce();
  });

  it("waits for request completion when the response is already complete", async () => {
    const response = {};
    const requestCompletion = deferred();
    vi.mocked(getRequestCompletion).mockReturnValueOnce(requestCompletion.promise);
    const cleanup = vi.fn();

    cleanupOnRequestResponseCompletion(response, cleanup);
    await Promise.resolve();
    expect(cleanup).not.toHaveBeenCalled();

    requestCompletion.resolve();
    await requestCompletion.promise;
    expect(cleanup).toHaveBeenCalledOnce();
  });

  it.each(["request", "response"])(
    "waits for both completions when the %s completes first",
    async (firstCompletion) => {
      const responseStream = createResponseStream();
      const response = { readableStreamBody: responseStream.stream };
      const requestCompletion = deferred();
      vi.mocked(getRequestCompletion).mockReturnValueOnce(requestCompletion.promise);
      const cleanup = vi.fn();

      cleanupOnRequestResponseCompletion(response, cleanup);
      expect(cleanup).not.toHaveBeenCalled();

      if (firstCompletion === "request") {
        requestCompletion.resolve();
      } else {
        responseStream.complete();
      }
      await Promise.resolve();
      expect(cleanup).not.toHaveBeenCalled();

      if (firstCompletion === "request") {
        responseStream.complete();
      } else {
        requestCompletion.resolve();
      }
      await requestCompletion.promise;
      expect(cleanup).toHaveBeenCalledOnce();

      responseStream.complete();
      requestCompletion.resolve();
      await Promise.resolve();
      expect(cleanup).toHaveBeenCalledOnce();
    },
  );
});

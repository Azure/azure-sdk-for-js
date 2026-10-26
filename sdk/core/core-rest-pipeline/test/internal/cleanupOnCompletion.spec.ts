// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it, vi } from "vitest";
import { getRequestCompletion } from "@typespec/ts-http-runtime/internal/util";
import { cleanupOnRequestResponseCompletion } from "../../src/util/cleanupOnCompletion.js";

vi.mock(import("@typespec/ts-http-runtime/internal/util"), async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    getRequestCompletion: vi.fn(original.getRequestCompletion),
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
  complete(): void;
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
    complete() {
      stream.readable = false;
      listeners.get("end")?.();
    },
  };
}

describe("cleanupOnRequestResponseCompletion", () => {
  beforeEach(() => {
    vi.mocked(getRequestCompletion).mockReset();
  });

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

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientRequest } from "node:http";
import { Writable } from "node:stream";
import { afterEach, beforeEach, describe, expect, it, vi, type Mock, type Mocked } from "vitest";
import { createExpectContinueRequest } from "../../../src/util/nodeExpectContinue.js";

function createOptions(
  bodyLength: number | null = null,
  suppressDestroyError = true,
): {
  request: Writable & { flushHeaders: Mock<() => void>; shouldKeepAlive: boolean };
  controller: AbortController;
  options: Mocked<Parameters<typeof createExpectContinueRequest>[0]>;
} {
  const request = Object.assign(
    new Writable({
      write(_chunk, _encoding, callback) {
        callback();
      },
      destroy(error, callback) {
        callback(suppressDestroyError ? null : error);
      },
    }),
    { flushHeaders: vi.fn(), shouldKeepAlive: true },
  );
  const controller = new AbortController();
  return {
    request,
    controller,
    options: {
      abortSignal: controller.signal,
      bodyLength,
      createRequest: vi.fn(() => request as unknown as ClientRequest),
      onAbort: vi.fn(),
      onError: vi.fn(),
      onResponse: vi.fn(),
      sendBody: vi.fn(),
    },
  };
}

describe("Expect: 100-continue error handling", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(["empty body", "Continue", "fallback"])(
    "reports a %s dispatch failure even when destroy does not emit an error",
    async (dispatch) => {
      const { request, options } = createOptions(dispatch === "empty body" ? 0 : null);
      const failure = new Error("body factory failed");
      const destroy = vi.spyOn(request, "destroy");
      options.sendBody.mockImplementation(() => {
        request.destroy();
        throw failure;
      });

      createExpectContinueRequest(options);
      if (dispatch === "Continue") {
        request.emit("continue");
      } else if (dispatch === "fallback") {
        vi.advanceTimersByTime(1000);
      }

      await new Promise<void>((resolve) => setImmediate(resolve));
      expect(options.onError).toHaveBeenCalledExactlyOnceWith(failure);
      expect(destroy).toHaveBeenLastCalledWith(failure);
      expect(vi.getTimerCount()).toBe(0);
      expect(options.onResponse).not.toHaveBeenCalled();
    },
  );

  it("reports header-flush failures before destroying the request", async () => {
    const { request, options } = createOptions();
    const failure = new Error("header flush failed");
    const destroy = vi.spyOn(request, "destroy");
    request.flushHeaders.mockImplementation(() => {
      throw failure;
    });

    createExpectContinueRequest(options);
    await new Promise<void>((resolve) => setImmediate(resolve));

    expect(options.onError).toHaveBeenCalledExactlyOnceWith(failure);
    expect(options.onError.mock.invocationCallOrder[0]).toBeLessThan(
      destroy.mock.invocationCallOrder[0],
    );
    expect(destroy).toHaveBeenCalledWith(failure);
    expect(options.sendBody).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("reports request-construction failures through the error callback", () => {
    const { request, options } = createOptions();
    const failure = new Error("request creation failed");
    options.createRequest.mockImplementation(() => {
      throw failure;
    });

    expect(() => createExpectContinueRequest(options)).not.toThrow();

    expect(options.onError).toHaveBeenCalledExactlyOnceWith(failure);
    expect(options.sendBody).not.toHaveBeenCalled();
    expect(request.flushHeaders).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
    request.destroy();
  });

  it("reports a caught failure only once when destroy also emits an error", async () => {
    const { request, options } = createOptions(0, false);
    const failure = new Error("upload failed");
    options.sendBody.mockImplementation(() => {
      throw failure;
    });

    createExpectContinueRequest(options);
    expect(options.onError).toHaveBeenCalledExactlyOnceWith(failure);
    await new Promise<void>((resolve) => setImmediate(resolve));

    expect(options.onError).toHaveBeenCalledExactlyOnceWith(failure);
    expect(request.destroyed).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("stops negotiation when the transport emits an error", () => {
    const { request, options } = createOptions();
    const failure = new Error("connection failed");

    createExpectContinueRequest(options);
    request.emit("error", failure);
    request.emit("continue");
    vi.advanceTimersByTime(1000);

    expect(options.onError).toHaveBeenCalledExactlyOnceWith(failure);
    expect(options.sendBody).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
    request.destroy();
  });

  it("does not schedule a fallback after an error during header flushing", () => {
    const { request, options } = createOptions();
    const failure = new Error("header write failed");
    request.flushHeaders.mockImplementation(() => {
      request.emit("error", failure);
    });

    createExpectContinueRequest(options);
    vi.advanceTimersByTime(1000);

    expect(options.onError).toHaveBeenCalledExactlyOnceWith(failure);
    expect(options.sendBody).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
    request.destroy();
  });

  it("preserves the separate abort callback", () => {
    const { request, controller, options } = createOptions();

    createExpectContinueRequest(options);
    controller.abort();
    request.emit("continue");
    vi.advanceTimersByTime(1000);

    expect(options.onAbort).toHaveBeenCalledExactlyOnceWith(request);
    expect(options.onError).not.toHaveBeenCalled();
    expect(options.sendBody).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
    request.destroy();
  });
});

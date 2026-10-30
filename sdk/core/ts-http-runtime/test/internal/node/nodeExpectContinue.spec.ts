// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientRequest, IncomingMessage } from "node:http";
import { Socket } from "node:net";
import { PassThrough, Writable } from "node:stream";
import { afterEach, beforeEach, describe, expect, it, vi, type Mock, type Mocked } from "vitest";
import { createExpectContinueRequest } from "../../../src/util/nodeExpectContinue.js";

function createOptions(
  bodyLength: number | null = null,
  suppressDestroyError = true,
): {
  request: Writable & {
    flushHeaders: Mock<() => void>;
    write: Mock<(chunk: string, callback?: (error?: Error | null) => void) => boolean>;
    shouldKeepAlive: boolean;
    socket: Socket | null;
  };
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
    {
      flushHeaders: vi.fn(),
      write: vi.fn((_chunk: string, callback?: (error?: Error | null) => void) => {
        callback?.();
        return true;
      }),
      shouldKeepAlive: true,
      socket: new Socket(),
    },
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

describe("Expect: 100-continue negotiation", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("dispatches a known-empty body without waiting for a socket or fallback", () => {
    const { request, options } = createOptions(0);
    request.socket = null;
    try {
      createExpectContinueRequest(options);

      expect(options.sendBody).toHaveBeenCalledExactlyOnceWith(request);
      expect(request.flushHeaders).not.toHaveBeenCalled();
      expect(request.write).not.toHaveBeenCalled();
      expect(request.listenerCount("socket")).toBe(0);
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      request.destroy();
    }
  });

  it.each([false, true])(
    "starts the fallback only after socket assignment and ordered write completion (socketAssigned=%s)",
    (socketAssigned) => {
      const { request, options } = createOptions();
      const socket = new Socket();
      request.socket = socketAssigned ? socket : null;
      let writeComplete: ((error?: Error | null) => void) | undefined;
      request.write.mockImplementation((_chunk, callback) => {
        writeComplete = callback;
        return true;
      });

      try {
        createExpectContinueRequest(options);
        if (!socketAssigned) {
          vi.advanceTimersByTime(2000);
          expect(request.flushHeaders).not.toHaveBeenCalled();
          expect(request.write).not.toHaveBeenCalled();
          expect(options.sendBody).not.toHaveBeenCalled();
          request.socket = socket;
          request.emit("socket", socket);
        }
        expect(request.flushHeaders).toHaveBeenCalledOnce();
        expect(request.write).toHaveBeenCalledExactlyOnceWith("", expect.any(Function));
        expect(request.flushHeaders.mock.invocationCallOrder[0]).toBeLessThan(
          request.write.mock.invocationCallOrder[0],
        );
        vi.advanceTimersByTime(2000);
        expect(vi.getTimerCount()).toBe(0);
        expect(options.sendBody).not.toHaveBeenCalled();

        if (!writeComplete) {
          throw new Error("Expected an ordered write callback");
        }
        writeComplete();
        expect(vi.getTimerCount()).toBe(1);
        vi.advanceTimersByTime(999);
        expect(options.sendBody).not.toHaveBeenCalled();
        vi.advanceTimersByTime(1);
        expect(options.sendBody).toHaveBeenCalledExactlyOnceWith(request);
        request.emit("continue");
        expect(options.sendBody).toHaveBeenCalledOnce();
        expect(request.listenerCount("socket")).toBe(0);
      } finally {
        request.destroy();
        socket.destroy();
      }
    },
  );

  it.each(["response", "abort", "close", "error", "continue"])(
    "removes the pending socket listener when %s ends negotiation",
    (event) => {
      const { request, controller, options } = createOptions();
      const response = new PassThrough();
      request.socket = null;
      try {
        createExpectContinueRequest(options);
        const [onSocket] = request.listeners("socket");
        if (!onSocket) {
          throw new Error("Expected a pending socket listener");
        }
        if (event === "response") {
          options.createRequest.mock.calls[0][0](response as unknown as IncomingMessage);
        } else if (event === "abort") {
          controller.abort();
        } else if (event === "error") {
          request.emit("error", new Error("connection failed"));
        } else {
          request.emit(event);
        }
        expect(request.listenerCount("socket")).toBe(0);
        onSocket(new Socket());
        vi.advanceTimersByTime(2000);

        expect(request.flushHeaders).not.toHaveBeenCalled();
        expect(request.write).not.toHaveBeenCalled();
        expect(vi.getTimerCount()).toBe(0);
        expect(options.sendBody).toHaveBeenCalledTimes(event === "continue" ? 1 : 0);
      } finally {
        request.destroy();
        response.destroy();
      }
    },
  );

  it.each(["response", "abort", "close", "error", "continue"])(
    "does not arm the fallback when %s arrives before the ordered write completes",
    (event) => {
      const { request, controller, options } = createOptions();
      const response = new PassThrough();
      let writeComplete: ((error?: Error | null) => void) | undefined;
      request.write.mockImplementation((_chunk, callback) => {
        writeComplete = callback;
        return true;
      });
      try {
        createExpectContinueRequest(options);
        if (!writeComplete) {
          throw new Error("Expected an ordered write callback");
        }
        if (event === "response") {
          options.createRequest.mock.calls[0][0](response as unknown as IncomingMessage);
        } else if (event === "abort") {
          controller.abort();
        } else if (event === "error") {
          request.emit("error", new Error("connection failed"));
        } else {
          request.emit(event);
        }
        writeComplete();
        expect(vi.getTimerCount()).toBe(0);
        vi.advanceTimersByTime(2000);
        expect(options.sendBody).toHaveBeenCalledTimes(event === "continue" ? 1 : 0);
      } finally {
        request.destroy();
        response.destroy();
      }
    },
  );

  it.each(["throw", "callback"])(
    "reports an ordered write %s failure exactly once",
    async (failureType) => {
      const { request, options } = createOptions(null, false);
      const failure = new Error("header write failed");
      request.write.mockImplementation((_chunk, callback) => {
        if (failureType === "throw") {
          throw failure;
        }
        callback?.(failure);
        return true;
      });

      createExpectContinueRequest(options);
      await new Promise<void>((resolve) => setImmediate(resolve));

      expect(options.onError).toHaveBeenCalledExactlyOnceWith(failure);
      expect(request.destroyed).toBe(true);
      expect(options.sendBody).not.toHaveBeenCalled();
      expect(vi.getTimerCount()).toBe(0);
    },
  );

  it.each(["response", "abort", "close"])(
    "does not schedule a fallback after %s during header flushing",
    (event) => {
      const { request, controller, options } = createOptions();
      const response = new PassThrough();
      request.flushHeaders.mockImplementation(() => {
        if (event === "response") {
          options.createRequest.mock.calls[0][0](response as unknown as IncomingMessage);
        } else if (event === "abort") {
          controller.abort();
        } else {
          request.emit("close");
        }
      });

      try {
        createExpectContinueRequest(options);
        expect(vi.getTimerCount()).toBe(0);
        request.emit("continue");
        vi.advanceTimersByTime(1000);

        expect(options.sendBody).not.toHaveBeenCalled();
        expect(options.onError).not.toHaveBeenCalled();
      } finally {
        request.destroy();
        response.destroy();
      }
    },
  );

  it.each(["response", "abort", "close"])(
    "ignores a queued body callback after %s stops negotiation",
    (event) => {
      const { request, controller, options } = createOptions();
      const response = new PassThrough();

      try {
        createExpectContinueRequest(options);
        const [sendBody] = request.listeners("continue");
        if (!sendBody) {
          throw new Error("Expected a pending Continue listener");
        }
        if (event === "response") {
          options.createRequest.mock.calls[0][0](response as unknown as IncomingMessage);
        } else if (event === "abort") {
          controller.abort();
        } else {
          request.emit("close");
        }
        sendBody();
        vi.advanceTimersByTime(1000);

        expect(options.sendBody).not.toHaveBeenCalled();
        expect(vi.getTimerCount()).toBe(0);
      } finally {
        request.destroy();
        response.destroy();
      }
    },
  );

  it.each([null, 0])(
    "handles a final response during request construction without dispatching a body (length=%s)",
    async (bodyLength) => {
      const { request, options } = createOptions(bodyLength);
      const response = new PassThrough();
      const destroy = vi.spyOn(request, "destroy");
      options.createRequest.mockImplementation((onResponse) => {
        onResponse(response as unknown as IncomingMessage);
        return request as unknown as ClientRequest;
      });

      try {
        createExpectContinueRequest(options);

        expect(options.onResponse).toHaveBeenCalledExactlyOnceWith(response);
        expect(options.onError).not.toHaveBeenCalled();
        expect(options.sendBody).not.toHaveBeenCalled();
        expect(request.flushHeaders).not.toHaveBeenCalled();
        expect(request.shouldKeepAlive).toBe(false);
        expect(destroy).not.toHaveBeenCalled();
        expect(vi.getTimerCount()).toBe(0);

        response.resume();
        response.end("rejected");
        await new Promise<void>((resolve) => setImmediate(resolve));

        expect(destroy).toHaveBeenCalledOnce();
      } finally {
        request.destroy();
        response.destroy();
      }
    },
  );

  it("retires the request if a response was already destroyed during construction", () => {
    const { request, options } = createOptions();
    const response = new PassThrough();
    options.createRequest.mockImplementation((onResponse) => {
      onResponse(response as unknown as IncomingMessage);
      response.destroy();
      return request as unknown as ClientRequest;
    });

    try {
      createExpectContinueRequest(options);

      expect(options.onResponse).toHaveBeenCalledExactlyOnceWith(response);
      expect(options.onError).not.toHaveBeenCalled();
      expect(options.sendBody).not.toHaveBeenCalled();
      expect(request.destroyed).toBe(true);
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      request.destroy();
      response.destroy();
    }
  });

  it("does not begin negotiation if construction returns a destroyed request", () => {
    const { request, options } = createOptions();
    options.createRequest.mockImplementation(() => {
      request.destroy();
      return request as unknown as ClientRequest;
    });

    createExpectContinueRequest(options);
    vi.advanceTimersByTime(1000);

    expect(request.flushHeaders).not.toHaveBeenCalled();
    expect(options.sendBody).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("aborts once when a synchronous construction response aborts the signal", () => {
    const { request, controller, options } = createOptions();
    const response = new PassThrough();
    options.createRequest.mockImplementation((onResponse) => {
      onResponse(response as unknown as IncomingMessage);
      return request as unknown as ClientRequest;
    });
    options.onResponse.mockImplementation(() => controller.abort());

    try {
      createExpectContinueRequest(options);

      expect(options.onResponse).toHaveBeenCalledExactlyOnceWith(response);
      expect(options.onAbort).toHaveBeenCalledExactlyOnceWith(request);
      expect(options.onError).not.toHaveBeenCalled();
      expect(options.sendBody).not.toHaveBeenCalled();
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      request.destroy();
      response.destroy();
    }
  });

  it("does not schedule a fallback when Continue arrives during header flushing", () => {
    const { request, options } = createOptions();
    request.flushHeaders.mockImplementation(() => {
      request.emit("continue");
    });

    try {
      createExpectContinueRequest(options);
      expect(options.sendBody).toHaveBeenCalledExactlyOnceWith(request);
      expect(vi.getTimerCount()).toBe(0);
      request.emit("continue");
      vi.advanceTimersByTime(1000);

      expect(options.sendBody).toHaveBeenCalledOnce();
    } finally {
      request.destroy();
    }
  });

  it("keeps an authorized upload active after response headers arrive", () => {
    const { request, options } = createOptions();
    const response = new PassThrough();
    options.sendBody.mockImplementation((clientRequest) => {
      clientRequest.write("partial upload");
    });

    try {
      createExpectContinueRequest(options);
      request.emit("continue");
      options.createRequest.mock.calls[0][0](response as unknown as IncomingMessage);
      response.emit("end");
      response.emit("close");

      expect(options.sendBody).toHaveBeenCalledExactlyOnceWith(request);
      expect(options.onResponse).toHaveBeenCalledExactlyOnceWith(response);
      expect(options.onError).not.toHaveBeenCalled();
      expect(request.destroyed).toBe(false);
      expect(request.writableEnded).toBe(false);
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      request.destroy();
      response.destroy();
    }
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

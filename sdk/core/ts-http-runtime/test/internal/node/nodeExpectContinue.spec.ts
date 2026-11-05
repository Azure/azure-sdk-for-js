// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import http, { type ClientRequest, type IncomingMessage, type RequestOptions } from "node:http";
import { lookup } from "node:dns";
import { createReadStream } from "node:fs";
import { randomUUID } from "node:crypto";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Socket } from "node:net";
import { PassThrough, Readable, Stream, Writable } from "node:stream";
import { finished } from "node:stream/promises";
import { afterEach, beforeEach, describe, expect, it, vi, type Mock, type Mocked } from "vitest";
import {
  createDefaultHttpClient,
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
} from "../../../src/index.js";
import { getRequestBody, sendRequest } from "../../../src/client/sendRequest.js";
import { buildBodyPart } from "../../../src/client/multipart.js";
import { getRequestCompletion } from "../../../src/util/responseBody.js";
import { redirectPolicy } from "../../../src/policies/redirectPolicy.js";
import { systemErrorRetryPolicy } from "../../../src/policies/systemErrorRetryPolicy.js";
import { multipartPolicy } from "../../../src/policies/multipartPolicy.js";
import {
  addExpectContinueFraming,
  createExpectContinueRequest,
  getEffectiveHeaderValues,
  hasExpectContinue,
} from "../../../src/util/nodeExpectContinue.js";
import { isNodeReadableStream } from "../../../src/util/typeGuards-node.js";

function createOptions(suppressDestroyError = true): {
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
      createRequest: vi.fn(() => request as unknown as ClientRequest),
      onAbort: vi.fn(),
      onError: vi.fn(),
      onBodyError: vi.fn(),
      onResponse: vi.fn(),
      sendBody: vi.fn(),
    },
  };
}

describe("Expect header detection and framing", () => {
  it("recognizes native Readable instances through body normalization", () => {
    const source = new Readable({ read() {} });

    expect(isNodeReadableStream(source)).toBe(true);
    expect(isNodeReadableStream(new Stream())).toBe(false);
    expect(getRequestBody(source, "application/json").body).toBe(source);
    expect(buildBodyPart({ body: source }).body).toBe(source);
    source.destroy();
  });

  it("detects 100-continue case-insensitively and honors replacement overrides", () => {
    expect(
      hasExpectContinue(
        createPipelineRequest({
          url: "https://localhost",
          headers: createHttpHeaders({ Expect: "foo, 100-CoNtInUe" }),
        }),
      ),
    ).toBe(true);

    expect(
      hasExpectContinue(
        createPipelineRequest({
          url: "https://localhost",
          headers: createHttpHeaders({ Expect: "100-continue" }),
          requestOverrides: { headers: { "x-test": "value" } },
        }),
      ),
    ).toBe(false);
  });

  it.each([
    {
      format: "flat",
      headers: ["x-test", "unrelated", "Expect", "foo", "eXpEcT", "100-continue"],
    },
    {
      format: "paired",
      headers: [
        ["x-test", "unrelated"],
        ["Expect", "foo"],
        ["eXpEcT", "100-continue"],
      ],
    },
  ])("extracts matching values from $format header arrays in request overrides", ({ headers }) => {
    const request = createPipelineRequest({
      url: "https://localhost",
      requestOverrides: { headers },
    });

    expect(getEffectiveHeaderValues(request, "EXPECT")).toEqual(["foo", "100-continue"]);
    expect(hasExpectContinue(request)).toBe(true);
  });

  it.each([
    { format: "flat", headers: ["Expect", ["foo", "100-continue"]] },
    { format: "paired", headers: [["Expect", ["foo", "100-continue"]]] },
  ])("flattens array-valued Expect entries in $format headers", ({ headers }) => {
    const request = createPipelineRequest({
      url: "https://localhost",
      requestOverrides: { headers },
    });

    expect(getEffectiveHeaderValues(request, "expect")).toEqual(["foo", "100-continue"]);
    expect(hasExpectContinue(request)).toBe(true);
  });

  it("preserves existing framing and adds missing framing without changing header shape", () => {
    for (const headers of [
      ["cOnTeNt-LeNgTh", "3"],
      [["tRaNsFeR-EnCoDiNg", "chunked"]],
      { "Content-Length": undefined },
    ]) {
      const options: RequestOptions = { headers: headers as RequestOptions["headers"] };
      addExpectContinueFraming(options, null);
      expect(options.headers).toBe(headers);
    }

    const flatOptions: RequestOptions = { headers: ["Expect", "100-continue"] };
    addExpectContinueFraming(flatOptions, 3);
    expect(flatOptions.headers).toEqual(["Expect", "100-continue", "Content-Length", "3"]);

    const pairedOptions: RequestOptions = {
      headers: [["Expect", "100-continue"]] as unknown as RequestOptions["headers"],
    };
    addExpectContinueFraming(pairedOptions, null);
    expect(pairedOptions.headers).toEqual([
      ["Expect", "100-continue"],
      ["Transfer-Encoding", "chunked"],
    ]);
  });
});

describe("Expect: 100-continue negotiation unit", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("observes direct-source failures before Continue, during construction, and while write is pending", async () => {
    for (const timing of ["before socket", "construction", "write pending"] as const) {
      const { request, options } = createOptions(false);
      const read = vi.fn();
      const source = new Readable({ read });
      const callerError = vi.fn();
      source.on("error", callerError);
      const failure = Object.assign(new Error(`source failed (${timing})`), { code: "ENOENT" });
      let writeCallback: ((error?: Error | null) => void) | undefined;

      if (timing === "before socket") {
        request.socket = null;
      } else if (timing === "construction") {
        options.createRequest.mockImplementation(() => {
          source.emit("error", failure);
          return request as unknown as ClientRequest;
        });
      } else {
        request.write.mockImplementation((_chunk, callback) => {
          writeCallback = callback;
          return true;
        });
      }

      try {
        createExpectContinueRequest({ ...options, bodyStream: source });
        if (timing !== "construction") {
          source.emit("error", failure);
        }
        writeCallback?.();
        await new Promise<void>((resolve) => setImmediate(resolve));
        request.emit("continue");
        vi.advanceTimersByTime(2000);

        expect(options.onBodyError).toHaveBeenCalledExactlyOnceWith(failure);
        expect(options.onError).not.toHaveBeenCalled();
        expect(callerError).toHaveBeenCalledExactlyOnceWith(failure);
        expect(options.sendBody).not.toHaveBeenCalled();
        expect(read).not.toHaveBeenCalled();
        expect(source.destroyed).toBe(false);
        expect(source.listeners("error")).toEqual([callerError]);
        source.destroy();
        await new Promise<void>((resolve) => setImmediate(resolve));
        expect(source.listeners("error")).toEqual([callerError]);
        expect(request.destroyed).toBe(true);
        expect(vi.getTimerCount()).toBe(0);
      } finally {
        request.destroy();
        source.destroy();
      }
    }
  });

  it.each(["pending", "emitted"])(
    "rejects an already-errored direct source without constructing a request (errorEvent=%s)",
    async (errorEvent) => {
      const { request, options } = createOptions();
      const source = new Readable({ read() {} });
      const failure = new Error("source already failed");
      const callerError = vi.fn();
      source.on("error", callerError);
      source.destroy(failure);
      if (errorEvent === "emitted") {
        await new Promise<void>((resolve) => setImmediate(resolve));
      }

      try {
        createExpectContinueRequest({ ...options, bodyStream: source });
        await new Promise<void>((resolve) => setImmediate(resolve));

        expect(options.onBodyError).toHaveBeenCalledExactlyOnceWith(failure);
        expect(options.createRequest).not.toHaveBeenCalled();
        expect(options.sendBody).not.toHaveBeenCalled();
        expect(source.listeners("error")).toEqual([callerError]);
        expect(callerError).toHaveBeenCalledExactlyOnceWith(failure);
      } finally {
        request.destroy();
        source.destroy();
      }
    },
  );

  it.each(["response", "abort", "close", "error", "construction error"])(
    "removes its direct-source listener after %s without replacing caller listeners",
    async (event) => {
      const { request, controller, options } = createOptions();
      const read = vi.fn();
      const source = new Readable({ read });
      const callerError = vi.fn();
      const response = new PassThrough();
      const queuedFailure = new Error("queued source destruction");
      source.on("error", callerError);
      if (event === "construction error") {
        options.createRequest.mockImplementation(() => {
          source.destroy(queuedFailure);
          throw new Error("construction failed");
        });
      }

      try {
        createExpectContinueRequest({ ...options, bodyStream: source });
        expect(source.listeners("error")).toEqual(
          event === "construction error" ? [callerError] : [callerError, expect.any(Function)],
        );
        if (event !== "construction error") {
          source.destroy(queuedFailure);
        }
        if (event === "response") {
          options.createRequest.mock.calls[0][0](response as unknown as IncomingMessage);
        } else if (event === "abort") {
          controller.abort();
        } else if (event === "error") {
          request.emit("error", new Error("connection failed"));
        } else if (event === "close") {
          request.emit("close");
        }

        expect(source.listeners("error")).toEqual([callerError]);
        expect(source.listenerCount("end")).toBe(0);
        expect(source.listenerCount("close")).toBe(0);
        await new Promise<void>((resolve) => setImmediate(resolve));
        expect(callerError).toHaveBeenCalledExactlyOnceWith(queuedFailure);

        const laterError = new Error("caller-owned source failed later");
        source.emit("error", laterError);
        expect(callerError).toHaveBeenLastCalledWith(laterError);
        expect(options.onBodyError).not.toHaveBeenCalled();
        expect(source.listeners("error")).toEqual([callerError]);
        expect(read).not.toHaveBeenCalled();
        expect(vi.getTimerCount()).toBe(0);
      } finally {
        request.destroy();
        source.destroy();
        response.destroy();
      }
    },
  );

  it.each(["Continue", "fallback"])(
    "hands off source errors only after the %s upload handler is installed",
    (dispatch) => {
      const { request, options } = createOptions();
      const source = new Readable({ read() {} });
      const activeError = vi.fn();
      options.sendBody.mockImplementation(() => {
        expect(source.listenerCount("error")).toBe(1);
        source.on("error", activeError);
      });

      try {
        createExpectContinueRequest({ ...options, bodyStream: source });
        if (dispatch === "Continue") {
          request.emit("continue");
        } else {
          vi.advanceTimersByTime(1000);
        }

        expect(source.listeners("error")).toEqual([activeError]);
        const failure = new Error("active upload failed");
        source.emit("error", failure);
        expect(activeError).toHaveBeenCalledExactlyOnceWith(failure);
        expect(options.onBodyError).not.toHaveBeenCalled();
        expect(options.sendBody).toHaveBeenCalledOnce();
      } finally {
        request.destroy();
        source.destroy();
      }
    },
  );

  it("leaves no listeners after aborted attempts so callers can reuse the direct source", async () => {
    const source = new Readable({ read() {} });
    const activeError = vi.fn();
    const { request, options } = createOptions();
    options.sendBody.mockImplementation(() => source.on("error", activeError));

    try {
      for (let attempt = 0; attempt < 3; attempt++) {
        const pending = createOptions();
        createExpectContinueRequest({ ...pending.options, bodyStream: source });
        expect(source.listenerCount("error")).toBe(1);
        pending.controller.abort();
        expect(source.listenerCount("error")).toBe(0);
        const laterError = new Error("caller-owned failure after abort");
        expect(() => source.emit("error", laterError)).toThrow(laterError);
        pending.request.destroy();
      }
      createExpectContinueRequest({ ...options, bodyStream: source });
      request.emit("continue");
      expect(source.listeners("error")).toEqual([activeError]);

      const reusable = new Readable({ read() {} });
      const stopped = createOptions();
      createExpectContinueRequest({ ...stopped.options, bodyStream: reusable });
      stopped.controller.abort();
      expect(reusable.listenerCount("error")).toBe(0);
      const ended = new Promise<void>((resolve) => reusable.once("end", resolve));
      reusable.push("still caller-owned");
      reusable.push(null);
      reusable.resume();
      await ended;
      await new Promise<void>((resolve) => setImmediate(resolve));
      expect(reusable.listenerCount("error")).toBe(0);
      stopped.request.destroy();
    } finally {
      source.destroy();
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
          expect(options.sendBody).not.toHaveBeenCalled();
          request.socket = socket;
          request.emit("socket", socket);
        }
        expect(request.flushHeaders).toHaveBeenCalledOnce();
        expect(request.write).toHaveBeenCalledExactlyOnceWith("", expect.any(Function));
        vi.advanceTimersByTime(2000);
        expect(vi.getTimerCount()).toBe(0);

        writeComplete?.();
        expect(vi.getTimerCount()).toBe(1);
        vi.advanceTimersByTime(999);
        expect(options.sendBody).not.toHaveBeenCalled();
        vi.advanceTimersByTime(1);
        expect(options.sendBody).toHaveBeenCalledExactlyOnceWith(request);
        request.emit("continue");
        expect(options.sendBody).toHaveBeenCalledOnce();
      } finally {
        request.destroy();
        socket.destroy();
      }
    },
  );

  it.each(["response", "abort", "close", "error", "continue"])(
    "stops socket/write/continue progression when %s ends negotiation",
    (event) => {
      const { request, controller, options } = createOptions();
      const response = new PassThrough();
      request.socket = null;
      try {
        createExpectContinueRequest(options);
        const [onSocket] = request.listeners("socket");
        const [sendBody] = request.listeners("continue");
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
        onSocket?.(new Socket());
        sendBody?.();
        vi.advanceTimersByTime(2000);

        expect(request.flushHeaders).not.toHaveBeenCalled();
        expect(vi.getTimerCount()).toBe(0);
        expect(options.sendBody).toHaveBeenCalledTimes(event === "continue" ? 1 : 0);
      } finally {
        request.destroy();
        response.destroy();
      }
    },
  );

  it.each(["response", "abort", "close", "error", "continue"])(
    "does not arm the fallback when %s arrives during header flush or before write callback",
    (event) => {
      for (const stage of ["flush", "write"] as const) {
        const { request, controller, options } = createOptions();
        const response = new PassThrough();
        let writeComplete: ((error?: Error | null) => void) | undefined;
        const trigger = (): void => {
          if (event === "response") {
            options.createRequest.mock.calls[0][0](response as unknown as IncomingMessage);
          } else if (event === "abort") {
            controller.abort();
          } else if (event === "error") {
            request.emit("error", new Error("connection failed"));
          } else {
            request.emit(event);
          }
        };
        if (stage === "flush") {
          request.flushHeaders.mockImplementation(trigger);
        } else {
          request.write.mockImplementation((_chunk, callback) => {
            writeComplete = callback;
            return true;
          });
        }
        try {
          createExpectContinueRequest(options);
          if (stage === "write") {
            trigger();
            writeComplete?.();
          }
          expect(vi.getTimerCount()).toBe(0);
          vi.advanceTimersByTime(2000);
          expect(options.sendBody).toHaveBeenCalledTimes(event === "continue" ? 1 : 0);
        } finally {
          request.destroy();
          response.destroy();
        }
      }
    },
  );

  it.each(["throw", "callback"])(
    "reports an ordered write %s failure exactly once",
    async (failureType) => {
      const { request, options } = createOptions(false);
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
    },
  );

  it("handles early responses, destroyed requests, and response-triggered aborts", async () => {
    const { request, options } = createOptions();
    const response = new PassThrough();
    const destroy = vi.spyOn(request, "destroy");

    try {
      createExpectContinueRequest(options);
      options.createRequest.mock.calls[0][0](response as unknown as IncomingMessage);
      expect(options.onResponse).toHaveBeenCalledExactlyOnceWith(response);
      expect(request.shouldKeepAlive).toBe(false);
      expect(destroy).not.toHaveBeenCalled();

      response.resume();
      response.end("rejected");
      await new Promise<void>((resolve) => setImmediate(resolve));
      expect(destroy).toHaveBeenCalledOnce();
    } finally {
      request.destroy();
      response.destroy();
    }

    const destroyedResp = createOptions();
    const preDestroyed = new PassThrough();
    preDestroyed.destroy();
    createExpectContinueRequest(destroyedResp.options);
    destroyedResp.options.createRequest.mock.calls[0][0](
      preDestroyed as unknown as IncomingMessage,
    );
    expect(destroyedResp.request.destroyed).toBe(true);

    const destroyedReq = createOptions();
    destroyedReq.options.createRequest.mockImplementation(() => {
      destroyedReq.request.destroy();
      return destroyedReq.request as unknown as ClientRequest;
    });
    createExpectContinueRequest(destroyedReq.options);
    expect(destroyedReq.request.flushHeaders).not.toHaveBeenCalled();

    const abortOnResp = createOptions();
    const resp = new PassThrough();
    abortOnResp.options.onResponse.mockImplementation(() => abortOnResp.controller.abort());
    createExpectContinueRequest(abortOnResp.options);
    abortOnResp.options.createRequest.mock.calls[0][0](resp as unknown as IncomingMessage);
    expect(abortOnResp.options.onAbort).toHaveBeenCalledExactlyOnceWith(abortOnResp.request);
    abortOnResp.request.destroy();
    resp.destroy();
  });

  it.each(["Continue", "fallback"])(
    "dispatches the factory and upload once when %s wins at the fallback deadline",
    (winner) => {
      const { request, options } = createOptions();
      const bodyFactory = vi.fn(() => "payload");
      options.sendBody.mockImplementation((clientRequest) => {
        clientRequest.write(bodyFactory());
      });
      const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");

      try {
        if (winner === "Continue") {
          setTimeout(() => request.emit("continue"), 1000);
        }
        createExpectContinueRequest(options);
        const [continueDispatch] = request.listeners("continue");
        const fallback = setTimeoutSpy.mock.lastCall?.[0];
        if (!continueDispatch || typeof fallback !== "function") {
          throw new Error("Expected pending Continue and fallback callbacks");
        }
        if (winner === "fallback") {
          setTimeout(() => request.emit("continue"), 1000);
        }
        vi.advanceTimersByTime(999);
        expect(bodyFactory).not.toHaveBeenCalled();
        vi.advanceTimersByTime(1);

        continueDispatch();
        fallback();
        request.emit("continue");
        vi.advanceTimersByTime(1000);

        expect(bodyFactory).toHaveBeenCalledOnce();
        expect(options.sendBody).toHaveBeenCalledExactlyOnceWith(request);
        expect(vi.getTimerCount()).toBe(0);
      } finally {
        setTimeoutSpy.mockRestore();
        request.destroy();
      }
    },
  );

  it("ignores HTTP 102/103 informational responses and keeps an authorized upload active after response headers", () => {
    const { request, options } = createOptions();
    const response = new PassThrough();
    options.sendBody.mockImplementation((clientRequest) => {
      clientRequest.write("partial upload");
    });

    try {
      createExpectContinueRequest(options);
      request.emit("information", { statusCode: 102 });
      request.emit("information", { statusCode: 103 });
      expect(options.sendBody).not.toHaveBeenCalled();

      request.emit("continue");
      options.createRequest.mock.calls[0][0](response as unknown as IncomingMessage);
      response.emit("end");
      response.emit("close");

      expect(options.sendBody).toHaveBeenCalledExactlyOnceWith(request);
      expect(options.onResponse).toHaveBeenCalledExactlyOnceWith(response);
      expect(request.destroyed).toBe(false);
    } finally {
      request.destroy();
      response.destroy();
    }
  });

  it("reports construction, header-flush, and sendBody failures once and preserves abort after close", async () => {
    const constructionFail = createOptions();
    const createErr = new Error("request creation failed");
    constructionFail.options.createRequest.mockImplementation(() => {
      throw createErr;
    });
    createExpectContinueRequest(constructionFail.options);
    expect(constructionFail.options.onError).toHaveBeenCalledExactlyOnceWith(createErr);
    constructionFail.request.destroy();

    const flushFail = createOptions();
    const flushErr = new Error("header flush failed");
    const destroySpy = vi.spyOn(flushFail.request, "destroy");
    flushFail.request.flushHeaders.mockImplementation(() => {
      throw flushErr;
    });
    createExpectContinueRequest(flushFail.options);
    expect(flushFail.options.onError).toHaveBeenCalledExactlyOnceWith(flushErr);
    expect(flushFail.options.onError.mock.invocationCallOrder[0]).toBeLessThan(
      destroySpy.mock.invocationCallOrder[0],
    );

    for (const dispatch of ["Continue", "fallback"] as const) {
      const sendFail = createOptions(false);
      const sendErr = new Error("body factory failed");
      sendFail.options.sendBody.mockImplementation(() => {
        throw sendErr;
      });
      createExpectContinueRequest(sendFail.options);
      if (dispatch === "Continue") {
        sendFail.request.emit("continue");
      } else {
        vi.advanceTimersByTime(1000);
      }
      await new Promise<void>((resolve) => setImmediate(resolve));
      expect(sendFail.options.onError).toHaveBeenCalledExactlyOnceWith(sendErr);
    }

    const closedReq = createOptions();
    createExpectContinueRequest(closedReq.options);
    closedReq.request.destroy();
    await new Promise<void>((resolve) => setImmediate(resolve));
    closedReq.controller.abort();
    expect(closedReq.options.onAbort).toHaveBeenCalledExactlyOnceWith(closedReq.request);
  });
});

describe("Expect: 100-continue end-to-end transport", () => {
  const servers: http.Server[] = [];

  async function listen(server: http.Server): Promise<number> {
    servers.push(server);
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("Expected a TCP address");
    }
    return address.port;
  }

  afterEach(async () => {
    await Promise.all(
      servers.splice(0).map(
        (server) =>
          new Promise<void>((resolve, reject) => {
            server.close((error) => (error ? reject(error) : resolve()));
          }),
      ),
    );
  });

  it.each([
    { multipart: false, setup: "insecure" },
    { multipart: true, setup: "insecure" },
    { multipart: false, setup: "invalid URL" },
    { multipart: true, setup: "invalid URL" },
    { multipart: false, setup: "overrides" },
    { multipart: true, setup: "overrides" },
    { multipart: false, setup: "preaborted" },
    { multipart: true, setup: "preaborted" },
  ])(
    "leaves source listeners unchanged after $setup setup fails (multipart=$multipart)",
    async ({ multipart, setup }) => {
      const source = new Readable({ read: vi.fn() });
      const callerError = vi.fn();
      source.on("error", callerError);
      const controller = new AbortController();
      if (setup === "preaborted") {
        controller.abort();
      }
      const failure = new Error("override setup failed");
      const factory = vi.fn(() => Readable.from(["unused"]));
      const pipeline = createEmptyPipeline();
      pipeline.addPolicy(multipartPolicy());
      const request = createPipelineRequest({
        url: setup === "invalid URL" ? "invalid-url" : "http://127.0.0.1",
        allowInsecureConnection: setup !== "insecure",
        abortSignal: controller.signal,
        headers: createHttpHeaders({ Expect: "100-continue" }),
        ...(multipart
          ? {
              multipartBody: {
                parts: [
                  { headers: createHttpHeaders(), body: source },
                  { headers: createHttpHeaders(), body: factory },
                ],
              },
            }
          : { body: source }),
        requestOverrides:
          setup === "overrides"
            ? {
                get agent() {
                  throw failure;
                },
              }
            : undefined,
      });

      try {
        const result = pipeline.sendRequest(createDefaultHttpClient(), request);
        if (setup === "overrides") {
          await expect(result).rejects.toBe(failure);
        } else {
          await expect(result).rejects.toMatchObject({
            name:
              setup === "preaborted"
                ? "AbortError"
                : setup === "invalid URL"
                  ? "TypeError"
                  : "Error",
          });
        }
        expect(source.destroyed).toBe(false);
        expect(source.readableFlowing).toBe(null);
        expect(source.listeners("error")).toEqual([callerError]);
        expect(source.listenerCount("end")).toBe(0);
        expect(source.listenerCount("close")).toBe(0);
        expect(factory).not.toHaveBeenCalled();
        const sourceFailure = new Error("source failed after validation rejection");
        source.destroy(sourceFailure);
        await new Promise<void>((resolve) => setImmediate(resolve));
        expect(callerError).toHaveBeenCalledExactlyOnceWith(sourceFailure);
        expect(source.listeners("error")).toEqual([callerError]);
      } finally {
        source.destroy();
      }
    },
  );

  it("does not observe an ordinary direct body when the request is already aborted", async () => {
    const body = new Readable({ read: vi.fn() });
    const callerError = vi.fn();
    body.on("error", callerError);
    const controller = new AbortController();
    controller.abort();

    try {
      await expect(
        createDefaultHttpClient().sendRequest(
          createPipelineRequest({
            url: "http://127.0.0.1",
            method: "POST",
            abortSignal: controller.signal,
            body,
          }),
        ),
      ).rejects.toMatchObject({ name: "AbortError" });

      expect(body.destroyed).toBe(false);
      expect(body.readableFlowing).toBe(null);
      expect(body.listeners("error")).toEqual([callerError]);
      expect(body.listenerCount("end")).toBe(0);
      expect(body.listenerCount("close")).toBe(0);
      const failure = new Error("caller-owned failure after validation");
      body.emit("error", failure);
      expect(callerError).toHaveBeenCalledExactlyOnceWith(failure);
    } finally {
      body.destroy();
    }
  });

  it.each([
    { withOn: false, multipart: false },
    { withOn: true, multipart: false },
    { withOn: false, multipart: true },
    { withOn: true, multipart: true },
  ])(
    "sends pipe-shaped objects as JSON without Expect (withOn=$withOn, multipart=$multipart)",
    async ({ withOn, multipart }) => {
      const pipe = vi.fn();
      const on = vi.fn();
      const body = withOn ? { value: 1, pipe, on } : { value: 1, pipe };
      const chunks: Buffer[] = [];
      const server = http.createServer((request, response) => {
        request.on("data", (chunk: Buffer) => chunks.push(chunk));
        request.once("end", () => response.end("accepted"));
      });
      const port = await listen(server);
      const agent = new http.Agent({ keepAlive: false });
      const pipeline = createEmptyPipeline();
      pipeline.addPolicy(multipartPolicy());
      const requestOptions = {
        body: multipart ? [{ name: "payload", body }] : body,
        contentType: multipart ? "multipart/form-data" : "application/json",
        allowInsecureConnection: true,
        requestOverrides: { agent },
      };

      try {
        const response = await sendRequest(
          "POST",
          `http://127.0.0.1:${port}`,
          pipeline,
          requestOptions,
          createDefaultHttpClient(),
        );
        const receivedBody = Buffer.concat(chunks).toString();

        expect(response.status).toBe("200");
        if (multipart) {
          expect(receivedBody).toContain("content-type: application/json\r\n");
          expect(receivedBody).toContain('\r\n\r\n{"value":1}\r\n');
        } else {
          expect(receivedBody).toBe('{"value":1}');
        }
        expect(pipe).not.toHaveBeenCalled();
        expect(on).not.toHaveBeenCalled();
      } finally {
        agent.destroy();
      }
    },
  );

  it.each(["flat", "paired"])(
    "negotiates array-valued Expect headers from %s overrides",
    async (format) => {
      const bodyFactory = vi.fn(() => Readable.from(["payload"]));
      const progress = vi.fn();
      let factoriesBeforeContinue: number | undefined;
      let progressBeforeContinue: number | undefined;
      const server = http.createServer();
      server.on("checkContinue", (request, response) => {
        factoriesBeforeContinue = bodyFactory.mock.calls.length;
        progressBeforeContinue = progress.mock.calls.length;
        request.resume();
        request.once("end", () => response.end("accepted"));
        response.writeContinue();
      });
      const port = await listen(server);
      const agent = new http.Agent({ keepAlive: false });

      try {
        const response = await createDefaultHttpClient().sendRequest(
          createPipelineRequest({
            url: `http://127.0.0.1:${port}`,
            method: "POST",
            allowInsecureConnection: true,
            requestOverrides: {
              agent,
              headers:
                format === "flat"
                  ? ["Host", `127.0.0.1:${port}`, "Expect", ["100-continue"]]
                  : [
                      ["Host", `127.0.0.1:${port}`],
                      ["Expect", ["100-continue"]],
                    ],
            },
            body: bodyFactory,
            onUploadProgress: progress,
          }),
        );
        expect(response.status).toBe(200);
        expect(factoriesBeforeContinue).toBe(0);
        expect(progressBeforeContinue).toBe(0);
        expect(bodyFactory).toHaveBeenCalledOnce();
        expect(progress).toHaveBeenLastCalledWith({ loadedBytes: 7 });
      } finally {
        agent.destroy();
      }
    },
  );

  it.each([false, true])(
    "reports upload progress for a reused download-progress stream (negotiated=%s)",
    async (negotiated) => {
      const downloadProgress = vi.fn();
      const uploadProgress = vi.fn();
      const chunks: Buffer[] = [];
      const acceptUpload = (request: http.IncomingMessage, response: http.ServerResponse): void => {
        request.on("data", (chunk: Buffer) => chunks.push(chunk));
        request.once("end", () => response.end("accepted"));
      };
      const server = http.createServer((request, response) => {
        if (request.method === "GET") {
          response.end("payload");
        } else {
          acceptUpload(request, response);
        }
      });
      server.on("checkContinue", (request, response) => {
        acceptUpload(request, response);
        response.writeContinue();
      });
      const port = await listen(server);
      const agent = new http.Agent({ keepAlive: false });
      const client = createDefaultHttpClient();
      let source: NodeJS.ReadableStream | undefined;

      try {
        const download = await client.sendRequest(
          createPipelineRequest({
            url: `http://127.0.0.1:${port}`,
            allowInsecureConnection: true,
            streamResponseStatusCodes: new Set([200]),
            onDownloadProgress: downloadProgress,
            requestOverrides: { agent },
          }),
        );
        source = download.readableStreamBody;
        const upload = await client.sendRequest(
          createPipelineRequest({
            url: `http://127.0.0.1:${port}`,
            method: "POST",
            allowInsecureConnection: true,
            headers: createHttpHeaders(negotiated ? { Expect: "100-continue" } : {}),
            body: source,
            onUploadProgress: uploadProgress,
            requestOverrides: { agent },
          }),
        );
        expect(upload.status).toBe(200);
        expect(Buffer.concat(chunks).toString()).toBe("payload");
        expect(downloadProgress).toHaveBeenLastCalledWith({ loadedBytes: 7 });
        expect(uploadProgress).toHaveBeenLastCalledWith({ loadedBytes: 7 });
      } finally {
        source?.resume();
        agent.destroy();
      }
    },
  );

  it("returns direct-stream ownership to the caller after abort", async () => {
    const body = new Readable({ read: vi.fn() });
    const callerError = vi.fn();
    body.on("error", callerError);
    const failure = new Error("queued failure before abort");
    const controller = new AbortController();
    const server = http.createServer();
    server.on("checkContinue", () => {
      body.destroy(failure);
      controller.abort();
    });
    const port = await listen(server);
    const agent = new http.Agent({ keepAlive: false });

    try {
      await expect(
        createDefaultHttpClient().sendRequest(
          createPipelineRequest({
            url: `http://127.0.0.1:${port}`,
            method: "POST",
            allowInsecureConnection: true,
            headers: createHttpHeaders({ Expect: "100-continue" }),
            body,
            abortSignal: controller.signal,
            requestOverrides: { agent },
          }),
        ),
      ).rejects.toMatchObject({ name: "AbortError" });
      await new Promise<void>((resolve) => setImmediate(resolve));
      expect(body.listeners("error")).toEqual([callerError]);
      expect(callerError).toHaveBeenCalledExactlyOnceWith(failure);
    } finally {
      body.destroy();
      agent.destroy();
    }
  });

  it("rejects a pending direct-source error without consuming or retrying", async () => {
    const read = vi.fn();
    const body = new Readable({ read });
    const failure = Object.assign(new Error("pending direct-source failure"), { code: "ENOENT" });
    const controller = new AbortController();
    const removeEventListener = vi.spyOn(controller.signal, "removeEventListener");
    const server = http.createServer();
    server.on("checkContinue", () => {
      body.emit("error", failure);
    });
    const port = await listen(server);
    const agent = new http.Agent({ keepAlive: false });
    const httpRequest = vi.spyOn(http, "request");
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(systemErrorRetryPolicy({ maxRetries: 2, retryDelayInMs: 0 }));

    try {
      await expect(
        pipeline.sendRequest(
          createDefaultHttpClient(),
          createPipelineRequest({
            url: `http://127.0.0.1:${port}`,
            method: "POST",
            allowInsecureConnection: true,
            headers: createHttpHeaders({ Expect: "100-continue" }),
            body,
            abortSignal: controller.signal,
            requestOverrides: { agent },
          }),
        ),
      ).rejects.toBe(failure);

      expect(httpRequest).toHaveBeenCalledOnce();
      expect(read).not.toHaveBeenCalled();
      expect(body.destroyed).toBe(false);
      expect(body.listenerCount("error")).toBe(0);
      body.destroy();
      await new Promise<void>((resolve) => setImmediate(resolve));
      expect(body.listenerCount("error")).toBe(0);
      await expect.poll(() => removeEventListener.mock.calls.length).toBe(1);
    } finally {
      body.destroy();
      agent.destroy();
      httpRequest.mockRestore();
    }
  });

  it("handles a direct fs.createReadStream ENOENT before Continue without a caller error listener", async () => {
    const server = http.createServer();
    server.on("checkContinue", () => {});
    const port = await listen(server);
    const filePath = join(tmpdir(), `azsdk-missing-upload-${randomUUID()}`);
    const body = createReadStream(filePath);
    const agent = new http.Agent({ keepAlive: false });
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(multipartPolicy());
    pipeline.addPolicy(systemErrorRetryPolicy({ maxRetries: 2, retryDelayInMs: 0 }));

    try {
      await expect(
        pipeline.sendRequest(
          createDefaultHttpClient(),
          createPipelineRequest({
            url: `http://127.0.0.1:${port}`,
            method: "POST",
            allowInsecureConnection: true,
            headers: createHttpHeaders({ Expect: "100-continue" }),
            body,
            requestOverrides: { agent },
          }),
        ),
      ).rejects.toMatchObject({ name: "Error", code: "ENOENT", syscall: "open", path: filePath });

      expect(body.bytesRead).toBe(0);
      await expect.poll(() => body.listenerCount("error")).toBe(0);
    } finally {
      body.destroy();
      agent.destroy();
    }
  });

  it("keeps multipart factories lazy and sends all parts after Continue", async () => {
    const source = Readable.from(["direct part"]);
    const factory = vi.fn(() => Readable.from(["factory part"]));
    const server = http.createServer();
    const chunks: Buffer[] = [];
    let factoryCallsBeforePermission: number | undefined;
    server.on("checkContinue", (request, response) => {
      factoryCallsBeforePermission = factory.mock.calls.length;
      request.on("data", (chunk: Buffer) => chunks.push(chunk));
      request.on("end", () => response.end("accepted"));
      response.writeContinue();
    });
    const port = await listen(server);
    const agent = new http.Agent({ keepAlive: false });
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(multipartPolicy());

    try {
      const response = await pipeline.sendRequest(
        createDefaultHttpClient(),
        createPipelineRequest({
          url: `http://127.0.0.1:${port}`,
          method: "POST",
          allowInsecureConnection: true,
          headers: createHttpHeaders({ Expect: "100-continue" }),
          multipartBody: {
            boundary: "test",
            parts: [
              { headers: createHttpHeaders(), body: source },
              { headers: createHttpHeaders(), body: factory },
            ],
          },
          requestOverrides: { agent },
        }),
      );

      expect(response.status).toBe(200);
      expect(factoryCallsBeforePermission).toBe(0);
      expect(factory).toHaveBeenCalledOnce();
      expect(Buffer.concat(chunks).toString()).toBe(
        "--test\r\n\r\ndirect part\r\n--test\r\n\r\nfactory part\r\n--test--\r\n\r\n",
      );
    } finally {
      source.destroy();
      agent.destroy();
    }
  });

  it.each(["response", "abort"])(
    "leaves pending multipart sources and factories untouched after %s",
    async (event) => {
      const read = vi.fn();
      const source = new Readable({ read });
      const callerError = vi.fn();
      source.on("error", callerError);
      const factory = vi.fn(() => Readable.from(["deferred part"]));
      const controller = new AbortController();
      const server = http.createServer();
      server.on("checkContinue", (_request, response) => {
        if (event === "abort") {
          controller.abort();
        } else {
          response.writeHead(417);
          response.end("rejected");
        }
      });
      const port = await listen(server);
      const agent = new http.Agent({ keepAlive: false });
      const pipeline = createEmptyPipeline();
      pipeline.addPolicy(multipartPolicy());

      try {
        const result = pipeline.sendRequest(
          createDefaultHttpClient(),
          createPipelineRequest({
            url: `http://127.0.0.1:${port}`,
            method: "POST",
            allowInsecureConnection: true,
            headers: createHttpHeaders({ Expect: "100-continue" }),
            multipartBody: {
              parts: [
                { headers: createHttpHeaders(), body: source },
                { headers: createHttpHeaders(), body: factory },
              ],
            },
            abortSignal: controller.signal,
            requestOverrides: { agent },
          }),
        );
        if (event === "abort") {
          await expect(result).rejects.toMatchObject({ name: "AbortError" });
        } else {
          expect((await result).status).toBe(417);
        }
        expect(read).not.toHaveBeenCalled();
        expect(factory).not.toHaveBeenCalled();
        expect(source.destroyed).toBe(false);
        expect(source.listeners("error")).toEqual([callerError]);
        expect(source.listenerCount("end")).toBe(0);
        expect(source.listenerCount("close")).toBe(0);
        const laterError = new Error("caller-owned source failed after the attempt");
        source.emit("error", laterError);
        expect(callerError).toHaveBeenCalledExactlyOnceWith(laterError);
        expect(source.listeners("error")).toEqual([callerError]);
      } finally {
        source.destroy();
        agent.destroy();
      }
    },
  );

  it.each(["normal", "Continue"])(
    "preserves local factory errors without retrying (dispatch=%s)",
    async (dispatch) => {
      const failure = Object.assign(new Error("local body file not found"), { code: "ENOENT" });
      const bodyFactory = vi.fn(() => {
        throw failure;
      });
      const server = http.createServer();
      server.on("checkContinue", (request, response) => {
        request.resume();
        response.writeContinue();
      });
      const port = await listen(server);
      const agent = new http.Agent({ keepAlive: false });
      const pipeline = createEmptyPipeline();
      pipeline.addPolicy(systemErrorRetryPolicy({ maxRetries: 2, retryDelayInMs: 0 }));

      try {
        await expect(
          pipeline.sendRequest(
            createDefaultHttpClient(),
            createPipelineRequest({
              url: `http://127.0.0.1:${port}`,
              method: "POST",
              allowInsecureConnection: true,
              headers: createHttpHeaders(dispatch === "normal" ? {} : { Expect: "100-continue" }),
              body: bodyFactory,
              requestOverrides: { agent },
            }),
          ),
        ).rejects.toBe(failure);

        expect(bodyFactory).toHaveBeenCalledOnce();
      } finally {
        agent.destroy();
      }
    },
  );

  it("still retries transport failures before body preparation", async () => {
    let attempts = 0;
    let receivedBody = "";
    const bodyFactory = vi.fn(() => Readable.from(["payload"]));
    const server = http.createServer();
    server.on("checkContinue", (request, response) => {
      attempts++;
      if (attempts === 1) {
        request.socket.destroy();
        return;
      }
      request.setEncoding("utf8");
      request.on("data", (chunk: string) => {
        receivedBody += chunk;
      });
      request.on("end", () => response.end("accepted"));
      response.writeContinue();
    });
    const port = await listen(server);
    const agent = new http.Agent({ keepAlive: false });
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(systemErrorRetryPolicy({ maxRetries: 1, retryDelayInMs: 0 }));

    try {
      const response = await pipeline.sendRequest(
        createDefaultHttpClient(),
        createPipelineRequest({
          url: `http://127.0.0.1:${port}`,
          method: "POST",
          allowInsecureConnection: true,
          headers: createHttpHeaders({ Expect: "100-continue" }),
          body: bodyFactory,
          requestOverrides: { agent },
        }),
      );

      expect(response.bodyAsText).toBe("accepted");
      expect(attempts).toBe(2);
      expect(bodyFactory).toHaveBeenCalledOnce();
      expect(receivedBody).toBe("payload");
    } finally {
      agent.destroy();
    }
  });

  it.each([
    { kind: "undefined", body: undefined },
    { kind: "null", body: null },
    { kind: "empty string", body: "" },
    { kind: "empty Buffer", body: Buffer.alloc(0) },
    { kind: "empty typed array", body: new Uint8Array(0) },
  ])("omits 100-continue for a known-empty $kind body", async ({ body }) => {
    let receivedHeaders: http.IncomingHttpHeaders | undefined;
    const server = http.createServer((request, response) => {
      receivedHeaders = request.headers;
      response.end("accepted");
    });
    server.on("checkContinue", (_request, response) => {
      response.writeHead(417);
      response.end("unexpected expectation");
    });
    const port = await listen(server);

    const response = await createDefaultHttpClient().sendRequest(
      createPipelineRequest({
        url: `http://127.0.0.1:${port}`,
        method: "POST",
        allowInsecureConnection: true,
        body,
        headers: createHttpHeaders({ Expect: "100-continue", "X-Test": "preserved" }),
      }),
    );

    expect(response.status).toBe(200);
    expect(receivedHeaders?.expect).toBeUndefined();
    expect(receivedHeaders?.["x-test"]).toBe("preserved");
  });

  it("removes body expectations, framing, and Trailer when a chunked POST redirects via 303 to GET", async () => {
    const bodyFactory = vi.fn(() => Readable.from(["payload"]));
    let redirectedHeaders: http.IncomingHttpHeaders | undefined;
    let redirectedMethod: string | undefined;
    const server = http.createServer((request, response) => {
      redirectedHeaders = request.headers;
      redirectedMethod = request.method;
      response.end("redirected");
    });
    server.on("checkContinue", (request, response) => {
      if (request.url === "/upload") {
        response.writeHead(303, { Location: "/redirected" });
        response.end();
      } else {
        response.writeHead(417);
        response.end("unexpected expectation");
      }
    });
    const port = await listen(server);
    const agent = new http.Agent({ keepAlive: false });
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(redirectPolicy());

    try {
      const response = await pipeline.sendRequest(
        createDefaultHttpClient(),
        createPipelineRequest({
          url: `http://127.0.0.1:${port}/upload`,
          method: "POST",
          allowInsecureConnection: true,
          body: bodyFactory,
          headers: createHttpHeaders({
            Expect: "100-continue",
            "Transfer-Encoding": "chunked",
            Trailer: "Digest",
            "X-Test": "preserved",
          }),
          requestOverrides: { agent },
        }),
      );

      expect(response.status).toBe(200);
      expect(response.bodyAsText).toBe("redirected");
      expect(redirectedMethod).toBe("GET");
      expect(redirectedHeaders?.trailer).toBeUndefined();
      expect(redirectedHeaders?.["transfer-encoding"]).toBeUndefined();
      expect(redirectedHeaders?.["content-length"]).toBeUndefined();
      expect(redirectedHeaders?.expect).toBeUndefined();
      expect(redirectedHeaders?.["x-test"]).toBe("preserved");
      expect(bodyFactory).not.toHaveBeenCalled();
    } finally {
      agent.destroy();
    }
  });

  it.each([
    {
      kind: "Uint8Array window",
      body: Uint8Array.from([0, 1, 2, 3, 4]).subarray(1, 4),
      expected: Buffer.from([1, 2, 3]),
    },
    {
      kind: "DataView window",
      body: new DataView(Uint8Array.from([0, 1, 2, 3, 4]).buffer, 1, 3),
      expected: Buffer.from([1, 2, 3]),
    },
    {
      kind: "ArrayBuffer",
      body: Uint8Array.from([1, 2, 3]).buffer,
      expected: Buffer.from([1, 2, 3]),
    },
    {
      kind: "Buffer",
      body: Buffer.from([1, 2, 3]),
      expected: Buffer.from([1, 2, 3]),
    },
  ])(
    "normalizes a $kind returned by a negotiated client body factory with progress",
    async ({ body, expected }) => {
      const bodyFactory = vi.fn(() => body);
      const onUploadProgress = vi.fn();
      const chunks: Buffer[] = [];
      let receivedHeaders: http.IncomingHttpHeaders | undefined;
      const server = http.createServer();
      server.on("checkContinue", (request, response) => {
        expect(bodyFactory).not.toHaveBeenCalled();
        expect(onUploadProgress).not.toHaveBeenCalled();
        receivedHeaders = request.headers;
        request.on("data", (chunk: Buffer) => chunks.push(chunk));
        request.on("end", () => response.end("accepted"));
        response.writeContinue();
        response.writeContinue();
      });
      const port = await listen(server);
      const agent = new http.Agent({ keepAlive: false });

      const requestOptions = {
        body: bodyFactory,
        contentType: "application/octet-stream",
        allowInsecureConnection: true,
        headers: { Expect: "100-continue" },
        onUploadProgress,
        requestOverrides: { agent },
      };

      try {
        const response = await sendRequest(
          "POST",
          `http://127.0.0.1:${port}`,
          createEmptyPipeline(),
          requestOptions,
          createDefaultHttpClient(),
        );

        expect(response.status).toBe("200");
        expect(bodyFactory).toHaveBeenCalledOnce();
        expect(Buffer.concat(chunks)).toEqual(expected);
        expect(onUploadProgress).toHaveBeenCalledExactlyOnceWith({
          loadedBytes: expected.byteLength,
        });
        expect(receivedHeaders?.["content-length"]).toBeUndefined();
        expect(receivedHeaders?.["transfer-encoding"]).toBe("chunked");
      } finally {
        agent.destroy();
      }
    },
  );

  it.each([false, true])(
    "uses Content-Length for direct bodies and chunked framing for factories (factory=%s)",
    async (factory) => {
      const body = new DataView(Uint8Array.from([0, 1, 2, 3, 4]).buffer, 1, 3);
      const bodyFactory = vi.fn(() =>
        Readable.from([Buffer.from(body.buffer, body.byteOffset, body.byteLength)]),
      );
      let receivedHeaders: http.IncomingHttpHeaders | undefined;
      const server = http.createServer();
      server.on("checkContinue", (request, response) => {
        receivedHeaders = request.headers;
        request.resume();
        request.on("end", () => response.end("accepted"));
        response.writeContinue();
      });
      const port = await listen(server);

      const response = await createDefaultHttpClient().sendRequest(
        createPipelineRequest({
          url: `http://127.0.0.1:${port}`,
          method: "POST",
          allowInsecureConnection: true,
          headers: createHttpHeaders({ Expect: "100-continue" }),
          body: factory ? bodyFactory : body,
        }),
      );

      expect(response.bodyAsText).toBe("accepted");
      if (factory) {
        expect(receivedHeaders?.["content-length"]).toBeUndefined();
        expect(receivedHeaders?.["transfer-encoding"]).toBe("chunked");
      } else {
        expect(receivedHeaders?.["content-length"]).toBe("3");
        expect(receivedHeaders?.["transfer-encoding"]).toBeUndefined();
      }
    },
  );

  it.each([false, true])(
    "releases the abort listener without waiting for an untouched body after 417 rejection (streamedResponse=%s)",
    async (streamedResponse) => {
      const read = vi.fn();
      const body = new Readable({ read });
      const controller = new AbortController();
      const removeEventListener = vi.spyOn(controller.signal, "removeEventListener");
      const server = http.createServer();
      server.on("checkContinue", (_request, response) => {
        response.writeHead(417);
        response.end("rejected");
      });
      const port = await listen(server);

      try {
        const response = await createDefaultHttpClient().sendRequest(
          createPipelineRequest({
            url: `http://127.0.0.1:${port}`,
            method: "POST",
            allowInsecureConnection: true,
            headers: createHttpHeaders({ Expect: "100-continue" }),
            body,
            abortSignal: controller.signal,
            streamResponseStatusCodes: streamedResponse ? new Set([417]) : undefined,
          }),
        );

        expect(response.status).toBe(417);
        if (streamedResponse) {
          await new Promise<void>((resolve) => setImmediate(resolve));
          expect(removeEventListener).not.toHaveBeenCalled();
          const responseStream = response.readableStreamBody!;
          const responseComplete = finished(responseStream, { writable: false });
          responseStream.resume();
          await responseComplete;
        } else {
          expect(response.bodyAsText).toBe("rejected");
        }
        await getRequestCompletion(response);
        await new Promise<void>((resolve) => setImmediate(resolve));

        expect(removeEventListener).toHaveBeenCalledExactlyOnceWith("abort", expect.any(Function));
        expect(read).not.toHaveBeenCalled();
        expect(body.destroyed).toBe(false);
        body.destroy();
      } finally {
        body.destroy();
      }
    },
  );

  it.each([
    { statusCode: 417, cancel: true },
    { statusCode: 200, cancel: true },
    { statusCode: 200, cancel: false },
  ])(
    "preserves response cancellation after Connection: close (status=$statusCode, cancel=$cancel)",
    async ({ statusCode, cancel }) => {
      const controller = new AbortController();
      const removeEventListener = vi.spyOn(controller.signal, "removeEventListener");
      const bodyFactory = vi.fn(() => Readable.from(["payload"]));
      const server = http.createServer();
      server.on("checkContinue", (request, response) => {
        const sendResponse = (): void => {
          response.writeHead(statusCode, { Connection: "close", "Content-Length": "8" });
          response.end("response");
        };
        if (statusCode === 417) {
          sendResponse();
        } else {
          request.resume();
          request.once("end", sendResponse);
          response.writeContinue();
        }
      });
      const port = await listen(server);
      const agent = new http.Agent({ keepAlive: false });
      const httpRequest = vi.spyOn(http, "request");
      let responseStream: http.IncomingMessage | undefined;

      try {
        const responsePromise = createDefaultHttpClient().sendRequest(
          createPipelineRequest({
            url: `http://127.0.0.1:${port}`,
            method: "POST",
            allowInsecureConnection: true,
            headers: createHttpHeaders({ Expect: "100-continue" }),
            body: bodyFactory,
            abortSignal: controller.signal,
            streamResponseStatusCodes: new Set([statusCode]),
            requestOverrides: { agent },
          }),
        );
        const clientRequest = httpRequest.mock.results[0]?.value as ClientRequest;
        const response = await responsePromise;
        responseStream = response.readableStreamBody as http.IncomingMessage;
        await expect.poll(() => clientRequest.closed).toBe(true);

        const responseComplete = finished(responseStream, { writable: false, cleanup: true });
        if (cancel) {
          const rejection = expect(responseComplete).rejects.toMatchObject({ name: "AbortError" });
          controller.abort();
          await rejection;
          expect(responseStream.destroyed).toBe(true);
        } else {
          responseStream.resume();
          await responseComplete;
          await new Promise<void>((resolve) => setImmediate(resolve));
          const destroy = vi.spyOn(responseStream, "destroy");
          controller.abort();
          expect(destroy).not.toHaveBeenCalled();
        }
        await new Promise<void>((resolve) => setImmediate(resolve));
        expect(removeEventListener).toHaveBeenCalledExactlyOnceWith("abort", expect.any(Function));
      } finally {
        responseStream?.destroy();
        agent.destroy();
        httpRequest.mockRestore();
      }
    },
  );

  it("sends the body after the fixed fallback when no Continue response arrives", async () => {
    const bodyFactory = vi.fn(() => Readable.from(["payload"]));
    let headersReceivedAt = 0;
    let bodyReceivedAt = 0;
    const server = http.createServer();
    server.on("checkContinue", (request, response) => {
      headersReceivedAt = Date.now();
      request.once("data", () => {
        bodyReceivedAt = Date.now();
      });
      request.resume();
      request.on("end", () => response.end());
    });
    const port = await listen(server);

    const response = await createDefaultHttpClient().sendRequest(
      createPipelineRequest({
        url: `http://127.0.0.1:${port}`,
        method: "POST",
        allowInsecureConnection: true,
        headers: createHttpHeaders({ Expect: "100-continue" }),
        body: bodyFactory,
      }),
    );

    expect(response.status).toBe(200);
    expect(bodyFactory).toHaveBeenCalledOnce();
    expect(bodyReceivedAt - headersReceivedAt).toBeGreaterThanOrEqual(900);
  });

  it("keeps factories and progress deferred through slow DNS on a fresh socket", async () => {
    let finishLookup!: () => void;
    let lookupStarted!: () => void;
    const lookupPending = new Promise<void>((resolve) => {
      lookupStarted = resolve;
    });
    const bodyFactory = vi.fn(() => Readable.from(["payload"]));
    const progress = vi.fn();
    let releaseContinue!: () => void;
    let headersReceived!: () => void;
    const headersPending = new Promise<void>((resolve) => {
      headersReceived = resolve;
    });
    const server = http.createServer();
    server.on("checkContinue", (request, response) => {
      request.resume();
      request.on("end", () => response.end("accepted"));
      releaseContinue = () => response.writeContinue();
      headersReceived();
    });
    const port = await listen(server);
    const agent = new http.Agent({
      keepAlive: false,
      lookup(_hostname, options, callback) {
        finishLookup = () => lookup("127.0.0.1", options, callback);
        lookupStarted();
      },
    });

    try {
      const responsePending = createDefaultHttpClient().sendRequest(
        createPipelineRequest({
          url: `http://slow-lookup.test:${port}`,
          method: "POST",
          allowInsecureConnection: true,
          headers: createHttpHeaders({ Expect: "100-continue" }),
          body: bodyFactory,
          onUploadProgress: progress,
          requestOverrides: { agent },
        }),
      );
      await lookupPending;
      await new Promise<void>((resolve) => setTimeout(resolve, 1200));
      expect(bodyFactory).not.toHaveBeenCalled();
      expect(progress).not.toHaveBeenCalled();
      finishLookup();
      await headersPending;
      expect(bodyFactory).not.toHaveBeenCalled();
      expect(progress).not.toHaveBeenCalled();
      releaseContinue();
      expect((await responsePending).bodyAsText).toBe("accepted");
      expect(bodyFactory).toHaveBeenCalledOnce();
      expect(progress).toHaveBeenLastCalledWith({ loadedBytes: 7 });
    } finally {
      agent.destroy();
    }
  });

  it("excludes agent socket queueing from the fallback timer", async () => {
    let releaseFirstResponse: (() => void) | undefined;
    let firstRequestArrived!: () => void;
    const firstRequest = new Promise<void>((resolve) => {
      firstRequestArrived = resolve;
    });
    const server = http.createServer((_request, response) => {
      releaseFirstResponse = () => response.end("first");
      firstRequestArrived();
    });
    let continueSentAt = 0;
    let bodyCreatedAt = 0;
    const bodyFactory = vi.fn(() => {
      bodyCreatedAt = Date.now();
      return Readable.from(["payload"]);
    });
    server.on("checkContinue", (request, response) => {
      request.resume();
      request.on("end", () => response.end("second"));
      setTimeout(() => {
        continueSentAt = Date.now();
        response.writeContinue();
      }, 50);
    });
    const port = await listen(server);
    const agent = new http.Agent({
      keepAlive: true,
      maxSockets: 1,
      lookup(_hostname, options, callback) {
        lookup("127.0.0.1", options, callback);
      },
    });
    const client = createDefaultHttpClient();
    const first = client.sendRequest(
      createPipelineRequest({
        url: `http://127.0.0.1:${port}`,
        allowInsecureConnection: true,
        requestOverrides: { agent },
      }),
    );
    try {
      await firstRequest;
      const second = client.sendRequest(
        createPipelineRequest({
          url: `http://127.0.0.1:${port}`,
          method: "POST",
          allowInsecureConnection: true,
          requestOverrides: { agent },
          headers: createHttpHeaders({ Expect: "100-continue" }),
          body: bodyFactory,
        }),
      );
      await new Promise<void>((resolve) => setTimeout(resolve, 1200));
      const bodyCreatedWhileQueued = bodyFactory.mock.calls.length > 0;
      releaseFirstResponse?.();
      const [, response] = await Promise.all([first, second]);

      expect(bodyCreatedWhileQueued).toBe(false);
      expect(response.bodyAsText).toBe("second");
      expect(bodyFactory).toHaveBeenCalledOnce();
      expect(continueSentAt).toBeGreaterThan(0);
      expect(bodyCreatedAt).toBeGreaterThanOrEqual(continueSentAt);
    } finally {
      releaseFirstResponse?.();
      agent.destroy();
    }
  });
});

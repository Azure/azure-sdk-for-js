// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import http, { type ClientRequest, type IncomingMessage, type RequestOptions } from "node:http";
import { lookup } from "node:dns";
import { createReadStream } from "node:fs";
import { randomUUID } from "node:crypto";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Socket } from "node:net";
import { PassThrough, Readable, Writable } from "node:stream";
import { finished } from "node:stream/promises";
import { afterEach, beforeEach, describe, expect, it, vi, type Mock, type Mocked } from "vitest";
import {
  createDefaultHttpClient,
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
  type PipelinePolicy,
  type PipelineRequestOptions,
  type PipelineResponse,
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
  it.each([
    { value: 1, pipe() {} },
    { value: 1, pipe() {}, on() {} },
  ])("keeps pipe-shaped JSON objects on the serialization path", (body) => {
    expect(getRequestBody(body, "application/json").body).toBe('{"value":1}');
    const part = buildBodyPart({ body });
    expect(part.headers.get("content-type")).toBe("application/json");
    expect(part.body).toEqual(Buffer.from('{"value":1}'));
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
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it.each(["response", "abort", "close", "error", "continue"])(
    "ignores queued callbacks after %s stops waiting",
    (event) => {
      for (const stage of ["socket", "flush", "write"] as const) {
        const { request, controller, options } = createOptions();
        const response = new PassThrough();
        let writeComplete: ((error?: Error | null) => void) | undefined;
        const trigger = (): void => {
          if (event === "response") {
            options.createRequest.mock.calls[0][0](response as unknown as IncomingMessage);
          } else if (event === "abort") {
            controller.abort();
          } else {
            request.emit(event, new Error("transport failed"));
          }
        };
        request.socket = stage === "socket" ? null : request.socket;
        request.write.mockImplementation((_chunk, callback) => {
          writeComplete = callback;
          return true;
        });
        if (stage === "flush") {
          request.flushHeaders.mockImplementation(trigger);
        }
        try {
          createExpectContinueRequest(options);
          const [queuedSocket] = request.listeners("socket");
          const [queuedContinue] = request.listeners("continue");
          if (stage !== "flush") trigger();
          queuedSocket?.(request.socket);
          writeComplete?.();
          queuedContinue?.();
          vi.advanceTimersByTime(2000);

          expect(request.listenerCount("socket")).toBe(0);
          expect(vi.getTimerCount()).toBe(0);
          expect(options.sendBody).toHaveBeenCalledTimes(event === "continue" ? 1 : 0);
        } finally {
          request.destroy();
          response.destroy();
        }
      }
    },
  );

  it("retires an early response without consuming it and keeps abort forwarding after close", async () => {
    const { request, controller, options } = createOptions();
    const response = new PassThrough();
    try {
      createExpectContinueRequest(options);
      options.createRequest.mock.calls[0][0](response as unknown as IncomingMessage);
      expect(options.onResponse).toHaveBeenCalledExactlyOnceWith(response);
      expect(request.shouldKeepAlive).toBe(false);
      expect(request.destroyed).toBe(false);
      expect(response.readableFlowing).toBe(null);
      response.resume();
      response.end();
      await new Promise<void>((resolve) => setImmediate(resolve));
      expect(request.destroyed).toBe(true);
      controller.abort();
      expect(options.onAbort).toHaveBeenCalledExactlyOnceWith(request);
    } finally {
      response.destroy();
      request.destroy();
    }
  });

  it.each(["construction", "flush", "destroyed response", "destroyed request"])(
    "handles %s during request setup",
    (stage) => {
      const { request, options } = createOptions();
      const failure = new Error("setup failed");
      const response = new PassThrough();
      if (stage === "construction") {
        options.createRequest.mockImplementation(() => {
          throw failure;
        });
      }
      if (stage === "flush") {
        request.flushHeaders.mockImplementation(() => {
          throw failure;
        });
      }
      if (stage === "destroyed request") request.destroy();
      try {
        createExpectContinueRequest(options);
        if (stage === "destroyed response") {
          response.destroy();
          options.createRequest.mock.calls[0][0](response as unknown as IncomingMessage);
        }
        expect(options.sendBody).not.toHaveBeenCalled();
        if (stage === "construction" || stage === "flush") {
          expect(options.onError).toHaveBeenCalledExactlyOnceWith(failure);
          expect(options.onBodyError).not.toHaveBeenCalled();
        } else {
          expect(request.destroyed).toBe(true);
          expect(vi.getTimerCount()).toBe(0);
        }
      } finally {
        request.destroy();
        response.destroy();
      }
    },
  );

  it.each([
    { dispatch: "Continue", closed: false, failure: new Error("body preparation failed") },
    { dispatch: "fallback", closed: false, failure: new Error("body preparation failed") },
    { dispatch: "Continue", closed: true, failure: new Error("body failed after close") },
    { dispatch: "Continue", closed: false, failure: { code: "ENOENT" } },
  ])(
    "reports a local error once (dispatch=$dispatch, closed=$closed)",
    async ({ dispatch, closed, failure }) => {
      const { request, options } = createOptions(false);
      const destroy = vi.spyOn(request, "destroy");
      options.sendBody.mockImplementation(() => {
        if (closed) request.destroy();
        throw failure;
      });
      try {
        createExpectContinueRequest(options);
        if (dispatch === "Continue") request.emit("continue");
        else vi.advanceTimersByTime(1000);
        await new Promise<void>((resolve) => setImmediate(resolve));
        expect(options.onBodyError).toHaveBeenCalledExactlyOnceWith(failure);
        expect(options.onError).not.toHaveBeenCalled();
        expect(request.destroyed).toBe(true);
        if (!closed) {
          expect(options.onBodyError.mock.invocationCallOrder[0]).toBeLessThan(
            destroy.mock.invocationCallOrder[0],
          );
        }
        expect(vi.getTimerCount()).toBe(0);
      } finally {
        request.destroy();
      }
    },
  );
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
});

describe("Expect: 100-continue loopback transport", () => {
  const resources: { server: http.Server; agent: http.Agent }[] = [];
  const client = createDefaultHttpClient();
  const acceptUpload: http.RequestListener = (request, response) => {
    request.resume();
    request.once("end", () => response.end("accepted"));
  };

  async function loopback(
    onContinue: http.RequestListener,
    onRequest?: http.RequestListener,
    agentOptions: http.AgentOptions = {},
  ): Promise<{
    url: string;
    agent: http.Agent;
    send(
      options?: Partial<PipelineRequestOptions>,
      policies?: PipelinePolicy[],
    ): Promise<PipelineResponse>;
  }> {
    const server = http.createServer(onRequest);
    server.on("checkContinue", onContinue);
    const agent = new http.Agent({ keepAlive: false, ...agentOptions });
    resources.push({ server, agent });
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("Expected a TCP address");
    const url = `http://127.0.0.1:${address.port}`;
    return {
      url,
      agent,
      send(options: Partial<PipelineRequestOptions> = {}, policies: PipelinePolicy[] = []) {
        const pipeline = createEmptyPipeline();
        for (const policy of policies) pipeline.addPolicy(policy);
        return pipeline.sendRequest(
          client,
          createPipelineRequest({
            url,
            method: "POST",
            allowInsecureConnection: true,
            headers: createHttpHeaders({ Expect: "100-continue" }),
            ...options,
            requestOverrides: { agent, ...options.requestOverrides },
          }),
        );
      },
    };
  }

  afterEach(async () => {
    const finishedServers = resources.splice(0).map(({ server, agent }) => {
      agent.destroy();
      return new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    });
    await Promise.all(finishedServers);
    vi.restoreAllMocks();
  });

  it("does not observe an unused direct source if request validation fails", async () => {
    const body = new Readable({ read: vi.fn() });
    const callerError = vi.fn();
    body.on("error", callerError);
    try {
      await expect(
        client.sendRequest(
          createPipelineRequest({
            url: "http://127.0.0.1",
            headers: createHttpHeaders({ Expect: "100-continue" }),
            body,
          }),
        ),
      ).rejects.toThrow("allowInsecureConnection is false");
      expect(body.destroyed).toBe(false);
      expect(body.readableFlowing).toBe(null);
      expect(body.listeners("error")).toEqual([callerError]);
      expect(body.listenerCount("end") + body.listenerCount("close")).toBe(0);
    } finally {
      body.destroy();
    }
  });

  it("negotiates an array-valued raw Expect header without eager factory or progress calls", async () => {
    const body = vi.fn(() => Readable.from(["payload"]));
    const progress = vi.fn();
    let callsBeforeContinue: number[] = [];
    const fixture = await loopback((request, response) => {
      callsBeforeContinue = [body.mock.calls.length, progress.mock.calls.length];
      acceptUpload(request, response);
      response.writeContinue();
    });
    const { host } = new URL(fixture.url);
    const response = await fixture.send({
      body,
      onUploadProgress: progress,
      requestOverrides: {
        headers: [
          ["Host", host],
          ["Expect", ["100-continue"]],
        ],
      },
    });
    expect(response.status).toBe(200);
    expect(callsBeforeContinue).toEqual([0, 0]);
    expect(body).toHaveBeenCalledOnce();
    expect(progress).toHaveBeenLastCalledWith({ loadedBytes: 7 });
  });

  it("reports both download and upload progress when reusing a streamed response", async () => {
    const downloadProgress = vi.fn();
    const uploadProgress = vi.fn();
    const fixture = await loopback(
      (request, response) => {
        acceptUpload(request, response);
        response.writeContinue();
      },
      (_request, response) => response.end("payload"),
    );
    const download = await fixture.send({
      method: "GET",
      headers: createHttpHeaders(),
      streamResponseStatusCodes: new Set([200]),
      onDownloadProgress: downloadProgress,
    });
    const upload = await fixture.send({
      body: download.readableStreamBody,
      onUploadProgress: uploadProgress,
    });
    expect(upload.status).toBe(200);
    expect(downloadProgress).toHaveBeenLastCalledWith({ loadedBytes: 7 });
    expect(uploadProgress).toHaveBeenLastCalledWith({ loadedBytes: 7 });
  });

  it.each([
    { multipart: false, abort: false },
    { multipart: false, abort: true },
    { multipart: true, abort: false },
    { multipart: true, abort: true },
  ])(
    "leaves unused inputs caller-owned (multipart=$multipart, abort=$abort)",
    async ({ multipart, abort }) => {
      const read = vi.fn();
      const body = new Readable({ read });
      const factory = vi.fn(() => Readable.from(["deferred part"]));
      const callerError = vi.fn();
      body.on("error", callerError);
      const controller = new AbortController();
      const fixture = await loopback((_request, response) => {
        if (abort) controller.abort();
        else {
          response.writeHead(417);
          response.end("rejected");
        }
      });
      try {
        const result = fixture.send(
          {
            abortSignal: controller.signal,
            ...(multipart
              ? {
                  multipartBody: {
                    parts: [
                      { headers: createHttpHeaders(), body },
                      { headers: createHttpHeaders(), body: factory },
                    ],
                  },
                }
              : { body }),
          },
          [multipartPolicy()],
        );
        if (abort) await expect(result).rejects.toMatchObject({ name: "AbortError" });
        else expect((await result).status).toBe(417);
        expect(read).not.toHaveBeenCalled();
        expect(factory).not.toHaveBeenCalled();
        expect(body.destroyed).toBe(false);
        expect(body.listeners("error")).toEqual([callerError]);
        expect(body.listenerCount("end") + body.listenerCount("close")).toBe(0);
        const failure = new Error("caller-owned failure");
        body.emit("error", failure);
        expect(callerError).toHaveBeenCalledExactlyOnceWith(failure);
      } finally {
        body.destroy();
      }
    },
  );

  it("handles a direct missing-file error without a caller error listener", async () => {
    const fixture = await loopback(() => {});
    const path = join(tmpdir(), `azsdk-missing-upload-${randomUUID()}`);
    const body = createReadStream(path);
    const outgoing = vi.spyOn(http, "request");
    try {
      await expect(
        fixture.send({ body }, [systemErrorRetryPolicy({ maxRetries: 2, retryDelayInMs: 0 })]),
      ).rejects.toMatchObject({
        name: "Error",
        code: "ENOENT",
        syscall: "open",
        path,
      });
      expect(outgoing).toHaveBeenCalledOnce();
      expect(body.bytesRead).toBe(0);
      expect(body.listenerCount("error")).toBe(0);
    } finally {
      body.destroy();
    }
  });

  it("keeps multipart factories lazy and sends the expected bytes after Continue", async () => {
    const factory = vi.fn(() => Readable.from(["factory part"]));
    const chunks: Buffer[] = [];
    let callsBeforeContinue = -1;
    const fixture = await loopback((request, response) => {
      callsBeforeContinue = factory.mock.calls.length;
      request.on("data", (chunk: Buffer) => chunks.push(chunk));
      request.once("end", () => response.end());
      response.writeContinue();
    });
    const response = await fixture.send(
      {
        multipartBody: {
          boundary: "test",
          parts: [
            { headers: createHttpHeaders(), body: Readable.from(["direct part"]) },
            { headers: createHttpHeaders(), body: factory },
          ],
        },
      },
      [multipartPolicy()],
    );
    expect(response.status).toBe(200);
    expect(callsBeforeContinue).toBe(0);
    expect(factory).toHaveBeenCalledOnce();
    expect(Buffer.concat(chunks).toString()).toBe(
      "--test\r\n\r\ndirect part\r\n--test\r\n\r\nfactory part\r\n--test--\r\n\r\n",
    );
  });

  it.each(["Continue", "fallback"])(
    "does not retry local factory failures after %s",
    async (dispatch) => {
      const failure = Object.assign(new Error("local file not found"), { code: "ENOENT" });
      const body = vi.fn(() => {
        throw failure;
      });
      const fixture = await loopback((request, response) => {
        request.resume();
        if (dispatch === "Continue") response.writeContinue();
      });
      await expect(
        fixture.send({ body }, [systemErrorRetryPolicy({ maxRetries: 2, retryDelayInMs: 0 })]),
      ).rejects.toBe(failure);
      expect(body).toHaveBeenCalledOnce();
    },
  );

  it("does not retry synchronous upload-dispatch failures", async () => {
    const failure = Object.assign(new Error("local pipe failed"), { code: "ENOENT" });
    const body = new Readable({ read() {} });
    const pipe = vi.spyOn(body, "pipe").mockImplementation(() => {
      throw failure;
    });
    const fixture = await loopback((request, response) => {
      request.resume();
      response.writeContinue();
    });
    try {
      await expect(
        fixture.send({ body }, [systemErrorRetryPolicy({ maxRetries: 2, retryDelayInMs: 0 })]),
      ).rejects.toBe(failure);
      expect(pipe).toHaveBeenCalledOnce();
      expect(body.destroyed).toBe(true);
    } finally {
      body.destroy();
    }
  });

  it("retries transport failures without preparing the body on the failed attempt", async () => {
    let attempts = 0;
    const body = vi.fn(() => Readable.from(["payload"]));
    const fixture = await loopback((request, response) => {
      if (++attempts === 1) request.socket.destroy();
      else {
        acceptUpload(request, response);
        response.writeContinue();
      }
    });
    const response = await fixture.send({ body }, [
      systemErrorRetryPolicy({ maxRetries: 1, retryDelayInMs: 0 }),
    ]);
    expect(response.bodyAsText).toBe("accepted");
    expect(attempts).toBe(2);
    expect(body).toHaveBeenCalledOnce();
  });

  it.each([undefined, null, "", Buffer.alloc(0), new Uint8Array(0)])(
    "removes the expectation from a known-empty body (%s)",
    async (body) => {
      let received: http.IncomingHttpHeaders | undefined;
      const fixture = await loopback(
        (_request, response) => {
          response.writeHead(417);
          response.end();
        },
        (request, response) => {
          received = request.headers;
          response.end();
        },
      );
      expect(
        (
          await fixture.send({
            body,
            headers: createHttpHeaders({ Expect: "100-continue", "X-Test": "preserved" }),
          })
        ).status,
      ).toBe(200);
      expect(received?.expect).toBeUndefined();
      expect(received?.["x-test"]).toBe("preserved");
    },
  );

  it("drops body-only headers before following a 303 without invoking the factory", async () => {
    const body = vi.fn(() => Readable.from(["payload"]));
    let redirected: http.IncomingMessage | undefined;
    const fixture = await loopback(
      (_request, response) => {
        response.writeHead(303, { Location: "/redirected" });
        response.end();
      },
      (request, response) => {
        redirected = request;
        response.end("redirected");
      },
    );
    expect(
      (
        await fixture.send(
          {
            body,
            headers: createHttpHeaders({
              Expect: "100-continue",
              "Transfer-Encoding": "chunked",
              Trailer: "Digest",
              "X-Test": "preserved",
            }),
          },
          [redirectPolicy()],
        )
      ).bodyAsText,
    ).toBe("redirected");
    expect(redirected?.method).toBe("GET");
    for (const name of ["expect", "transfer-encoding", "content-length", "trailer"]) {
      expect(redirected?.headers[name]).toBeUndefined();
    }
    expect(redirected?.headers["x-test"]).toBe("preserved");
    expect(body).not.toHaveBeenCalled();
  });

  it.each([
    { kind: "Uint8Array window", value: Uint8Array.from([0, 1, 2, 3, 4]).subarray(1, 4) },
    { kind: "DataView window", value: new DataView(Uint8Array.from([0, 1, 2, 3, 4]).buffer, 1, 3) },
    { kind: "ArrayBuffer", value: Uint8Array.from([1, 2, 3]).buffer },
    { kind: "Buffer", value: Buffer.from([1, 2, 3]) },
  ])("normalizes $kind factories before reporting upload progress", async ({ value }) => {
    const body = vi.fn(() => value);
    const progress = vi.fn();
    const chunks: Buffer[] = [];
    let received: http.IncomingHttpHeaders | undefined;
    const fixture = await loopback((request, response) => {
      expect(body).not.toHaveBeenCalled();
      expect(progress).not.toHaveBeenCalled();
      received = request.headers;
      request.on("data", (chunk: Buffer) => chunks.push(chunk));
      request.once("end", () => response.end());
      response.writeContinue();
    });
    const options = {
      body,
      contentType: "application/octet-stream",
      allowInsecureConnection: true,
      headers: { Expect: "100-continue" },
      onUploadProgress: progress,
      requestOverrides: { agent: fixture.agent },
    };
    const response = await sendRequest("POST", fixture.url, createEmptyPipeline(), options, client);
    expect(response.status).toBe("200");
    expect(Buffer.concat(chunks)).toEqual(Buffer.from([1, 2, 3]));
    expect(body).toHaveBeenCalledOnce();
    expect(progress).toHaveBeenCalledExactlyOnceWith({ loadedBytes: 3 });
    expect(received?.["transfer-encoding"]).toBe("chunked");
    expect(received?.["content-length"]).toBeUndefined();
  });

  it("sets Content-Length for a direct binary body", async () => {
    let received: http.IncomingHttpHeaders | undefined;
    const fixture = await loopback((request, response) => {
      received = request.headers;
      acceptUpload(request, response);
      response.writeContinue();
    });
    await fixture.send({ body: new DataView(Uint8Array.from([0, 1, 2, 3, 4]).buffer, 1, 3) });
    expect(received?.["content-length"]).toBe("3");
    expect(received?.["transfer-encoding"]).toBeUndefined();
  });

  it.each([false, true])(
    "releases abort forwarding after an unused body and response finish (streamed=%s)",
    async (streamed) => {
      const read = vi.fn();
      const body = new Readable({ read });
      const controller = new AbortController();
      const removeAbort = vi.spyOn(controller.signal, "removeEventListener");
      const fixture = await loopback((_request, response) => {
        response.writeHead(417);
        response.end("rejected");
      });
      try {
        const response = await fixture.send({
          body,
          abortSignal: controller.signal,
          streamResponseStatusCodes: streamed ? new Set([417]) : undefined,
        });
        if (streamed) {
          expect(removeAbort).not.toHaveBeenCalled();
          const stream = response.readableStreamBody;
          if (!(stream instanceof Readable)) throw new Error("Expected a native response stream");
          const completed = finished(stream, { cleanup: true });
          stream.resume();
          await completed;
        } else expect(response.bodyAsText).toBe("rejected");
        await getRequestCompletion(response);
        await expect.poll(() => removeAbort.mock.calls.length).toBe(1);
        expect(read).not.toHaveBeenCalled();
        expect(body.destroyed).toBe(false);
        expect(body.listenerCount("error")).toBe(0);
      } finally {
        body.destroy();
      }
    },
  );

  it.each([
    { status: 417, cancel: true },
    { status: 200, cancel: true },
    { status: 200, cancel: false },
  ])(
    "preserves unread response cancellation after request close (status=$status, cancel=$cancel)",
    async ({ status, cancel }) => {
      const controller = new AbortController();
      const removeAbort = vi.spyOn(controller.signal, "removeEventListener");
      const outgoing = vi.spyOn(http, "request");
      const fixture = await loopback((request, response) => {
        const reply = (): void => {
          response.writeHead(status, { Connection: "close", "Content-Length": "8" });
          response.end("response");
        };
        if (status === 417) reply();
        else {
          request.resume();
          request.once("end", reply);
          response.writeContinue();
        }
      });
      const response = await fixture.send({
        body: () => Readable.from(["payload"]),
        abortSignal: controller.signal,
        streamResponseStatusCodes: new Set([status]),
      });
      const stream = response.readableStreamBody;
      if (!(stream instanceof Readable)) throw new Error("Expected a native response stream");
      try {
        await expect.poll(() => outgoing.mock.results[0].value.closed).toBe(true);
        const completed = finished(stream, { cleanup: true });
        if (cancel) {
          const rejection = expect(completed).rejects.toMatchObject({ name: "AbortError" });
          controller.abort();
          await rejection;
        } else {
          stream.resume();
          await completed;
          await expect.poll(() => removeAbort.mock.calls.length).toBe(1);
          const destroy = vi.spyOn(stream, "destroy");
          controller.abort();
          expect(destroy).not.toHaveBeenCalled();
        }
        await expect.poll(() => removeAbort.mock.calls.length).toBe(1);
      } finally {
        stream.destroy();
      }
    },
  );

  it("uses the fallback when the server does not send Continue", async () => {
    const body = vi.fn(() => Readable.from(["payload"]));
    const fixture = await loopback((request, response) => {
      acceptUpload(request, response);
    });
    expect((await fixture.send({ body })).status).toBe(200);
    expect(body).toHaveBeenCalledOnce();
  });

  it("excludes slow DNS on a fresh socket from the fallback", async () => {
    let releaseLookup!: () => void;
    let lookupStarted!: () => void;
    const lookupPending = new Promise<void>((resolve) => {
      lookupStarted = resolve;
    });
    let releaseContinue!: () => void;
    let headersReceived!: () => void;
    const headersPending = new Promise<void>((resolve) => {
      headersReceived = resolve;
    });
    const body = vi.fn(() => Readable.from(["payload"]));
    const progress = vi.fn();
    const fixture = await loopback(
      (request, response) => {
        acceptUpload(request, response);
        releaseContinue = () => response.writeContinue();
        headersReceived();
      },
      undefined,
      {
        lookup(_hostname, options, callback) {
          releaseLookup = () => lookup("127.0.0.1", options, callback);
          lookupStarted();
        },
      },
    );
    const response = fixture.send({
      url: fixture.url.replace("127.0.0.1", "slow-lookup.test"),
      body,
      onUploadProgress: progress,
    });
    await lookupPending;
    await new Promise<void>((resolve) => setTimeout(resolve, 1200));
    expect(body).not.toHaveBeenCalled();
    expect(progress).not.toHaveBeenCalled();
    releaseLookup();
    await headersPending;
    expect(body).not.toHaveBeenCalled();
    expect(progress).not.toHaveBeenCalled();
    releaseContinue();
    expect((await response).status).toBe(200);
    expect(body).toHaveBeenCalledOnce();
    expect(progress).toHaveBeenLastCalledWith({ loadedBytes: 7 });
  });

  it("excludes agent socket queueing from the fallback", async () => {
    let releaseFirst!: () => void;
    let firstArrived!: () => void;
    const firstPending = new Promise<void>((resolve) => {
      firstArrived = resolve;
    });
    const body = vi.fn(() => Readable.from(["payload"]));
    let callsBeforeContinue = -1;
    const fixture = await loopback(
      (request, response) => {
        callsBeforeContinue = body.mock.calls.length;
        acceptUpload(request, response);
        response.writeContinue();
      },
      (_request, response) => {
        releaseFirst = () => response.end("first");
        firstArrived();
      },
      { keepAlive: true, maxSockets: 1 },
    );
    try {
      const first = fixture.send({ method: "GET", headers: createHttpHeaders() });
      await firstPending;
      const second = fixture.send({ body });
      await new Promise<void>((resolve) => setTimeout(resolve, 1200));
      expect(body).not.toHaveBeenCalled();
      releaseFirst();
      expect((await Promise.all([first, second]))[1].status).toBe(200);
      expect(callsBeforeContinue).toBe(0);
      expect(body).toHaveBeenCalledOnce();
    } finally {
      releaseFirst?.();
    }
  });
});

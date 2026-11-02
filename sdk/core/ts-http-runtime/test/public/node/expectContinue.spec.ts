// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import http from "node:http";
import { lookup } from "node:dns";
import { createReadStream } from "node:fs";
import { randomUUID } from "node:crypto";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Readable } from "node:stream";
import { finished } from "node:stream/promises";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createDefaultHttpClient,
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
} from "../../../src/index.js";
import { sendRequest } from "../../../src/client/sendRequest.js";
import { getRequestCompletion } from "../../../src/util/responseBody.js";
import { redirectPolicy } from "../../../src/policies/redirectPolicy.js";
import { systemErrorRetryPolicy } from "../../../src/policies/systemErrorRetryPolicy.js";
import { multipartPolicy } from "../../../src/policies/multipartPolicy.js";

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

describe("Expect: 100-continue", () => {
  it.each([false, true])(
    "observes both missing multipart files until their independent opens settle (progress=%s)",
    async (progress) => {
      const server = http.createServer();
      server.on("checkContinue", () => {
        // Keep upload permission pending while both file opens fail.
      });
      const port = await listen(server);
      const sources = [
        createReadStream(join(tmpdir(), `azsdk-missing-first-${randomUUID()}`)),
        createReadStream(join(tmpdir(), `azsdk-missing-second-${randomUUID()}`)),
      ];
      const closed = Promise.all(
        sources.map((source) => new Promise<void>((resolve) => source.once("close", resolve))),
      );
      const pipeline = createEmptyPipeline();
      pipeline.addPolicy(multipartPolicy());
      pipeline.addPolicy(systemErrorRetryPolicy({ maxRetries: 2, retryDelayInMs: 0 }));
      const agent = new http.Agent({ keepAlive: false });
      const factory = vi.fn(() => Readable.from(["deferred part"]));
      const onUploadProgress = vi.fn();

      try {
        await expect(
          pipeline.sendRequest(
            createDefaultHttpClient(),
            createPipelineRequest({
              url: `http://127.0.0.1:${port}`,
              method: "POST",
              allowInsecureConnection: true,
              headers: createHttpHeaders({ Expect: "100-continue" }),
              multipartBody: {
                parts: [
                  ...sources.map((body) => ({ headers: createHttpHeaders(), body })),
                  { headers: createHttpHeaders(), body: factory },
                ],
              },
              onUploadProgress: progress ? onUploadProgress : undefined,
              requestOverrides: { agent },
            }),
          ),
        ).rejects.toMatchObject({ name: "Error", code: "ENOENT", syscall: "open" });
        await closed;

        expect(factory).not.toHaveBeenCalled();
        expect(onUploadProgress).not.toHaveBeenCalled();
        for (const source of sources) {
          expect(source.bytesRead).toBe(0);
          expect(source.listenerCount("error")).toBe(0);
          expect(source.listenerCount("end")).toBe(0);
          expect(source.listenerCount("close")).toBe(0);
        }
      } finally {
        for (const source of sources) {
          source.destroy();
        }
        agent.destroy();
      }
    },
  );

  it("observes a queued direct-source failure after abort without a caller error listener", async () => {
    const body = new Readable({ read: vi.fn() });
    const controller = new AbortController();
    const failure = new Error("queued failure before abort");
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
      expect(body.listenerCount("error")).toBe(0);
      expect(body.listenerCount("end")).toBe(0);
      expect(body.listenerCount("close")).toBe(0);
    } finally {
      body.destroy();
      agent.destroy();
    }
  });

  it.each([false, true])(
    "rejects a pending direct-source error without consuming or destroying the source (progress=%s)",
    async (progress) => {
      const read = vi.fn();
      const body = new Readable({ read });
      const failure = Object.assign(new Error("pending direct-source failure"), { code: "ENOENT" });
      const onUploadProgress = vi.fn();
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
              onUploadProgress: progress ? onUploadProgress : undefined,
              requestOverrides: { agent },
            }),
          ),
        ).rejects.toBe(failure);

        expect(httpRequest).toHaveBeenCalledOnce();
        const requestResult = httpRequest.mock.results[0];
        if (!requestResult || requestResult.type !== "return") {
          throw new Error("Expected an outgoing HTTP request");
        }
        await expect.poll(() => requestResult.value.closed).toBe(true);
        expect(requestResult.value.destroyed).toBe(true);
        expect(read).not.toHaveBeenCalled();
        expect(onUploadProgress).not.toHaveBeenCalled();
        expect(body.destroyed).toBe(false);
        expect(body.readableFlowing).toBe(null);
        expect(body.listenerCount("error")).toBe(1);
        expect(body.listenerCount("data")).toBe(0);
        body.destroy();
        await new Promise<void>((resolve) => setImmediate(resolve));
        expect(body.listenerCount("error")).toBe(0);
        expect(body.listenerCount("end")).toBe(0);
        expect(body.listenerCount("close")).toBe(0);
        expect(removeEventListener).toHaveBeenCalledExactlyOnceWith("abort", expect.any(Function));
      } finally {
        body.destroy();
        agent.destroy();
        httpRequest.mockRestore();
      }
    },
  );

  it.each([
    { dispatch: "Continue", progress: false },
    { dispatch: "Continue", progress: true },
    { dispatch: "fallback", progress: false },
    { dispatch: "fallback", progress: true },
  ])(
    "observes later multipart parts after upload handoff (dispatch=$dispatch, progress=$progress)",
    async ({ dispatch, progress }) => {
      const failure = new Error("later multipart part failed during upload");
      const laterRead = vi.fn();
      const laterPart = new Readable({ read: laterRead });
      const firstPart = new Readable({
        read() {
          setImmediate(() => laterPart.destroy(failure));
        },
      });
      const factory = vi.fn(() => laterPart);
      const controller = new AbortController();
      const removeEventListener = vi.spyOn(controller.signal, "removeEventListener");
      const server = http.createServer();
      server.on("checkContinue", (request, response) => {
        request.resume();
        if (dispatch === "Continue") {
          response.writeContinue();
        }
      });
      const port = await listen(server);
      const agent = new http.Agent({ keepAlive: false });
      const pipeline = createEmptyPipeline();
      pipeline.addPolicy(multipartPolicy());

      try {
        await expect(
          pipeline.sendRequest(
            createDefaultHttpClient(),
            createPipelineRequest({
              url: `http://127.0.0.1:${port}`,
              method: "POST",
              allowInsecureConnection: true,
              headers: createHttpHeaders({ Expect: "100-continue" }),
              multipartBody: {
                parts: [
                  { headers: createHttpHeaders(), body: firstPart },
                  { headers: createHttpHeaders(), body: factory },
                ],
              },
              timeout: 5000,
              abortSignal: controller.signal,
              onUploadProgress: progress ? () => {} : undefined,
              requestOverrides: { agent },
            }),
          ),
        ).rejects.toMatchObject({ name: "RestError", message: failure.message });

        expect(factory).toHaveBeenCalledOnce();
        expect(laterRead).not.toHaveBeenCalled();
        await expect.poll(() => firstPart.closed && laterPart.closed).toBe(true);
        expect(laterPart.listenerCount("error")).toBe(0);
        await expect.poll(() => removeEventListener.mock.calls.length).toBe(1);
      } finally {
        firstPart.destroy();
        laterPart.destroy();
        agent.destroy();
      }
    },
  );

  it.each([
    { multipart: false, progress: false },
    { multipart: false, progress: true },
    { multipart: true, progress: false },
    { multipart: true, progress: true },
  ])(
    "handles fs.createReadStream ENOENT before Continue without a caller error listener (multipart=$multipart, progress=$progress)",
    async ({ multipart, progress }) => {
      const server = http.createServer();
      server.on("checkContinue", () => {
        // Leave negotiation pending while the file-open operation fails.
      });
      const port = await listen(server);
      const filePath = join(tmpdir(), `azsdk-missing-upload-${randomUUID()}`);
      const body = createReadStream(filePath);
      const onUploadProgress = vi.fn();
      const agent = new http.Agent({ keepAlive: false });
      const pipeline = createEmptyPipeline();
      pipeline.addPolicy(multipartPolicy());
      pipeline.addPolicy(systemErrorRetryPolicy({ maxRetries: 2, retryDelayInMs: 0 }));
      const httpRequest = vi.spyOn(http, "request");

      try {
        await expect(
          pipeline.sendRequest(
            createDefaultHttpClient(),
            createPipelineRequest({
              url: `http://127.0.0.1:${port}`,
              method: "POST",
              allowInsecureConnection: true,
              headers: createHttpHeaders({ Expect: "100-continue" }),
              ...(multipart
                ? { multipartBody: { parts: [{ headers: createHttpHeaders(), body }] } }
                : { body }),
              onUploadProgress: progress ? onUploadProgress : undefined,
              requestOverrides: { agent },
            }),
          ),
        ).rejects.toMatchObject({ name: "Error", code: "ENOENT", syscall: "open", path: filePath });

        expect(httpRequest).toHaveBeenCalledOnce();
        const requestResult = httpRequest.mock.results[0];
        if (!requestResult || requestResult.type !== "return") {
          throw new Error("Expected an outgoing HTTP request");
        }
        await expect.poll(() => requestResult.value.closed).toBe(true);
        expect(body.bytesRead).toBe(0);
        expect(onUploadProgress).not.toHaveBeenCalled();
        expect(body.listenerCount("error")).toBe(0);
      } finally {
        body.destroy();
        agent.destroy();
        httpRequest.mockRestore();
      }
    },
  );

  it.each([false, true])(
    "rejects a pending multipart source error without consuming any parts (progress=%s)",
    async (progress) => {
      const read = vi.fn();
      const sources = [new Readable({ read }), new Readable({ read })];
      const callerError = vi.fn();
      for (const source of sources) {
        source.on("error", callerError);
      }
      const factory = vi.fn(() => Readable.from(["deferred part"]));
      const failure = Object.assign(new Error("multipart source failed before Continue"), {
        code: "ENOENT",
      });
      const controller = new AbortController();
      const removeEventListener = vi.spyOn(controller.signal, "removeEventListener");
      const server = http.createServer();
      server.on("checkContinue", () => {
        sources[1].emit("error", failure);
      });
      const port = await listen(server);
      const agent = new http.Agent({ keepAlive: false });
      const httpRequest = vi.spyOn(http, "request");
      const pipeline = createEmptyPipeline();
      pipeline.addPolicy(multipartPolicy());
      pipeline.addPolicy(systemErrorRetryPolicy({ maxRetries: 2, retryDelayInMs: 0 }));
      const onUploadProgress = vi.fn();

      try {
        await expect(
          pipeline.sendRequest(
            createDefaultHttpClient(),
            createPipelineRequest({
              url: `http://127.0.0.1:${port}`,
              method: "POST",
              allowInsecureConnection: true,
              headers: createHttpHeaders({ Expect: "100-continue" }),
              multipartBody: {
                parts: [
                  ...sources.map((body) => ({ headers: createHttpHeaders(), body })),
                  { headers: createHttpHeaders(), body: factory },
                ],
              },
              timeout: 5000,
              abortSignal: controller.signal,
              onUploadProgress: progress ? onUploadProgress : undefined,
              requestOverrides: { agent },
            }),
          ),
        ).rejects.toBe(failure);

        expect(httpRequest).toHaveBeenCalledOnce();
        const requestResult = httpRequest.mock.results[0];
        if (!requestResult || requestResult.type !== "return") {
          throw new Error("Expected an outgoing HTTP request");
        }
        await expect.poll(() => requestResult.value.closed).toBe(true);
        expect(read).not.toHaveBeenCalled();
        expect(factory).not.toHaveBeenCalled();
        expect(onUploadProgress).not.toHaveBeenCalled();
        expect(callerError).toHaveBeenCalledExactlyOnceWith(failure);
        for (const source of sources) {
          expect(source.destroyed).toBe(false);
          expect(source.readableFlowing).toBe(null);
          expect(source.listeners("error")).toContain(callerError);
          expect(source.listenerCount("error")).toBe(2);
          expect(source.listenerCount("data")).toBe(0);
          source.destroy();
        }
        await new Promise<void>((resolve) => setImmediate(resolve));
        for (const source of sources) {
          expect(source.listeners("error")).toEqual([callerError]);
          expect(source.listenerCount("close")).toBe(0);
          expect(source.listenerCount("end")).toBe(0);
        }
        expect(removeEventListener).toHaveBeenCalledExactlyOnceWith("abort", expect.any(Function));
      } finally {
        for (const source of sources) {
          source.destroy();
        }
        agent.destroy();
        httpRequest.mockRestore();
      }
    },
  );

  it.each(["Continue", "fallback"])(
    "keeps multipart factories lazy and sends all parts after %s",
    async (dispatch) => {
      const source = Readable.from(["direct part"]);
      const factory = vi.fn(() => Readable.from(["factory part"]));
      const server = http.createServer();
      const chunks: Buffer[] = [];
      let factoryCallsBeforePermission: number | undefined;
      let sourceFlowingBeforePermission: boolean | null | undefined;
      server.on("checkContinue", (request, response) => {
        factoryCallsBeforePermission = factory.mock.calls.length;
        sourceFlowingBeforePermission = source.readableFlowing;
        request.on("data", (chunk: Buffer) => chunks.push(chunk));
        request.on("end", () => response.end("accepted"));
        if (dispatch === "Continue") {
          response.writeContinue();
        }
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
        expect(sourceFlowingBeforePermission).toBe(null);
        expect(factory).toHaveBeenCalledOnce();
        expect(Buffer.concat(chunks).toString()).toBe(
          "--test\r\n\r\ndirect part\r\n--test\r\n\r\nfactory part\r\n--test--\r\n\r\n",
        );
      } finally {
        source.destroy();
        agent.destroy();
      }
    },
  );

  it("releases all prepared multipart sources when an active upload is aborted", async () => {
    const controller = new AbortController();
    const removeEventListener = vi.spyOn(controller.signal, "removeEventListener");
    const first = new Readable({
      read() {
        setImmediate(() => controller.abort());
      },
    });
    const later = new Readable({ read() {} });
    const sourcesClosed = Promise.all(
      [first, later].map((source) => new Promise<void>((resolve) => source.once("close", resolve))),
    );
    const server = http.createServer();
    server.on("checkContinue", (request, response) => {
      request.resume();
      response.writeContinue();
    });
    const port = await listen(server);
    const agent = new http.Agent({ keepAlive: false });
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(multipartPolicy());

    try {
      await expect(
        pipeline.sendRequest(
          createDefaultHttpClient(),
          createPipelineRequest({
            url: `http://127.0.0.1:${port}`,
            method: "POST",
            allowInsecureConnection: true,
            headers: createHttpHeaders({ Expect: "100-continue" }),
            multipartBody: {
              parts: [
                { headers: createHttpHeaders(), body: first },
                { headers: createHttpHeaders(), body: later },
              ],
            },
            abortSignal: controller.signal,
            requestOverrides: { agent },
          }),
        ),
      ).rejects.toMatchObject({ name: "AbortError" });
      await sourcesClosed;
      expect(later.listenerCount("error")).toBe(0);
      expect(later.listenerCount("end")).toBe(0);
      expect(later.listenerCount("close")).toBe(0);
      await expect.poll(() => removeEventListener.mock.calls.length).toBe(1);
    } finally {
      first.destroy();
      later.destroy();
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
        expect(source.readableFlowing).toBe(null);
        expect(source.listeners("error")).toContain(callerError);
        expect(source.listenerCount("error")).toBe(2);
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

  it.each([
    { dispatch: "normal", progress: false },
    { dispatch: "normal", progress: true },
    { dispatch: "Continue", progress: false },
    { dispatch: "Continue", progress: true },
    { dispatch: "fallback", progress: false },
    { dispatch: "fallback", progress: true },
  ])(
    "preserves local factory errors without retrying (dispatch=$dispatch, progress=$progress)",
    async ({ dispatch, progress }) => {
      const failure = Object.assign(new Error("local body file not found"), { code: "ENOENT" });
      const bodyFactory = vi.fn(() => {
        throw failure;
      });
      const onUploadProgress = vi.fn();
      const controller = new AbortController();
      const removeEventListener = vi.spyOn(controller.signal, "removeEventListener");
      const server = http.createServer();
      server.on("checkContinue", (request, response) => {
        request.resume();
        if (dispatch === "Continue") {
          response.writeContinue();
        }
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
              headers: createHttpHeaders(dispatch === "normal" ? {} : { Expect: "100-continue" }),
              body: bodyFactory,
              abortSignal: controller.signal,
              onUploadProgress: progress ? onUploadProgress : undefined,
              requestOverrides: { agent },
            }),
          ),
        ).rejects.toBe(failure);

        expect(bodyFactory).toHaveBeenCalledOnce();
        expect(onUploadProgress).not.toHaveBeenCalled();
        expect(httpRequest).toHaveBeenCalledTimes(dispatch === "normal" ? 0 : 1);
        if (dispatch !== "normal") {
          const result = httpRequest.mock.results[0];
          if (!result || result.type !== "return") {
            throw new Error("Expected an outgoing HTTP request");
          }
          await expect.poll(() => result.value.closed).toBe(true);
          expect(result.value.destroyed).toBe(true);
        }
        await new Promise<void>((resolve) => setImmediate(resolve));
        expect(removeEventListener).toHaveBeenCalledExactlyOnceWith("abort", expect.any(Function));
      } finally {
        agent.destroy();
        httpRequest.mockRestore();
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

  it.each([
    { format: "object", headers: { Expect: "foo, 100-CoNtInUe, bar", "X-Test": "preserved" } },
    {
      format: "flat",
      headers: ["Host", "localhost", "Expect", "foo, 100-CoNtInUe, bar", "X-Test", "preserved"],
    },
    {
      format: "paired",
      headers: [
        ["Host", "localhost"],
        ["Expect", "foo, 100-CoNtInUe, bar"],
        ["X-Test", "preserved"],
      ],
    },
  ])(
    "preserves unrelated expectations in known-empty $format header overrides",
    async ({ headers }) => {
      let receivedHeaders: http.IncomingHttpHeaders | undefined;
      const server = http.createServer();
      server.on("checkExpectation", (request, response) => {
        receivedHeaders = request.headers;
        response.end("accepted");
      });
      server.on("checkContinue", (_request, response) => {
        response.writeHead(417);
        response.end("unexpected expectation");
      });
      const port = await listen(server);
      const originalHeaders = structuredClone(headers);
      const request = createPipelineRequest({
        url: `http://127.0.0.1:${port}`,
        method: "POST",
        allowInsecureConnection: true,
        headers: createHttpHeaders({ Expect: "100-continue" }),
        requestOverrides: { headers },
      });

      const response = await createDefaultHttpClient().sendRequest(request);

      expect(response.status).toBe(200);
      expect(receivedHeaders?.expect).toBe("foo, bar");
      expect(receivedHeaders?.["x-test"]).toBe("preserved");
      expect(headers).toEqual(originalHeaders);
    },
  );

  it.each([
    { format: "pipeline", headers: undefined },
    { format: "object", headers: { Expect: "100-continue", "Content-Length": "7" } },
    {
      format: "flat",
      headers: ["Host", "localhost", "Expect", "100-continue", "Content-Length", "7"],
    },
    {
      format: "paired",
      headers: [
        ["Host", "localhost"],
        ["Expect", "100-continue"],
        ["Content-Length", "7"],
      ],
    },
  ])(
    "removes body expectations and framing after POST 303 with $format headers",
    async ({ headers }) => {
      let redirectedHeaders: http.IncomingHttpHeaders | undefined;
      let redirectedMethod: string | undefined;
      const bodyFactory = vi.fn(() => Readable.from(["payload"]));
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
      const request = createPipelineRequest({
        url: `http://127.0.0.1:${port}/upload`,
        method: "POST",
        allowInsecureConnection: true,
        body: bodyFactory,
        headers: createHttpHeaders({ Expect: "100-continue", "Content-Length": "7" }),
        requestOverrides: headers ? { headers } : undefined,
      });
      const pipeline = createEmptyPipeline();
      pipeline.addPolicy(redirectPolicy());

      const response = await pipeline.sendRequest(createDefaultHttpClient(), request);

      expect(response.bodyAsText).toBe("redirected");
      expect(redirectedMethod).toBe("GET");
      expect(redirectedHeaders?.expect).toBeUndefined();
      expect(redirectedHeaders?.["content-length"]).toBeUndefined();
      expect(redirectedHeaders?.["transfer-encoding"]).toBeUndefined();
      expect(bodyFactory).not.toHaveBeenCalled();
    },
  );

  it.each([
    { format: "pipeline", headers: undefined },
    {
      format: "object",
      headers: { Expect: "100-continue", "Transfer-Encoding": "chunked", tRaIlEr: "Digest" },
    },
    {
      format: "flat",
      headers: [
        "Host",
        "localhost",
        "Expect",
        "100-continue",
        "Transfer-Encoding",
        "chunked",
        "tRaIlEr",
        "Digest",
      ],
    },
    {
      format: "paired",
      headers: [
        ["Host", "localhost"],
        ["Expect", "100-continue"],
        ["Transfer-Encoding", "chunked"],
        ["tRaIlEr", "Digest"],
      ],
    },
  ])(
    "discards Trailer when a chunked POST becomes a GET on 303 ($format headers)",
    async ({ headers }) => {
      const bodyFactory = vi.fn(() => Readable.from(["payload"]));
      let redirectedHeaders: http.IncomingHttpHeaders | undefined;
      let redirectedMethod: string | undefined;
      const server = http.createServer((request, response) => {
        redirectedHeaders = request.headers;
        redirectedMethod = request.method;
        response.end("redirected");
      });
      server.on("checkContinue", (_request, response) => {
        response.writeHead(303, { Location: "/redirected" });
        response.end();
      });
      const port = await listen(server);
      const agent = new http.Agent({ keepAlive: false });
      const originalHeaders = JSON.stringify(headers);
      const request = createPipelineRequest({
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
        requestOverrides: headers ? { agent, headers } : { agent },
      });
      const pipeline = createEmptyPipeline();
      pipeline.addPolicy(redirectPolicy());

      try {
        const response = await pipeline.sendRequest(createDefaultHttpClient(), request);

        expect(response.status).toBe(200);
        expect(response.bodyAsText).toBe("redirected");
        expect(redirectedMethod).toBe("GET");
        expect(redirectedHeaders?.trailer).toBeUndefined();
        expect(redirectedHeaders?.["transfer-encoding"]).toBeUndefined();
        expect(redirectedHeaders?.["content-length"]).toBeUndefined();
        expect(redirectedHeaders?.expect).toBeUndefined();
        expect(bodyFactory).not.toHaveBeenCalled();
        expect(JSON.stringify(headers)).toBe(originalHeaders);
      } finally {
        agent.destroy();
      }
    },
  );

  describe.each([
    { expectContinue: false, progress: false },
    { expectContinue: false, progress: true },
    { expectContinue: true, progress: false },
    { expectContinue: true, progress: true },
  ])(
    "binary body factories (expectContinue=$expectContinue, progress=$progress)",
    ({ expectContinue, progress }) => {
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
      ])("normalizes a $kind returned by the client body factory", async ({ body, expected }) => {
        const bodyFactory = vi.fn(() => body);
        const onUploadProgress = vi.fn();
        const chunks: Buffer[] = [];
        let receivedHeaders: http.IncomingHttpHeaders | undefined;
        const receiveBody: http.RequestListener = (request, response) => {
          receivedHeaders = request.headers;
          request.on("data", (chunk: Buffer) => chunks.push(chunk));
          request.on("end", () => response.end("accepted"));
        };
        const server = http.createServer(receiveBody);
        server.on("checkContinue", (request, response) => {
          expect(bodyFactory).not.toHaveBeenCalled();
          expect(onUploadProgress).not.toHaveBeenCalled();
          receiveBody(request, response);
          response.writeContinue();
          response.writeContinue();
        });
        const port = await listen(server);
        const agent = new http.Agent({ keepAlive: false });
        const requestOptions = {
          body: bodyFactory,
          contentType: "application/octet-stream",
          allowInsecureConnection: true,
          headers: expectContinue ? { Expect: "100-continue" } : undefined,
          onUploadProgress: progress ? onUploadProgress : undefined,
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
          if (progress) {
            expect(onUploadProgress).toHaveBeenCalledExactlyOnceWith({
              loadedBytes: expected.byteLength,
            });
          } else {
            expect(onUploadProgress).not.toHaveBeenCalled();
          }
          if (expectContinue) {
            expect(receivedHeaders?.["content-length"]).toBeUndefined();
            expect(receivedHeaders?.["transfer-encoding"]).toBe("chunked");
          } else {
            expect(receivedHeaders?.["content-length"]).toBe(String(expected.byteLength));
            expect(receivedHeaders?.["transfer-encoding"]).toBeUndefined();
          }
        } finally {
          agent.destroy();
        }
      });
    },
  );

  it.each([
    { expectContinue: false, factory: false },
    { expectContinue: false, factory: true },
    { expectContinue: true, factory: false },
    { expectContinue: true, factory: true },
  ])(
    "prepares a body once and preserves framing with upload progress (expectContinue=$expectContinue, factory=$factory)",
    async ({ expectContinue, factory }) => {
      const body = new DataView(Uint8Array.from([0, 1, 2, 3, 4]).buffer, 1, 3);
      const bodyFactory = vi.fn(() =>
        Readable.from([Buffer.from(body.buffer, body.byteOffset, body.byteLength)]),
      );
      const progress = vi.fn();
      const chunks: Buffer[] = [];
      let receivedHeaders: http.IncomingHttpHeaders | undefined;
      const receiveBody: http.RequestListener = (request, response) => {
        receivedHeaders = request.headers;
        request.on("data", (chunk: Buffer) => chunks.push(chunk));
        request.on("end", () => response.end("accepted"));
      };
      const server = http.createServer(receiveBody);
      server.on("checkContinue", (request, response) => {
        expect(bodyFactory).not.toHaveBeenCalled();
        expect(progress).not.toHaveBeenCalled();
        receiveBody(request, response);
        response.writeContinue();
        response.writeContinue();
      });
      const port = await listen(server);

      const response = await createDefaultHttpClient().sendRequest(
        createPipelineRequest({
          url: `http://127.0.0.1:${port}`,
          method: "POST",
          allowInsecureConnection: true,
          headers: createHttpHeaders(expectContinue ? { Expect: "100-continue" } : {}),
          body: factory ? bodyFactory : body,
          onUploadProgress: progress,
        }),
      );

      expect(response.bodyAsText).toBe("accepted");
      expect(bodyFactory).toHaveBeenCalledTimes(factory ? 1 : 0);
      expect(Buffer.concat(chunks)).toEqual(Buffer.from([1, 2, 3]));
      expect(progress).toHaveBeenCalledExactlyOnceWith({ loadedBytes: 3 });
      if (factory) {
        expect(receivedHeaders?.["content-length"]).toBeUndefined();
        expect(receivedHeaders?.["transfer-encoding"]).toBe("chunked");
      } else {
        expect(receivedHeaders?.["content-length"]).toBe("3");
        expect(receivedHeaders?.["transfer-encoding"]).toBeUndefined();
      }
    },
  );

  it("waits for 100 Continue before creating and sending the body", async () => {
    const bodyFactory = vi.fn(() => Readable.from(["payload"]));
    let receivedBody = "";
    const server = http.createServer();
    server.on("checkContinue", (request, response) => {
      expect(request.headers.expect).toBe("100-continue");
      expect(bodyFactory).not.toHaveBeenCalled();
      request.setEncoding("utf8");
      request.on("data", (chunk) => {
        receivedBody += chunk;
      });
      request.on("end", () => {
        response.end("accepted");
      });
      response.writeContinue();
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
    expect(response.bodyAsText).toBe("accepted");
    expect(receivedBody).toBe("payload");
    expect(bodyFactory).toHaveBeenCalledOnce();
  });

  it("does not create the body when the server sends a final response", async () => {
    const bodyFactory = vi.fn(() => Readable.from(["payload"]));
    const server = http.createServer();
    server.on("checkContinue", (_request, response) => {
      response.writeHead(417);
      response.end("rejected");
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

    expect(response.status).toBe(417);
    expect(response.bodyAsText).toBe("rejected");
    expect(bodyFactory).not.toHaveBeenCalled();
  });

  it.each([
    { streamedResponse: false, progress: false },
    { streamedResponse: false, progress: true },
    { streamedResponse: true, progress: false },
    { streamedResponse: true, progress: true },
  ])(
    "releases the abort listener without waiting for an untouched body after rejection (streamedResponse=$streamedResponse, progress=$progress)",
    async ({ streamedResponse, progress }) => {
      const read = vi.fn();
      const body = new Readable({ read });
      const controller = new AbortController();
      const removeEventListener = vi.spyOn(controller.signal, "removeEventListener");
      const onUploadProgress = vi.fn();
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
            onUploadProgress: progress ? onUploadProgress : undefined,
            streamResponseStatusCodes: streamedResponse ? new Set([417]) : undefined,
          }),
        );

        expect(response.status).toBe(417);
        if (streamedResponse) {
          await new Promise<void>((resolve) => setImmediate(resolve));
          expect(removeEventListener).not.toHaveBeenCalled();
          const responseStream = response.readableStreamBody;
          if (!responseStream) {
            throw new Error("Expected a streamed rejection response");
          }
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
        expect(onUploadProgress).not.toHaveBeenCalled();
        expect(body.destroyed).toBe(false);
        expect(body.readableEnded).toBe(false);
        expect(body.listenerCount("data")).toBe(0);
        expect(body.listenerCount("error")).toBe(1);
        body.destroy();
        await new Promise<void>((resolve) => setImmediate(resolve));
        expect(body.listenerCount("end")).toBe(0);
        expect(body.listenerCount("close")).toBe(0);
        expect(body.listenerCount("error")).toBe(0);
      } finally {
        body.destroy();
      }
    },
  );

  it.each([
    { statusCode: 417, cancel: true },
    { statusCode: 417, cancel: false },
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
        const requestResult = httpRequest.mock.results[0];
        if (!requestResult || requestResult.type !== "return") {
          throw new Error("Expected an outgoing HTTP request");
        }
        const clientRequest = requestResult.value;
        const response = await responsePromise;
        if (!(response.readableStreamBody instanceof http.IncomingMessage)) {
          throw new Error("Expected a raw HTTP response stream");
        }
        responseStream = response.readableStreamBody;
        await expect.poll(() => clientRequest.closed).toBe(true);

        expect(response.status).toBe(statusCode);
        expect(responseStream.readableLength).toBe(8);
        expect(responseStream.readableEnded).toBe(false);
        expect(removeEventListener).not.toHaveBeenCalled();
        expect(bodyFactory).toHaveBeenCalledTimes(statusCode === 417 ? 0 : 1);
        const responseComplete = finished(responseStream, { writable: false, cleanup: true });

        if (cancel) {
          const rejection = expect(responseComplete).rejects.toMatchObject({
            name: "AbortError",
          });
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

  it.each([false, true])(
    "excludes slow DNS from the fallback (serverSendsContinue=%s)",
    async (serverSendsContinue) => {
      let bodyCreatedAt = 0;
      let headersReceivedAt = 0;
      let continueSentAt = 0;
      const bodyFactory = vi.fn(() => {
        bodyCreatedAt = Date.now();
        return Readable.from(["payload"]);
      });
      const server = http.createServer();
      server.on("checkContinue", (request, response) => {
        headersReceivedAt = Date.now();
        request.resume();
        request.on("end", () => response.end("accepted"));
        if (serverSendsContinue) {
          setTimeout(() => {
            continueSentAt = Date.now();
            response.writeContinue();
          }, 50);
        }
      });
      const port = await listen(server);
      const agent = new http.Agent({
        lookup(_hostname, options, callback) {
          setTimeout(() => lookup("127.0.0.1", options, callback), 1200);
        },
      });
      try {
        const response = await createDefaultHttpClient().sendRequest(
          createPipelineRequest({
            url: `http://delayed-lookup.test:${port}`,
            method: "POST",
            allowInsecureConnection: true,
            requestOverrides: { agent },
            headers: createHttpHeaders({ Expect: "100-continue" }),
            body: bodyFactory,
          }),
        );

        expect(response.bodyAsText).toBe("accepted");
        expect(bodyFactory).toHaveBeenCalledOnce();
        if (serverSendsContinue) {
          expect(continueSentAt).toBeGreaterThan(0);
          expect(bodyCreatedAt).toBeGreaterThanOrEqual(continueSentAt);
        } else {
          expect(bodyCreatedAt - headersReceivedAt).toBeGreaterThanOrEqual(900);
        }
      } finally {
        agent.destroy();
      }
    },
  );

  it("does not consume the fallback while queued for a reused agent socket", async () => {
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
    const agent = new http.Agent({ keepAlive: true, maxSockets: 1 });
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

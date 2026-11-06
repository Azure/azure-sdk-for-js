// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";
import { PassThrough, Readable, Writable } from "node:stream";
import type { ClientRequest, IncomingHttpHeaders, IncomingMessage } from "http";
import {
  createDefaultHttpClient,
  createHttpHeaders,
  createPipelineRequest,
} from "../../../src/index.js";
import { disposeResponseBody, getRequestCompletion } from "../../../src/util/responseBody.js";

vi.mock("node:https", async () => {
  const actual = await vi.importActual("node:https");
  return {
    default: {
      ...(actual as any).default,
      request: vi.fn(),
    },
  };
});

vi.mock("node:http", async () => {
  const actual = await vi.importActual("node:http");
  return {
    default: {
      ...(actual as any).default,
      request: vi.fn(),
    },
  };
});

import https from "node:https";
import http from "node:http";

function delay(timeInMs: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, timeInMs);
  });
}

class FakeResponse extends PassThrough {
  public statusCode?: number;
  public headers?: IncomingHttpHeaders;
}

class FakeRequest extends PassThrough {}

/**
 * Generic NodeJS streams accept typed arrays just fine,
 * but `http.ClientRequest` objects *only* support chunks
 * of `Buffer` and `string`, so we must convert them first.
 *
 * This fake asserts we have only passed the correct types.
 */
const httpRequestChecker: ClientRequest = {
  on() {
    /* no op */
  },
  once() {
    /* no op */
  },
  end(chunk: unknown) {
    const isString = typeof chunk === "string";
    assert(isString || Buffer.isBuffer(chunk), "Expected either string or Buffer");
  },
} as unknown as ClientRequest;

function createResponse(statusCode: number, body = ""): IncomingMessage {
  const response = new FakeResponse();
  response.headers = {};
  response.statusCode = statusCode;
  response.write(body);
  response.end();
  return response as unknown as IncomingMessage;
}

function createRequest(): ClientRequest {
  const request = new FakeRequest();
  return request as unknown as ClientRequest;
}

function yieldHttpsResponse(response: IncomingMessage): void {
  const lastCall = vi.mocked<{
    (
      options: string | https.RequestOptions | URL,
      callback?: ((res: IncomingMessage) => void) | undefined,
    ): ClientRequest;
  }>(https.request).mock.lastCall;
  if (!lastCall) {
    throw new Error("Cannot yield response because mock has not been called");
  }

  if (!lastCall[1]) {
    throw new Error("Mock was not called with a callback in the second parameter");
  }
  lastCall[1](response);
}

function yieldHttpResponse(response: IncomingMessage): void {
  const lastCall = vi.mocked<{
    (
      options: string | http.RequestOptions | URL,
      callback?: ((res: IncomingMessage) => void) | undefined,
    ): ClientRequest;
  }>(http.request).mock.lastCall;
  if (!lastCall) {
    throw new Error("Cannot yield response because mock has not been called");
  }

  if (!lastCall[1]) {
    throw new Error("Mock was not called with a callback in the second parameter");
  }
  lastCall[1](response);
}

describe("NodeHttpClient", function () {
  beforeEach(function () {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "Date"] });
    const clientRequest = createRequest();
    vi.mocked(https.request).mockReturnValue(clientRequest);
    vi.mocked(http.request).mockReturnValue(clientRequest);
  });

  afterEach(function () {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("shouldn't throw on 404", async function () {
    const client = createDefaultHttpClient();
    const request = createPipelineRequest({ url: "https://example.com" });
    const promise = client.sendRequest(request);
    yieldHttpsResponse(createResponse(404));
    const response = await promise;
    assert.strictEqual(response.status, 404);
  });

  it("should allow canceling of requests", async function () {
    const client = createDefaultHttpClient();
    const controller = new AbortController();
    const request = createPipelineRequest({
      url: "https://example.com",
      abortSignal: controller.signal,
    });
    const promise = client.sendRequest(request);
    controller.abort();
    try {
      await promise;
      assert.fail("Expected await to throw");
    } catch (e: any) {
      assert.strictEqual(e.name, "AbortError");
    }
  });

  it("shouldn't be affected by requests cancelled late", async function () {
    const client = createDefaultHttpClient();
    const controller = new AbortController();
    const request = createPipelineRequest({
      url: "https://example.com",
      abortSignal: controller.signal,
    });
    const promise = client.sendRequest(request);
    yieldHttpsResponse(createResponse(200));
    const response = await promise;
    controller.abort();
    assert.strictEqual(response.status, 200);
  });

  it("should allow canceling of requests before the request is made", async function () {
    const client = createDefaultHttpClient();
    const controller = new AbortController();
    controller.abort();
    const request = createPipelineRequest({
      url: "https://example.com",
      abortSignal: controller.signal,
    });
    const promise = client.sendRequest(request);
    try {
      await promise;
      assert.fail("Expected await to throw");
    } catch (e: any) {
      assert.strictEqual(e.name, "AbortError");
    }
  });

  it("should report upload and download progress", async function () {
    const client = createDefaultHttpClient();
    let downloadCalled = false;
    let uploadCalled = false;
    const request = createPipelineRequest({
      url: "https://example.com",
      body: "Some kinda witty message",
      onDownloadProgress: (ev) => {
        assert.isNumber(ev.loadedBytes);
        downloadCalled = true;
      },
      onUploadProgress: (ev) => {
        assert.isNumber(ev.loadedBytes);
        uploadCalled = true;
      },
    });
    const promise = client.sendRequest(request);
    const responseText = "An appropriate response.";
    yieldHttpsResponse(createResponse(200, responseText));
    const response = await promise;
    assert.strictEqual(response.bodyAsText, responseText);
    assert.isTrue(downloadCalled, "no download progress");
    assert.isTrue(uploadCalled, "no upload progress");
  });

  it.each([
    ["ArrayBuffer", Uint8Array.from([0, 1, 2, 3]).buffer, [0, 1, 2, 3]],
    ["DataView window", new DataView(Uint8Array.from([0, 1, 2, 3, 4, 5]).buffer, 2, 3), [2, 3, 4]],
  ] satisfies [string, ArrayBuffer | ArrayBufferView, number[]][])(
    "should report upload progress for a %s body",
    async (_, body, expectedBytes) => {
      const client = createDefaultHttpClient();
      const sentChunks: Buffer[] = [];
      const captureRequest = new PassThrough();
      captureRequest.on("data", (chunk: Buffer) => {
        sentChunks.push(chunk);
      });
      vi.mocked(https.request).mockReturnValueOnce(captureRequest as unknown as ClientRequest);

      const progress: number[] = [];
      const request = createPipelineRequest({
        url: "https://example.com",
        body,
        onUploadProgress: (event) => {
          progress.push(event.loadedBytes);
        },
      });
      const promise = client.sendRequest(request);
      yieldHttpsResponse(createResponse(200));
      const response = await promise;

      assert.strictEqual(response.status, 200);
      assert.deepStrictEqual(Array.from(Buffer.concat(sentChunks)), expectedBytes);
      assert.deepStrictEqual(progress, [expectedBytes.length]);
      assert.strictEqual(request.headers.get("Content-Length"), String(expectedBytes.length));
    },
  );

  it("should honor timeout", async function () {
    const client = createDefaultHttpClient();

    const timeoutLength = 2000;
    const request = createPipelineRequest({
      url: "https://example.com",
      timeout: timeoutLength,
    });
    const promise = client.sendRequest(request);
    vi.advanceTimersByTime(timeoutLength);
    try {
      await promise;
      assert.fail("Expected await to throw");
    } catch (e: any) {
      assert.strictEqual(e.name, "AbortError");
    }
  });

  it("should honor timeout while reading a buffered response body", async function () {
    const client = createDefaultHttpClient();
    const timeoutLength = 2000;
    const streamResponse = new FakeResponse();
    const clientRequest = createRequest();
    clientRequest.destroy = function (this: FakeRequest, e: Error) {
      streamResponse.destroy(e);
      return clientRequest;
    };
    vi.mocked(https.request).mockReturnValueOnce(clientRequest);

    const request = createPipelineRequest({
      url: "https://example.com",
      timeout: timeoutLength,
    });
    const promise = client.sendRequest(request);
    streamResponse.headers = {};
    streamResponse.statusCode = 200;
    streamResponse.write("The start of an HTTP body");
    yieldHttpsResponse(streamResponse as unknown as IncomingMessage);
    await Promise.resolve();

    vi.advanceTimersByTime(timeoutLength);

    try {
      await promise;
      assert.fail("Expected await to throw");
    } catch (e: any) {
      assert.strictEqual(e.name, "AbortError");
    }
  });

  it("should clear timeout before returning a streamed response body", async function () {
    const client = createDefaultHttpClient();
    const timeoutLength = 2000;
    const request = createPipelineRequest({
      url: "https://example.com",
      timeout: timeoutLength,
      streamResponseStatusCodes: new Set([200]),
    });
    const promise = client.sendRequest(request);
    const streamResponse = new FakeResponse();
    streamResponse.headers = {};
    streamResponse.statusCode = 200;
    streamResponse.write("The start of an HTTP body");
    yieldHttpsResponse(streamResponse as unknown as IncomingMessage);

    const response = await promise;

    assert.isDefined(response.readableStreamBody);
    assert.strictEqual(vi.getTimerCount(), 0);
    streamResponse.destroy();
  });

  it("should stream response body on matching status code", async function () {
    const client = createDefaultHttpClient();
    const request = createPipelineRequest({
      url: "https://example.com",
      streamResponseStatusCodes: new Set([200]),
    });
    const promise = client.sendRequest(request);
    yieldHttpsResponse(createResponse(200, "body"));
    const response = await promise;
    assert.equal(response.bodyAsText, undefined);
    assert.isDefined(response.readableStreamBody);
  });

  it("should stream response body on any status code", async function () {
    const client = createDefaultHttpClient();
    const request = createPipelineRequest({
      url: "https://example.com",
      streamResponseStatusCodes: new Set([Number.POSITIVE_INFINITY]),
    });
    const promise = client.sendRequest(request);
    yieldHttpsResponse(createResponse(201, "body"));
    const response = await promise;
    assert.equal(response.bodyAsText, undefined);
    assert.isDefined(response.readableStreamBody);
  });

  it("should not stream response body on non-matching status code", async function () {
    const client = createDefaultHttpClient();
    const request = createPipelineRequest({
      url: "https://example.com",
      streamResponseStatusCodes: new Set([200]),
    });
    const promise = client.sendRequest(request);
    yieldHttpsResponse(createResponse(400, "body"));
    const response = await promise;
    assert.equal(response.bodyAsText, "body");
    assert.strictEqual(response.readableStreamBody, undefined);
  });

  it("should throw when accessing HTTP and allowInsecureConnection is false", async function () {
    const client = createDefaultHttpClient();
    const request = createPipelineRequest({
      url: "http://example.com",
    });
    const promise = client.sendRequest(request);
    try {
      await promise;
      assert.fail("Expected await to throw");
    } catch (e: any) {
      assert.match(e.message, /^Cannot connect/, "Error should refuse connection");
    }
  });

  it("shouldn't throw when accessing HTTP and allowInsecureConnection is true", async function () {
    const client = createDefaultHttpClient();
    const request = createPipelineRequest({
      allowInsecureConnection: true,
      url: "http://example.com",
    });
    const promise = client.sendRequest(request);
    yieldHttpResponse(createResponse(200, "body"));
    const response = await promise;
    assert.strictEqual(response.status, 200);
  });

  it("Should decode chunked responses properly", async function () {
    const client = createDefaultHttpClient();
    const request = createPipelineRequest({
      url: "https://example.com",
    });
    const promise = client.sendRequest(request);

    const inputString = "€€€€";
    const streamResponse = new FakeResponse();
    streamResponse.headers = {};
    streamResponse.statusCode = 200;
    const buffer = Buffer.from(inputString);
    let buffer2 = Buffer.alloc(4);
    buffer.copy(buffer2, 0, 0, 4);
    streamResponse.write(buffer2);
    buffer2 = Buffer.alloc(buffer.length - 4);
    buffer.copy(buffer2, 0, 4);
    streamResponse.write(buffer2);
    streamResponse.end();
    yieldHttpsResponse(streamResponse as unknown as IncomingMessage);
    const response = await promise;
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.bodyAsText, inputString);
  });

  it("should handle typed array bodies correctly", async function () {
    const client = createDefaultHttpClient();
    vi.mocked(https.request).mockReturnValueOnce(httpRequestChecker);

    const data = new Uint8Array(10);
    for (let i = 0; i < 10; i++) {
      data[i] = i;
    }

    const request = createPipelineRequest({
      url: "https://example.com",
      body: data,
    });
    const promise = client.sendRequest(request);
    yieldHttpsResponse(createResponse(200));
    const response = await promise;
    assert.strictEqual(response.status, 200);
  });

  it("should send only the ArrayBufferView window for subarray bodies", async function () {
    const client = createDefaultHttpClient();
    let sentChunk: unknown;
    const captureChunkRequest: ClientRequest = {
      on() {
        /* no op */
      },
      once() {
        /* no op */
      },
      end(chunk: unknown) {
        sentChunk = chunk;
      },
    } as unknown as ClientRequest;
    vi.mocked(https.request).mockReturnValueOnce(captureChunkRequest);

    const data = Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7]);
    const subarray = data.subarray(2, 6);
    const request = createPipelineRequest({
      url: "https://example.com",
      body: subarray,
    });
    const promise = client.sendRequest(request);
    yieldHttpsResponse(createResponse(200));
    const response = await promise;

    assert.strictEqual(response.status, 200);
    assert.isTrue(Buffer.isBuffer(sentChunk), "Expected request body to be a Buffer");
    assert.deepStrictEqual(Array.from(sentChunk as Buffer), [2, 3, 4, 5]);
    assert.strictEqual((sentChunk as Buffer).byteLength, subarray.byteLength);
    assert.strictEqual(request.headers.get("Content-Length"), String(subarray.byteLength));
  });

  it("should handle ArrayBuffer bodies correctly", async function () {
    const client = createDefaultHttpClient();
    vi.mocked(https.request).mockReturnValueOnce(httpRequestChecker);

    const data = new Uint8Array(10);
    for (let i = 0; i < 10; i++) {
      data[i] = i;
    }

    const request = createPipelineRequest({
      url: "https://example.com",
      body: data.buffer,
    });
    const promise = client.sendRequest(request);
    yieldHttpsResponse(createResponse(200));
    const response = await promise;
    assert.strictEqual(response.status, 200);
  });

  it("should handle Buffer bodies correctly", async function () {
    const client = createDefaultHttpClient();
    let sentChunk: unknown;
    const captureChunkRequest: ClientRequest = {
      on() {
        /* no op */
      },
      once() {
        /* no op */
      },
      end(chunk: unknown) {
        sentChunk = chunk;
      },
    } as unknown as ClientRequest;
    vi.mocked(https.request).mockReturnValueOnce(captureChunkRequest);

    const data = Buffer.from("example text");

    const request = createPipelineRequest({
      url: "https://example.com",
      body: data,
    });
    const promise = client.sendRequest(request);
    yieldHttpsResponse(createResponse(200));
    const response = await promise;
    assert.strictEqual(response.status, 200);
    assert.strictEqual(sentChunk, data);
  });

  it("should handle string bodies correctly", async function () {
    const client = createDefaultHttpClient();
    vi.mocked(https.request).mockReturnValueOnce(httpRequestChecker);

    const request = createPipelineRequest({ url: "https://example.com", body: "test data" });
    const promise = client.sendRequest(request);
    yieldHttpsResponse(createResponse(200));
    const response = await promise;
    assert.strictEqual(response.status, 200);
  });

  it("should handle NodeJS.ReadableStream bodies correctly", async function () {
    const requestText = "testing resettable stream";
    const client = createDefaultHttpClient();
    let bodySent = false;
    const writable = new Writable({
      write: (chunk, _, next) => {
        bodySent = true;
        assert.equal(chunk.toString(), requestText, "Unexpected body");
        next();
      },
    }) as unknown as ClientRequest;
    vi.mocked(https.request).mockReturnValueOnce(writable);

    const stream = new PassThrough();
    stream.write(requestText);
    stream.end();
    const body = stream;
    const request = createPipelineRequest({ url: "https://example.com", body });
    const promise = client.sendRequest(request);
    yieldHttpsResponse(createResponse(200));
    await promise;
    assert.isTrue(bodySent, "body should have been piped to request");
  });

  it("should handle () => NodeJS.ReadableStream bodies correctly", async function () {
    const requestText = "testing resettable stream";
    const client = createDefaultHttpClient();
    let bodySent = false;
    const writable = new Writable({
      write: (chunk, _, next) => {
        bodySent = true;
        assert.equal(chunk.toString(), requestText, "Unexpected body");
        next();
      },
    }) as unknown as ClientRequest;
    vi.mocked(https.request).mockReturnValueOnce(writable);

    const body = (): PassThrough => {
      const stream = new PassThrough();
      stream.write(requestText);
      stream.end();
      return stream;
    };
    const request = createPipelineRequest({ url: "https://example.com", body });
    const promise = client.sendRequest(request);
    yieldHttpsResponse(createResponse(200));
    await promise;
    assert.isTrue(bodySent, "body should have been piped to request");
  });

  it.each([false, true])(
    "should reject when a request body stream closes before ending (progress=%s)",
    async function (progress) {
      const client = createDefaultHttpClient();
      const writable = new Writable({
        write(_chunk, _encoding, callback) {
          callback();
        },
      }) as unknown as ClientRequest;
      vi.mocked(https.request).mockReturnValueOnce(writable);
      const body = new Readable({
        read() {
          this.destroy();
        },
      });
      const request = createPipelineRequest({
        url: "https://example.com",
        body,
        onUploadProgress: progress ? () => {} : undefined,
      });

      await expect(client.sendRequest(request)).rejects.toThrow(
        "Request body stream closed before ending",
      );
    },
  );

  it.each([false, true])(
    "should preserve request body stream error codes (progress=%s)",
    async function (progress) {
      const client = createDefaultHttpClient();
      const writable = new Writable({
        write(_chunk, _encoding, callback) {
          callback();
        },
      }) as unknown as ClientRequest;
      vi.mocked(https.request).mockReturnValueOnce(writable);
      const body = new Readable({
        read() {
          this.destroy(Object.assign(new Error("upload failed"), { code: "EIO" }));
        },
      });
      const request = createPipelineRequest({
        url: "https://example.com",
        body,
        onUploadProgress: progress ? () => {} : undefined,
      });

      await expect(client.sendRequest(request)).rejects.toMatchObject({
        name: "RestError",
        code: "EIO",
        message: "upload failed",
      });
    },
  );

  it.each([false, true])(
    "removes upload completion listeners after the source ends (progress=%s)",
    async function (progress) {
      vi.useRealTimers();
      const body = new PassThrough();
      const writable = new Writable({
        write(_chunk, _encoding, callback) {
          callback();
        },
      });
      vi.mocked(https.request).mockReturnValueOnce(writable as unknown as ClientRequest);
      const request = createPipelineRequest({
        url: "https://example.com",
        body,
        onUploadProgress: progress ? () => {} : undefined,
      });
      const promise = createDefaultHttpClient().sendRequest(request);
      body.end("complete upload");
      yieldHttpsResponse(createResponse(200));
      await promise;
      await delay(0);

      expect(body.listenerCount("end")).toBe(0);
      expect(body.listenerCount("error")).toBe(0);
      expect(body.listenerCount("close")).toBe(0);
    },
  );

  it("tracks an outgoing request after response headers arrive", async function () {
    const client = createDefaultHttpClient();
    let finishRequest!: () => void;
    const writable = new Writable({
      autoDestroy: false,
      final(callback) {
        finishRequest = callback;
      },
    }) as unknown as ClientRequest;
    vi.mocked(https.request).mockReturnValueOnce(writable);
    const request = createPipelineRequest({ url: "https://example.com" });
    const promise = client.sendRequest(request);
    yieldHttpsResponse(createResponse(200));

    const response = await promise;
    const completion = getRequestCompletion(response);
    assert.isDefined(completion);
    finishRequest();
    await completion;
    assert.isUndefined(getRequestCompletion(response));
    writable.destroy();
  });

  it("removes the abort listener from the signal used for the request", async function () {
    vi.useRealTimers();
    const client = createDefaultHttpClient();
    const controller = new AbortController();
    const removeEventListener = vi.spyOn(controller.signal, "removeEventListener");
    const responseStream = new FakeResponse();
    responseStream.headers = {};
    responseStream.statusCode = 200;
    const request = createPipelineRequest({
      url: "https://example.com",
      abortSignal: controller.signal,
      streamResponseStatusCodes: new Set([200]),
    });
    const promise = client.sendRequest(request);
    yieldHttpsResponse(responseStream as unknown as IncomingMessage);
    const response = await promise;
    request.abortSignal = new AbortController().signal;
    responseStream.destroy();
    await delay(0);

    assert.isDefined(response.readableStreamBody);
    assert.strictEqual(removeEventListener.mock.calls.length, 1);
    assert.strictEqual(removeEventListener.mock.calls[0][0], "abort");
  });

  it("keeps the abort listener until the outgoing request finishes", async function () {
    vi.useRealTimers();
    const client = createDefaultHttpClient();
    const controller = new AbortController();
    const removeEventListener = vi.spyOn(controller.signal, "removeEventListener");
    const clientRequest = new Writable({
      autoDestroy: false,
      write(_chunk, _encoding, callback) {
        callback();
      },
      final() {
        // Keep the request pending after response headers and body complete.
      },
    }) as unknown as ClientRequest;
    const destroy = vi.spyOn(clientRequest, "destroy");
    vi.mocked(https.request).mockReturnValueOnce(clientRequest);
    const request = createPipelineRequest({
      url: "https://example.com",
      body: "request body",
      abortSignal: controller.signal,
    });
    const promise = client.sendRequest(request);
    yieldHttpsResponse(createResponse(200));

    await promise;
    await delay(0);
    expect(removeEventListener).not.toHaveBeenCalled();

    controller.abort();
    expect(destroy).toHaveBeenCalledWith(expect.objectContaining({ name: "AbortError" }));
    await delay(0);
    expect(removeEventListener).toHaveBeenCalledOnce();
  });

  it("disposes the underlying response through decompression and progress transforms", async function () {
    const client = createDefaultHttpClient();
    const streamResponse = new FakeResponse();
    streamResponse.headers = { "content-encoding": "gzip" };
    streamResponse.statusCode = 200;
    const destroy = vi.spyOn(streamResponse, "destroy");
    const request = createPipelineRequest({
      url: "https://example.com",
      headers: createHttpHeaders({ "Accept-Encoding": "gzip" }),
      onDownloadProgress: () => {},
      streamResponseStatusCodes: new Set([200]),
    });
    const promise = client.sendRequest(request);
    yieldHttpsResponse(streamResponse as unknown as IncomingMessage);

    const response = await promise;
    await disposeResponseBody(response);

    expect(destroy).toHaveBeenCalledOnce();
  });

  it("keeps the source error observer until completion after destroy then abort", async function () {
    vi.useRealTimers();
    const streamResponse = new FakeResponse();
    streamResponse.headers = {};
    streamResponse.statusCode = 200;
    const controller = new AbortController();
    const removeEventListener = vi.spyOn(controller.signal, "removeEventListener");
    const promise = createDefaultHttpClient().sendRequest(
      createPipelineRequest({
        url: "https://example.com",
        abortSignal: controller.signal,
        onDownloadProgress: () => {},
        streamResponseStatusCodes: new Set([200]),
      }),
    );
    yieldHttpsResponse(streamResponse as unknown as IncomingMessage);
    const response = await promise;
    const body = response.readableStreamBody;
    if (!(body instanceof Readable)) {
      throw new Error("Expected a Node readable response");
    }

    const sourceError = vi.fn();
    streamResponse.on("error", sourceError);
    const sourceClosed = new Promise<void>((resolve) => streamResponse.once("close", resolve));
    const destinationClosed = new Promise<number>((resolve) => {
      body.once("close", () => {
        // The test observer prevents a process crash; the transport must retain its own too.
        resolve(streamResponse.listenerCount("error"));
      });
    });

    try {
      body.destroy();
      controller.abort();
      const errorObserversAtClose = await destinationClosed;
      await sourceClosed;
      await delay(0);

      expect(errorObserversAtClose).toBeGreaterThan(1);
      expect(sourceError).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({ name: "AbortError" }),
      );
      expect(streamResponse.listenerCount("error")).toBe(1);
      expect(removeEventListener).toHaveBeenCalledOnce();
    } finally {
      streamResponse.removeListener("error", sourceError);
      body.destroy();
      streamResponse.destroy();
    }
  });

  it.each([
    { encoding: "gzip", progress: false },
    { encoding: "deflate", progress: false },
    { encoding: undefined, progress: false },
    { encoding: undefined, progress: true },
    { encoding: "gzip", progress: true },
  ])(
    "rejects a buffered response when its source closes prematurely (encoding=$encoding, progress=$progress)",
    async function ({ encoding, progress }) {
      vi.useRealTimers();
      const streamResponse = new FakeResponse();
      streamResponse.headers = encoding ? { "content-encoding": encoding } : {};
      streamResponse.statusCode = 200;
      const request = createPipelineRequest({
        url: "https://example.com",
        headers: createHttpHeaders({ "Accept-Encoding": "gzip,deflate" }),
        onDownloadProgress: progress ? () => {} : undefined,
      });
      const result = createDefaultHttpClient()
        .sendRequest(request)
        .then(
          () => undefined,
          (error: unknown) => error,
        );
      yieldHttpsResponse(streamResponse as unknown as IncomingMessage);
      await delay(0);

      streamResponse.destroy();

      expect(await result).toMatchObject({ name: "RestError", code: "PARSE_ERROR" });
    },
  );

  it.each([false, true])(
    "removes buffered response listeners after settlement (failure=%s)",
    async function (failure) {
      vi.useRealTimers();
      const streamResponse = new FakeResponse();
      streamResponse.headers = {};
      streamResponse.statusCode = 200;
      const promise = createDefaultHttpClient().sendRequest(
        createPipelineRequest({ url: "https://example.com" }),
      );
      yieldHttpsResponse(streamResponse as unknown as IncomingMessage);
      await Promise.resolve();

      if (failure) {
        streamResponse.destroy(new Error("response failed"));
        await expect(promise).rejects.toMatchObject({
          name: "RestError",
          code: "PARSE_ERROR",
        });
      } else {
        streamResponse.end("complete response");
        expect((await promise).bodyAsText).toBe("complete response");
      }
      await delay(0);

      expect(streamResponse.listenerCount("data")).toBe(0);
      expect(streamResponse.listenerCount("end")).toBe(0);
      expect(streamResponse.listenerCount("error")).toBe(0);
      expect(streamResponse.listenerCount("close")).toBe(0);
    },
  );

  it.each([
    { encoding: "gzip", progress: false },
    { encoding: "deflate", progress: false },
    { encoding: undefined, progress: true },
    { encoding: "gzip", progress: true },
  ])(
    "closes the underlying response when the caller destroys its transform (encoding=$encoding, progress=$progress)",
    async function ({ encoding, progress }) {
      vi.useRealTimers();
      const streamResponse = new FakeResponse();
      streamResponse.headers = encoding ? { "content-encoding": encoding } : {};
      streamResponse.statusCode = 200;
      const controller = new AbortController();
      const removeEventListener = vi.spyOn(controller.signal, "removeEventListener");
      const request = createPipelineRequest({
        url: "https://example.com",
        abortSignal: controller.signal,
        headers: createHttpHeaders({ "Accept-Encoding": "gzip,deflate" }),
        onDownloadProgress: progress ? () => {} : undefined,
        streamResponseStatusCodes: new Set([200]),
      });
      const promise = createDefaultHttpClient().sendRequest(request);
      yieldHttpsResponse(streamResponse as unknown as IncomingMessage);
      const response = await promise;
      const body = response.readableStreamBody;
      if (!(body instanceof Readable)) {
        throw new Error("Expected a Node readable response");
      }

      try {
        body.destroy();
        await delay(0);

        expect(streamResponse.destroyed).toBe(true);
        expect(removeEventListener).toHaveBeenCalledOnce();
      } finally {
        streamResponse.destroy();
      }
    },
  );

  it.each([false, true])(
    "does not turn synchronous upload cleanup into a premature-close error (progress=%s)",
    async function (progress) {
      vi.useRealTimers();
      const body = new Readable({ read() {} });
      const destroyBody = body.destroy.bind(body);
      vi.spyOn(body, "destroy").mockImplementation((error) => {
        body.emit("close");
        return destroyBody(error);
      });
      const clientRequest = new Writable({
        write(_chunk, _encoding, callback) {
          callback();
        },
      });
      let upload: Readable | undefined;
      clientRequest.once("pipe", (source: Readable) => {
        upload = source;
      });
      vi.mocked(https.request).mockReturnValueOnce(clientRequest as unknown as ClientRequest);
      const request = createPipelineRequest({
        url: "https://example.com",
        body,
        onUploadProgress: progress ? () => {} : undefined,
      });
      const promise = createDefaultHttpClient().sendRequest(request);
      yieldHttpsResponse(createResponse(200));
      await promise;
      if (!upload) throw new Error("Expected an upload stream");
      const destroyUpload = vi.spyOn(upload, "destroy");
      const destroyRequest = vi.spyOn(clientRequest, "destroy");

      try {
        clientRequest.destroy();
        await delay(0);

        expect(body.destroyed).toBe(true);
        expect(destroyRequest).not.toHaveBeenCalledWith(expect.any(Error));
        expect(destroyUpload).not.toHaveBeenCalledWith(expect.any(Error));
      } finally {
        body.destroy();
        upload.destroy();
      }
    },
  );

  it.each([false, true])(
    "keeps upload source observers through destination teardown (progress=%s)",
    async function (progress) {
      vi.useRealTimers();
      const body = new Readable({ read() {} });
      const clientRequest = new Writable({
        write(_chunk, _encoding, callback) {
          callback();
        },
      });
      let upload: Readable | undefined;
      clientRequest.once("pipe", (source: Readable) => {
        upload = source;
      });
      vi.mocked(https.request).mockReturnValueOnce(clientRequest as unknown as ClientRequest);
      const controller = new AbortController();
      const removeEventListener = vi.spyOn(controller.signal, "removeEventListener");
      const promise = createDefaultHttpClient().sendRequest(
        createPipelineRequest({
          url: "https://example.com",
          body,
          abortSignal: controller.signal,
          onUploadProgress: progress ? () => {} : undefined,
        }),
      );
      yieldHttpsResponse(createResponse(200));
      await promise;
      if (!upload) {
        throw new Error("Expected an upload stream");
      }

      const destination = progress ? upload : clientRequest;
      const destroyDestination = vi.spyOn(destination, "destroy");
      const sourceError = vi.fn();
      // Guard the queued error while checking that the transport keeps its own observer.
      body.on("error", sourceError);
      const errorObserversBeforeClose = body.listenerCount("error");
      const sourceClosed = new Promise<void>((resolve) => body.once("close", resolve));
      const destinationClosed = new Promise<number>((resolve) => {
        destination.once("close", () => resolve(body.listenerCount("error")));
      });
      const failure = new Error("upload failed during teardown");

      try {
        destination.destroy();
        body.destroy(failure);
        const closedBeforeEvents = body.closed;
        const errorObserversAtClose = await destinationClosed;
        await sourceClosed;
        await delay(0);

        expect(closedBeforeEvents).toBe(true);
        expect(errorObserversAtClose).toBe(errorObserversBeforeClose);
        expect(sourceError).toHaveBeenCalledExactlyOnceWith(failure);
        expect(destroyDestination).not.toHaveBeenCalledWith(expect.any(Error));
        expect(body.listenerCount("error")).toBe(1);
        expect(body.listenerCount("end")).toBe(0);
        expect(body.listenerCount("close")).toBe(0);
        expect(removeEventListener).toHaveBeenCalledOnce();
      } finally {
        body.removeListener("error", sourceError);
        clientRequest.destroy();
        upload.destroy();
        body.destroy();
      }
    },
  );

  it.each([false, true])(
    "removes the abort listener when request validation fails before creating a transport (progress=%s)",
    async function (progress) {
      vi.useRealTimers();
      const body = new Readable({ read() {} });
      const controller = new AbortController();
      const removeEventListener = vi.spyOn(controller.signal, "removeEventListener");
      const request = createPipelineRequest({
        url: "http://example.com",
        body,
        abortSignal: controller.signal,
        onUploadProgress: progress ? () => {} : undefined,
      });

      try {
        await expect(createDefaultHttpClient().sendRequest(request)).rejects.toThrow(
          "allowInsecureConnection is false",
        );
        await delay(0);

        expect(removeEventListener).toHaveBeenCalledOnce();
        expect(http.request).not.toHaveBeenCalled();
      } finally {
        body.destroy();
      }
    },
  );

  it("cleans up the abort listener and timeout if the body factory throws", async function () {
    const controller = new AbortController();
    const removeEventListener = vi.spyOn(controller.signal, "removeEventListener");
    const request = createPipelineRequest({
      url: "https://example.com",
      abortSignal: controller.signal,
      timeout: 1000,
      body: () => {
        throw new Error("body factory failed");
      },
    });

    await expect(createDefaultHttpClient().sendRequest(request)).rejects.toThrow(
      "body factory failed",
    );
    expect(removeEventListener).toHaveBeenCalledOnce();
    expect(vi.getTimerCount()).toBe(0);
  });

  it.each([false, true])(
    "terminates the upload when an early response's request closes (progress=%s)",
    async function (progress) {
      vi.useRealTimers();
      const body = new Readable({ read() {} });
      body.push(Buffer.alloc(128 * 1024));
      const clientRequest = new Writable({
        write() {
          // Hold the upload under backpressure.
        },
      });
      let upload: Readable | undefined;
      clientRequest.once("pipe", (source: Readable) => {
        upload = source;
      });
      vi.mocked(https.request).mockReturnValueOnce(clientRequest as unknown as ClientRequest);
      const controller = new AbortController();
      const removeEventListener = vi.spyOn(controller.signal, "removeEventListener");
      const request = createPipelineRequest({
        url: "https://example.com",
        method: "PUT",
        body,
        abortSignal: controller.signal,
        onUploadProgress: progress ? () => {} : undefined,
        streamResponseStatusCodes: new Set([307]),
      });
      const promise = createDefaultHttpClient().sendRequest(request);
      const streamResponse = createResponse(307);
      yieldHttpsResponse(streamResponse);

      try {
        await promise;
        await delay(0);
        expect(upload).toBeDefined();
        expect(body.destroyed).toBe(false);
        streamResponse.destroy();
        clientRequest.destroy();
        await delay(0);

        expect(body.destroyed).toBe(true);
        expect(upload?.destroyed).toBe(true);
        expect(removeEventListener).toHaveBeenCalledOnce();
      } finally {
        clientRequest.destroy();
        upload?.destroy();
        body.destroy();
        streamResponse.destroy();
      }
    },
  );

  it.each(["buffered", "closed stream", "HEAD"])(
    "disposes an incomplete outgoing request after a %s response",
    async function (responseType) {
      vi.useRealTimers();
      const body = new Readable({ read() {} });
      const clientRequest = new Writable({
        write(_chunk, _encoding, callback) {
          callback();
        },
      });
      vi.mocked(https.request).mockReturnValueOnce(clientRequest as unknown as ClientRequest);
      const request = createPipelineRequest({
        url: "https://example.com",
        method: responseType === "HEAD" ? "HEAD" : "PUT",
        body,
        streamResponseStatusCodes: responseType === "closed stream" ? new Set([503]) : undefined,
      });
      const promise = createDefaultHttpClient().sendRequest(request);
      const streamResponse = createResponse(503);
      yieldHttpsResponse(streamResponse);

      try {
        const response = await promise;
        if (responseType === "closed stream") {
          streamResponse.resume();
        }
        await delay(0);
        expect(streamResponse.closed).toBe(true);
        expect(clientRequest.destroyed).toBe(false);

        await disposeResponseBody(response);
        await delay(0);

        expect(clientRequest.destroyed).toBe(true);
        expect(body.destroyed).toBe(true);
      } finally {
        clientRequest.destroy();
        body.destroy();
        streamResponse.destroy();
      }
    },
  );

  it("does not destroy a completed outgoing request when disposing its buffered response", async function () {
    vi.useRealTimers();
    const clientRequest = new Writable({
      autoDestroy: false,
      write(_chunk, _encoding, callback) {
        callback();
      },
    });
    vi.mocked(https.request).mockReturnValueOnce(clientRequest as unknown as ClientRequest);
    const request = createPipelineRequest({ url: "https://example.com" });
    const promise = createDefaultHttpClient().sendRequest(request);
    yieldHttpsResponse(createResponse(200));

    try {
      const response = await promise;
      await delay(0);
      expect(clientRequest.writableFinished).toBe(true);

      await disposeResponseBody(response);

      expect(clientRequest.destroyed).toBe(false);
    } finally {
      clientRequest.destroy();
    }
  });

  it("should return an AbortError when aborted while reading the HTTP response", async function () {
    vi.useRealTimers();
    const client = createDefaultHttpClient();
    const controller = new AbortController();

    const request = createPipelineRequest({
      url: "https://example.com",
      abortSignal: controller.signal,
    });

    const streamResponse = new FakeResponse();
    const clientRequest = createRequest();
    clientRequest.destroy = function (this: FakeRequest, e: Error) {
      // give it some time to attach listeners and read from the stream
      setTimeout(() => {
        streamResponse.destroy(e);
      }, 0);
      return clientRequest;
    };
    vi.mocked(https.request).mockReturnValueOnce(clientRequest);
    const promise = client.sendRequest(request);
    streamResponse.headers = {};
    streamResponse.statusCode = 200;
    const buffer = Buffer.from("The start of an HTTP body");
    streamResponse.write(buffer);
    yieldHttpsResponse(streamResponse as unknown as IncomingMessage);
    controller.abort();

    try {
      await promise;
      assert.fail("Expected await to throw");
    } catch (e: any) {
      assert.strictEqual(e.name, "AbortError");
    }
  });

  it("should release abort listener when stream body ends already", async function () {
    vi.useRealTimers();
    const client = createDefaultHttpClient();
    const writable = new Writable({
      write: (_chunk, _, next) => {
        next();
      },
    }) as unknown as ClientRequest;
    vi.mocked(https.request).mockReturnValueOnce(writable);

    const controller = new AbortController();
    const removeEventListenerSpy = vi.spyOn(controller.signal, "removeEventListener");

    const stream = new PassThrough();
    stream.end();
    const request = createPipelineRequest({
      url: "https://example.com",
      body: stream,
      abortSignal: controller.signal,
    });

    const promise = client.sendRequest(request);
    yieldHttpsResponse(createResponse(200));
    await Promise.all([promise, delay(10)]);
    assert.strictEqual(
      removeEventListenerSpy.mock.calls.length,
      1,
      "removeEventListener should be called once",
    );
    const [eventName] = removeEventListenerSpy.mock.calls[0];
    assert.strictEqual(eventName, "abort", "should remove abort listener");
    removeEventListenerSpy.mockRestore();
  });
});

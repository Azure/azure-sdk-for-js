// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi, beforeEach, afterEach } from "vitest";
import { createFetchHttpClient } from "../../src/fetchHttpClient.js";
import { createPipelineRequest } from "../../src/pipelineRequest.js";
import { png } from "./mocks/encodedPng.js";
import { createHttpHeaders } from "../../src/httpHeaders.js";
import { AbortError } from "../../src/abort-controller/AbortError.js";
import { delay } from "../../src/util/helpers.js";
import { arrayBufferViewToArrayBuffer } from "../../src/util/arrayBuffer.js";

const streamBody = new ReadableStream({
  async start(controller) {
    controller.enqueue(png);
    controller.close();
  },
});

function createResponse(
  statusCode: number,
  body = "",
  chunkDelay = 0,
  chunkNumber?: number,
  abortSignal?: AbortSignal,
): Response {
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const view = encoder.encode(body);
      if (chunkNumber) {
        for (let i = 0; i < chunkNumber; i++) {
          const chunk = view.slice(i, i + 1);
          controller.enqueue(chunk);
          await delay(chunkDelay);
          if (abortSignal?.aborted) {
            throw new AbortError();
          }
        }
      } else if (view.length > 1) {
        const first = view.slice(0, 1);
        const second = view.slice(1);
        controller.enqueue(first);
        await delay(chunkDelay);
        controller.enqueue(second);
      } else {
        controller.enqueue(view);
      }

      controller.close();
    },
  });
  return new Response(stream, { status: statusCode });
}

describe("FetchHttpClient", function () {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
    if (vi.isFakeTimers()) {
      vi.useRealTimers();
    }
  });

  it("shouldn't throw on 404", async function () {
    const mockedResponse = createResponse(404);
    vi.mocked(fetch).mockResolvedValue(mockedResponse);

    const client = createFetchHttpClient();

    const request = createPipelineRequest({ url: "https://localhost/404" });
    const response = await client.sendRequest(request);
    assert.strictEqual(response.status, 404);
  });

  it("should allow canceling of requests", async function () {
    const mockedResponse = createResponse(404);
    const timeoutLength = 2000;
    vi.useFakeTimers();
    vi.mocked(fetch).mockImplementation(async (_url, options) => {
      await delay(timeoutLength);
      if (options?.signal) {
        const signal: AbortSignal = options.signal;

        if (signal.aborted) {
          throw new AbortError();
        }
      }

      return mockedResponse;
    });
    const controller = new AbortController();
    const url = `http://localhost:3000/files/stream/verylarge`;
    const client = createFetchHttpClient();
    const request = createPipelineRequest({
      url,
      abortSignal: controller.signal,
      allowInsecureConnection: true,
      method: "GET",
      onDownloadProgress: (ev) => {
        assert.isNumber(ev.loadedBytes);
      },
    });
    const promise = client.sendRequest(request);
    vi.advanceTimersByTime(timeoutLength - 1);
    controller.abort();
    vi.advanceTimersByTime(1);

    try {
      await promise;
      assert.fail(`Expected await to throw`);
    } catch (e: any) {
      assert.strictEqual(e.name, "AbortError");
    }
  });

  it("should return AbortError while reading stream", async function () {
    vi.useFakeTimers();
    const body = "This is an example text for abort test";
    vi.mocked(fetch).mockImplementation(async (_url, options) => {
      if (!options?.signal) {
        throw new Error("Abort signal is not received");
      }
      return createResponse(200, body, 0, 20, options.signal);
    });
    const controller = new AbortController();
    const url = `http://localhost:3000/files/stream/abort`;
    const client = createFetchHttpClient();
    const request = createPipelineRequest({
      url,
      abortSignal: controller.signal,
      allowInsecureConnection: true,
      method: "GET",
      enableBrowserStreams: true,
      streamResponseStatusCodes: new Set([200]),
    });
    const promise = client.sendRequest(request);
    vi.advanceTimersByTime(100);
    controller.abort();
    vi.advanceTimersByTime(1);
    try {
      const response = await promise;
      const reader = response.browserStreamBody!.getReader();
      let finishReading = false;
      while (!finishReading) {
        const chunk = await reader.read();
        if (chunk.done) {
          finishReading = true;
        }
      }
      assert.fail(`Expected await to throw`);
    } catch (error: any) {
      assert.strictEqual(error.name, "AbortError");
    }
  });

  it("shouldn't be affected by requests cancelled late", async function () {
    const blob = new Blob();
    const mockedResponse = new Response(blob, { status: 200 });
    vi.mocked(fetch).mockResolvedValue(mockedResponse);

    const client = createFetchHttpClient();
    const controller = new AbortController();

    const request = createPipelineRequest({
      url: "https://localhost/abort",
      abortSignal: controller.signal,
    });
    const promise = client.sendRequest(request);
    const response = await promise;
    controller.abort();
    assert.strictEqual(response.status, 200);
  });

  it("should allow canceling of requests before the request is made", async function () {
    const blob = new Blob();
    const mockedResponse = new Response(blob, { status: 200 });
    vi.mocked(fetch).mockResolvedValue(mockedResponse);

    const client = createFetchHttpClient();
    const controller = new AbortController();
    controller.abort();
    const request = createPipelineRequest({
      url: "https://localhost/abort",
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

  it("should load chunk by chunk", async function () {
    const client = createFetchHttpClient();
    const responseText = "An appropriate response.";
    vi.useFakeTimers();
    // Mocking fetch to send the first chunk right away but delay the next
    // chunk one second (1000ms).
    vi.mocked(fetch).mockResolvedValue(createResponse(200, responseText, 1000));
    const url = `http://localhost:3000/files/stream/nonempty`;
    let downloadCalled = 0;
    const request = createPipelineRequest({
      url,
      allowInsecureConnection: true,
      method: "GET",
      onDownloadProgress: (ev) => {
        assert.isNumber(ev.loadedBytes);
        downloadCalled += 1;
      },
      enableBrowserStreams: true,
      streamResponseStatusCodes: new Set([Number.POSITIVE_INFINITY]),
    });
    const response = await client.sendRequest(request);
    const reader = response.browserStreamBody!.getReader();

    // Read the first chunk
    const chunk = await reader.read();
    // Advance the mocked clock 1000ms so that the mock response
    // enqueues the second chunk
    vi.advanceTimersByTime(1000);

    // Verify that only one chunk was loaded
    assert.equal(downloadCalled, 1);
    assert.equal(chunk.done, false);
  });

  it("should report download progress and decode chunks", async function () {
    const client = createFetchHttpClient();
    const responseText = "An appropriate response.";
    vi.mocked(fetch).mockResolvedValue(createResponse(200, responseText));
    const url = `http://localhost:3000/files/stream/nonempty`;
    let downloadCalled = false;
    const request = createPipelineRequest({
      url,
      allowInsecureConnection: true,
      method: "GET",
      onDownloadProgress: (ev) => {
        assert.isNumber(ev.loadedBytes);
        downloadCalled = true;
      },
    });
    const response = await client.sendRequest(request);
    assert.isDefined(response.bodyAsText);
    assert.isTrue(downloadCalled, "no download progress");
  });

  it("should report download progress and decode chunks without TransformStream", async function () {
    // Make TransformStream undefined to simulate Firefox where it is not available
    vi.stubGlobal("TransformStream", undefined);

    const client = createFetchHttpClient();
    const responseText = "An appropriate response.";
    vi.mocked(fetch).mockResolvedValue(createResponse(200, responseText));
    const url = `http://localhost:3000/files/stream/nonempty`;
    let downloadCalled = false;
    const request = createPipelineRequest({
      url,
      allowInsecureConnection: true,
      method: "GET",
      onDownloadProgress: (ev) => {
        assert.isNumber(ev.loadedBytes);
        downloadCalled = true;
      },
    });
    const response = await client.sendRequest(request);

    assert.isDefined(response.bodyAsText);
    assert.isTrue(downloadCalled, "no download progress");
  });

  it("should report download progress when handling blob", async function () {
    const client = createFetchHttpClient();
    const responseText = "An appropriate response.";
    vi.mocked(fetch).mockResolvedValue(createResponse(200, responseText));
    const url = `http://localhost:3000/files/stream/nonempty`;
    let downloadCalled = false;
    const request = createPipelineRequest({
      url,
      allowInsecureConnection: true,
      method: "GET",
      streamResponseStatusCodes: new Set([Number.POSITIVE_INFINITY]),
      onDownloadProgress: (ev) => {
        assert.isNumber(ev.loadedBytes);
        downloadCalled = true;
      },
    });
    const response = await client.sendRequest(request);
    assert.isDefined(response.blobBody);

    const blob = await response.blobBody;
    assert.isDefined(blob?.size);
    assert.isTrue(downloadCalled, "no download progress");
  });

  it("should stream response body when status code matches", async function () {
    const client = createFetchHttpClient();
    const responseText = "An appropriate response.";
    vi.mocked(fetch).mockResolvedValue(createResponse(200, responseText));
    const url = `http://localhost:3000/files/stream/nonempty`;
    let downloadCalled = false;
    const request = createPipelineRequest({
      url,
      allowInsecureConnection: true,
      method: "GET",
      streamResponseStatusCodes: new Set([200]),
      onDownloadProgress: (ev) => {
        assert.isNumber(ev.loadedBytes);
        downloadCalled = true;
      },
    });
    const response = await client.sendRequest(request);
    assert.isDefined(response.blobBody);

    const blob = await response.blobBody;
    assert.isDefined(blob?.size);
    assert.isTrue(downloadCalled, "no download progress");
  });

  it("should not stream response body when status code doesn't match", async function () {
    const client = createFetchHttpClient();
    const responseText = "An appropriate response.";
    vi.mocked(fetch).mockResolvedValue(createResponse(200, responseText));
    const url = `http://localhost:3000/files/stream/nonempty`;
    let downloadCalled = false;
    const request = createPipelineRequest({
      url,
      allowInsecureConnection: true,
      method: "GET",
      streamResponseStatusCodes: new Set([204]),
      onDownloadProgress: (ev) => {
        assert.isNumber(ev.loadedBytes);
        downloadCalled = true;
      },
    });
    const response = await client.sendRequest(request);
    assert.isUndefined(response.blobBody);
    assert.isDefined(response.bodyAsText);
    assert.isTrue(downloadCalled, "no download progress");
  });

  it("should report upload progress with TransformStream", async () => {
    const client = createFetchHttpClient();
    const responseText = "An appropriate response.";
    vi.mocked(fetch).mockResolvedValue(createResponse(200, responseText));
    const url = `http://localhost:3000/formdata/stream/uploadfile`;

    let downloadCalled = false;
    const request = createPipelineRequest({
      url,
      method: "PUT",
      body: streamBody,
      headers: createHttpHeaders({ "content-type": "application/octet-stream" }),
      allowInsecureConnection: true,
      streamResponseStatusCodes: new Set([Number.POSITIVE_INFINITY]),
      onDownloadProgress: (ev) => {
        assert.isNumber(ev.loadedBytes);
        downloadCalled = true;
      },
    });
    const response = await client.sendRequest(request);
    assert.isDefined(response.blobBody);

    const blob = await response.blobBody;
    assert.isDefined(blob?.size);
    assert.isTrue(downloadCalled, "no download progress");
  });

  it("should handle ReadableStream request body type", async () => {
    const client = createFetchHttpClient();
    const requestText = "testing resettable stream";
    const url = `http://localhost:3000/formdata/stream/uploadfile`;

    let bodySent = false;
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(requestText);
        controller.close();
      },
    });
    vi.mocked(fetch).mockImplementation(
      async (_url, options: (RequestInit & { duplex?: string }) | undefined) => {
        const body = options?.body;
        assert.isTrue(
          body &&
            typeof (body as ReadableStream).getReader === "function" &&
            typeof (body as ReadableStream).tee === "function",
          "expecting ReadableStream request body",
        );
        assert.strictEqual(options?.duplex, "half");
        const reader = (body as ReadableStream).getReader();
        const data = await reader.read();
        assert.equal(data.value, requestText, "unexpected request text");
        bodySent = true;
        return new Response(undefined, { status: 200 });
      },
    );
    const request = createPipelineRequest({
      url,
      method: "PUT",
      body: stream,
      headers: createHttpHeaders({ "content-type": "application/octet-stream" }),
      allowInsecureConnection: true,
      streamResponseStatusCodes: new Set([Number.POSITIVE_INFINITY]),
    });
    await client.sendRequest(request);
    assert.isTrue(bodySent, "body should have been sent to request");
  });

  it("should handle () => ReadableStream request body type", async () => {
    const client = createFetchHttpClient();
    const requestText = "testing resettable stream";
    const url = `http://localhost:3000/formdata/stream/uploadfile`;

    let bodySent = false;
    const factoryMethod = (): ReadableStream => {
      return new ReadableStream({
        start(controller) {
          controller.enqueue(requestText);
          controller.close();
        },
      });
    };
    vi.mocked(fetch).mockImplementation(async (_url, options) => {
      const body = options?.body;
      assert.isTrue(
        body &&
          typeof (body as ReadableStream).getReader === "function" &&
          typeof (body as ReadableStream).tee === "function",
        "expecting ReadableStream request body",
      );
      const reader = (body as ReadableStream).getReader();
      const data = await reader.read();
      assert.equal(data.value, requestText, "unexpected request text");
      bodySent = true;
      return new Response(undefined, { status: 200 });
    });
    const request = createPipelineRequest({
      url,
      method: "PUT",
      body: factoryMethod,
      headers: createHttpHeaders({ "content-type": "application/octet-stream" }),
      allowInsecureConnection: true,
      streamResponseStatusCodes: new Set([Number.POSITIVE_INFINITY]),
    });
    await client.sendRequest(request);
    assert.isTrue(bodySent, "body should have been sent to request");
  });

  it("should honor timeout", async function () {
    const timeoutLength = 2000;
    const mockedResponse = createResponse(404);
    vi.useFakeTimers();
    vi.mocked(fetch).mockImplementation(async (_url, options) => {
      await delay(timeoutLength);

      if (options?.signal) {
        const signal: AbortSignal = options.signal;

        if (signal.aborted) {
          throw new AbortError();
        }
      }

      return mockedResponse;
    });
    const url = `http://localhost:3000/files/stream/verylarge`;
    const client = createFetchHttpClient();

    const request = createPipelineRequest({
      url,
      timeout: timeoutLength,
      allowInsecureConnection: true,
      method: "GET",
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

  it("should throw when accessing HTTP and allowInsecureConnection is false", async function () {
    const client = createFetchHttpClient();
    const request = createPipelineRequest({
      url: "http://example.com",
    });
    try {
      await client.sendRequest(request);
      assert.fail("Expected await to throw");
    } catch (e: any) {
      assert.match(e.message, /^Cannot connect/, "Error should refuse connection");
    }
  });

  it("shouldn't throw when accessing HTTP and allowInsecureConnection is true", async function () {
    const mockedResponse = createResponse(200);
    vi.mocked(fetch).mockResolvedValue(mockedResponse);

    const client = createFetchHttpClient();
    const request = createPipelineRequest({
      allowInsecureConnection: true,
      url: "http://example.com",
    });
    const response = await client.sendRequest(request);
    assert.strictEqual(response.status, 200);
  });
});

describe("arrayBufferViewToArrayBuffer", function () {
  it("should return the original buffer when no offset and full length", function () {
    const originalBuffer = new ArrayBuffer(16);
    const view = new Uint8Array(originalBuffer);

    const result = arrayBufferViewToArrayBuffer(view);

    // Should return the exact same ArrayBuffer reference
    assert.strictEqual(result, originalBuffer);
    assert.strictEqual(result.byteLength, 16);
  });

  it("should create a new buffer when view has an offset", function () {
    const originalBuffer = new ArrayBuffer(16);
    const view = new Uint8Array(originalBuffer, 4, 8); // offset=4, length=8

    const result = arrayBufferViewToArrayBuffer(view);

    // Should be a different ArrayBuffer reference
    assert.notStrictEqual(result, originalBuffer);
    assert.strictEqual(result.byteLength, 8);
  });

  it("should create a new buffer when view length is less than buffer length", function () {
    const originalBuffer = new ArrayBuffer(16);
    const view = new Uint8Array(originalBuffer, 0, 8); // no offset, but length < buffer length

    const result = arrayBufferViewToArrayBuffer(view);

    // Should be a different ArrayBuffer reference
    assert.notStrictEqual(result, originalBuffer);
    assert.strictEqual(result.byteLength, 8);
  });

  it("should preserve data when creating a new buffer", function () {
    const originalBuffer = new ArrayBuffer(8);
    const sourceView = new Uint8Array(originalBuffer);
    // Fill with test data
    for (let i = 0; i < sourceView.length; i++) {
      sourceView[i] = i + 1;
    }

    // Create a view with offset
    const offsetView = new Uint8Array(originalBuffer, 2, 4); // bytes 2,3,4,5

    const result = arrayBufferViewToArrayBuffer(offsetView);
    const resultView = new Uint8Array(result);

    assert.strictEqual(result.byteLength, 4);
    assert.strictEqual(resultView[0], 3); // originalBuffer[2]
    assert.strictEqual(resultView[1], 4); // originalBuffer[3]
    assert.strictEqual(resultView[2], 5); // originalBuffer[4]
    assert.strictEqual(resultView[3], 6); // originalBuffer[5]
  });

  it("should work with different typed array views", function () {
    const originalBuffer = new ArrayBuffer(16);
    const uint32View = new Uint32Array(originalBuffer, 4, 2); // 8 bytes, offset 4
    uint32View[0] = 0x12345678;
    uint32View[1] = 0xabcdef00;

    const result = arrayBufferViewToArrayBuffer(uint32View);
    const resultView = new Uint32Array(result);

    assert.strictEqual(result.byteLength, 8);
    assert.strictEqual(resultView[0], 0x12345678);
    assert.strictEqual(resultView[1], 0xabcdef00);
  });

  it("should work with Int8Array", function () {
    const originalBuffer = new ArrayBuffer(8);
    const view = new Int8Array(originalBuffer);
    view.set([-1, -2, -3, -4, 5, 6, 7, 8]);

    const result = arrayBufferViewToArrayBuffer(view);
    const resultView = new Int8Array(result);

    assert.strictEqual(result, originalBuffer); // Should be same reference
    assert.deepEqual(Array.from(resultView), [-1, -2, -3, -4, 5, 6, 7, 8]);
  });

  it("should work with Float32Array", function () {
    const originalBuffer = new ArrayBuffer(16);
    const view = new Float32Array(originalBuffer, 4, 2); // 8 bytes, offset 4
    view[0] = 3.14159;
    view[1] = 2.71828;

    const result = arrayBufferViewToArrayBuffer(view);
    const resultView = new Float32Array(result);

    assert.strictEqual(result.byteLength, 8);
    assert.approximately(resultView[0], 3.14159, 0.00001);
    assert.approximately(resultView[1], 2.71828, 0.00001);
  });

  it("should handle zero-length views", function () {
    const originalBuffer = new ArrayBuffer(16);
    const view = new Uint8Array(originalBuffer, 8, 0); // zero length

    const result = arrayBufferViewToArrayBuffer(view);

    assert.strictEqual(result.byteLength, 0);
  });

  it("should handle single-byte views", function () {
    const originalBuffer = new ArrayBuffer(16);
    const sourceView = new Uint8Array(originalBuffer);
    sourceView[10] = 42;

    const view = new Uint8Array(originalBuffer, 10, 1); // single byte at offset 10

    const result = arrayBufferViewToArrayBuffer(view);
    const resultView = new Uint8Array(result);

    assert.strictEqual(result.byteLength, 1);
    assert.strictEqual(resultView[0], 42);
  });
});

describe("FetchHttpClient with ArrayBufferView request body", function () {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  it("should handle Uint8Array request body correctly", async function () {
    const client = createFetchHttpClient();
    const testData = new Uint8Array([1, 2, 3, 4, 5]);

    vi.mocked(fetch).mockImplementation(async (_url, options) => {
      const body = options?.body;
      assert.instanceOf(body, ArrayBuffer);
      const bodyView = new Uint8Array(body as ArrayBuffer);
      assert.deepEqual(Array.from(bodyView), [1, 2, 3, 4, 5]);
      return new Response(null, { status: 200 });
    });

    const request = createPipelineRequest({
      url: "https://example.com/api",
      method: "POST",
      body: testData,
    });

    const response = await client.sendRequest(request);
    assert.strictEqual(response.status, 200);
  });

  it("should optimize when no copy is needed", async function () {
    const client = createFetchHttpClient();
    const buffer = new ArrayBuffer(8);
    const view = new Uint8Array(buffer); // Full view, no offset
    view.set([10, 20, 30, 40, 50, 60, 70, 80]);

    vi.mocked(fetch).mockImplementation(async (_url, options) => {
      const body = options?.body;
      assert.strictEqual(body, buffer); // Should be the same reference
      return new Response(null, { status: 200 });
    });

    const request = createPipelineRequest({
      url: "https://example.com/api",
      method: "POST",
      body: view,
    });

    const response = await client.sendRequest(request);
    assert.strictEqual(response.status, 200);
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi, beforeEach, afterEach } from "vitest";
import { PassThrough, Writable } from "node:stream";
import { ClientRequest, IncomingHttpHeaders, IncomingMessage } from "http";
import { createDefaultHttpClient, createPipelineRequest } from "../../src/index.js";

vi.mock("https", async () => {
  const actual = await vi.importActual("https");
  return {
    ...actual,
    request: vi.fn(),
  };
});

vi.mock("http", async () => {
  const actual = await vi.importActual("http");
  return {
    ...actual,
    request: vi.fn(),
  };
});

import * as https from "https";
import * as http from "http";

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
    vi.useFakeTimers();
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
    assert.ok(response.readableStreamBody);
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
    assert.ok(response.readableStreamBody);
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
    vi.mocked(https.request).mockReturnValueOnce(httpRequestChecker);

    const data = Buffer.from("example text");

    const request = createPipelineRequest({
      url: "https://example.com",
      body: data,
    });
    const promise = client.sendRequest(request);
    yieldHttpsResponse(createResponse(200));
    const response = await promise;
    assert.strictEqual(response.status, 200);
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
});

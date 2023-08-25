// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as td from "testdouble";
import { assert } from "chai";
import * as FakeTimers from "@sinonjs/fake-timers";
import { PassThrough, Writable } from "stream";
import { ClientRequest, IncomingHttpHeaders, IncomingMessage } from "http";
import { AbortController } from "@azure/abort-controller";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ReplaceEsmResponse {
  default?: any;
  [namedExport: string]: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

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
const httpRequestChecker = {
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
};

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

describe("NodeHttpClient", function () {
  let stubbedHttp: ReplaceEsmResponse;
  let stubbedHttps: ReplaceEsmResponse;
  let clock: FakeTimers.InstalledClock;

  beforeEach(async function () {
    stubbedHttps = await td.replaceEsm("https");
    stubbedHttp = await td.replaceEsm("http");
    clock = FakeTimers.install();
  });

  afterEach(function () {
    td.reset();
    clock.uninstall();
  });

  it("shouldn't throw on 404", async function () {
    const { createDefaultHttpClient, createPipelineRequest } = await import("../../src/index.js");

    const client = createDefaultHttpClient();
    const clientRequest = createRequest();
    td.when(
      stubbedHttps.request(td.matchers.anything(), td.callback(createResponse(404)))
    ).thenReturn(clientRequest);
    const request = createPipelineRequest({ url: "https://example.com" });
    const promise = client.sendRequest(request);
    const response = await promise;
    assert.strictEqual(response.status, 404);
  });

  it("should allow canceling of requests", async function () {
    const { createDefaultHttpClient, createPipelineRequest } = await import("../../src/index.js");

    const client = createDefaultHttpClient();
    const controller = new AbortController();
    const clientRequest = createRequest();
    td.when(stubbedHttps.request(td.matchers.anything(), td.matchers.anything())).thenReturn(
      clientRequest
    );
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
    const { createDefaultHttpClient, createPipelineRequest } = await import("../../src/index.js");

    const client = createDefaultHttpClient();
    const controller = new AbortController();
    const clientRequest = createRequest();
    td.when(
      stubbedHttps.request(td.matchers.anything(), td.callback(createResponse(200)))
    ).thenReturn(clientRequest);
    const request = createPipelineRequest({
      url: "https://example.com",
      abortSignal: controller.signal,
    });
    const promise = client.sendRequest(request);
    const response = await promise;
    controller.abort();
    assert.strictEqual(response.status, 200);
  });

  it("should allow canceling of requests before the request is made", async function () {
    const { createDefaultHttpClient, createPipelineRequest } = await import("../../src/index.js");

    const client = createDefaultHttpClient();
    const controller = new AbortController();
    controller.abort();
    const clientRequest = createRequest();
    td.when(stubbedHttps.request(td.matchers.anything(), td.matchers.anything())).thenReturn(
      clientRequest
    );
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
    const { createDefaultHttpClient, createPipelineRequest } = await import("../../src/index.js");

    const client = createDefaultHttpClient();
    const clientRequest = createRequest();

    const responseText = "An appropriate response.";
    td.when(
      stubbedHttps.request(td.matchers.anything(), td.callback(createResponse(200, responseText)))
    ).thenReturn(clientRequest);
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

    const response = await promise;
    assert.strictEqual(response.bodyAsText, responseText);
    assert.isTrue(downloadCalled, "no download progress");
    assert.isTrue(uploadCalled, "no upload progress");
  });

  it("should honor timeout", async function () {
    const { createDefaultHttpClient, createPipelineRequest } = await import("../../src/index.js");

    const client = createDefaultHttpClient();

    const timeoutLength = 2000;
    const clientRequest = createRequest();
    td.when(stubbedHttps.request(td.matchers.anything(), td.matchers.anything())).thenReturn(
      clientRequest
    );
    const request = createPipelineRequest({
      url: "https://example.com",
      timeout: timeoutLength,
    });
    const promise = client.sendRequest(request);
    clock.tick(timeoutLength);
    try {
      await promise;
      assert.fail("Expected await to throw");
    } catch (e: any) {
      assert.strictEqual(e.name, "AbortError");
    }
  });

  it("should stream response body on matching status code", async function () {
    const { createDefaultHttpClient, createPipelineRequest } = await import("../../src/index.js");

    const client = createDefaultHttpClient();
    const clientRequest = createRequest();
    td.when(
      stubbedHttps.request(td.matchers.anything(), td.callback(createResponse(200, "body")))
    ).thenReturn(clientRequest);
    const request = createPipelineRequest({
      url: "https://example.com",
      streamResponseStatusCodes: new Set([200]),
    });
    const promise = client.sendRequest(request);
    const response = await promise;
    assert.equal(response.bodyAsText, undefined);
    assert.ok(response.readableStreamBody);
  });

  it("should stream response body on any status code", async function () {
    const { createDefaultHttpClient, createPipelineRequest } = await import("../../src/index.js");

    const client = createDefaultHttpClient();
    const clientRequest = createRequest();
    td.when(
      stubbedHttps.request(td.matchers.anything(), td.callback(createResponse(201, "body")))
    ).thenReturn(clientRequest);
    const request = createPipelineRequest({
      url: "https://example.com",
      streamResponseStatusCodes: new Set([Number.POSITIVE_INFINITY]),
    });
    const promise = client.sendRequest(request);
    const response = await promise;
    assert.equal(response.bodyAsText, undefined);
    assert.ok(response.readableStreamBody);
  });

  it("should not stream response body on non-matching status code", async function () {
    const { createDefaultHttpClient, createPipelineRequest } = await import("../../src/index.js");

    const client = createDefaultHttpClient();
    const clientRequest = createRequest();
    td.when(
      stubbedHttps.request(td.matchers.anything(), td.callback(createResponse(400, "body")))
    ).thenReturn(clientRequest);
    const request = createPipelineRequest({
      url: "https://example.com",
      streamResponseStatusCodes: new Set([200]),
    });
    const promise = client.sendRequest(request);
    const response = await promise;
    assert.equal(response.bodyAsText, "body");
    assert.strictEqual(response.readableStreamBody, undefined);
  });

  it("should throw when accessing HTTP and allowInsecureConnection is false", async function () {
    const { createDefaultHttpClient, createPipelineRequest } = await import("../../src/index.js");

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
    const { createDefaultHttpClient, createPipelineRequest } = await import("../../src/index.js");

    const client = createDefaultHttpClient();
    const clientRequest = createRequest();
    td.when(
      stubbedHttp.request(td.matchers.anything(), td.callback(createResponse(200, "body")))
    ).thenReturn(clientRequest);
    const request = createPipelineRequest({
      allowInsecureConnection: true,
      url: "http://example.com",
    });
    const promise = client.sendRequest(request);
    const response = await promise;
    assert.strictEqual(response.status, 200);
  });

  it("Should decode chunked responses properly", async function () {
    const { createDefaultHttpClient, createPipelineRequest } = await import("../../src/index.js");

    const client = createDefaultHttpClient();
    const clientRequest = createRequest();

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

    td.when(stubbedHttps.request(td.matchers.anything(), td.callback(streamResponse))).thenReturn(
      clientRequest
    );

    const request = createPipelineRequest({
      url: "https://example.com",
    });
    const promise = client.sendRequest(request);

    const response = await promise;
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.bodyAsText, inputString);
  });

  it("should handle typed array bodies correctly", async function () {
    const { createDefaultHttpClient, createPipelineRequest } = await import("../../src/index.js");

    const client = createDefaultHttpClient();
    td.when(
      stubbedHttps.request(td.matchers.anything(), td.callback(createResponse(200)))
    ).thenReturn(httpRequestChecker);

    const data = new Uint8Array(10);
    for (let i = 0; i < 10; i++) {
      data[i] = i;
    }

    const request = createPipelineRequest({
      url: "https://example.com",
      body: data,
    });
    const promise = client.sendRequest(request);
    const response = await promise;
    assert.strictEqual(response.status, 200);
  });

  it("should handle ArrayBuffer bodies correctly", async function () {
    const { createDefaultHttpClient, createPipelineRequest } = await import("../../src/index.js");

    const client = createDefaultHttpClient();
    td.when(
      stubbedHttps.request(td.matchers.anything(), td.callback(createResponse(200)))
    ).thenReturn(httpRequestChecker);

    const data = new Uint8Array(10);
    for (let i = 0; i < 10; i++) {
      data[i] = i;
    }

    const request = createPipelineRequest({
      url: "https://example.com",
      body: data.buffer,
    });
    const promise = client.sendRequest(request);
    const response = await promise;
    assert.strictEqual(response.status, 200);
  });

  it("should handle Buffer bodies correctly", async function () {
    const { createDefaultHttpClient, createPipelineRequest } = await import("../../src/index.js");

    const client = createDefaultHttpClient();
    td.when(
      stubbedHttps.request(td.matchers.anything(), td.callback(createResponse(200)))
    ).thenReturn(httpRequestChecker);

    const data = Buffer.from("example text");

    const request = createPipelineRequest({
      url: "https://example.com",
      body: data,
    });
    const promise = client.sendRequest(request);
    const response = await promise;
    assert.strictEqual(response.status, 200);
  });

  it("should handle string bodies correctly", async function () {
    const { createDefaultHttpClient, createPipelineRequest } = await import("../../src/index.js");

    const client = createDefaultHttpClient();
    td.when(
      stubbedHttps.request(td.matchers.anything(), td.callback(createResponse(200)))
    ).thenReturn(httpRequestChecker);

    const request = createPipelineRequest({ url: "https://example.com", body: "test data" });
    const promise = client.sendRequest(request);
    const response = await promise;
    assert.strictEqual(response.status, 200);
  });

  it("should handle NodeJS.ReadableStream bodies correctly", async function () {
    const { createDefaultHttpClient, createPipelineRequest } = await import("../../src/index.js");

    const requestText = "testing resettable stream";
    const client = createDefaultHttpClient();
    let bodySent = false;
    const writable = new Writable({
      write: (chunk, _, next) => {
        bodySent = true;
        assert.equal(chunk.toString(), requestText, "Unexpected body");
        next();
      },
    });
    td.when(
      stubbedHttps.request(td.matchers.anything(), td.callback(createResponse(200)))
    ).thenReturn(writable);

    const stream = new PassThrough();
    stream.write(requestText);
    stream.end();
    const body = stream;
    const request = createPipelineRequest({ url: "https://example.com", body });
    const promise = client.sendRequest(request);
    await promise;
    assert.isTrue(bodySent, "body should have been piped to request");
  });

  it("should handle () => NodeJS.ReadableStream bodies correctly", async function () {
    const { createDefaultHttpClient, createPipelineRequest } = await import("../../src/index.js");

    const requestText = "testing resettable stream";
    const client = createDefaultHttpClient();
    let bodySent = false;
    const writable = new Writable({
      write: (chunk, _, next) => {
        bodySent = true;
        assert.equal(chunk.toString(), requestText, "Unexpected body");
        next();
      },
    });
    td.when(
      stubbedHttps.request(td.matchers.anything(), td.callback(createResponse(200)))
    ).thenReturn(writable);

    const body = (): PassThrough => {
      const stream = new PassThrough();
      stream.write(requestText);
      stream.end();
      return stream;
    };
    const request = createPipelineRequest({ url: "https://example.com", body });
    const promise = client.sendRequest(request);
    await promise;
    assert.isTrue(bodySent, "body should have been piped to request");
  });

  it("should return an AbortError when aborted while reading the HTTP response", async function () {
    clock.uninstall();
    const { createDefaultHttpClient, createPipelineRequest } = await import("../../src/index.js");

    const client = createDefaultHttpClient();
    const controller = new AbortController();

    const clientRequest = createRequest();
    const request = createPipelineRequest({
      url: "https://example.com",
      abortSignal: controller.signal,
    });

    const streamResponse = new FakeResponse();

    clientRequest.destroy = function (this: FakeRequest, e: Error) {
      // give it some time to attach listeners and read from the stream
      setTimeout(() => {
        streamResponse.destroy(e);
      }, 0);
      return clientRequest;
    };
    streamResponse.headers = {};
    streamResponse.statusCode = 200;
    const buffer = Buffer.from("The start of an HTTP body");
    streamResponse.write(buffer);

    td.when(stubbedHttps.request(td.matchers.anything(), td.callback(streamResponse))).thenReturn(
      clientRequest
    );

    const promise = client.sendRequest(request);

    controller.abort();

    try {
      await promise;
      assert.fail("Expected await to throw");
    } catch (e: any) {
      assert.strictEqual(e.name, "AbortError");
    }
  });
});

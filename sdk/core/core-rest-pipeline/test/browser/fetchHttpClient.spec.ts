// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { createFetchHttpClient } from "../../src/fetchHttpClient";
import { createPipelineRequest } from "../../src/pipelineRequest";
import { png } from "./mocks/encodedPng";
import sinon from "sinon";
import { createHttpHeaders } from "../../src/httpHeaders";
import { AbortError, AbortSignalLike } from "@azure/abort-controller";
import { delay } from "../../src/util/helpers";

const streamBody = new ReadableStream({
  async start(controller) {
    controller.enqueue(png);
    controller.close();
  },
});

function createResponse(statusCode: number, body = "", chunkDelay = 0): Response {
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const view = encoder.encode(body);

      if (view.length > 1) {
        const first = view.slice(0, 1);
        const second = view.slice(1);
        controller.enqueue(first);
        await delay(chunkDelay);
        controller.enqueue(second);
        controller.close();
      } else {
        controller.enqueue(view);
        controller.close();
      }
    },
  });
  return new Response(stream, { status: statusCode });
}

describe("FetchHttpClient", function () {
  let fetchMock: sinon.SinonStub;
  let clock: sinon.SinonFakeTimers;
  beforeEach(() => {
    fetchMock = sinon.stub(self, "fetch");
  });

  afterEach(() => {
    sinon.restore();
    fetchMock.restore();
    if (clock) {
      clock.restore();
    }
  });

  it("shouldn't throw on 404", async function () {
    const mockedResponse = createResponse(404);
    fetchMock.returns(mockedResponse);

    const client = createFetchHttpClient();

    const request = createPipelineRequest({ url: "https://localhost/404" });
    const response = await client.sendRequest(request);
    assert.strictEqual(response.status, 404);
  });

  it("should allow canceling of requests", async function () {
    const mockedResponse = createResponse(404);
    const timeoutLength = 2000;
    clock = sinon.useFakeTimers();
    fetchMock.callsFake(async (_url, options) => {
      await delay(timeoutLength);
      if (options.signal) {
        const signal: AbortSignalLike = options.signal;
        console.log(`${signal.aborted}`);

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
    clock.tick(timeoutLength - 1);
    controller.abort();
    clock.tick(1);

    try {
      await promise;
      assert.fail(`Expected await to throw`);
    } catch (e: any) {
      assert.strictEqual(e.name, "AbortError");
    }
  });

  it("shouldn't be affected by requests cancelled late", async function () {
    const blob = new Blob();
    const mockedResponse = new Response(blob, { status: 200 });
    fetchMock.returns(mockedResponse);

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
    fetchMock.returns(mockedResponse);

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
    clock = sinon.useFakeTimers();
    // Mocking fetch to send the first chunk right away but delay the next
    // chunk one second (1000ms).
    fetchMock.returns(createResponse(200, responseText, 1000));
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
    clock.tick(1000);

    // Verify that only one chunk was loaded
    assert.equal(downloadCalled, 1);
    assert.equal(chunk.done, false);
  });

  it("should report download progress and decode chunks", async function () {
    const client = createFetchHttpClient();
    const responseText = "An appropriate response.";
    fetchMock.returns(createResponse(200, responseText));
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
    const transformStub = sinon.stub(self, "TransformStream").value(undefined);

    const client = createFetchHttpClient();
    const responseText = "An appropriate response.";
    fetchMock.returns(createResponse(200, responseText));
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
    transformStub.restore();
    assert.isDefined(response.bodyAsText);
    assert.isTrue(downloadCalled, "no download progress");
  });

  it("should report download progress when handling blob", async function () {
    const client = createFetchHttpClient();
    const responseText = "An appropriate response.";
    fetchMock.returns(createResponse(200, responseText));
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
    fetchMock.returns(createResponse(200, responseText));
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
    fetchMock.returns(createResponse(200, responseText));
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
    fetchMock.returns(createResponse(200, responseText));
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
    fetchMock.callsFake(async (_url, options) => {
      const body = options.body;
      assert.isTrue(
        body &&
          typeof (body as ReadableStream).getReader === "function" &&
          typeof (body as ReadableStream).tee === "function",
        "expecting ReadableStream request body"
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
    const factoryMethod = () => {
      return new ReadableStream({
        start(controller) {
          controller.enqueue(requestText);
          controller.close();
        },
      });
    };
    fetchMock.callsFake(async (_url, options) => {
      const body = options.body;
      assert.isTrue(
        body &&
          typeof (body as ReadableStream).getReader === "function" &&
          typeof (body as ReadableStream).tee === "function",
        "expecting ReadableStream request body"
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
    clock = sinon.useFakeTimers();
    fetchMock.callsFake(async (_url, options) => {
      await delay(timeoutLength);

      if (options.signal) {
        const signal: AbortSignalLike = options.signal;
        console.log(`${signal.aborted}`);

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
    clock.tick(timeoutLength);

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
    fetchMock.returns(mockedResponse);

    const client = createFetchHttpClient();
    const request = createPipelineRequest({
      allowInsecureConnection: true,
      url: "http://example.com",
    });
    const response = await client.sendRequest(request);
    assert.strictEqual(response.status, 200);
  });
});

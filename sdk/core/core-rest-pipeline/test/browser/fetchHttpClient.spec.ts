// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { createFetchHttpClient } from "../../src/fetchHttpClient";
import { createPipelineRequest } from "../../src/pipelineRequest";
import { png } from "./mocks/encodedPng";
import sinon from "sinon";
import { createHttpHeaders } from "../../src/httpHeaders";

const streamBody = new ReadableStream({
  async start(controller) {
    controller.enqueue(png);
  },
});

describe("FetchHttpClient", function () {
  let fetchMock: sinon.SinonStub;
  let clock: sinon.SinonFakeTimers;
  beforeEach(() => {
    fetchMock = sinon.stub(self, "fetch");
  });

  afterEach(() => {
    fetchMock.restore();
    if (clock) {
      clock.restore();
    }
  });

  it("shouldn't throw on 404", async function () {
    const blob = new Blob();
    const mockedResponse = new Response(blob, { status: 404 });
    fetchMock.returns(mockedResponse);

    const client = createFetchHttpClient();

    const request = createPipelineRequest({ url: "https://localhost/404" });
    const response = await client.sendRequest(request);
    assert.strictEqual(response.status, 404);
  });

  it("should allow canceling of requests", async function () {
    fetchMock.restore();
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
    controller.abort();

    try {
      await promise;
      assert.fail(`Expected await to throw`);
    } catch (e) {
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
    } catch (e) {
      assert.strictEqual(e.name, "AbortError");
    }
  });

  it("should report download progress and decode chunks", async function () {
    fetchMock.restore();
    const url = `http://localhost:3000/files/stream/nonempty`;
    const client = createFetchHttpClient();
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
    fetchMock.restore();
    const url = `http://localhost:3000/files/stream/nonempty`;
    const client = createFetchHttpClient();
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
    fetchMock.restore();
    const url = `http://localhost:3000/files/stream/nonempty`;
    const client = createFetchHttpClient();
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

  it("should not stream response body when status code doesn't matche", async function () {
    fetchMock.restore();
    const url = `http://localhost:3000/files/stream/nonempty`;
    const client = createFetchHttpClient();
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

  it("should report upload progress", async () => {
    fetchMock.restore();
    const url = `http://localhost:3000/formdata/stream/uploadfile`;

    const client = createFetchHttpClient();
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

  it("should honor timeout", async function () {
    fetchMock.restore();
    clock = sinon.useFakeTimers();
    const url = `http://localhost:3000/files/stream/verylarge`;
    const client = createFetchHttpClient();

    const timeoutLength = 2000;
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
    } catch (e) {
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
    } catch (e) {
      assert.match(e.message, /^Cannot connect/, "Error should refuse connection");
    }
  });

  it("shouldn't throw when accessing HTTP and allowInsecureConnection is true", async function () {
    const blob = new Blob();
    const mockedResponse = new Response(blob, { status: 200 });
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

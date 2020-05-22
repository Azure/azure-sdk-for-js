// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import { AbortController } from "@azure/abort-controller";
import { DefaultHttpsClient } from "../../src";
import { createPipelineRequest } from "../../src/pipelineRequest";

describe("XhrHttpsClient", function() {
  let xhrMock: sinon.SinonFakeXMLHttpRequestStatic;
  let requests: Array<sinon.SinonFakeXMLHttpRequest>;
  let clock: sinon.SinonFakeTimers;

  beforeEach(function() {
    requests = [];
    xhrMock = sinon.useFakeXMLHttpRequest();
    xhrMock.onCreate = (xhr) => {
      requests.push(xhr);
    };
    clock = sinon.useFakeTimers();
  });

  afterEach(function() {
    xhrMock.restore();
    clock.restore();
    sinon.restore();
  });

  it("shouldn't throw on 404", async function() {
    const client = new DefaultHttpsClient();
    const request = createPipelineRequest({ url: "https://example.com" });
    const promise = client.sendRequest(request);
    assert.equal(requests.length, 1);
    requests[0].respond(404, {}, "");
    const response = await promise;
    assert.strictEqual(response.status, 404);
  });

  it("should allow canceling of requests", async function() {
    const client = new DefaultHttpsClient();
    const controller = new AbortController();
    const request = createPipelineRequest({
      url: "https://example.com",
      abortSignal: controller.signal
    });
    const promise = client.sendRequest(request);
    controller.abort();
    try {
      await promise;
      assert.fail("Expected await to throw");
    } catch (e) {
      assert.strictEqual(e.name, "AbortError");
    }
  });

  it("should allow canceling of requests before the request is made", async function() {
    const client = new DefaultHttpsClient();
    const controller = new AbortController();
    controller.abort();
    const request = createPipelineRequest({
      url: "https://example.com",
      abortSignal: controller.signal
    });
    const promise = client.sendRequest(request);
    try {
      await promise;
      assert.fail("Expected await to throw");
    } catch (e) {
      assert.strictEqual(e.name, "AbortError");
    }
  });

  it("should report upload and download progress", async function() {
    const client = new DefaultHttpsClient();
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
      }
    });
    const promise = client.sendRequest(request);
    assert.equal(requests.length, 1);
    requests[0].respond(200, {}, "An appropriate response");
    await promise;
    assert.isTrue(downloadCalled, "no download progress");
    assert.isTrue(uploadCalled, "no upload progress");
  });

  it("should honor timeout", async function() {
    const client = new DefaultHttpsClient();

    const timeoutLength = 2000;
    const request = createPipelineRequest({
      url: "https://example.com",
      timeout: timeoutLength
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
});

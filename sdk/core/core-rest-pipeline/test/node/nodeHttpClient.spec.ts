// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import { PassThrough } from "stream";
import { IncomingMessage, ClientRequest, IncomingHttpHeaders } from "http";
import * as https from "https";
import * as http from "http";
import { AbortController } from "@azure/abort-controller";
import { createDefaultHttpClient, createPipelineRequest } from "../../src";

class FakeResponse extends PassThrough {
  public statusCode?: number;
  public headers?: IncomingHttpHeaders;
}

class FakeRequest extends PassThrough {
  public finished?: boolean;
  public abort(): void {
    this.finished = true;
  }
}

function createResponse(statusCode: number, body = ""): IncomingMessage {
  const response = new FakeResponse();
  response.headers = {};
  response.statusCode = statusCode;
  response.write(body);
  response.end();
  return (response as unknown) as IncomingMessage;
}

function createRequest(): ClientRequest {
  const request = new FakeRequest();
  request.finished = false;
  return (request as unknown) as ClientRequest;
}

describe("NodeHttpClient", function() {
  let stubbedHttpsRequest: sinon.SinonStub;
  let stubbedHttpRequest: sinon.SinonStub;
  let clock: sinon.SinonFakeTimers;

  beforeEach(function() {
    stubbedHttpsRequest = sinon.stub(https, "request");
    stubbedHttpRequest = sinon.stub(http, "request");
    clock = sinon.useFakeTimers();
  });

  afterEach(function() {
    clock.restore();
    sinon.restore();
  });

  it("shouldn't throw on 404", async function() {
    const client = createDefaultHttpClient();
    stubbedHttpsRequest.returns(createRequest());
    const request = createPipelineRequest({ url: "https://example.com" });
    const promise = client.sendRequest(request);
    stubbedHttpsRequest.yield(createResponse(404));
    const response = await promise;
    assert.strictEqual(response.status, 404);
  });

  it("should allow canceling of requests", async function() {
    const client = createDefaultHttpClient();
    const controller = new AbortController();
    stubbedHttpsRequest.returns(createRequest());
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

  it("shouldn't be affected by requests cancelled late", async function() {
    const client = createDefaultHttpClient();
    const controller = new AbortController();
    stubbedHttpsRequest.returns(createRequest());
    const request = createPipelineRequest({
      url: "https://example.com",
      abortSignal: controller.signal
    });
    const promise = client.sendRequest(request);
    stubbedHttpsRequest.yield(createResponse(200));
    const response = await promise;
    controller.abort();
    assert.strictEqual(response.status, 200);
  });

  it("should allow canceling of requests before the request is made", async function() {
    const client = createDefaultHttpClient();
    const controller = new AbortController();
    controller.abort();
    stubbedHttpsRequest.returns(createRequest());
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
    const client = createDefaultHttpClient();
    stubbedHttpsRequest.returns(createRequest());
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
    const responseText = "An appropriate response.";
    stubbedHttpsRequest.yield(createResponse(200, responseText));
    const response = await promise;
    assert.strictEqual(response.bodyAsText, responseText);
    assert.isTrue(downloadCalled, "no download progress");
    assert.isTrue(uploadCalled, "no upload progress");
  });

  it("should fail if progress callbacks throw", async function() {
    const client = createDefaultHttpClient();
    stubbedHttpsRequest.returns(createRequest());
    const errorMessage = "it failed horribly!";
    const request = createPipelineRequest({
      url: "https://example.com",
      body: "Some kinda witty message",
      onUploadProgress: () => {
        throw new Error(errorMessage);
      }
    });
    const promise = client.sendRequest(request);
    try {
      await promise;
      assert.fail("Expected await to throw");
    } catch (e) {
      assert.strictEqual(e.message, errorMessage);
    }
  });

  it("should honor timeout", async function() {
    const client = createDefaultHttpClient();

    const timeoutLength = 2000;
    stubbedHttpsRequest.returns(createRequest());
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

  it("should stream response body on matching status code", async function() {
    const client = createDefaultHttpClient();
    stubbedHttpsRequest.returns(createRequest());
    const request = createPipelineRequest({
      url: "https://example.com",
      streamResponseStatusCodes: new Set([200])
    });
    const promise = client.sendRequest(request);
    stubbedHttpsRequest.yield(createResponse(200, "body"));
    const response = await promise;
    assert.equal(response.bodyAsText, undefined);
    assert.ok(response.readableStreamBody);
  });

  it("should not stream response body on non-matching status code", async function() {
    const client = createDefaultHttpClient();
    stubbedHttpsRequest.returns(createRequest());
    const request = createPipelineRequest({
      url: "https://example.com",
      streamResponseStatusCodes: new Set([200])
    });
    const promise = client.sendRequest(request);
    stubbedHttpsRequest.yield(createResponse(400, "body"));
    const response = await promise;
    assert.equal(response.bodyAsText, "body");
    assert.strictEqual(response.readableStreamBody, undefined);
  });

  it("should throw when accessing HTTP and allowInsecureConnection is false", async function() {
    const client = createDefaultHttpClient();
    const request = createPipelineRequest({
      url: "http://example.com"
    });
    const promise = client.sendRequest(request);
    try {
      await promise;
      assert.fail("Expected await to throw");
    } catch (e) {
      assert.match(e.message, /^Cannot connect/, "Error should refuse connection");
    }
  });

  it("shouldn't throw when accessing HTTP and allowInsecureConnection is true", async function() {
    const client = createDefaultHttpClient();
    stubbedHttpRequest.returns(createRequest());
    const request = createPipelineRequest({
      allowInsecureConnection: true,
      url: "http://example.com"
    });
    const promise = client.sendRequest(request);
    stubbedHttpRequest.yield(createResponse(200, "body"));
    const response = await promise;
    assert.strictEqual(response.status, 200);
  });
});

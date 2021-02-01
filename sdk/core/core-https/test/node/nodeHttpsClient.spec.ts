// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import { PassThrough } from "stream";
import { IncomingMessage, ClientRequest, IncomingHttpHeaders } from "http";
import * as https from "https";
import { AbortController } from "@azure/abort-controller";
import { DefaultHttpsClient, createPipelineRequest } from "../../src";

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

describe("NodeHttpsClient", function() {
  let stubbedRequest: sinon.SinonStub;
  let clock: sinon.SinonFakeTimers;

  beforeEach(function() {
    stubbedRequest = sinon.stub(https, "request");
    clock = sinon.useFakeTimers();
  });

  afterEach(function() {
    clock.restore();
    sinon.restore();
  });

  it("shouldn't throw on 404", async function() {
    const client = new DefaultHttpsClient();
    stubbedRequest.returns(createRequest());
    const request = createPipelineRequest({ url: "https://example.com" });
    const promise = client.sendRequest(request);
    stubbedRequest.yield(createResponse(404));
    const response = await promise;
    assert.strictEqual(response.status, 404);
  });

  it("should allow canceling of requests", async function() {
    const client = new DefaultHttpsClient();
    const controller = new AbortController();
    stubbedRequest.returns(createRequest());
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
    stubbedRequest.returns(createRequest());
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
    stubbedRequest.returns(createRequest());
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
    stubbedRequest.yield(createResponse(200, responseText));
    const response = await promise;
    assert.strictEqual(response.bodyAsText, responseText);
    assert.isTrue(downloadCalled, "no download progress");
    assert.isTrue(uploadCalled, "no upload progress");
  });

  it("should fail if progress callbacks throw", async function() {
    const client = new DefaultHttpsClient();
    stubbedRequest.returns(createRequest());
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
    const client = new DefaultHttpsClient();

    const timeoutLength = 2000;
    stubbedRequest.returns(createRequest());
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
    const client = new DefaultHttpsClient();
    stubbedRequest.returns(createRequest());
    const request = createPipelineRequest({
      url: "https://example.com",
      streamResponseStatusCodes: new Set([200])
    });
    const promise = client.sendRequest(request);
    stubbedRequest.yield(createResponse(200, "body"));
    const response = await promise;
    assert.equal(response.bodyAsText, undefined);
    assert.ok(response.readableStreamBody);
  });

  it("should not stream response body on non-matching status code", async function() {
    const client = new DefaultHttpsClient();
    stubbedRequest.returns(createRequest());
    const request = createPipelineRequest({
      url: "https://example.com",
      streamResponseStatusCodes: new Set([200])
    });
    const promise = client.sendRequest(request);
    stubbedRequest.yield(createResponse(400, "body"));
    const response = await promise;
    assert.equal(response.bodyAsText, "body");
    assert.strictEqual(response.readableStreamBody, undefined);
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import {
  HttpClient,
  PipelineResponse,
  SendRequest,
  createHttpHeaders,
  createPipelineFromOptions,
  createPipelineRequest,
  setClientRequestIdPolicy,
} from "../src";

describe("setClientRequestIdPolicy", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("should set the header name with `x-ms-client-request-id` if no header name is provided", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const policy = setClientRequestIdPolicy();
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.onFirstCall().resolves(successResponse);
    assert.isFalse(request.headers.has("x-ms-client-request-id"));
    await policy.sendRequest(request, next);
    assert.isTrue(request.headers.has("x-ms-client-request-id"));
  });

  it("should set the header name with `x-ms-client-request-id` if commonTelemetryOptions is empty", async () => {
    const pipeline = createPipelineFromOptions({
      telemetryOptions: {},
    });
    const pipelineRequest = createPipelineRequest({
      url: "https://bing.com",
    });
    const httpClient: HttpClient = {
      sendRequest: async (request) => {
        assert.isTrue(request.headers.has("x-ms-client-request-id"));
        assert.equal(request.headers.get("x-ms-client-request-id"), request.requestId);
        return {
          request,
          headers: createHttpHeaders(),
          status: 200,
        };
      },
    };
    assert.isFalse(pipelineRequest.headers.has("x-ms-client-request-id"));
    await pipeline.sendRequest(httpClient, pipelineRequest);
  });

  it("should set the header with custom header name if it is provided", async () => {
    const customHeaderName = "custom-client-request-id";
    const pipeline = createPipelineFromOptions({
      telemetryOptions: {
        clientRequestIdHeaderName: customHeaderName,
      },
    });
    const pipelineRequest = createPipelineRequest({
      url: "https://bing.com",
    });
    const httpClient: HttpClient = {
      sendRequest: async (request) => {
        assert.isTrue(request.headers.has(customHeaderName));
        assert.equal(request.headers.get(customHeaderName), request.requestId);
        return {
          request,
          headers: createHttpHeaders(),
          status: 200,
        };
      },
    };
    assert.isFalse(pipelineRequest.headers.has("x-ms-client-request-id"));
    assert.isFalse(pipelineRequest.headers.has(customHeaderName));
    await pipeline.sendRequest(httpClient, pipelineRequest);
  });
});

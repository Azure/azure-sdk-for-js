import { assert } from "chai";
import * as sinon from "sinon";
import { PipelineResponse, SendRequest, createHttpHeaders, createPipelineRequest, setClientRequestIdPolicy } from "../src";

describe("setClientRequestIdPolicy", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("should set the header name with `x-ms-client-request-id` if no option is provided", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const policy = setClientRequestIdPolicy({});
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

  it("should set the header name with `x-ms-client-request-id` if no clientRequestIdHeaderName is provide ", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const policy = setClientRequestIdPolicy({});
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

  it("should use the custom header name if the header is provided", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const policy = setClientRequestIdPolicy({
      clientRequestIdHeaderName: "custom-client-request-id"
    });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.onFirstCall().resolves(successResponse);
    assert.isFalse(request.headers.has("custom-client-request-id"));
    await policy.sendRequest(request, next);
    assert.isTrue(request.headers.has("custom-client-request-id"));
    assert.isFalse(request.headers.has("x-ms-client-request-id"));
  });
})

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { redirectPolicy } from "../src/policies/redirectPolicy";
import * as sinon from "sinon";
import { PipelineResponse, SendRequest, createHttpHeaders, createPipelineRequest } from "../src";

describe("RedirectPolicy", () => {
  it("should not follow redirect if no location header", async () => {
    const request = createPipelineRequest({ url: "https://example.com", method: "GET" });
    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 301,
    };

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const policy = redirectPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.onFirstCall().resolves(redirectResponse);
    next.onSecondCall().resolves(successResponse);
    const result = await policy.sendRequest(request, next);

    assert.strictEqual(result.status, 301);
  });

  it("should not follow POST 301 redirect", async function () {
    const expectedStatusCode = 301;
    const request = createPipelineRequest({ url: "https://example.com", method: "POST" });
    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({ location: "https://example.com/redirect" }),
      request,
      status: 301,
    };

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const policy = redirectPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.onFirstCall().resolves(redirectResponse);
    next.onSecondCall().resolves(successResponse);
    const result = await policy.sendRequest(request, next);

    assert.strictEqual(result.status, expectedStatusCode);
  });

  it("should follow GET 301 redirect", async function () {
    const expectedStatusCode = 200;
    const request = createPipelineRequest({ url: "https://example.com", method: "GET" });
    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({ location: "https://example.com/redirect" }),
      request,
      status: 301,
    };

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const policy = redirectPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.onFirstCall().resolves(redirectResponse);
    next.onSecondCall().resolves(successResponse);
    const result = await policy.sendRequest(request, next);
    assert.strictEqual(result.status, expectedStatusCode);
  });

  it("should follow HEAD 301 redirect", async function () {
    const expectedStatusCode = 200;
    const request = createPipelineRequest({ url: "https://example.com", method: "HEAD" });
    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({ location: "https://example.com/redirect" }),
      request,
      status: 301,
    };

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const policy = redirectPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.onFirstCall().resolves(redirectResponse);
    next.onSecondCall().resolves(successResponse);
    const result = await policy.sendRequest(request, next);
    assert.strictEqual(result.status, expectedStatusCode);
  });

  it("should not follow POST 302 redirect", async function () {
    const expectedStatusCode = 302;
    const request = createPipelineRequest({ url: "https://example.com", method: "POST" });
    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({ location: "https://example.com/redirect" }),
      request,
      status: 302,
    };

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const policy = redirectPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.onFirstCall().resolves(redirectResponse);
    next.onSecondCall().resolves(successResponse);
    const result = await policy.sendRequest(request, next);

    assert.strictEqual(result.status, expectedStatusCode);
  });

  it("should follow GET 302 redirect", async function () {
    const expectedStatusCode = 200;
    const request = createPipelineRequest({ url: "https://example.com", method: "GET" });
    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({ location: "https://example.com/redirect" }),
      request,
      status: 302,
    };

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const policy = redirectPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.onFirstCall().resolves(redirectResponse);
    next.onSecondCall().resolves(successResponse);

    const result = await policy.sendRequest(request, next);
    assert.strictEqual(result.status, expectedStatusCode);
  });

  it("should follow HEAD 302 redirect", async function () {
    const expectedStatusCode = 200;
    const request = createPipelineRequest({ url: "https://example.com", method: "HEAD" });
    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({ location: "https://example.com/redirect" }),
      request,
      status: 302,
    };

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const policy = redirectPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.onFirstCall().resolves(redirectResponse);
    next.onSecondCall().resolves(successResponse);

    const result = await policy.sendRequest(request, next);
    assert.strictEqual(result.status, expectedStatusCode);
  });

  it("should follow POST 303 redirect", async function () {
    const expectedStatusCode = 200;
    const request = createPipelineRequest({ url: "https://example.com", method: "POST" });
    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({ location: "https://example.com/redirect" }),
      request,
      status: 303,
    };

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const policy = redirectPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.onFirstCall().resolves(redirectResponse);
    next.onSecondCall().resolves(successResponse);

    const result = await policy.sendRequest(request, next);
    assert.strictEqual(next.lastCall.args[0].method, "GET");
    assert.isUndefined(next.lastCall.args[0].body);
    assert.strictEqual(result.status, expectedStatusCode);
  });

  it("should not follow GET 303 redirect", async function () {
    const expectedStatusCode = 303;
    const request = createPipelineRequest({ url: "https://example.com", method: "GET" });
    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({ location: "https://example.com/redirect" }),
      request,
      status: 303,
    };

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const policy = redirectPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.onFirstCall().resolves(redirectResponse);
    next.onSecondCall().resolves(successResponse);

    const result = await policy.sendRequest(request, next);
    assert.strictEqual(result.status, expectedStatusCode);
  });

  it("should follow GET 307 redirect", async function () {
    const expectedStatusCode = 200;
    const request = createPipelineRequest({ url: "https://example.com", method: "GET" });
    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({ location: "https://example.com/redirect" }),
      request,
      status: 307,
    };

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const policy = redirectPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.onFirstCall().resolves(redirectResponse);
    next.onSecondCall().resolves(successResponse);

    const result = await policy.sendRequest(request, next);
    assert.strictEqual(result.status, expectedStatusCode);
  });

  it("should follow GET 300 redirect", async function () {
    const expectedStatusCode = 200;
    const request = createPipelineRequest({ url: "https://example.com", method: "GET" });
    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({ location: "https://example.com/redirect" }),
      request,
      status: 300,
    };

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const policy = redirectPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.onFirstCall().resolves(redirectResponse);
    next.onSecondCall().resolves(successResponse);

    const result = await policy.sendRequest(request, next);
    assert.strictEqual(result.status, expectedStatusCode);
  });

  it("should only try maxretries", async function () {
    const expectedStatusCode = 300;
    const maxRetries = 1;
    const request = createPipelineRequest({ url: "https://example.com", method: "GET" });
    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({ location: "https://example.com/redirect" }),
      request,
      status: 300,
    };

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const policy = redirectPolicy({ maxRetries });
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.onFirstCall().resolves(redirectResponse);
    next.onSecondCall().resolves(redirectResponse);
    next.onThirdCall().resolves(successResponse);

    const result = await policy.sendRequest(request, next);
    assert.strictEqual(result.status, expectedStatusCode);
  });

  it("should try to redirect 20 times by default", async function () {
    const expectedStatusCode = 300;
    const request = createPipelineRequest({ url: "https://example.com", method: "GET" });
    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({ location: "https://example.com/redirect" }),
      request,
      status: 300,
    };

    const policy = redirectPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(redirectResponse);

    const result = await policy.sendRequest(request, next);

    assert.strictEqual(result.status, expectedStatusCode);
    assert.strictEqual(next.callCount, 21);
  });

  it("should remove Authorization header on redirected request", async function () {
    const request = createPipelineRequest({
      url: "https://example.com",
      method: "GET",
      headers: createHttpHeaders({ authorization: "Basic blahblahblah" }),
    });
    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({
        location: "https://example.com/redirect",
      }),
      request,
      status: 307,
    };

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const policy = redirectPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.onFirstCall().resolves(redirectResponse);
    next.onSecondCall().resolves(successResponse);

    await policy.sendRequest(request, next);
    assert.isFalse(next.args[1][0].headers.has("Authorization"));
  });
});

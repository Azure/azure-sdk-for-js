// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi } from "vitest";
import { redirectPolicy } from "../../src/policies/internal.js";
import type { PipelineResponse, SendRequest } from "../../src/index.js";
import { createHttpHeaders, createPipelineRequest } from "../../src/index.js";

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
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);
    next.mockResolvedValueOnce(successResponse);
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
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);
    next.mockResolvedValueOnce(successResponse);
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
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);
    next.mockResolvedValueOnce(successResponse);
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
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);
    next.mockResolvedValueOnce(successResponse);
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
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);
    next.mockResolvedValueOnce(successResponse);
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
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);
    next.mockResolvedValueOnce(successResponse);

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
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);
    next.mockResolvedValueOnce(successResponse);

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
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);
    next.mockResolvedValueOnce(successResponse);

    const result = await policy.sendRequest(request, next);
    assert.strictEqual(next.mock.lastCall?.[0].method, "GET");
    assert.isUndefined(next.mock.lastCall?.[0].body);
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
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);
    next.mockResolvedValueOnce(successResponse);

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
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);
    next.mockResolvedValueOnce(successResponse);

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
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);
    next.mockResolvedValueOnce(successResponse);

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
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);
    next.mockResolvedValueOnce(redirectResponse);
    next.mockResolvedValueOnce(successResponse);

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
    const next = vi.fn<SendRequest>();
    next.mockResolvedValue(redirectResponse);

    const result = await policy.sendRequest(request, next);

    assert.strictEqual(result.status, expectedStatusCode);
    expect(next).toHaveBeenCalledTimes(21);
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
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);
    next.mockResolvedValueOnce(successResponse);

    await policy.sendRequest(request, next);
    assert.isFalse(next.mock.calls[1][0].headers.has("Authorization"));
  });

  it("should not follow cross-origin redirect by default", async function () {
    const request = createPipelineRequest({
      url: "https://example.com/api",
      method: "GET",
    });
    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({
        location: "https://other-host.com/capture",
      }),
      request,
      status: 302,
    };

    const policy = redirectPolicy();
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);

    const result = await policy.sendRequest(request, next);

    // The redirect response is returned as-is; no second request is made
    assert.strictEqual(result.status, 302);
    expect(next).toHaveBeenCalledTimes(1);
    assert.strictEqual(request.url, "https://example.com/api");
  });

  it("should follow cross-origin redirect when allowCrossOriginRedirects is true", async function () {
    const request = createPipelineRequest({
      url: "https://example.com/api",
      method: "GET",
    });
    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({
        location: "https://other-host.com/resource",
      }),
      request,
      status: 302,
    };

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const policy = redirectPolicy({ allowCrossOriginRedirects: true });
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);
    next.mockResolvedValueOnce(successResponse);

    const result = await policy.sendRequest(request, next);
    assert.strictEqual(result.status, 200);
    expect(next).toHaveBeenCalledTimes(2);
  });

  it("should follow same-origin redirect even when allowCrossOriginRedirects is false", async function () {
    const request = createPipelineRequest({
      url: "https://example.com/api",
      method: "GET",
    });
    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({
        location: "https://example.com/new-path",
      }),
      request,
      status: 302,
    };

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const policy = redirectPolicy({ allowCrossOriginRedirects: false });
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);
    next.mockResolvedValueOnce(successResponse);

    const result = await policy.sendRequest(request, next);
    assert.strictEqual(result.status, 200);
    expect(next).toHaveBeenCalledTimes(2);
  });

  it("should block cross-origin redirect for different scheme (https to http)", async function () {
    const request = createPipelineRequest({
      url: "https://example.com/api",
      method: "GET",
    });
    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({
        location: "http://example.com/api",
      }),
      request,
      status: 302,
    };

    const policy = redirectPolicy();
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);

    const result = await policy.sendRequest(request, next);

    // Different scheme = different origin, so redirect is blocked
    assert.strictEqual(result.status, 302);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should block cross-origin redirect for different port", async function () {
    const request = createPipelineRequest({
      url: "https://example.com/api",
      method: "GET",
    });
    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({
        location: "https://example.com:8443/api",
      }),
      request,
      status: 302,
    };

    const policy = redirectPolicy();
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);

    const result = await policy.sendRequest(request, next);

    // Different port = different origin, so redirect is blocked
    assert.strictEqual(result.status, 302);
    expect(next).toHaveBeenCalledTimes(1);
  });
});

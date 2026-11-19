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

  it.each([
    {
      format: "object",
      headers: {
        eXpEcT: ["foo", "100-CoNtInUe", "bar"],
        "Content-Length": "7",
        "Transfer-Encoding": "chunked",
        tRaIlEr: "Digest",
        "X-Test": "preserved",
      },
      expected: { eXpEcT: ["foo", "bar"], "X-Test": "preserved" },
    },
    {
      format: "flat",
      headers: [
        "Expect",
        "foo, 100-continue",
        "EXPECT",
        "100-continue, bar",
        "Content-Length",
        "7",
        "Transfer-Encoding",
        "chunked",
        "tRaIlEr",
        "Digest",
        "X-Test",
        "preserved",
      ],
      expected: ["Expect", "foo", "EXPECT", "bar", "X-Test", "preserved"],
    },
    {
      format: "paired",
      headers: [
        ["Expect", "foo, 100-continue"],
        ["EXPECT", "100-continue, bar"],
        ["Content-Length", "7"],
        ["Transfer-Encoding", "chunked"],
        ["tRaIlEr", "Digest"],
        ["X-Test", "preserved"],
      ],
      expected: [
        ["Expect", "foo"],
        ["EXPECT", "bar"],
        ["X-Test", "preserved"],
      ],
    },
  ])(
    "removes obsolete body headers on 303 while preserving $format overrides",
    async ({ headers, expected }) => {
      const originalHeaders = JSON.stringify(headers);
      const request = createPipelineRequest({
        url: "https://example.com",
        method: "POST",
        body: "payload",
        headers: createHttpHeaders({
          Expect: "foo, 100-CoNtInUe, bar",
          "Content-Length": "7",
          "Transfer-Encoding": "chunked",
          Trailer: "Digest",
          "X-Test": "preserved",
        }),
        requestOverrides: { headers, method: "POST" },
      });
      const next = vi
        .fn<SendRequest>()
        .mockResolvedValueOnce({
          headers: createHttpHeaders({ location: "/redirected" }),
          request,
          status: 303,
        })
        .mockResolvedValueOnce({ headers: createHttpHeaders(), request, status: 200 });

      await redirectPolicy().sendRequest(request, next);

      expect(request.method).toBe("GET");
      expect(request.body).toBeUndefined();
      expect(request.headers.get("Expect")).toBe("foo, bar");
      expect(request.headers.has("Content-Length")).toBe(false);
      expect(request.headers.has("Transfer-Encoding")).toBe(false);
      expect(request.headers.has("Trailer")).toBe(false);
      expect(request.headers.get("X-Test")).toBe("preserved");
      expect(request.requestOverrides).toEqual({ method: "GET", headers: expected });
      expect(JSON.stringify(headers)).toBe(originalHeaders);
    },
  );

  it("preserves body expectations and framing on 307 redirects", async () => {
    const headers = { Expect: "100-continue", "Content-Length": "7" };
    const request = createPipelineRequest({
      url: "https://example.com",
      method: "POST",
      body: "payload",
      headers: createHttpHeaders(headers),
      requestOverrides: { headers },
    });
    const next = vi
      .fn<SendRequest>()
      .mockResolvedValueOnce({
        headers: createHttpHeaders({ location: "/redirected" }),
        request,
        status: 307,
      })
      .mockResolvedValueOnce({ headers: createHttpHeaders(), request, status: 200 });

    await redirectPolicy().sendRequest(request, next);

    expect(request.method).toBe("POST");
    expect(request.body).toBe("payload");
    expect(request.headers.get("Expect")).toBe("100-continue");
    expect(request.headers.get("Content-Length")).toBe("7");
    expect(request.requestOverrides?.headers).toBe(headers);
  });

  it.each(["Map", "Headers", "generator"])(
    "preserves unrelated %s header overrides when discarding a body on 303",
    async (kind) => {
      const entries: [string, string][] = [
        ["X-Api-Key", "test-key"],
        ["Expect", "foo, 100-continue"],
        ["Content-Length", "7"],
        ["Transfer-Encoding", "chunked"],
        ["Trailer", "Digest"],
      ];
      const headers =
        kind === "Map"
          ? new Map(entries)
          : kind === "Headers"
            ? new Headers(entries)
            : (function* () {
                yield* entries;
              })();
      const request = createPipelineRequest({
        url: "https://example.com",
        method: "POST",
        body: "payload",
        requestOverrides: { headers },
      });
      const next = vi
        .fn<SendRequest>()
        .mockResolvedValueOnce({
          headers: createHttpHeaders({ location: "/redirected" }),
          request,
          status: 303,
        })
        .mockResolvedValueOnce({ headers: createHttpHeaders(), request, status: 200 });

      await redirectPolicy().sendRequest(request, next);

      const redirectedPairs = request.requestOverrides?.headers;
      if (!Array.isArray(redirectedPairs)) {
        throw new Error("Expected reusable redirected header pairs");
      }
      const redirectedHeaders = new Headers(redirectedPairs);
      expect(request.method).toBe("GET");
      expect(request.body).toBeUndefined();
      expect(redirectedHeaders.get("X-Api-Key")).toBe("test-key");
      expect(redirectedHeaders.get("Expect")).toBe("foo");
      expect(redirectedHeaders.has("Content-Length")).toBe(false);
      expect(redirectedHeaders.has("Transfer-Encoding")).toBe(false);
      expect(redirectedHeaders.has("Trailer")).toBe(false);
      if (headers instanceof Headers || headers instanceof Map) {
        expect(headers.get("Expect") ?? headers.get("expect")).toBe("foo, 100-continue");
        expect(headers.get("Content-Length") ?? headers.get("content-length")).toBe("7");
      }
    },
  );

  it("preserves chunked framing and Trailer on a body-preserving 307 redirect", async () => {
    const headers = {
      Expect: "100-continue",
      "Transfer-Encoding": "chunked",
      Trailer: "Digest",
    };
    const request = createPipelineRequest({
      url: "https://example.com",
      method: "POST",
      body: "payload",
      headers: createHttpHeaders(headers),
      requestOverrides: { headers },
    });
    const next = vi
      .fn<SendRequest>()
      .mockResolvedValueOnce({
        headers: createHttpHeaders({ location: "/redirected" }),
        request,
        status: 307,
      })
      .mockResolvedValueOnce({ headers: createHttpHeaders(), request, status: 200 });

    await redirectPolicy().sendRequest(request, next);

    expect(request.method).toBe("POST");
    expect(request.body).toBe("payload");
    expect(request.headers.get("Trailer")).toBe("Digest");
    expect(request.headers.get("Transfer-Encoding")).toBe("chunked");
    expect(request.requestOverrides?.headers).toBe(headers);
  });

  it("should change an overridden POST method to GET on 303 redirect", async function () {
    const cancel = vi.fn().mockRejectedValue(new Error("response failed"));
    const browserStreamBody = {
      cancel,
    } as unknown as NonNullable<PipelineResponse["browserStreamBody"]>;
    const request = createPipelineRequest({
      url: "https://example.com",
      method: "POST",
      requestOverrides: { method: "POST" },
    });
    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({ location: "https://example.com/redirect" }),
      request,
      status: 303,
      browserStreamBody,
    };
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const policy = redirectPolicy();
    const next = vi
      .fn<SendRequest>()
      .mockResolvedValueOnce(redirectResponse)
      .mockResolvedValueOnce(successResponse);

    const result = await policy.sendRequest(request, next);

    assert.strictEqual(next.mock.lastCall?.[0].method, "GET");
    assert.strictEqual(next.mock.lastCall?.[0].requestOverrides?.method, "GET");
    assert.strictEqual(result.status, 200);
    expect(cancel).toHaveBeenCalledOnce();
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

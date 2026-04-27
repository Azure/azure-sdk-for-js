// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import type { PipelineResponse, SendRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import createClient from "../../src/confidentialLedger.js";

/**
 * Helper to extract the custom redirect policy from a client's pipeline.
 */
function getRedirectPolicy(ledgerEndpoint: string) {
  const fakeCredential = {
    getToken: vi
      .fn()
      .mockResolvedValue({ token: "fake-token", expiresOnTimestamp: Date.now() + 3600000 }),
  };
  const client = createClient(ledgerEndpoint, fakeCredential);
  const policies = client.pipeline.getOrderedPolicies();
  const policy = policies.find((p) => p.name === "confidentialLedgerRedirectPolicy");
  assert.ok(policy, "confidentialLedgerRedirectPolicy should be present in the pipeline");
  return policy!;
}

describe("Confidential Ledger Redirect Caching", () => {
  const ledgerEndpoint = "https://test-ledger.confidential-ledger.azure.com";
  const primaryEndpoint = "https://node3.test-ledger.confidential-ledger.azure.com";

  describe("Cache population and usage", () => {
    it("should cache redirect target on first write 307 and skip LB on subsequent writes", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);

      // First write: gets 307, follows redirect, caches primary
      const request1 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
        body: JSON.stringify({ contents: "write1" }),
      });
      const redirect307: PipelineResponse = {
        headers: createHttpHeaders({
          location: `${primaryEndpoint}/app/transactions`,
        }),
        request: request1,
        status: 307,
      };
      const success1: PipelineResponse = {
        headers: createHttpHeaders(),
        request: request1,
        status: 200,
      };

      const next = vi.fn<SendRequest>();
      next.mockResolvedValueOnce(redirect307);
      next.mockResolvedValueOnce(success1);

      await policy.sendRequest(request1, next);
      assert.equal(next.mock.calls.length, 2);

      // Second write: should go directly to cached primary (no redirect)
      const request2 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
        body: JSON.stringify({ contents: "write2" }),
      });
      const success2: PipelineResponse = {
        headers: createHttpHeaders(),
        request: request2,
        status: 200,
      };
      next.mockResolvedValueOnce(success2);

      await policy.sendRequest(request2, next);

      // Third call should have been sent to cached primary directly
      const sentUrl = next.mock.calls[2][0].url;
      assert.ok(
        sentUrl.startsWith(primaryEndpoint),
        `Expected ${sentUrl} to start with ${primaryEndpoint}`,
      );
      // Only 3 total next() calls (not 4) — no redirect on second write
      assert.equal(next.mock.calls.length, 3);
    });

    it("should keep cache warm when cached write returns 200", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const next = vi.fn<SendRequest>();

      // Warm the cache
      const req1 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({ location: `${primaryEndpoint}/app/transactions` }),
        request: req1,
        status: 307,
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req1,
        status: 200,
      });
      await policy.sendRequest(req1, next);

      // Second write succeeds — cache should stay warm
      const req2 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req2,
        status: 200,
      });
      await policy.sendRequest(req2, next);

      // Third write should still use cache
      const req3 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "PUT",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req3,
        status: 200,
      });
      await policy.sendRequest(req3, next);

      // req3 should go to cached primary (call index 4: 0=redirect, 1=follow, 2=req2, 3=req3)
      assert.ok(next.mock.calls[3][0].url.startsWith(primaryEndpoint));
    });

    it("should treat DELETE as a write method that uses cache", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const next = vi.fn<SendRequest>();

      // Warm cache with a POST
      const req1 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({ location: `${primaryEndpoint}/app/transactions` }),
        request: req1,
        status: 307,
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req1,
        status: 200,
      });
      await policy.sendRequest(req1, next);

      // DELETE should use cached URL
      const req2 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/collections/test`,
        method: "DELETE",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req2,
        status: 200,
      });
      await policy.sendRequest(req2, next);

      assert.ok(next.mock.calls[2][0].url.startsWith(primaryEndpoint));
    });
  });

  describe("Read requests bypass cache", () => {
    it("should not use cached URL for GET requests", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const next = vi.fn<SendRequest>();

      // Warm the cache with a write
      const writeReq = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({ location: `${primaryEndpoint}/app/transactions` }),
        request: writeReq,
        status: 307,
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: writeReq,
        status: 200,
      });
      await policy.sendRequest(writeReq, next);

      // GET should NOT use cache — should go to original LB endpoint
      const getReq = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions/latest`,
        method: "GET",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: getReq,
        status: 200,
      });
      await policy.sendRequest(getReq, next);

      // GET should have been sent to original LB URL, not cached primary
      const getSentUrl = next.mock.calls[2][0].url;
      assert.ok(
        getSentUrl.startsWith(ledgerEndpoint),
        `Expected GET to go to LB (${ledgerEndpoint}), got ${getSentUrl}`,
      );
    });

    it("should not populate cache on GET 300 redirect", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const next = vi.fn<SendRequest>();

      // GET receives a 300 redirect
      const getReq = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions/latest`,
        method: "GET",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({
          location: `${primaryEndpoint}/app/transactions/latest`,
        }),
        request: getReq,
        status: 300,
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: getReq,
        status: 200,
      });
      await policy.sendRequest(getReq, next);

      // Subsequent POST should NOT use cache (cache should still be empty)
      const writeReq = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: writeReq,
        status: 200,
      });
      await policy.sendRequest(writeReq, next);

      // POST should go to original LB, not the redirect target from the GET
      assert.ok(
        next.mock.calls[2][0].url.startsWith(ledgerEndpoint),
        "Cache should not be populated by GET redirects",
      );
    });

    it("should not use cached URL for HEAD requests", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const next = vi.fn<SendRequest>();

      // Warm cache
      const writeReq = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({ location: `${primaryEndpoint}/app/transactions` }),
        request: writeReq,
        status: 307,
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: writeReq,
        status: 200,
      });
      await policy.sendRequest(writeReq, next);

      // HEAD should go to LB, not cache
      const headReq = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "HEAD",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: headReq,
        status: 200,
      });
      await policy.sendRequest(headReq, next);

      assert.ok(next.mock.calls[2][0].url.startsWith(ledgerEndpoint));
    });
  });

  describe("Cache invalidation", () => {
    it("should invalidate cache on 5xx response for write", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const next = vi.fn<SendRequest>();

      // Warm cache
      const req1 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({ location: `${primaryEndpoint}/app/transactions` }),
        request: req1,
        status: 307,
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req1,
        status: 200,
      });
      await policy.sendRequest(req1, next);

      // Second write gets 503 — cache should be invalidated
      const req2 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req2,
        status: 503,
      });
      await policy.sendRequest(req2, next);

      // Third write should go to LB (cache was invalidated)
      const req3 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req3,
        status: 200,
      });
      await policy.sendRequest(req3, next);

      assert.ok(
        next.mock.calls[3][0].url.startsWith(ledgerEndpoint),
        "After 5xx, cache should be invalidated and write should go to LB",
      );
    });

    it("should restore request URL to LB after 5xx so retry policy re-enters cleanly", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const next = vi.fn<SendRequest>();

      // Warm cache
      const req = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({ location: `${primaryEndpoint}/app/transactions` }),
        request: req,
        status: 307,
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req,
        status: 200,
      });
      await policy.sendRequest(req, next);

      // Same request object gets 503 from cached primary
      req.url = `${ledgerEndpoint}/app/transactions`;
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req,
        status: 503,
      });
      await policy.sendRequest(req, next);

      // After 5xx, request.url should be restored to LB URL (not stuck on primary)
      // so the retry policy can re-enter sendRequest with the correct LB URL
      assert.strictEqual(
        req.url,
        `${ledgerEndpoint}/app/transactions`,
        "request.url must be restored to LB after 5xx for retry policy correctness",
      );
      assert.strictEqual(req.method, "POST", "request.method must be preserved");

      // Simulate retry: re-enter sendRequest with the same request object
      // It should go to LB (not the stale primary) since cache was invalidated
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req,
        status: 200,
      });
      await policy.sendRequest(req, next);

      assert.ok(
        next.mock.calls[3][0].url.startsWith(ledgerEndpoint),
        "Retry after 5xx must go through LB, not the unhealthy primary",
      );
    });

    it("should invalidate cache on transport error for write", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const next = vi.fn<SendRequest>();

      // Warm cache
      const req1 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({ location: `${primaryEndpoint}/app/transactions` }),
        request: req1,
        status: 307,
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req1,
        status: 200,
      });
      await policy.sendRequest(req1, next);

      // Second write throws transport error
      const req2 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockRejectedValueOnce(new Error("Connection refused"));

      try {
        await policy.sendRequest(req2, next);
        assert.fail("Should have thrown");
      } catch (e: any) {
        assert.equal(e.message, "Connection refused");
      }

      // Third write should go to LB (cache was invalidated)
      const req3 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req3,
        status: 200,
      });
      await policy.sendRequest(req3, next);

      assert.ok(
        next.mock.calls[3][0].url.startsWith(ledgerEndpoint),
        "After transport error, cache should be invalidated",
      );
    });

    it("should re-cache after invalidation when new 307 is received", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const next = vi.fn<SendRequest>();
      const newPrimary = "https://node5.test-ledger.confidential-ledger.azure.com";

      // Warm cache
      const req1 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({ location: `${primaryEndpoint}/app/transactions` }),
        request: req1,
        status: 307,
      });
      next.mockResolvedValueOnce({ headers: createHttpHeaders(), request: req1, status: 200 });
      await policy.sendRequest(req1, next);

      // Invalidate with 500 — this write goes to cached primary (call index 2)
      const req2 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({ headers: createHttpHeaders(), request: req2, status: 500 });
      await policy.sendRequest(req2, next);

      // Write again — gets new 307 to different node (call index 3=307, 4=follow)
      const req3 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({ location: `${newPrimary}/app/transactions` }),
        request: req3,
        status: 307,
      });
      next.mockResolvedValueOnce({ headers: createHttpHeaders(), request: req3, status: 200 });
      await policy.sendRequest(req3, next);

      // Fourth write should go to NEW cached primary (call index 5)
      const req4 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({ headers: createHttpHeaders(), request: req4, status: 200 });
      await policy.sendRequest(req4, next);

      assert.ok(
        next.mock.calls[5][0].url.startsWith(newPrimary),
        `Expected re-cached URL to point to ${newPrimary}`,
      );
    });
  });

  describe("Edge cases", () => {
    it("should keep cache empty when cold-cache write gets transport error", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const next = vi.fn<SendRequest>();

      // First write with empty cache throws transport error
      const req1 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockRejectedValueOnce(new Error("Connection refused"));

      try {
        await policy.sendRequest(req1, next);
        assert.fail("Should have thrown");
      } catch (e: any) {
        assert.equal(e.message, "Connection refused");
      }

      // Second write should still go to LB (cache was never populated)
      const req2 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req2,
        status: 200,
      });
      await policy.sendRequest(req2, next);

      assert.ok(
        next.mock.calls[1][0].url.startsWith(ledgerEndpoint),
        "Cache should remain empty after cold-cache transport error",
      );
    });

    it("should rewrite different write paths using same cached base URL", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const next = vi.fn<SendRequest>();

      // POST to /app/transactions gets 307 → cache primary
      const req1 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions?api-version=2024-12-09-preview`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({
          location: `${primaryEndpoint}/app/transactions?api-version=2024-12-09-preview`,
        }),
        request: req1,
        status: 307,
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req1,
        status: 200,
      });
      await policy.sendRequest(req1, next);

      // PUT to /app/users/me (different path) should use same cached base
      const req2 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/users/me?api-version=2024-12-09-preview`,
        method: "PUT",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req2,
        status: 200,
      });
      await policy.sendRequest(req2, next);

      const sentUrl = new URL(next.mock.calls[2][0].url);
      assert.equal(sentUrl.origin, primaryEndpoint, "Should rewrite to cached primary");
      assert.equal(sentUrl.pathname, "/app/users/me", "Should preserve different path");
      assert.equal(
        sentUrl.searchParams.get("api-version"),
        "2024-12-09-preview",
        "Should preserve query params",
      );
    });

    it("should follow and cache 308 redirects for write operations", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const next = vi.fn<SendRequest>();

      // POST gets 308 (Permanent Redirect) — should follow AND cache
      const req1 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
        body: JSON.stringify({ contents: "test" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({
          location: `${primaryEndpoint}/app/transactions`,
        }),
        request: req1,
        status: 308,
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req1,
        status: 200,
      });
      await policy.sendRequest(req1, next);

      // Second write should use cached URL (proving 308 was cached)
      const req2 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req2,
        status: 200,
      });
      await policy.sendRequest(req2, next);

      assert.ok(
        next.mock.calls[2][0].url.startsWith(primaryEndpoint),
        "308 redirect target should be cached and used for subsequent writes",
      );
      // Verify method was preserved (308 doesn't convert POST→GET)
      assert.equal(next.mock.calls[1][0].method, "POST");
    });

    it("should restore original URL on transport error for clean retry", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const next = vi.fn<SendRequest>();

      // Warm cache
      const req1 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({ location: `${primaryEndpoint}/app/transactions` }),
        request: req1,
        status: 307,
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req1,
        status: 200,
      });
      await policy.sendRequest(req1, next);

      // Second write to cached primary throws transport error
      const req2 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockRejectedValueOnce(new Error("Connection refused"));

      try {
        await policy.sendRequest(req2, next);
        assert.fail("Should have thrown");
      } catch (e: any) {
        assert.equal(e.message, "Connection refused");
      }

      // The request URL should have been restored to original (for retry policy)
      assert.equal(
        req2.url,
        `${ledgerEndpoint}/app/transactions`,
        "Request URL should be restored to original LB URL after transport error",
      );
    });

    it("should not cache redirect target after 303 POST-to-GET conversion", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const next = vi.fn<SendRequest>();

      // POST gets 303 → converted to GET → then GET gets 300 redirect
      // The 300 should NOT populate the cache because the method is now GET
      const req1 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({
          Authorization: "Bearer fake-token",
          "Content-Length": "100",
        }),
        body: JSON.stringify({ contents: "test" }),
      });

      // 303 redirect (POST→GET conversion)
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({
          location: `${primaryEndpoint}/app/result`,
        }),
        request: req1,
        status: 303,
      });
      // After 303, method is GET. Now this GET gets a 300 redirect
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({
          location: `https://other-node.test-ledger.confidential-ledger.azure.com/app/result`,
        }),
        request: req1,
        status: 300,
      });
      // Final response
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req1,
        status: 200,
      });
      await policy.sendRequest(req1, next);

      // Subsequent POST should NOT use cache (303→GET chain should not have cached)
      const req2 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req2,
        status: 200,
      });
      await policy.sendRequest(req2, next);

      assert.ok(
        next.mock.calls[3][0].url.startsWith(ledgerEndpoint),
        "Cache should not be populated after 303 POST→GET conversion",
      );
    });

    it("should restore URL and invalidate cache on transport error during redirect follow", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const next = vi.fn<SendRequest>();

      // POST gets 307 redirect, then the follow-up request throws
      const req1 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
        body: JSON.stringify({ contents: "test" }),
      });

      // 307 redirect response
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({
          location: `${primaryEndpoint}/app/transactions`,
        }),
        request: req1,
        status: 307,
      });
      // Follow-up request to primary throws
      next.mockRejectedValueOnce(new Error("Primary node down"));

      try {
        await policy.sendRequest(req1, next);
        assert.fail("Should have thrown");
      } catch (e: any) {
        assert.equal(e.message, "Primary node down");
      }

      // Request URL should be restored to original LB URL
      assert.equal(
        req1.url,
        `${ledgerEndpoint}/app/transactions`,
        "URL should be restored after redirect-follow transport error",
      );
      // Request method should still be POST
      assert.equal(req1.method, "POST");

      // Cache should be invalidated — next write goes to LB
      const req2 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req2,
        status: 200,
      });
      await policy.sendRequest(req2, next);

      assert.ok(
        next.mock.calls[2][0].url.startsWith(ledgerEndpoint),
        "Cache should be invalidated after redirect-follow failure",
      );
    });

    it("should invalidate cache when redirect-follow returns 5xx for write", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const next = vi.fn<SendRequest>();

      // POST gets 307 redirect, follow-up returns 503
      const req1 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });

      next.mockResolvedValueOnce({
        headers: createHttpHeaders({
          location: `${primaryEndpoint}/app/transactions`,
        }),
        request: req1,
        status: 307,
      });
      // Follow-up to primary returns 503
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req1,
        status: 503,
      });

      const result = await policy.sendRequest(req1, next);
      assert.equal(result.status, 503);

      // Cache should be invalidated — next write goes to LB
      const req2 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req2,
        status: 200,
      });
      await policy.sendRequest(req2, next);

      assert.ok(
        next.mock.calls[2][0].url.startsWith(ledgerEndpoint),
        "Cache should be invalidated after redirect-follow 5xx",
      );
    });

    it("should NOT invalidate cache when 303 POST→GET conversion results in 5xx", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const next = vi.fn<SendRequest>();

      // First warm the cache with a normal POST→307→200
      const warm = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({ location: `${primaryEndpoint}/app/transactions` }),
        request: warm,
        status: 307,
      });
      next.mockResolvedValueOnce({ headers: createHttpHeaders(), request: warm, status: 200 });
      await policy.sendRequest(warm, next);

      // POST gets 303 → converted to GET → GET returns 503
      // The 503 should NOT invalidate cache because the failing request was GET, not POST
      const req1 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({ location: `${primaryEndpoint}/app/result` }),
        request: req1,
        status: 303,
      });
      // After 303 conversion, method is GET. GET returns 503.
      next.mockResolvedValueOnce({ headers: createHttpHeaders(), request: req1, status: 503 });
      await policy.sendRequest(req1, next);

      // Cache should still be warm — next POST should go to cached primary
      const req2 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({ headers: createHttpHeaders(), request: req2, status: 200 });
      await policy.sendRequest(req2, next);

      assert.ok(
        next.mock.calls[4][0].url.startsWith(primaryEndpoint),
        "Cache should NOT be invalidated by 5xx on a 303-converted GET",
      );
    });

    it("should not invalidate cache on read transport error", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const next = vi.fn<SendRequest>();

      // Warm cache
      const warm = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({ location: `${primaryEndpoint}/app/transactions` }),
        request: warm,
        status: 307,
      });
      next.mockResolvedValueOnce({ headers: createHttpHeaders(), request: warm, status: 200 });
      await policy.sendRequest(warm, next);

      // GET throws transport error — should NOT invalidate write cache
      const getReq = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions/latest`,
        method: "GET",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockRejectedValueOnce(new Error("Network error"));

      try {
        await policy.sendRequest(getReq, next);
        assert.fail("Should have thrown");
      } catch (e: any) {
        assert.equal(e.message, "Network error");
      }

      // Cache should still be warm — next POST should go to cached primary
      const req2 = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions`,
        method: "POST",
        headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      });
      next.mockResolvedValueOnce({ headers: createHttpHeaders(), request: req2, status: 200 });
      await policy.sendRequest(req2, next);

      assert.ok(
        next.mock.calls[3][0].url.startsWith(primaryEndpoint),
        "Read transport error should not invalidate write cache",
      );
    });
  });
});

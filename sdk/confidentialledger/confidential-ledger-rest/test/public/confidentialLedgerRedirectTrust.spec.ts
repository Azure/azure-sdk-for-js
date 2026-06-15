// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import type {
  HttpClient,
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import createClient from "../../src/confidentialLedger.js";

/**
 * Helper to extract the custom redirect policy from a client's pipeline.
 */
function getRedirectPolicy(ledgerEndpoint: string): PipelinePolicy {
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

/**
 * Helper to create a write request with a Bearer token. The token text is
 * checked in assertions to verify it never leaks to untrusted targets.
 */
function writeRequest(url: string): PipelineRequest {
  return createPipelineRequest({
    url,
    method: "POST",
    headers: createHttpHeaders({
      Authorization: "Bearer SECRET-TOKEN-DO-NOT-LEAK",
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({ contents: "sensitive write payload" }),
  });
}

/**
 * Helper to assert that a promise-returning thunk rejects with an error whose
 * message matches the expected pattern. Matches the try/catch + assert.fail
 * pattern used elsewhere in this package's test suite.
 */
async function expectRejection(thunk: () => Promise<unknown>, pattern: RegExp): Promise<void> {
  let thrown: unknown = undefined;
  let resolved = false;
  try {
    await thunk();
    resolved = true;
  } catch (e: unknown) {
    thrown = e;
  }
  if (resolved) {
    assert.fail("Expected promise to reject, but it resolved");
  }
  const message = thrown instanceof Error ? thrown.message : String(thrown);
  assert.match(message, pattern);
}

describe("Confidential Ledger Redirect Trust (MSRC #116673)", () => {
  const ledgerEndpoint = "https://test-ledger.confidential-ledger.azure.com";

  describe("Untrusted redirect targets are refused", () => {
    it("throws on 307 redirect to a cross-origin HTTPS attacker host", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const request = writeRequest(`${ledgerEndpoint}/app/transactions`);

      const redirect307: PipelineResponse = {
        headers: createHttpHeaders({
          location: "https://attacker.example.com/primary/app/transactions",
        }),
        request,
        status: 307,
      };

      const next = vi.fn<SendRequest>();
      next.mockResolvedValueOnce(redirect307);

      await expectRejection(() => policy.sendRequest(request, next), /untrusted target origin/i);

      // The follow-up request to the attacker must never have happened.
      assert.equal(next.mock.calls.length, 1);
      // The original request URL must be restored so the upstream retry policy
      // doesn't re-send to the attacker host.
      assert.equal(request.url, `${ledgerEndpoint}/app/transactions`);
      assert.equal(request.method, "POST");
    });

    it("throws on 307 redirect that downgrades to HTTP (matches MSRC PoC)", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const request = writeRequest(`${ledgerEndpoint}/app/transactions`);

      const redirect307: PipelineResponse = {
        headers: createHttpHeaders({
          location: "http://127.0.0.1:18901/primary/app/transactions",
        }),
        request,
        status: 307,
      };

      const next = vi.fn<SendRequest>();
      next.mockResolvedValueOnce(redirect307);

      await expectRejection(() => policy.sendRequest(request, next), /untrusted target origin/i);

      assert.equal(next.mock.calls.length, 1);
      assert.equal(request.url, `${ledgerEndpoint}/app/transactions`);
    });

    it("throws on 307 redirect to a sibling domain (not a subdomain)", async () => {
      // Sibling: test-ledger-primary.confidential-ledger.azure.com is NOT a
      // subdomain of test-ledger.confidential-ledger.azure.com.
      const policy = getRedirectPolicy(ledgerEndpoint);
      const request = writeRequest(`${ledgerEndpoint}/app/transactions`);

      const redirect307: PipelineResponse = {
        headers: createHttpHeaders({
          location: "https://test-ledger-primary.confidential-ledger.azure.com/app/transactions",
        }),
        request,
        status: 307,
      };

      const next = vi.fn<SendRequest>();
      next.mockResolvedValueOnce(redirect307);

      await expectRejection(() => policy.sendRequest(request, next), /untrusted target origin/i);
      assert.equal(next.mock.calls.length, 1);
    });

    it("throws on 307 redirect to a different port", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const request = writeRequest(`${ledgerEndpoint}/app/transactions`);

      const redirect307: PipelineResponse = {
        headers: createHttpHeaders({
          location:
            "https://node-1.test-ledger.confidential-ledger.azure.com:8443/app/transactions",
        }),
        request,
        status: 307,
      };

      const next = vi.fn<SendRequest>();
      next.mockResolvedValueOnce(redirect307);

      await expectRejection(() => policy.sendRequest(request, next), /untrusted target origin/i);
      assert.equal(next.mock.calls.length, 1);
    });

    it("throws on prefix-attack: target hostname has ledger hostname as a suffix without dot boundary", async () => {
      // ledger = test-ledger.confidential-ledger.azure.com
      // attacker registers evil-test-ledger.confidential-ledger.azure.com (a sibling).
      // The subdomain check must use a leading-dot boundary to reject this.
      const policy = getRedirectPolicy(ledgerEndpoint);
      const request = writeRequest(`${ledgerEndpoint}/app/transactions`);

      const redirect307: PipelineResponse = {
        headers: createHttpHeaders({
          location: "https://evil-test-ledger.confidential-ledger.azure.com/app/transactions",
        }),
        request,
        status: 307,
      };

      const next = vi.fn<SendRequest>();
      next.mockResolvedValueOnce(redirect307);

      await expectRejection(() => policy.sendRequest(request, next), /untrusted target origin/i);
      assert.equal(next.mock.calls.length, 1);
    });

    it("throws on protocol-relative Location pointing at an attacker host", async () => {
      // Location: //attacker.example.com/x resolves to the current request's
      // scheme (https) with the attacker's host. Must be refused.
      const policy = getRedirectPolicy(ledgerEndpoint);
      const request = writeRequest(`${ledgerEndpoint}/app/transactions`);

      const redirect307: PipelineResponse = {
        headers: createHttpHeaders({ location: "//attacker.example.com/app/transactions" }),
        request,
        status: 307,
      };

      const next = vi.fn<SendRequest>();
      next.mockResolvedValueOnce(redirect307);

      await expectRejection(() => policy.sendRequest(request, next), /untrusted target origin/i);
      assert.equal(next.mock.calls.length, 1);
    });

    it("does not cache an untrusted redirect target", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);

      // First write: 307 to attacker, must throw and not cache.
      const evilReq = writeRequest(`${ledgerEndpoint}/app/transactions`);
      const next = vi.fn<SendRequest>();
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({ location: "https://attacker.example.com/x" }),
        request: evilReq,
        status: 307,
      });
      await expectRejection(() => policy.sendRequest(evilReq, next), /untrusted target origin/i);

      // Second write should still go to the load balancer URL — cache must be empty.
      const followupReq = writeRequest(`${ledgerEndpoint}/app/transactions`);
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: followupReq,
        status: 200,
      });
      await policy.sendRequest(followupReq, next);

      assert.ok(
        next.mock.calls[1][0].url.startsWith(ledgerEndpoint),
        "Untrusted redirect must not poison the write-cache",
      );
    });

    it("throws on 301 redirect to an untrusted host for a GET request", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const request = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions/latest`,
        method: "GET",
        headers: createHttpHeaders({ Authorization: "Bearer SECRET-TOKEN-DO-NOT-LEAK" }),
      });

      const next = vi.fn<SendRequest>();
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({ location: "https://attacker.example.com/x" }),
        request,
        status: 301,
      });

      await expectRejection(() => policy.sendRequest(request, next), /untrusted target origin/i);
      // No follow-up call: the attacker host never receives the Bearer token.
      assert.equal(next.mock.calls.length, 1);
    });

    it("throws on 302 redirect to an untrusted host for a GET request", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const request = createPipelineRequest({
        url: `${ledgerEndpoint}/app/transactions/latest`,
        method: "GET",
        headers: createHttpHeaders({ Authorization: "Bearer SECRET-TOKEN-DO-NOT-LEAK" }),
      });

      const next = vi.fn<SendRequest>();
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({ location: "https://attacker.example.com/x" }),
        request,
        status: 302,
      });

      await expectRejection(() => policy.sendRequest(request, next), /untrusted target origin/i);
      assert.equal(next.mock.calls.length, 1);
    });

    it("throws on 303 redirect to an untrusted host for a POST request (before POST→GET conversion)", async () => {
      // 303 normally converts POST→GET and drops the body. The trust check must
      // run BEFORE that conversion so that we never even attempt to send to an
      // untrusted target — and so the original request method is preserved for
      // a clean retry.
      const policy = getRedirectPolicy(ledgerEndpoint);
      const request = writeRequest(`${ledgerEndpoint}/app/transactions`);

      const next = vi.fn<SendRequest>();
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({ location: "https://attacker.example.com/result" }),
        request,
        status: 303,
      });

      await expectRejection(() => policy.sendRequest(request, next), /untrusted target origin/i);
      assert.equal(next.mock.calls.length, 1);
      assert.equal(request.url, `${ledgerEndpoint}/app/transactions`);
      // Method must NOT have been converted to GET — restored to original POST.
      assert.equal(request.method, "POST");
      // Body must still be present (we didn't go through the 303 strip path).
      assert.ok(request.body, "Request body must be preserved when the redirect is refused");
    });
  });

  describe("Trusted redirect targets are followed", () => {
    it("follows a 307 to a subdomain and preserves Authorization", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const request = writeRequest(`${ledgerEndpoint}/app/transactions`);
      const subdomainTarget =
        "https://node-1.test-ledger.confidential-ledger.azure.com/app/transactions";

      const next = vi.fn<SendRequest>();
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({ location: subdomainTarget }),
        request,
        status: 307,
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request,
        status: 200,
      });

      const result = await policy.sendRequest(request, next);
      assert.equal(result.status, 200);
      // Bearer token preserved verbatim on the redirected request — this is the
      // legitimate behavior that this custom policy is needed for in the first
      // place (the default policy would strip it on cross-host redirect).
      assert.equal(
        next.mock.calls[1][0].headers.get("Authorization"),
        "Bearer SECRET-TOKEN-DO-NOT-LEAK",
      );
      // Request URL was rewritten to the subdomain.
      assert.equal(next.mock.calls[1][0].url, subdomainTarget);
      // Method preserved (307 is method-preserving).
      assert.equal(next.mock.calls[1][0].method, "POST");
    });

    it("accepts a trailing-dot FQDN as a trusted subdomain", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const request = writeRequest(`${ledgerEndpoint}/app/transactions`);

      const next = vi.fn<SendRequest>();
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({
          location: "https://node-1.test-ledger.confidential-ledger.azure.com./app/transactions",
        }),
        request,
        status: 307,
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request,
        status: 200,
      });

      const result = await policy.sendRequest(request, next);
      assert.equal(result.status, 200);
    });

    it("accepts an uppercase hostname as a trusted subdomain", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const request = writeRequest(`${ledgerEndpoint}/app/transactions`);

      const next = vi.fn<SendRequest>();
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({
          location: "https://NODE-1.TEST-LEDGER.CONFIDENTIAL-LEDGER.AZURE.COM/app/transactions",
        }),
        request,
        status: 307,
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request,
        status: 200,
      });

      const result = await policy.sendRequest(request, next);
      assert.equal(result.status, 200);
    });
  });

  describe("Mid-chain untrusted hop", () => {
    it("refuses an untrusted second hop after a trusted first hop", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const request = writeRequest(`${ledgerEndpoint}/app/transactions`);

      const next = vi.fn<SendRequest>();
      // Hop 1: trusted subdomain
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({
          location: "https://node-1.test-ledger.confidential-ledger.azure.com/app/transactions",
        }),
        request,
        status: 307,
      });
      // Hop 2 from trusted node: redirects to attacker — must be refused
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({
          location: "https://attacker.example.com/app/transactions",
        }),
        request,
        status: 307,
      });

      await expectRejection(() => policy.sendRequest(request, next), /untrusted target origin/i);

      // We made the first redirected request to the subdomain but NOT a third
      // request to the attacker.
      assert.equal(next.mock.calls.length, 2);
      // URL is restored to original load balancer URL for clean retry behavior.
      assert.equal(request.url, `${ledgerEndpoint}/app/transactions`);
      assert.equal(request.method, "POST");
    });

    it("discards a staged cache entry when a later hop is untrusted", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);

      // First write: trusted 307 then untrusted 307 → throws → cache must NOT be
      // populated with the trusted hop URL.
      const req1 = writeRequest(`${ledgerEndpoint}/app/transactions`);
      const next = vi.fn<SendRequest>();
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({
          location: "https://node-1.test-ledger.confidential-ledger.azure.com/app/transactions",
        }),
        request: req1,
        status: 307,
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({
          location: "https://attacker.example.com/app/transactions",
        }),
        request: req1,
        status: 307,
      });
      await expectRejection(() => policy.sendRequest(req1, next), /untrusted target origin/i);

      // Second write: should still go to the load balancer (cache must be cold).
      const req2 = writeRequest(`${ledgerEndpoint}/app/transactions`);
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: req2,
        status: 200,
      });
      await policy.sendRequest(req2, next);

      assert.ok(
        next.mock.calls[2][0].url.startsWith(ledgerEndpoint),
        "Staged cache entry from a partially trusted chain must be discarded on untrusted hop",
      );
    });
  });

  describe("Warm cache is invalidated by a malicious response from the cached node", () => {
    it("clears the cache and restores the original URL when the cached node returns an untrusted redirect", async () => {
      const policy = getRedirectPolicy(ledgerEndpoint);
      const next = vi.fn<SendRequest>();

      // Warm the cache legitimately.
      const warm = writeRequest(`${ledgerEndpoint}/app/transactions`);
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({
          location: "https://node-1.test-ledger.confidential-ledger.azure.com/app/transactions",
        }),
        request: warm,
        status: 307,
      });
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: warm,
        status: 200,
      });
      await policy.sendRequest(warm, next);

      // Now the cached node returns a malicious redirect. The request URL is
      // first rewritten to the cached node (call index 2), then the response
      // 307 points at an attacker (must throw).
      const malicious = writeRequest(`${ledgerEndpoint}/app/transactions`);
      next.mockResolvedValueOnce({
        headers: createHttpHeaders({
          location: "https://attacker.example.com/app/transactions",
        }),
        request: malicious,
        status: 307,
      });
      await expectRejection(() => policy.sendRequest(malicious, next), /untrusted target origin/i);

      // The request URL must be restored to the load balancer URL.
      assert.equal(malicious.url, `${ledgerEndpoint}/app/transactions`);

      // Subsequent write must go through the load balancer (cache invalidated).
      const followup = writeRequest(`${ledgerEndpoint}/app/transactions`);
      next.mockResolvedValueOnce({
        headers: createHttpHeaders(),
        request: followup,
        status: 200,
      });
      await policy.sendRequest(followup, next);

      assert.ok(
        next.mock.calls[3][0].url.startsWith(ledgerEndpoint),
        "Cache must be invalidated after the cached node issues an untrusted redirect",
      );
    });
  });

  describe("Full-pipeline integration: Bearer token never reaches an untrusted target", () => {
    /**
     * This test goes through the real createClient pipeline (including the
     * bearerTokenAuthenticationPolicy that attaches the credential token), and
     * uses a mock HttpClient to capture every outbound HTTP request. It is the
     * strongest possible assertion for the MSRC vulnerability: regardless of
     * how the upstream pipeline behaves on a redirect, the attacker host must
     * NEVER appear in the recorded outbound requests, and therefore the Bearer
     * token can never reach the attacker.
     */
    it("never sends an outbound request to an untrusted redirect target via createClient", async () => {
      const recordedRequests: PipelineRequest[] = [];
      const mockHttpClient: HttpClient = {
        sendRequest: vi.fn(async (req: PipelineRequest): Promise<PipelineResponse> => {
          // Capture a snapshot of each outbound request — including which host
          // the URL targets and whether Authorization is attached.
          recordedRequests.push({
            ...req,
            headers: createHttpHeaders({
              Authorization: req.headers.get("Authorization") ?? "",
            }),
          });

          // The first call (to the configured ledger endpoint) returns 307 to
          // an attacker host. If anything in the pipeline blindly follows it,
          // a SECOND call to attacker.example.com will appear in recordedRequests.
          if (recordedRequests.length === 1) {
            return {
              status: 307,
              headers: createHttpHeaders({
                location: "https://attacker.example.com/primary/app/transactions",
              }),
              request: req,
            };
          }
          // Any subsequent call (which would indicate the redirect was followed)
          // resolves with 200 — the test asserts there is no such call, not the
          // response itself.
          return { status: 200, headers: createHttpHeaders(), request: req };
        }),
      };

      const fakeCredential = {
        getToken: vi.fn().mockResolvedValue({
          token: "SECRET-PIPELINE-TOKEN",
          expiresOnTimestamp: Date.now() + 3_600_000,
        }),
      };

      const client = createClient(ledgerEndpoint, fakeCredential, {
        httpClient: mockHttpClient,
        // Disable retries so an error from the redirect refusal surfaces
        // immediately and the test doesn't time out on retry back-off.
        retryOptions: { maxRetries: 0 },
      });

      let thrown: unknown;
      try {
        await client.path("/app/transactions").post({
          contentType: "application/json",
          body: { contents: "sensitive payload" },
        });
      } catch (e) {
        thrown = e;
      }

      // Exactly one outbound HTTP request was made: the one to the configured
      // ledger endpoint. The attacker host must never have been contacted.
      const attackerCalls = recordedRequests.filter((r) => r.url.includes("attacker.example.com"));
      assert.equal(
        attackerCalls.length,
        0,
        `Bearer token MUST NOT be sent to attacker host. Recorded calls: ${recordedRequests
          .map((r) => r.url)
          .join(", ")}`,
      );
      assert.ok(
        recordedRequests.every((r) => r.url.startsWith(ledgerEndpoint)),
        `All outbound requests must target the configured ledger endpoint. Got: ${recordedRequests
          .map((r) => r.url)
          .join(", ")}`,
      );
      // Sanity: the Bearer token WAS attached to the legitimate request.
      assert.equal(
        recordedRequests[0]?.headers.get("Authorization"),
        "Bearer SECRET-PIPELINE-TOKEN",
        "The bearer policy must attach the token to the legitimate ledger request",
      );
      // The write must have failed (the redirect was refused) so the caller is
      // notified rather than silently succeeding with the wrong response.
      assert.ok(thrown, "The client call must reject when the redirect is untrusted");
    });
  });
});

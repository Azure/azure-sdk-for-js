// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import type { PipelinePolicy, PipelineResponse, SendRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import createClient from "../../src/confidentialLedger.js";

/**
 * Helper to extract the custom redirect policy from a client's pipeline.
 */
function getRedirectPolicy(ledgerEndpoint: string): PipelinePolicy {
  // Create a client with a fake credential to get access to the pipeline
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

describe("Confidential Ledger Redirect Policy", () => {
  const ledgerEndpoint = "https://test-ledger.confidential-ledger.azure.com";

  it("should be added to the pipeline and replace the default redirectPolicy", () => {
    const fakeCredential = {
      getToken: vi
        .fn()
        .mockResolvedValue({ token: "fake-token", expiresOnTimestamp: Date.now() + 3600000 }),
    };
    const client = createClient(ledgerEndpoint, fakeCredential);
    const policies = client.pipeline.getOrderedPolicies();

    const defaultRedirect = policies.find((p) => p.name === "redirectPolicy");
    const customRedirect = policies.find((p) => p.name === "confidentialLedgerRedirectPolicy");

    assert.isUndefined(defaultRedirect, "Default redirectPolicy should be removed");
    assert.ok(customRedirect, "Custom confidentialLedgerRedirectPolicy should be present");
  });

  it("should follow a 307 redirect and preserve the Authorization header", async () => {
    const policy = getRedirectPolicy(ledgerEndpoint);
    const request = createPipelineRequest({
      url: "https://test-ledger.confidential-ledger.azure.com/app/transactions",
      method: "POST",
      headers: createHttpHeaders({
        Authorization: "Bearer fake-token",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ contents: "test" }),
    });

    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({
        location: "https://test-ledger-primary.confidential-ledger.azure.com/app/transactions",
      }),
      request,
      status: 307,
    };

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);
    next.mockResolvedValueOnce(successResponse);

    const result = await policy.sendRequest(request, next);

    assert.equal(result.status, 200);
    assert.equal(next.mock.calls.length, 2);

    // Verify the Authorization header was preserved on the redirected request
    const redirectedRequest = next.mock.calls[1][0];
    assert.equal(redirectedRequest.headers.get("Authorization"), "Bearer fake-token");
    assert.equal(
      redirectedRequest.url,
      "https://test-ledger-primary.confidential-ledger.azure.com/app/transactions",
    );
    // Method should remain POST for 307
    assert.equal(redirectedRequest.method, "POST");
  });

  it("should preserve all custom headers on redirect", async () => {
    const policy = getRedirectPolicy(ledgerEndpoint);
    const request = createPipelineRequest({
      url: "https://test-ledger.confidential-ledger.azure.com/app/transactions",
      method: "POST",
      headers: createHttpHeaders({
        Authorization: "Bearer fake-token",
        "Content-Type": "application/json",
        "x-ms-client-request-id": "test-request-id",
        "x-custom-header": "custom-value",
      }),
    });

    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({
        location: "https://test-ledger-primary.confidential-ledger.azure.com/app/transactions",
      }),
      request,
      status: 307,
    };

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);
    next.mockResolvedValueOnce(successResponse);

    await policy.sendRequest(request, next);

    const redirectedRequest = next.mock.calls[1][0];
    assert.equal(redirectedRequest.headers.get("Authorization"), "Bearer fake-token");
    assert.equal(redirectedRequest.headers.get("Content-Type"), "application/json");
    assert.equal(redirectedRequest.headers.get("x-ms-client-request-id"), "test-request-id");
    assert.equal(redirectedRequest.headers.get("x-custom-header"), "custom-value");
  });

  it("should follow a 300 redirect", async () => {
    const policy = getRedirectPolicy(ledgerEndpoint);
    const request = createPipelineRequest({
      url: "https://test-ledger.confidential-ledger.azure.com/app/transactions",
      method: "GET",
      headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
    });

    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({ location: "https://other.example.com/redirect" }),
      request,
      status: 300,
    };

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);
    next.mockResolvedValueOnce(successResponse);

    const result = await policy.sendRequest(request, next);

    assert.equal(result.status, 200);
    assert.equal(next.mock.calls.length, 2);
    assert.equal(next.mock.calls[1][0].headers.get("Authorization"), "Bearer fake-token");
  });

  it("should follow a 301 redirect for GET requests", async () => {
    const policy = getRedirectPolicy(ledgerEndpoint);
    const request = createPipelineRequest({
      url: "https://test-ledger.confidential-ledger.azure.com/app/transactions",
      method: "GET",
      headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
    });

    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({ location: "https://other.example.com/new-location" }),
      request,
      status: 301,
    };

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);
    next.mockResolvedValueOnce(successResponse);

    const result = await policy.sendRequest(request, next);

    assert.equal(result.status, 200);
    assert.equal(next.mock.calls[1][0].headers.get("Authorization"), "Bearer fake-token");
  });

  it("should not follow a 301 redirect for POST requests", async () => {
    const policy = getRedirectPolicy(ledgerEndpoint);
    const request = createPipelineRequest({
      url: "https://test-ledger.confidential-ledger.azure.com/app/transactions",
      method: "POST",
      headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
    });

    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({ location: "https://other.example.com/new-location" }),
      request,
      status: 301,
    };

    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);

    const result = await policy.sendRequest(request, next);

    // Should NOT follow the redirect — 301 is only for GET/HEAD
    assert.equal(result.status, 301);
    assert.equal(next.mock.calls.length, 1);
  });

  it("should convert POST to GET on 303 redirect and remove body", async () => {
    const policy = getRedirectPolicy(ledgerEndpoint);
    const request = createPipelineRequest({
      url: "https://test-ledger.confidential-ledger.azure.com/app/transactions",
      method: "POST",
      headers: createHttpHeaders({
        Authorization: "Bearer fake-token",
        "Content-Length": "100",
      }),
      body: JSON.stringify({ contents: "test" }),
    });

    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({ location: "https://other.example.com/result" }),
      request,
      status: 303,
    };

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);
    next.mockResolvedValueOnce(successResponse);

    const result = await policy.sendRequest(request, next);

    assert.equal(result.status, 200);
    const redirectedRequest = next.mock.calls[1][0];
    // Method should be converted to GET
    assert.equal(redirectedRequest.method, "GET");
    // Body and Content-Length should be removed
    assert.isUndefined(redirectedRequest.body);
    assert.notEqual(redirectedRequest.headers.get("Content-Length"), "100");
    // Authorization header should still be preserved
    assert.equal(redirectedRequest.headers.get("Authorization"), "Bearer fake-token");
  });

  it("should not follow redirect when no location header is present", async () => {
    const policy = getRedirectPolicy(ledgerEndpoint);
    const request = createPipelineRequest({
      url: "https://test-ledger.confidential-ledger.azure.com/app/transactions",
      method: "GET",
      headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
    });

    const responseWithoutLocation: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 307,
    };

    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(responseWithoutLocation);

    const result = await policy.sendRequest(request, next);

    assert.equal(result.status, 307);
    assert.equal(next.mock.calls.length, 1);
  });

  it("should follow multiple redirects in sequence", async () => {
    const policy = getRedirectPolicy(ledgerEndpoint);
    const request = createPipelineRequest({
      url: "https://test-ledger.confidential-ledger.azure.com/app/transactions",
      method: "POST",
      headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
      body: JSON.stringify({ contents: "test" }),
    });

    const redirect1: PipelineResponse = {
      headers: createHttpHeaders({
        location: "https://node-1.confidential-ledger.azure.com/app/transactions",
      }),
      request,
      status: 307,
    };

    const redirect2: PipelineResponse = {
      headers: createHttpHeaders({
        location: "https://node-2.confidential-ledger.azure.com/app/transactions",
      }),
      request,
      status: 307,
    };

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirect1);
    next.mockResolvedValueOnce(redirect2);
    next.mockResolvedValueOnce(successResponse);

    const result = await policy.sendRequest(request, next);

    assert.equal(result.status, 200);
    assert.equal(next.mock.calls.length, 3);

    // Authorization should be preserved through all redirects
    assert.equal(next.mock.calls[1][0].headers.get("Authorization"), "Bearer fake-token");
    assert.equal(next.mock.calls[2][0].headers.get("Authorization"), "Bearer fake-token");

    // The policy mutates the same request object, so after all redirects
    // the URL reflects the final redirect target
    assert.equal(
      next.mock.calls[2][0].url,
      "https://node-2.confidential-ledger.azure.com/app/transactions",
    );
  });

  it("should stop following redirects after max retries", async () => {
    const policy = getRedirectPolicy(ledgerEndpoint);
    const request = createPipelineRequest({
      url: "https://test-ledger.confidential-ledger.azure.com/app/transactions",
      method: "GET",
      headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
    });

    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({ location: "https://other.example.com/redirect" }),
      request,
      status: 300,
    };

    const next = vi.fn<SendRequest>();
    // Return redirect for every call (more than max retries of 20)
    next.mockResolvedValue(redirectResponse);

    const result = await policy.sendRequest(request, next);

    // Should stop after 20 + 1 (initial) calls = 21 total
    assert.equal(result.status, 300);
    assert.equal(next.mock.calls.length, 21);
  });

  it("should not follow redirect for non-redirect status codes", async () => {
    const policy = getRedirectPolicy(ledgerEndpoint);
    const request = createPipelineRequest({
      url: "https://test-ledger.confidential-ledger.azure.com/app/transactions",
      method: "GET",
      headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
    });

    const okResponse: PipelineResponse = {
      headers: createHttpHeaders({ location: "https://should-not-follow.com" }),
      request,
      status: 200,
    };

    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(okResponse);

    const result = await policy.sendRequest(request, next);

    assert.equal(result.status, 200);
    assert.equal(next.mock.calls.length, 1);
  });

  it("should resolve relative location URLs", async () => {
    const policy = getRedirectPolicy(ledgerEndpoint);
    const request = createPipelineRequest({
      url: "https://test-ledger.confidential-ledger.azure.com/app/transactions",
      method: "GET",
      headers: createHttpHeaders({ Authorization: "Bearer fake-token" }),
    });

    const redirectResponse: PipelineResponse = {
      headers: createHttpHeaders({ location: "/app/other-endpoint" }),
      request,
      status: 300,
    };

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(redirectResponse);
    next.mockResolvedValueOnce(successResponse);

    const result = await policy.sendRequest(request, next);

    assert.equal(result.status, 200);
    assert.equal(
      next.mock.calls[1][0].url,
      "https://test-ledger.confidential-ledger.azure.com/app/other-endpoint",
    );
    assert.equal(next.mock.calls[1][0].headers.get("Authorization"), "Bearer fake-token");
  });
});

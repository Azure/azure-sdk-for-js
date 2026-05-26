// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import type { PipelinePolicy, PipelineResponse, SendRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import createClient from "../../src/confidentialLedger.js";

/**
 * Helper to extract the merge-patch content type policy from a client's pipeline.
 */
function getMergePatchPolicy(ledgerEndpoint: string): PipelinePolicy {
  const fakeCredential = {
    getToken: vi
      .fn()
      .mockResolvedValue({ token: "fake-token", expiresOnTimestamp: Date.now() + 3600000 }),
  };
  const client = createClient(ledgerEndpoint, fakeCredential);
  const policies = client.pipeline.getOrderedPolicies();
  const policy = policies.find(
    (p) => p.name === "confidentialLedgerMergePatchContentTypePolicy",
  );
  assert.ok(
    policy,
    "confidentialLedgerMergePatchContentTypePolicy should be present in the pipeline",
  );
  return policy!;
}

/**
 * Helper that creates a mock SendRequest which snapshots the Content-Type
 * header at the moment `next` is called. We snapshot (copy the string value)
 * rather than capturing the request object reference, because the policy
 * mutates the request *before* calling next — if we only kept a reference we
 * would see whatever the final mutated state is, not what was actually
 * dispatched to the network layer.
 */
function createMockNext(): {
  next: SendRequest;
  /** Content-Type value seen by the downstream pipeline for each call. */
  capturedContentTypes: (string | undefined)[];
} {
  const capturedContentTypes: (string | undefined)[] = [];
  const next: SendRequest = async (req) => {
    capturedContentTypes.push(req.headers.get("Content-Type") ?? undefined);
    return {
      status: 200,
      headers: createHttpHeaders(),
      request: req,
    } as PipelineResponse;
  };
  return { next, capturedContentTypes };
}

const MERGE_PATCH = "application/merge-patch+json";
const JSON_CT = "application/json";

describe("Confidential Ledger Merge-Patch Content-Type Policy", () => {
  const ledgerEndpoint = "https://test-ledger.confidential-ledger.azure.com";

  // ─── Pipeline integration ──────────────────────────────────────────

  it("should be present in the pipeline", () => {
    const fakeCredential = {
      getToken: vi
        .fn()
        .mockResolvedValue({ token: "fake-token", expiresOnTimestamp: Date.now() + 3600000 }),
    };
    const client = createClient(ledgerEndpoint, fakeCredential);
    const policies = client.pipeline.getOrderedPolicies();
    const policy = policies.find(
      (p) => p.name === "confidentialLedgerMergePatchContentTypePolicy",
    );
    assert.ok(policy, "Policy should be present");
  });

  // ─── Positive cases: PATCH to user endpoints MUST get merge-patch ──

  it("should override application/json to merge-patch for PATCH /app/users/{userId}", async () => {
    const policy = getMergePatchPolicy(ledgerEndpoint);
    const { next, capturedContentTypes } = createMockNext();

    const request = createPipelineRequest({
      url: `${ledgerEndpoint}/app/users/abc-123`,
      method: "PATCH",
      headers: createHttpHeaders({ "Content-Type": JSON_CT }),
      body: JSON.stringify({ assignedRole: "Reader" }),
    });

    await policy.sendRequest(request, next);

    assert.equal(capturedContentTypes.length, 1, "next should be called exactly once");
    assert.equal(capturedContentTypes[0], MERGE_PATCH);
  });

  it("should override application/json to merge-patch for PATCH /app/ledgerUsers/{userId}", async () => {
    const policy = getMergePatchPolicy(ledgerEndpoint);
    const { next, capturedContentTypes } = createMockNext();

    const request = createPipelineRequest({
      url: `${ledgerEndpoint}/app/ledgerUsers/user@contoso.com`,
      method: "PATCH",
      headers: createHttpHeaders({ "Content-Type": JSON_CT }),
      body: JSON.stringify({ assignedRoles: ["Reader"] }),
    });

    await policy.sendRequest(request, next);

    assert.equal(capturedContentTypes.length, 1);
    assert.equal(capturedContentTypes[0], MERGE_PATCH);
  });

  it("should ADD merge-patch when no Content-Type is set (the real-world SDK default)", async () => {
    // This is the actual bug scenario: @azure-rest/core-client defaults to
    // application/json at a lower layer, but at policy evaluation time the
    // header may be absent. The policy must set it regardless.
    const policy = getMergePatchPolicy(ledgerEndpoint);
    const { next, capturedContentTypes } = createMockNext();

    const request = createPipelineRequest({
      url: `${ledgerEndpoint}/app/users/abc-123`,
      method: "PATCH",
      // Intentionally no Content-Type header
      body: JSON.stringify({ assignedRole: "Reader" }),
    });

    await policy.sendRequest(request, next);

    assert.equal(capturedContentTypes[0], MERGE_PATCH);
  });

  it("should be idempotent when Content-Type is already merge-patch", async () => {
    const policy = getMergePatchPolicy(ledgerEndpoint);
    const { next, capturedContentTypes } = createMockNext();

    const request = createPipelineRequest({
      url: `${ledgerEndpoint}/app/users/abc-123`,
      method: "PATCH",
      headers: createHttpHeaders({ "Content-Type": MERGE_PATCH }),
      body: JSON.stringify({ assignedRole: "Reader" }),
    });

    await policy.sendRequest(request, next);

    assert.equal(capturedContentTypes[0], MERGE_PATCH);
  });

  it("should handle userId with special characters (percent-encoded)", async () => {
    const policy = getMergePatchPolicy(ledgerEndpoint);
    const { next, capturedContentTypes } = createMockNext();

    const request = createPipelineRequest({
      url: `${ledgerEndpoint}/app/users/user%40contoso.com`,
      method: "PATCH",
      headers: createHttpHeaders({ "Content-Type": JSON_CT }),
      body: JSON.stringify({ assignedRole: "Reader" }),
    });

    await policy.sendRequest(request, next);

    assert.equal(capturedContentTypes[0], MERGE_PATCH);
  });

  it("should handle URL with query parameters", async () => {
    const policy = getMergePatchPolicy(ledgerEndpoint);
    const { next, capturedContentTypes } = createMockNext();

    const request = createPipelineRequest({
      url: `${ledgerEndpoint}/app/users/abc-123?api-version=2024-12-09-preview`,
      method: "PATCH",
      headers: createHttpHeaders({ "Content-Type": JSON_CT }),
      body: JSON.stringify({ assignedRole: "Reader" }),
    });

    await policy.sendRequest(request, next);

    assert.equal(capturedContentTypes[0], MERGE_PATCH);
  });

  it("should handle redirected URL (subdomain) for user PATCH", async () => {
    const policy = getMergePatchPolicy(ledgerEndpoint);
    const { next, capturedContentTypes } = createMockNext();

    const request = createPipelineRequest({
      url: "https://node-1.test-ledger.confidential-ledger.azure.com/app/ledgerUsers/abc-123",
      method: "PATCH",
      headers: createHttpHeaders({ "Content-Type": JSON_CT }),
      body: JSON.stringify({ assignedRoles: ["Reader"] }),
    });

    await policy.sendRequest(request, next);

    assert.equal(capturedContentTypes[0], MERGE_PATCH);
  });

  it("should handle trailing slash on user path", async () => {
    const policy = getMergePatchPolicy(ledgerEndpoint);
    const { next, capturedContentTypes } = createMockNext();

    const request = createPipelineRequest({
      url: `${ledgerEndpoint}/app/users/abc-123/`,
      method: "PATCH",
      headers: createHttpHeaders({ "Content-Type": JSON_CT }),
      body: JSON.stringify({ assignedRole: "Reader" }),
    });

    await policy.sendRequest(request, next);

    assert.equal(capturedContentTypes[0], MERGE_PATCH);
  });

  // ─── Negative: other PATCH endpoints must keep application/json ────

  it("should NOT change Content-Type for PATCH /app/roles", async () => {
    const policy = getMergePatchPolicy(ledgerEndpoint);
    const { next, capturedContentTypes } = createMockNext();

    const request = createPipelineRequest({
      url: `${ledgerEndpoint}/app/roles`,
      method: "PATCH",
      headers: createHttpHeaders({ "Content-Type": JSON_CT }),
      body: JSON.stringify([{ roleName: "TestRole", roleActions: [] }]),
    });

    await policy.sendRequest(request, next);

    assert.equal(capturedContentTypes[0], JSON_CT);
  });

  it("should NOT change Content-Type for PATCH /app/userDefinedEndpoints/runtimeOptions", async () => {
    const policy = getMergePatchPolicy(ledgerEndpoint);
    const { next, capturedContentTypes } = createMockNext();

    const request = createPipelineRequest({
      url: `${ledgerEndpoint}/app/userDefinedEndpoints/runtimeOptions`,
      method: "PATCH",
      headers: createHttpHeaders({ "Content-Type": JSON_CT }),
      body: JSON.stringify({ logExceptionDetails: true }),
    });

    await policy.sendRequest(request, next);

    assert.equal(capturedContentTypes[0], JSON_CT);
  });

  it("should NOT match /app/users (list endpoint, no userId segment)", async () => {
    const policy = getMergePatchPolicy(ledgerEndpoint);
    const { next, capturedContentTypes } = createMockNext();

    const request = createPipelineRequest({
      url: `${ledgerEndpoint}/app/users`,
      method: "PATCH",
      headers: createHttpHeaders({ "Content-Type": JSON_CT }),
    });

    await policy.sendRequest(request, next);

    assert.equal(capturedContentTypes[0], JSON_CT);
  });

  it("should NOT match /app/users/{userId}/subresource (extra path segments)", async () => {
    const policy = getMergePatchPolicy(ledgerEndpoint);
    const { next, capturedContentTypes } = createMockNext();

    const request = createPipelineRequest({
      url: `${ledgerEndpoint}/app/users/abc-123/permissions`,
      method: "PATCH",
      headers: createHttpHeaders({ "Content-Type": JSON_CT }),
    });

    await policy.sendRequest(request, next);

    assert.equal(capturedContentTypes[0], JSON_CT);
  });

  it("should NOT match look-alike paths like /app/usersExtra/{id}", async () => {
    const policy = getMergePatchPolicy(ledgerEndpoint);
    const { next, capturedContentTypes } = createMockNext();

    const request = createPipelineRequest({
      url: `${ledgerEndpoint}/app/usersExtra/abc-123`,
      method: "PATCH",
      headers: createHttpHeaders({ "Content-Type": JSON_CT }),
    });

    await policy.sendRequest(request, next);

    assert.equal(capturedContentTypes[0], JSON_CT);
  });

  // ─── Negative: non-PATCH HTTP methods must not be affected ─────────

  it("should NOT change Content-Type for GET /app/users/{userId}", async () => {
    const policy = getMergePatchPolicy(ledgerEndpoint);
    const { next, capturedContentTypes } = createMockNext();

    const request = createPipelineRequest({
      url: `${ledgerEndpoint}/app/users/abc-123`,
      method: "GET",
      headers: createHttpHeaders({ "Content-Type": JSON_CT }),
    });

    await policy.sendRequest(request, next);

    assert.equal(
      capturedContentTypes[0],
      JSON_CT,
      "GET should preserve original Content-Type",
    );
  });

  it("should NOT change Content-Type for DELETE /app/users/{userId}", async () => {
    const policy = getMergePatchPolicy(ledgerEndpoint);
    const { next, capturedContentTypes } = createMockNext();

    const request = createPipelineRequest({
      url: `${ledgerEndpoint}/app/users/abc-123`,
      method: "DELETE",
      headers: createHttpHeaders({ "Content-Type": JSON_CT }),
    });

    await policy.sendRequest(request, next);

    assert.equal(
      capturedContentTypes[0],
      JSON_CT,
      "DELETE should preserve original Content-Type",
    );
  });

  it("should NOT change Content-Type for POST /app/users/{userId}", async () => {
    const policy = getMergePatchPolicy(ledgerEndpoint);
    const { next, capturedContentTypes } = createMockNext();

    const request = createPipelineRequest({
      url: `${ledgerEndpoint}/app/users/abc-123`,
      method: "POST",
      headers: createHttpHeaders({ "Content-Type": JSON_CT }),
      body: JSON.stringify({ assignedRole: "Reader" }),
    });

    await policy.sendRequest(request, next);

    assert.equal(
      capturedContentTypes[0],
      JSON_CT,
      "POST should preserve original Content-Type",
    );
  });

  it("should NOT change Content-Type for PUT /app/users/{userId}", async () => {
    const policy = getMergePatchPolicy(ledgerEndpoint);
    const { next, capturedContentTypes } = createMockNext();

    const request = createPipelineRequest({
      url: `${ledgerEndpoint}/app/users/abc-123`,
      method: "PUT",
      headers: createHttpHeaders({ "Content-Type": JSON_CT }),
      body: JSON.stringify({ assignedRole: "Reader" }),
    });

    await policy.sendRequest(request, next);

    assert.equal(
      capturedContentTypes[0],
      JSON_CT,
      "PUT should preserve original Content-Type",
    );
  });
});

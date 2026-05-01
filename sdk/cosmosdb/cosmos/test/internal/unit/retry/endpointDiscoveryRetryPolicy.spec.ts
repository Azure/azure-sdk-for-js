// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it, vi, expect } from "vitest";
import { OperationType, ResourceType } from "../../../../src/common/index.js";
import { EndpointDiscoveryRetryPolicy } from "../../../../src/retry/endpointDiscoveryRetryPolicy.js";
import { createDummyDiagnosticNode } from "../../../public/common/TestHelpers.js";

describe("EndpointDiscoveryRetryPolicy", () => {
  const retryContext = { retryCount: 0 } as any;
  const dummyEndpoint = "https://dummy.documents.azure.com:443/";
  const gemStub = {
    enableEndpointDiscovery: true,
    markCurrentLocationUnavailableForRead: vi.fn(),
    markCurrentLocationUnavailableForWrite: vi.fn(),
  } as any;
  const err = { code: "ENOTFOUND" } as any;

  it("returns false if endpoint discovery disabled", async () => {
    const policy = new EndpointDiscoveryRetryPolicy(
      { enableEndpointDiscovery: false } as any,
      ResourceType.item,
      OperationType.Read,
    );
    const result = await policy.shouldRetry(
      err,
      createDummyDiagnosticNode(),
      retryContext,
      dummyEndpoint,
    );
    assert.isFalse(result as boolean);
  });

  it("returns false if retryCount exceeds maxRetries", async () => {
    const policy = new EndpointDiscoveryRetryPolicy(gemStub, ResourceType.none, OperationType.Read);
    (policy as any).currentRetryAttemptCount = 121;
    const result = await policy.shouldRetry(
      err,
      createDummyDiagnosticNode(),
      retryContext,
      dummyEndpoint,
    );
    assert.isFalse(result as boolean);
  });

  it("retries Read of database account (ResourceType.none)", async () => {
    const policy = new EndpointDiscoveryRetryPolicy(gemStub, ResourceType.none, OperationType.Read);
    const res = await policy.shouldRetry(
      err,
      createDummyDiagnosticNode(),
      retryContext,
      dummyEndpoint,
    );
    assert.isTrue(res as boolean);
  });

  it("calls markCurrentLocationUnavailableForRead for read requests", async () => {
    const policy = new EndpointDiscoveryRetryPolicy(gemStub, ResourceType.item, OperationType.Read);
    const dn = createDummyDiagnosticNode();
    await policy.shouldRetry({ code: "ENOTFOUND" } as any, dn, retryContext, dummyEndpoint);

    expect(gemStub.markCurrentLocationUnavailableForRead).toHaveBeenCalledWith(dn, dummyEndpoint);
    expect(retryContext.retryCount).toBe(1);
  });

  it("calls markCurrentLocationUnavailableForWrite for write requests", async () => {
    const policy = new EndpointDiscoveryRetryPolicy(
      gemStub,
      ResourceType.item,
      OperationType.Create,
    );
    const dn = createDummyDiagnosticNode();
    await policy.shouldRetry({ code: "ENOTFOUND" } as any, dn, retryContext, dummyEndpoint);
    expect(gemStub.markCurrentLocationUnavailableForWrite).toHaveBeenCalledWith(dn, dummyEndpoint);
  });
});

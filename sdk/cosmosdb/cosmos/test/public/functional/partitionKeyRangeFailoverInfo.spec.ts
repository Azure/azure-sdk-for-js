// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, beforeEach, assert } from "vitest";
import { PartitionKeyRangeFailoverInfo } from "../../../src/PartitionKeyRangeFailoverInfo.js";
import { createDummyDiagnosticNode } from "../common/TestHelpers.js";

describe("PartitionKeyRangeFailoverInfo", () => {
  const initialEndpoint = "https://region1.documents.azure.com";
  let failoverInfo: PartitionKeyRangeFailoverInfo;
  const diagnosticNode = createDummyDiagnosticNode();

  beforeEach(() => {
    failoverInfo = new PartitionKeyRangeFailoverInfo(initialEndpoint);
  });

  it("initializes correctly", async () => {
    const snapshot = await failoverInfo["snapshotConsecutiveRequestFailureCount"]();
    const timestamps = await failoverInfo.snapshotPartitionFailoverTimestamps();

    assert.equal(failoverInfo.getCurrentEndPoint(), initialEndpoint);
    assert.deepEqual(snapshot, {
      consecutiveReadRequestFailureCount: 0,
      consecutiveWriteRequestFailureCount: 0,
    });
    assert.equal(typeof timestamps.firstRequestFailureTime, "number");
    assert.equal(typeof timestamps.lastRequestFailureTime, "number");
  });

  it("increments read failure counts and checks circuit breaker triggering", async () => {
    for (let i = 0; i < 11; i++) {
      await failoverInfo.incrementRequestFailureCounts(true, Date.now());
    }

    const canTrigger = await failoverInfo.canCircuitBreakerTriggerPartitionFailOver(true);
    assert.isTrue(canTrigger);
  });

  it("increments write failure counts and checks circuit breaker triggering", async () => {
    for (let i = 0; i < 6; i++) {
      await failoverInfo.incrementRequestFailureCounts(false, Date.now());
    }

    const canTrigger = await failoverInfo.canCircuitBreakerTriggerPartitionFailOver(false);
    assert.isTrue(canTrigger);
  });

  it("resets counters if timeout exceeded", async () => {
    const initialTime = Date.now();
    await failoverInfo.incrementRequestFailureCounts(true, initialTime);

    const initialSnapshot = await failoverInfo["snapshotConsecutiveRequestFailureCount"]();
    assert.equal(initialSnapshot.consecutiveReadRequestFailureCount, 1);

    // Should reset counters
    await failoverInfo.incrementRequestFailureCounts(true, initialTime + 1000 * 60 * 1 + 1);

    const snapshot = await failoverInfo["snapshotConsecutiveRequestFailureCount"]();
    assert.equal(snapshot.consecutiveReadRequestFailureCount, 1);
  });

  it("TryMoveNextLocation should move to next valid endpoint", async () => {
    const nextEndpoints = [
      initialEndpoint,
      "https://region2.documents.azure.com",
      "https://region3.documents.azure.com",
    ];

    const result = await failoverInfo.tryMoveNextLocation(
      nextEndpoints,
      initialEndpoint,
      diagnosticNode,
      "fakeRangeId",
    );
    assert.isTrue(result);
    assert.equal(failoverInfo.getCurrentEndPoint(), "https://region2.documents.azure.com");
  });

  it("TryMoveNextLocation should skip already failed endpoints", async () => {
    const nextEndpoints = [initialEndpoint, "https://region2.documents.azure.com"];

    await failoverInfo.tryMoveNextLocation(
      nextEndpoints,
      initialEndpoint,
      diagnosticNode,
      "fakeRangeId",
    );
    const result = await failoverInfo.tryMoveNextLocation(
      nextEndpoints,
      "https://region2.documents.azure.com",
      diagnosticNode,
      "fakeRangeId",
    );
    assert.isFalse(result);
  });

  it("TryMoveNextLocation returns true if failedEndPoint is not current", async () => {
    const result = await failoverInfo.tryMoveNextLocation(
      ["https://region2.documents.azure.com"],
      "https://region2.documents.azure.com",
      diagnosticNode,
      "fakeRangeId",
    );
    assert.isTrue(result);
  });

  it("snapshotConsecutiveRequestFailureCount returns accurate counts", async () => {
    await failoverInfo.incrementRequestFailureCounts(true, Date.now());
    await failoverInfo.incrementRequestFailureCounts(false, Date.now());

    const counts = await failoverInfo["snapshotConsecutiveRequestFailureCount"]();
    assert.equal(counts.consecutiveReadRequestFailureCount, 1);
    assert.equal(counts.consecutiveWriteRequestFailureCount, 1);

    await failoverInfo.incrementRequestFailureCounts(true, Date.now());
    await failoverInfo.incrementRequestFailureCounts(false, Date.now());

    const counts2 = await failoverInfo["snapshotConsecutiveRequestFailureCount"]();
    assert.equal(counts2.consecutiveReadRequestFailureCount, 2);
    assert.equal(counts2.consecutiveWriteRequestFailureCount, 2);
  });

  it("incrementRequestFailureCounts returns accurate counts", async () => {
    await failoverInfo.incrementRequestFailureCounts(false, Date.now());

    const counts = await failoverInfo["snapshotConsecutiveRequestFailureCount"]();
    assert.equal(counts.consecutiveWriteRequestFailureCount, 1);

    (failoverInfo as any).lastRequestFailureTime = new Date(Date.now() - 1000 * 61);
    // The count should be reset first then incremented
    await failoverInfo.incrementRequestFailureCounts(false, Date.now());
    const counts2 = await failoverInfo["snapshotConsecutiveRequestFailureCount"]();
    assert.equal(counts2.consecutiveWriteRequestFailureCount, 1);
  });

  it("snapshotPartitionFailoverTimestamps returns accurate timestamps", async () => {
    const timestamps = await failoverInfo.snapshotPartitionFailoverTimestamps();
    assert.equal(typeof timestamps.firstRequestFailureTime, "number");
    assert.equal(typeof timestamps.lastRequestFailureTime, "number");
  });
});

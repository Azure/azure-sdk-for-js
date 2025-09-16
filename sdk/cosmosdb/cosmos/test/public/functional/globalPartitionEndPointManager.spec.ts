// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach, afterEach, vi, expect } from "vitest";
import { GlobalPartitionEndpointManager } from "../../../src/globalPartitionEndpointManager.js";
import type { GlobalEndpointManager } from "../../../src/globalEndpointManager.js";
import { OperationType, ResourceType } from "../../../src/common/index.js";
import { Constants, HTTPMethod, RequestContext } from "../../../src/index.js";

const mockReadEndpoints = [
  "https://region1.documents.azure.com:443/",
  "https://region2.documents.azure.com:443/",
  "https://region3.documents.azure.com:443/",
];
import { PartitionKeyRangeFailoverInfo } from "../../../src/PartitionKeyRangeFailoverInfo.js";
import { createDummyDiagnosticNode } from "../common/TestHelpers.js";

function createMockGlobalEndpointManager(): GlobalEndpointManager {
  return {
    getReadEndpoints: async () => mockReadEndpoints,
    getAvailableReadEndpoints: async () => mockReadEndpoints,
    getReadLocations: async () => [
      { name: "region1", databaseAccountEndpoint: "https://region1.documents.azure.com:443/" },
      { name: "region2", databaseAccountEndpoint: "https://region2.documents.azure.com:443/" },
      { name: "region3", databaseAccountEndpoint: "https://region3.documents.azure.com:443/" },
    ],
    canUseMultipleWriteLocations: () => false,
    enablePartitionLevelFailover: true,
    enablePartitionLevelCircuitBreaker: true,
  } as unknown as GlobalEndpointManager;
}

function createRequestContext(overrides = {}): RequestContext {
  return {
    operationType: OperationType.Replace,
    resourceType: ResourceType.item,
    partitionKeyRangeId: "0",
    endpoint: "https://region1.documents.azure.com:443/",
    globalEndpointManager: {} as any,
    connectionPolicy: {} as any,
    requestAgent: {} as any,
    method: HTTPMethod.get,
    client: {} as any,
    options: {},
    plugins: [],
    ...overrides,
  };
}

function createMockGlobalPartitionEndpointManager(
  mockGEM: GlobalEndpointManager,
): GlobalPartitionEndpointManager {
  const globalPartitionEndpointManager = new GlobalPartitionEndpointManager(
    {
      endpoint: "https://default.documents.azure.com:443/",
      key: "mockKey",
      connectionPolicy: {
        enablePartitionLevelFailover: true,
        enablePartitionLevelCircuitBreaker: true,
        preferredLocations: ["region1", "region2", "region3"],
      },
    },
    mockGEM,
  );
  return globalPartitionEndpointManager;
}

const diagnosticNode = createDummyDiagnosticNode();

describe("GlobalPartitionEndpointManager", () => {
  describe("tryMarkEndpointUnavailableForPartitionKeyRange", () => {
    let globalPartitionEndpointManager: GlobalPartitionEndpointManager;

    beforeEach(() => {
      const mockGEM = createMockGlobalEndpointManager();
      globalPartitionEndpointManager = createMockGlobalPartitionEndpointManager(mockGEM);
    });

    it("should return false if request context is undefined", async () => {
      const result = await globalPartitionEndpointManager.tryPartitionLevelFailover(
        undefined as any,
        diagnosticNode,
      );
      assert.equal(result, false);
    });

    it("should return false if partitionKeyRangeId is missing", async () => {
      const result = await globalPartitionEndpointManager.tryPartitionLevelFailover(
        createRequestContext({ partitionKeyRangeId: undefined }),
        diagnosticNode,
      );
      assert.equal(result, false);
    });

    it("should return false if endpoint is missing", async () => {
      const result = await globalPartitionEndpointManager.tryPartitionLevelFailover(
        createRequestContext({ endpoint: undefined }),
        diagnosticNode,
      );
      assert.equal(result, false);
    });

    it("should return false if failed endpoint is missing", async () => {
      const result = await globalPartitionEndpointManager.tryPartitionLevelFailover(
        createRequestContext({ endpoint: undefined }),
        diagnosticNode,
      );
      assert.equal(result, false);
    });

    it("should return false if enablePartitionLevelFailover is false", async () => {
      const mockGEM = createMockGlobalEndpointManager();
      mockGEM.enablePartitionLevelFailover = false;
      const managerNoPreferred = new GlobalPartitionEndpointManager(
        {
          connectionPolicy: {
            enablePartitionLevelFailover: false,
            preferredLocations: [],
          },
        },
        mockGEM,
      );
      const result = await managerNoPreferred.tryPartitionLevelFailover(
        createRequestContext(),
        diagnosticNode,
      );
      assert.equal(result, false);
    });

    it("should succeed and cycle through endpoints", async () => {
      let requestContext = createRequestContext();
      const firstFailover = await globalPartitionEndpointManager.tryPartitionLevelFailover(
        requestContext,
        diagnosticNode,
      );
      assert.equal(firstFailover, true);
      const previousEndpoint = requestContext.endpoint;
      requestContext = await globalPartitionEndpointManager.tryAddPartitionLevelLocationOverride(
        requestContext,
        diagnosticNode,
      );
      assert.notEqual(previousEndpoint, requestContext.endpoint);
    });

    it("should clean up after all endpoints have failed", async () => {
      let requestContext = createRequestContext();
      // Fail all locations manually
      await globalPartitionEndpointManager.tryPartitionLevelFailover(
        requestContext,
        diagnosticNode,
      ); // Moves to region2
      requestContext.endpoint = mockReadEndpoints[1];
      await globalPartitionEndpointManager.tryPartitionLevelFailover(
        requestContext,
        diagnosticNode,
      ); // Moves to region3
      requestContext.endpoint = mockReadEndpoints[2];
      const result = await globalPartitionEndpointManager.tryPartitionLevelFailover(
        requestContext,
        diagnosticNode,
      ); // No more locations
      assert.equal(result, false);

      // Should no longer override since failover info is deleted
      const previousEndpoint = requestContext.endpoint;
      requestContext = await globalPartitionEndpointManager.tryAddPartitionLevelLocationOverride(
        requestContext,
        diagnosticNode,
      );
      assert.equal(previousEndpoint, requestContext.endpoint);
    });

    it("handles multiple partitionKeyRangeIds independently", async () => {
      let ctx1 = createRequestContext({ partitionKeyRangeId: "range1" });
      let ctx2 = createRequestContext({ partitionKeyRangeId: "range2" });

      await globalPartitionEndpointManager.tryPartitionLevelFailover(ctx1, diagnosticNode);
      await globalPartitionEndpointManager.tryPartitionLevelFailover(ctx2, diagnosticNode);
      const previousCTX1Endpoint = ctx1.endpoint;
      const previousCTX2Endpoint = ctx2.endpoint;
      ctx1 = await globalPartitionEndpointManager.tryAddPartitionLevelLocationOverride(
        ctx1,
        diagnosticNode,
      );
      ctx2 = await globalPartitionEndpointManager.tryAddPartitionLevelLocationOverride(
        ctx2,
        diagnosticNode,
      );
      assert.notEqual(previousCTX1Endpoint, ctx1.endpoint);
      assert.notEqual(previousCTX2Endpoint, ctx2.endpoint);
    });
  });

  describe("tryAddPartitionLevelLocationOverride", () => {
    let globalPartitionEndpointManager: GlobalPartitionEndpointManager;

    beforeEach(() => {
      const mockGEM = createMockGlobalEndpointManager();
      globalPartitionEndpointManager = createMockGlobalPartitionEndpointManager(mockGEM);
    });

    it("should not throw if request context is missing", async () => {
      await globalPartitionEndpointManager.tryAddPartitionLevelLocationOverride(
        undefined,
        diagnosticNode,
      );
      // No assertion needed – just ensure it doesn't throw
    });

    it("should not override endpoint for read requests", async () => {
      let requestContext = createRequestContext({ operationType: OperationType.Read });
      const originalEndpoint = requestContext.endpoint;

      requestContext = await globalPartitionEndpointManager.tryAddPartitionLevelLocationOverride(
        requestContext,
        diagnosticNode,
      );

      assert.equal(requestContext.endpoint, originalEndpoint);
    });

    it("should not override endpoint if partitionKeyRangeId is missing", async () => {
      let requestContext = createRequestContext({ partitionKeyRangeId: undefined });
      const originalEndpoint = requestContext.endpoint;

      requestContext = await globalPartitionEndpointManager.tryAddPartitionLevelLocationOverride(
        requestContext,
        diagnosticNode,
      );

      assert.equal(requestContext.endpoint, originalEndpoint);
    });

    it("should not override endpoint if no override present", async () => {
      let requestContext = createRequestContext();
      const originalEndpoint = requestContext.endpoint;

      requestContext = await globalPartitionEndpointManager.tryAddPartitionLevelLocationOverride(
        requestContext,
        diagnosticNode,
      );

      assert.equal(requestContext.endpoint, originalEndpoint);
    });
  });

  describe("Circuit Breaker: incrementFailureCounterAndCheckFailover", () => {
    let globalPartitionEndpointManager: GlobalPartitionEndpointManager;
    beforeEach(() => {
      const mockGEM = createMockGlobalEndpointManager();
      mockGEM.canUseMultipleWriteLocations = () => true; // Enable multiple write locations to have multimaster account
      globalPartitionEndpointManager = createMockGlobalPartitionEndpointManager(mockGEM);
    });

    it("should return false if enablePartitionLevelCircuitBreaker is false", async () => {
      const mockGEM = createMockGlobalEndpointManager();
      const manager = new GlobalPartitionEndpointManager(
        {
          connectionPolicy: {
            enablePartitionLevelFailover: false,
            enablePartitionLevelCircuitBreaker: false,
          },
        },
        mockGEM,
      );
      const result = await (manager as any).incrementFailureCounterAndCheckFailover(
        createRequestContext(),
        false,
        false,
      );
      assert.equal(result, false);
    });

    it("should track read failures and return false until threshold is exceeded", async () => {
      const requestContext = createRequestContext({ operationType: OperationType.Read });

      for (let i = 1; i <= 10; i++) {
        const result = await (
          globalPartitionEndpointManager as any
        ).incrementFailureCounterAndCheckFailover(requestContext, false, true);
        assert.equal(result, false);
      }

      const finalResult = await (
        globalPartitionEndpointManager as any
      ).incrementFailureCounterAndCheckFailover(requestContext, false, true);
      // Exceeds read threshold (10)
      assert.equal(finalResult, true);
    });

    it("should track write failures and return false until threshold is exceeded", async () => {
      const requestContext = createRequestContext({ operationType: OperationType.Replace });

      for (let i = 1; i <= 5; i++) {
        const result = await (
          globalPartitionEndpointManager as any
        ).incrementFailureCounterAndCheckFailover(requestContext, false, true);
        assert.equal(result, false);
      }

      const finalResult = await (
        globalPartitionEndpointManager as any
      ).incrementFailureCounterAndCheckFailover(requestContext, false, true);
      assert.equal(finalResult, true); // Exceeds write threshold (5)
    });

    it("should reset failure counters if time window expires", async () => {
      const requestContext = createRequestContext({ operationType: OperationType.Replace });

      // Force one failure
      await (globalPartitionEndpointManager as any).incrementFailureCounterAndCheckFailover(
        requestContext,
        false,
        true,
      );

      // Artificially delay by more than reset window
      const failoverMap = (globalPartitionEndpointManager as any)
        .partitionKeyRangeToLocationForReadAndWrite;

      const info = failoverMap.get("0");
      const delayMs = 1000 * 61;
      // Simulate old failure timestamps
      (info as any).lastRequestFailureTime = new Date(Date.now() - delayMs);

      // This should reset counter
      const result = await (
        globalPartitionEndpointManager as any
      ).incrementFailureCounterAndCheckFailover(requestContext, false, true);
      assert.equal(result, false); // Count was reset

      assert.equal((info as any).consecutiveWriteRequestFailureCount, 1);
    });

    it("should store and failover independently for different partitionKeyRangeIds", async () => {
      const ctx1 = createRequestContext({
        partitionKeyRangeId: "range1",
        operationType: OperationType.Read,
      });
      const ctx2 = createRequestContext({
        partitionKeyRangeId: "range2",
        operationType: OperationType.Read,
      });

      for (let i = 0; i < 10; i++) {
        await (globalPartitionEndpointManager as any).incrementFailureCounterAndCheckFailover(
          ctx1,
          false,
          true,
        );
      }

      const result1 = await (
        globalPartitionEndpointManager as any
      ).incrementFailureCounterAndCheckFailover(ctx1, false, true);
      const result2 = await (
        globalPartitionEndpointManager as any
      ).incrementFailureCounterAndCheckFailover(ctx2, false, true);

      assert.equal(result1, true);
      assert.equal(result2, false);
    });
  });

  describe("Circuit Breaker Failback", () => {
    let globalPartitionEndpointManager: GlobalPartitionEndpointManager;
    beforeEach(() => {
      const mockGEM = createMockGlobalEndpointManager();
      globalPartitionEndpointManager = createMockGlobalPartitionEndpointManager(mockGEM);
    });

    afterEach(() => {
      clearInterval(
        (globalPartitionEndpointManager as any).circuitBreakerFailbackBackgroundRefresher,
      );
    });

    describe("initiateCircuitBreakerFailbackLoop", () => {
      it("should start a background loop and call failback logic periodically", async () => {
        const spy = vi.spyOn(
          globalPartitionEndpointManager as any,
          "openConnectionToUnhealthyEndpointsWithFailback",
        );

        globalPartitionEndpointManager["initiateCircuitBreakerFailbackLoop"]();
        // Wait for the interval + a little buffer for the async operation to complete
        await new Promise((resolve) =>
          setTimeout(resolve, Constants.StalePartitionUnavailabilityRefreshIntervalInMs + 50),
        );

        expect(spy).toHaveBeenCalled();
      });

      it("should log error if openConnectionToUnhealthyEndpointsWithFailback fails", async () => {
        const testError = new Error("Test failure");
        const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {}); // Mock console.error
        vi.spyOn(
          globalPartitionEndpointManager as any,
          "openConnectionToUnhealthyEndpointsWithFailback",
        ).mockRejectedValueOnce(testError);

        globalPartitionEndpointManager["initiateCircuitBreakerFailbackLoop"]();

        // Wait for the interval to pass and the async operation to complete
        await new Promise((resolve) =>
          setTimeout(resolve, Constants.StalePartitionUnavailabilityRefreshIntervalInMs + 50),
        );

        // Assert that console.error was called with the expected error
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "Failed to open connection to unhealthy endpoints: ",
          testError,
        );
        consoleErrorSpy.mockRestore(); // Restore original console.error
      });
    });

    describe("openConnectionToUnhealthyEndpointsWithFailback", () => {
      it("openConnectionToUnhealthyEndpointsWithFailback - no expired entries, no action", async () => {
        const info = new PartitionKeyRangeFailoverInfo(mockReadEndpoints[1]);
        const recentTime = Date.now();
        (info as any).firstRequestFailureTime = recentTime;

        (globalPartitionEndpointManager as any).partitionKeyRangeToLocationForReadAndWrite.set(
          "0",
          info,
        );

        await (
          globalPartitionEndpointManager as any
        ).openConnectionToUnhealthyEndpointsWithFailback();
        assert.isTrue(
          (globalPartitionEndpointManager as any).partitionKeyRangeToLocationForReadAndWrite.has(
            "0",
          ),
        );
      });

      it("openConnectionToUnhealthyEndpointsWithFailback - expired entries cleaned up after success", async () => {
        const info = new PartitionKeyRangeFailoverInfo(mockReadEndpoints[1]);
        (info as any).firstRequestFailureTime =
          Date.now() - Constants.AllowedPartitionUnavailabilityDurationInMs - 1000;

        (globalPartitionEndpointManager as any).partitionKeyRangeToLocationForReadAndWrite.set(
          "0",
          info,
        );

        await (
          globalPartitionEndpointManager as any
        ).openConnectionToUnhealthyEndpointsWithFailback();
        assert.isFalse(
          (globalPartitionEndpointManager as any).partitionKeyRangeToLocationForReadAndWrite.has(
            "0",
          ),
        );
      });
    });
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach } from "vitest";
import { GlobalPartitionEndpointManager } from "../../../src/globalPartitionEndpointManager.js";
import type { GlobalEndpointManager } from "../../../src/globalEndpointManager.js";
import { OperationType, ResourceType } from "../../../src/common/index.js";
import { HTTPMethod, RequestContext } from "../../../src/index.js";

const mockReadEndpoints = [
  "https://region1.documents.azure.com:443/",
  "https://region2.documents.azure.com:443/",
  "https://region3.documents.azure.com:443/",
];

function createMockGlobalEndpointManager(): GlobalEndpointManager {
  return {
    getReadEndpoints: async () => mockReadEndpoints,
    getAvailableReadEndpoints: async () => mockReadEndpoints,
    getAvailableReadLocations: async () => [
      { name: "region1", databaseAccountEndpoint: "https://region1.documents.azure.com:443/" },
      { name: "region2", databaseAccountEndpoint: "https://region2.documents.azure.com:443/" },
      { name: "region3", databaseAccountEndpoint: "https://region3.documents.azure.com:443/" },
    ],
    canUseMultipleWriteLocations: () => false,
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

describe("GlobalPartitionEndpointManager", () => {
  let globalPartitionEndpointManager: GlobalPartitionEndpointManager;

  beforeEach(() => {
    const mockGEM = createMockGlobalEndpointManager();
    globalPartitionEndpointManager = new GlobalPartitionEndpointManager(
      {
        endpoint: "https://default.documents.azure.com:443/",
        key: "mockKey",
        connectionPolicy: {
          enablePartitionLevelFailover: true,
          preferredLocations: ["region1", "region2", "region3"],
        },
      },
      mockGEM,
    );
  });

  describe("tryMarkEndpointUnavailableForPartitionKeyRange", () => {
    it("should return false if request context is undefined", async () => {
      const result =
        await globalPartitionEndpointManager.tryMarkEndpointUnavailableForPartitionKeyRange(
          undefined as any,
        );
      assert.equal(result, false);
    });

    it("should return false if partitionKeyRangeId is missing", async () => {
      const result =
        await globalPartitionEndpointManager.tryMarkEndpointUnavailableForPartitionKeyRange(
          createRequestContext({ partitionKeyRangeId: undefined }),
        );
      assert.equal(result, false);
    });

    it("should return false if endpoint is missing", async () => {
      const result =
        await globalPartitionEndpointManager.tryMarkEndpointUnavailableForPartitionKeyRange(
          createRequestContext({ endpoint: undefined }),
        );
      assert.equal(result, false);
    });

    it("should return false if failed endpoint is missing", async () => {
      const result =
        await globalPartitionEndpointManager.tryMarkEndpointUnavailableForPartitionKeyRange(
          createRequestContext({ endpoint: undefined }),
        );
      assert.equal(result, false);
    });

    it("should return false if enablePartitionLevelFailover is false", async () => {
      const mockGEM = createMockGlobalEndpointManager();
      const managerNoPreferred = new GlobalPartitionEndpointManager(
        {
          connectionPolicy: {
            enablePartitionLevelFailover: false,
            preferredLocations: [],
          },
        },
        mockGEM,
      );
      const result =
        await managerNoPreferred.tryMarkEndpointUnavailableForPartitionKeyRange(
          createRequestContext(),
        );
      assert.equal(result, false);
    });

    it("should return false if preferred locations are empty", async () => {
      const mockGEM = createMockGlobalEndpointManager();
      const managerNoPreferred = new GlobalPartitionEndpointManager(
        {
          connectionPolicy: {
            enablePartitionLevelFailover: true,
            preferredLocations: [],
          },
        },
        mockGEM,
      );
      const result =
        await managerNoPreferred.tryMarkEndpointUnavailableForPartitionKeyRange(
          createRequestContext(),
        );
      assert.equal(result, false);
    });

    it("should succeed and cycle through endpoints", async () => {
      const requestContext = createRequestContext();
      const firstFailover =
        await globalPartitionEndpointManager.tryMarkEndpointUnavailableForPartitionKeyRange(
          requestContext,
        );
      assert.equal(firstFailover, true);

      const [hasOverride, newEndpoint] =
        (await globalPartitionEndpointManager.tryAddPartitionLevelLocationOverride(
          requestContext,
        )) as [boolean, string];
      assert.equal(hasOverride, true);
      assert.notEqual(newEndpoint, requestContext.endpoint);
    });

    it("should clean up after all endpoints have failed", async () => {
      const requestContext = createRequestContext();
      // Fail all locations manually
      await globalPartitionEndpointManager.tryMarkEndpointUnavailableForPartitionKeyRange(
        requestContext,
      ); // Moves to region2
      requestContext.endpoint = mockReadEndpoints[1];
      await globalPartitionEndpointManager.tryMarkEndpointUnavailableForPartitionKeyRange(
        requestContext,
      ); // Moves to region3
      requestContext.endpoint = mockReadEndpoints[2];
      const result =
        await globalPartitionEndpointManager.tryMarkEndpointUnavailableForPartitionKeyRange(
          requestContext,
        ); // No more locations
      assert.equal(result, false);

      // Should no longer override since failover info is deleted
      const override =
        await globalPartitionEndpointManager.tryAddPartitionLevelLocationOverride(requestContext);
      assert.equal(override, false);
    });

    it("handles multiple partitionKeyRangeIds independently", async () => {
      const ctx1 = createRequestContext({ partitionKeyRangeId: "range1" });
      const ctx2 = createRequestContext({ partitionKeyRangeId: "range2" });

      await globalPartitionEndpointManager.tryMarkEndpointUnavailableForPartitionKeyRange(ctx1);
      await globalPartitionEndpointManager.tryMarkEndpointUnavailableForPartitionKeyRange(ctx2);

      const override1 =
        await globalPartitionEndpointManager.tryAddPartitionLevelLocationOverride(ctx1);
      const override2 =
        await globalPartitionEndpointManager.tryAddPartitionLevelLocationOverride(ctx2);
      if (Array.isArray(override1)) {
        assert.equal(override1[0], true);
      } else {
        assert.fail("override1 is not an array");
      }

      if (Array.isArray(override2)) {
        assert.equal(override2[0], true);
      } else {
        assert.fail("override2 is not an array");
      }
    });
  });

  describe("tryAddPartitionLevelLocationOverride", () => {
    it("should return false if request context is missing", async () => {
      const result =
        await globalPartitionEndpointManager.tryAddPartitionLevelLocationOverride(undefined);
      assert.equal(result, false);
    });

    it("should return false for read requests", async () => {
      const result = await globalPartitionEndpointManager.tryAddPartitionLevelLocationOverride(
        createRequestContext({ operationType: OperationType.Read }),
      );
      assert.equal(result, false);
    });

    it("should return false if partitionKeyRangeId is missing", async () => {
      const result = await globalPartitionEndpointManager.tryAddPartitionLevelLocationOverride(
        createRequestContext({ partitionKeyRangeId: undefined }),
      );
      assert.equal(result, false);
    });

    it("should return false if no override present", async () => {
      const result =
        await globalPartitionEndpointManager.tryAddPartitionLevelLocationOverride(
          createRequestContext(),
        );
      assert.equal(result, false);
    });

    it("should return override if failover occurred", async () => {
      const requestContext = createRequestContext();
      await globalPartitionEndpointManager.tryMarkEndpointUnavailableForPartitionKeyRange(
        requestContext,
      );

      const override =
        await globalPartitionEndpointManager.tryAddPartitionLevelLocationOverride(requestContext);
      assert.equal(Array.isArray(override), true);
    });
  });
});

function createMockGlobalEndpointManagerForPPCB(): GlobalEndpointManager {
  return {
    getReadEndpoints: async () => mockReadEndpoints,
    getAvailableReadEndpoints: async () => mockReadEndpoints,
    getAvailableReadLocations: async () => [
      { name: "region1", databaseAccountEndpoint: "https://region1.documents.azure.com:443/" },
      { name: "region2", databaseAccountEndpoint: "https://region2.documents.azure.com:443/" },
      { name: "region3", databaseAccountEndpoint: "https://region3.documents.azure.com:443/" },
    ],
    canUseMultipleWriteLocations: () => true,
  } as unknown as GlobalEndpointManager;
}

describe("Circuit Breaker: incrementRequestFailureCounterAndCheckIfPartitionCanFailover", () => {
  let globalPartitionEndpointManager: GlobalPartitionEndpointManager;
  beforeEach(() => {
    const mockGEM = createMockGlobalEndpointManagerForPPCB();
    globalPartitionEndpointManager = new GlobalPartitionEndpointManager(
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
    const result = await (
      manager as any
    ).incrementRequestFailureCounterAndCheckIfPartitionCanFailover(createRequestContext());
    assert.equal(result, false);
  });

  it("should track read failures and return false until threshold is exceeded", async () => {
    const requestContext = createRequestContext({ operationType: OperationType.Read });

    for (let i = 1; i <= 10; i++) {
      const result = await (
        globalPartitionEndpointManager as any
      ).incrementRequestFailureCounterAndCheckIfPartitionCanFailover(requestContext);
      assert.equal(result, false);
    }

    const finalResult = await (
      globalPartitionEndpointManager as any
    ).incrementRequestFailureCounterAndCheckIfPartitionCanFailover(requestContext);
    // Exceeds read threshold (10)
    assert.equal(finalResult, true);
  });

  it("should track write failures and return false until threshold is exceeded", async () => {
    const requestContext = createRequestContext({ operationType: OperationType.Replace });

    for (let i = 1; i <= 5; i++) {
      const result = await (
        globalPartitionEndpointManager as any
      ).incrementRequestFailureCounterAndCheckIfPartitionCanFailover(requestContext);
      assert.equal(result, false);
    }

    const finalResult = await (
      globalPartitionEndpointManager as any
    ).incrementRequestFailureCounterAndCheckIfPartitionCanFailover(requestContext);
    assert.equal(finalResult, true); // Exceeds write threshold (5)
  });

  it("should reset failure counters if time window expires", async () => {
    const requestContext = createRequestContext({ operationType: OperationType.Replace });

    // Force one failure
    await (
      globalPartitionEndpointManager as any
    ).incrementRequestFailureCounterAndCheckIfPartitionCanFailover(requestContext);

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
    ).incrementRequestFailureCounterAndCheckIfPartitionCanFailover(requestContext);
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
      await (
        globalPartitionEndpointManager as any
      ).incrementRequestFailureCounterAndCheckIfPartitionCanFailover(ctx1);
    }

    const result1 = await (
      globalPartitionEndpointManager as any
    ).incrementRequestFailureCounterAndCheckIfPartitionCanFailover(ctx1);
    const result2 = await (
      globalPartitionEndpointManager as any
    ).incrementRequestFailureCounterAndCheckIfPartitionCanFailover(ctx2);

    assert.equal(result1, true);
    assert.equal(result2, false);
  });
});

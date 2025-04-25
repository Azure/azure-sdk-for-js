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

    it("should return false for read operations", async () => {
      const result =
        await globalPartitionEndpointManager.tryMarkEndpointUnavailableForPartitionKeyRange(
          createRequestContext({ operationType: OperationType.Read }),
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

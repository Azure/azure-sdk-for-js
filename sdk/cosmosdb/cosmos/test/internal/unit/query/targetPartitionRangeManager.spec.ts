// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, beforeEach, vi } from "vitest";
import {
  TargetPartitionRangeManager,
  QueryExecutionContextType,
} from "../../../../src/queryExecutionContext/TargetPartitionRangeManager.js";
import type {
  TargetPartitionRangeManagerConfig,
} from "../../../../src/queryExecutionContext/TargetPartitionRangeManager.js";
import type {
  TargetPartitionRangeStrategy,
  PartitionRangeFilterResult,
} from "../../../../src/queryExecutionContext/TargetPartitionRangeStrategy.js";
import type { PartitionKeyRange } from "../../../../src/index.js";

// Mock strategy implementation for testing
class MockTargetPartitionRangeStrategy implements TargetPartitionRangeStrategy {
  constructor(
    private strategyType: string = "MockStrategy",
    private shouldValidate: boolean = true,
    private filterResult?: PartitionRangeFilterResult,
  ) {}

  getStrategyType(): string {
    return this.strategyType;
  }

  validateContinuationToken(_continuationToken: string): boolean {
    return this.shouldValidate;
  }

  async filterPartitionRanges(
    targetRanges: PartitionKeyRange[],
    continuationToken?: string,
    _queryInfo?: Record<string, unknown>,
  ): Promise<PartitionRangeFilterResult> {
    if (this.filterResult) {
      return this.filterResult;
    }
    
    // Default mock implementation: return all ranges
    return {
      filteredRanges: targetRanges,
      continuationToken: continuationToken ? [continuationToken] : undefined,
    };
  }
}

describe("TargetPartitionRangeManager", () => {
  let mockPartitionRanges: PartitionKeyRange[];

  const createMockPartitionKeyRange = (
    id: string,
    minInclusive: string,
    maxExclusive: string,
  ): PartitionKeyRange => ({
    id,
    minInclusive,
    maxExclusive,
    ridPrefix: parseInt(id) || 0,
    throughputFraction: 1.0,
    status: "Online",
    parents: [],
  });

  beforeEach(() => {
    mockPartitionRanges = [
      createMockPartitionKeyRange("0", "", "AA"),
      createMockPartitionKeyRange("1", "AA", "BB"),
      createMockPartitionKeyRange("2", "BB", "FF"),
    ];
  });

  describe("Constructor and Strategy Creation", () => {
    it("should create manager with Parallel strategy", () => {
      const config: TargetPartitionRangeManagerConfig = {
        queryType: QueryExecutionContextType.Parallel,
      };
      const manager = new TargetPartitionRangeManager(config);
      
      assert.equal(manager.getStrategyType(), "ParallelQuery");
    });

    it("should create manager with OrderBy strategy", () => {
      const config: TargetPartitionRangeManagerConfig = {
        queryType: QueryExecutionContextType.OrderBy,
      };
      const manager = new TargetPartitionRangeManager(config);
      
      assert.equal(manager.getStrategyType(), "OrderByQuery");
    });

    it("should use custom strategy when provided", () => {
      const mockStrategy = new MockTargetPartitionRangeStrategy("CustomTestStrategy");
      const config: TargetPartitionRangeManagerConfig = {
        queryType: QueryExecutionContextType.Parallel,
        customStrategy: mockStrategy,
      };
      const manager = new TargetPartitionRangeManager(config);
      
      assert.equal(manager.getStrategyType(), "CustomTestStrategy");
    });

    it("should throw error for unsupported query type", () => {
      const config: TargetPartitionRangeManagerConfig = {
        queryType: "UnsupportedType" as any,
      };
      
      expect(() => new TargetPartitionRangeManager(config)).toThrow(
        "Unsupported query execution context type: UnsupportedType"
      );
    });
  });

  describe("Static Factory Methods", () => {
    it("should create parallel query manager using factory method", () => {
      const queryInfo = { maxDegreeOfParallelism: 4 };
      const manager = TargetPartitionRangeManager.createForParallelQuery(queryInfo);
      
      assert.equal(manager.getStrategyType(), "ParallelQuery");
    });

    it("should create ORDER BY query manager using factory method", () => {
      const queryInfo = { orderBy: ["Ascending"] };
      const manager = TargetPartitionRangeManager.createForOrderByQuery(queryInfo);
      
      assert.equal(manager.getStrategyType(), "OrderByQuery");
    });

    it("should create managers without query info", () => {
      const parallelManager = TargetPartitionRangeManager.createForParallelQuery();
      const orderByManager = TargetPartitionRangeManager.createForOrderByQuery();
      
      assert.equal(parallelManager.getStrategyType(), "ParallelQuery");
      assert.equal(orderByManager.getStrategyType(), "OrderByQuery");
    });
  });

  describe("filterPartitionRanges", () => {
    it("should filter partition ranges without continuation token", async () => {
      const manager = TargetPartitionRangeManager.createForParallelQuery();
      
      const result = await manager.filterPartitionRanges(mockPartitionRanges);
      
      assert.exists(result);
      assert.isArray(result.filteredRanges);
      assert.equal(result.filteredRanges.length, 3);
    });

    it("should filter partition ranges with continuation token", async () => {
      const manager = TargetPartitionRangeManager.createForParallelQuery();
      const continuationToken = JSON.stringify({
        rangeMappings: [
          {
            partitionKeyRange: { id: "1", minInclusive: "AA", maxExclusive: "BB" },
            continuationToken: "mock-token",
          }
        ]
      });
      
      const result = await manager.filterPartitionRanges(mockPartitionRanges, continuationToken);
      
      assert.exists(result);
      assert.isArray(result.filteredRanges);
      assert.equal(result.filteredRanges.length, 2);
      assert.equal(result.filteredRanges[0].minInclusive,"AA");
      assert.equal(result.filteredRanges[1].minInclusive,"BB");
    });

    it("should handle empty partition ranges", async () => {
      const manager = TargetPartitionRangeManager.createForParallelQuery();
      const result = await manager.filterPartitionRanges([]);
      assert.deepEqual(result, { filteredRanges: [], continuationToken: null });
    });

    it("should handle null partition ranges", async () => {
      const manager = TargetPartitionRangeManager.createForParallelQuery();
      
      const result = await manager.filterPartitionRanges(null as any);
      
      assert.deepEqual(result, { filteredRanges: [], continuationToken: null });
    });

    it("should throw error for invalid continuation token", async () => {
      const mockStrategy = new MockTargetPartitionRangeStrategy("TestStrategy", false);
      const config: TargetPartitionRangeManagerConfig = {
        queryType: QueryExecutionContextType.Parallel,
        customStrategy: mockStrategy,
      };
      const manager = new TargetPartitionRangeManager(config);
      
      await expect(
        manager.filterPartitionRanges(mockPartitionRanges, "invalid-token")
      ).rejects.toThrow("Invalid continuation token for TestStrategy strategy");
    });

    it("should propagate strategy errors", async () => {
      const errorStrategy = new MockTargetPartitionRangeStrategy();
      vi.spyOn(errorStrategy, "filterPartitionRanges").mockRejectedValue(
        new Error("Strategy processing error")
      );
      
      const config: TargetPartitionRangeManagerConfig = {
        queryType: QueryExecutionContextType.Parallel,
        customStrategy: errorStrategy,
      };
      const manager = new TargetPartitionRangeManager(config);
      
      await expect(
        manager.filterPartitionRanges(mockPartitionRanges)
      ).rejects.toThrow("Strategy processing error");
    });

    it("should return custom filter result from mock strategy", async () => {
      const expectedResult: PartitionRangeFilterResult = {
        filteredRanges: [mockPartitionRanges[0]],
        continuationToken: ["custom-token"],
        filteringConditions: ["custom condition"],
      };
      
      const mockStrategy = new MockTargetPartitionRangeStrategy(
        "CustomStrategy",
        true,
        expectedResult
      );
      
      const config: TargetPartitionRangeManagerConfig = {
        queryType: QueryExecutionContextType.Parallel,
        customStrategy: mockStrategy,
      };
      const manager = new TargetPartitionRangeManager(config);
      
      const result = await manager.filterPartitionRanges(mockPartitionRanges);
      
      assert.deepEqual(result, expectedResult);
    });
  });

  describe("validateContinuationToken", () => {
    it("should validate token using underlying strategy", () => {
      const mockStrategy = new MockTargetPartitionRangeStrategy("TestStrategy", true);
      const config: TargetPartitionRangeManagerConfig = {
        queryType: QueryExecutionContextType.Parallel,
        customStrategy: mockStrategy,
      };
      const manager = new TargetPartitionRangeManager(config);
      
      const isValid = manager.validateContinuationToken("some-token");
      
      assert.isTrue(isValid);
    });

    it("should return false for invalid token", () => {
      const mockStrategy = new MockTargetPartitionRangeStrategy("TestStrategy", false);
      const config: TargetPartitionRangeManagerConfig = {
        queryType: QueryExecutionContextType.Parallel,
        customStrategy: mockStrategy,
      };
      const manager = new TargetPartitionRangeManager(config);
      
      const isValid = manager.validateContinuationToken("invalid-token");
      
      assert.isFalse(isValid);
    });
  });

  describe("updateStrategy", () => {
    it("should update strategy from Parallel to OrderBy", () => {
      const manager = TargetPartitionRangeManager.createForParallelQuery();
      assert.equal(manager.getStrategyType(), "ParallelQuery");
      
      const newConfig: TargetPartitionRangeManagerConfig = {
        queryType: QueryExecutionContextType.OrderBy,
      };
      manager.updateStrategy(newConfig);
      
      assert.equal(manager.getStrategyType(), "OrderByQuery");
    });

    it("should update strategy to custom strategy", () => {
      const manager = TargetPartitionRangeManager.createForParallelQuery();
      assert.equal(manager.getStrategyType(), "ParallelQuery");
      
      const customStrategy = new MockTargetPartitionRangeStrategy("UpdatedCustomStrategy");
      const newConfig: TargetPartitionRangeManagerConfig = {
        queryType: QueryExecutionContextType.Parallel,
        customStrategy,
      };
      manager.updateStrategy(newConfig);
      
      assert.equal(manager.getStrategyType(), "UpdatedCustomStrategy");
    });

    it("should update queryInfo along with strategy", () => {
      const manager = TargetPartitionRangeManager.createForParallelQuery();
      
      const newQueryInfo = { maxDegreeOfParallelism: 8, orderBy: ["Descending"] };
      const newConfig: TargetPartitionRangeManagerConfig = {
        queryType: QueryExecutionContextType.OrderBy,
        queryInfo: newQueryInfo,
      };
      manager.updateStrategy(newConfig);
      
      assert.equal(manager.getStrategyType(), "OrderByQuery");
    });
  });

  describe("Integration with Real Strategies", () => {
    it("should work with ParallelQueryRangeStrategy for valid parallel continuation token", () => {
      const manager = TargetPartitionRangeManager.createForParallelQuery();
      
      const validParallelToken = JSON.stringify({
        rangeMappings: [
          {
            partitionKeyRange: { id: "1", minInclusive: "AA", maxExclusive: "BB" },
            continuationToken: "mock-continuation",
            itemCount: 5,
          }
        ]
      });
      
      const isValid = manager.validateContinuationToken(validParallelToken);
      assert.isTrue(isValid);
    });

    it("should work with OrderByQueryRangeStrategy for valid ORDER BY continuation token", () => {
      const manager = TargetPartitionRangeManager.createForOrderByQuery();
      
      const validOrderByToken = JSON.stringify({
        compositeToken: JSON.stringify({
          rangeMappings: [
            {
              partitionKeyRange: { id: "1", minInclusive: "AA", maxExclusive: "BB" },
              continuationToken: "order-by-continuation",
              itemCount: 3,
            }
          ]
        }),
        orderByItems: [{ item: "value1" }, { item: "value2" }]
      });
      
      const isValid = manager.validateContinuationToken(validOrderByToken);
      assert.isTrue(isValid);
    });

    it("should reject invalid tokens with real strategies", () => {
      const parallelManager = TargetPartitionRangeManager.createForParallelQuery();
      const orderByManager = TargetPartitionRangeManager.createForOrderByQuery();
      
      const invalidToken = "not-a-valid-json";
      
      assert.isFalse(parallelManager.validateContinuationToken(invalidToken));
      assert.isFalse(orderByManager.validateContinuationToken(invalidToken));
    });

    it("should reject cross-strategy tokens", () => {
      const parallelManager = TargetPartitionRangeManager.createForParallelQuery();
      const orderByManager = TargetPartitionRangeManager.createForOrderByQuery();
      
      const orderByToken = JSON.stringify({
        compositeToken: "some-token",
        orderByItems: [{ item: "value" }]
      });
      
      const parallelToken = JSON.stringify({
        rangeMappings: [{ partitionKeyRange: { id: "1" }, continuationToken: "token" }]
      });
      
      // Parallel manager should reject ORDER BY token
      assert.isFalse(parallelManager.validateContinuationToken(orderByToken));
      
      // ORDER BY manager should reject parallel token
      assert.isFalse(orderByManager.validateContinuationToken(parallelToken));
    });
  });

  describe("Error Handling and Edge Cases", () => {
    it("should handle malformed JSON continuation tokens", () => {
      const manager = TargetPartitionRangeManager.createForParallelQuery();
      
      const malformedToken = "{ invalid json";
      
      assert.isFalse(manager.validateContinuationToken(malformedToken));
    });

    it("should handle empty string continuation token", () => {
      const manager = TargetPartitionRangeManager.createForParallelQuery();
      
      assert.isFalse(manager.validateContinuationToken(""));
    });

    it("should handle undefined partition ranges gracefully", async () => {
      const manager = TargetPartitionRangeManager.createForParallelQuery();
      
      const result = await manager.filterPartitionRanges(undefined as any);
      
      assert.deepEqual(result, { filteredRanges: [], continuationToken: null });
    });

    it("should pass queryInfo to strategy", async () => {
      const mockStrategy = new MockTargetPartitionRangeStrategy();
      const filterSpy = vi.spyOn(mockStrategy, "filterPartitionRanges");
      
      const queryInfo = { customField: "customValue" };
      const config: TargetPartitionRangeManagerConfig = {
        queryType: QueryExecutionContextType.Parallel,
        customStrategy: mockStrategy,
        queryInfo,
      };
      const manager = new TargetPartitionRangeManager(config);
      
      await manager.filterPartitionRanges(mockPartitionRanges, "token");
      
      expect(filterSpy).toHaveBeenCalledWith(
        mockPartitionRanges,
        "token",
        queryInfo
      );
    });
  });

  describe("Performance and Logging", () => {
    it("should handle large number of partition ranges", async () => {
      const manager = TargetPartitionRangeManager.createForParallelQuery();
      
      // Create 1000 mock partition ranges
      const largePartitionRanges = Array.from({ length: 1000 }, (_, i) => 
        createMockPartitionKeyRange(
          i.toString(),
          i.toString().padStart(4, '0'),
          (i + 1).toString().padStart(4, '0')
        )
      );
      
      const startTime = Date.now();
      const result = await manager.filterPartitionRanges(largePartitionRanges);
      const endTime = Date.now();
      
      // Should complete within reasonable time (less than 1 second)
      assert.isBelow(endTime - startTime, 1000);
      assert.exists(result);
      assert.isArray(result.filteredRanges);
    });

    it("should handle multiple filter operations", async () => {
      const manager = TargetPartitionRangeManager.createForParallelQuery();
      
      // Perform multiple filter operations
      const promises = Array.from({ length: 10 }, () =>
        manager.filterPartitionRanges(mockPartitionRanges)
      );
      
      const results = await Promise.all(promises);
      
      // All operations should succeed
      assert.equal(results.length, 10);
      results.forEach(result => {
        assert.exists(result);
        assert.isArray(result.filteredRanges);
      });
    });
  });
});

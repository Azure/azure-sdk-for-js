// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach } from "vitest";
import {
  TargetPartitionRangeManager,
  QueryExecutionContextType,
  type PartitionRangeWithContinuationToken,
} from "../../../../src/queryExecutionContext/queryFilteringStrategy/TargetPartitionRangeManager.js";
import type { PartitionKeyRange } from "../../../../src/index.js";

describe("TargetPartitionRangeManager", function () {
  const createRange = (id: string, min: string, max: string): PartitionKeyRange => ({
    id,
    minInclusive: min,
    maxExclusive: max,
    ridPrefix: parseInt(id),
    throughputFraction: 1,
    status: "online",
    parents: [],
  });

  const createRangeToken = (
    range: PartitionKeyRange,
    token?: string,
  ): PartitionRangeWithContinuationToken => ({
    range,
    continuationToken: token,
  });

  describe("Constructor and Strategy Creation", function () {
    it("should create manager with parallel strategy", function () {
      const manager = new TargetPartitionRangeManager({
        queryType: QueryExecutionContextType.Parallel,
        queryInfo: {},
      });

      expect(manager.getStrategyType()).toBe("ParallelQuery");
    });

    it("should create manager with order by strategy", function () {
      const manager = new TargetPartitionRangeManager({
        queryType: QueryExecutionContextType.OrderBy,
        queryInfo: { orderByItems: [{ item: "testValue" }] },
      });

      expect(manager.getStrategyType()).toBe("OrderByQuery");
    });

    it("should use custom strategy when provided", function () {
      const customStrategy = {
        getStrategyType: () => "CustomStrategy",
        filterPartitionRanges: () => ({
          rangeTokenPairs: [] as PartitionRangeWithContinuationToken[],
        }),
      };

      const manager = new TargetPartitionRangeManager({
        queryType: QueryExecutionContextType.Parallel,
        queryInfo: {},
        customStrategy,
      });

      expect(manager.getStrategyType()).toBe("CustomStrategy");
    });
  });

  describe("filterPartitionRanges", function () {
    let parallelManager: TargetPartitionRangeManager;
    let orderByManager: TargetPartitionRangeManager;

    beforeEach(function () {
      parallelManager = new TargetPartitionRangeManager({
        queryType: QueryExecutionContextType.Parallel,
        queryInfo: {},
      });
      orderByManager = new TargetPartitionRangeManager({
        queryType: QueryExecutionContextType.OrderBy,
        queryInfo: { orderByItems: [{ item: "testValue" }] },
      });
    });

    it("should return empty result when no target ranges", function () {
      const result = parallelManager.filterPartitionRanges([]);
      expect(result.rangeTokenPairs).toEqual([]);
    });

    it("should filter ranges for parallel queries", function () {
      const ranges = [createRange("1", "", "AA"), createRange("2", "AA", "BB")];
      const result = parallelManager.filterPartitionRanges(ranges);

      expect(result.rangeTokenPairs.length).toBe(2);
      expect(result.rangeTokenPairs[0].range.id).toBe("1");
      expect(result.rangeTokenPairs[1].range.id).toBe("2");
    });

    it("should filter ranges for order by queries", function () {
      const ranges = [createRange("1", "", "AA")];
      const rangeTokens = [createRangeToken(createRange("1", "", "AA"), "token1")];
      const queryInfo = {
        orderByItems: [{ item: "testValue" }],
        queryInfo: {
          queryInfo: {
            orderBy: ["Ascending"],
            orderByExpressions: ["c.field1"],
          },
        },
      };

      const result = orderByManager.filterPartitionRanges(ranges, rangeTokens, queryInfo);
      expect(result.rangeTokenPairs.length).toBeGreaterThan(0);
    });

    it("should merge query info correctly", function () {
      const baseQueryInfo = { field1: "value1" };
      const additionalQueryInfo = { field2: "value2" };

      const manager = new TargetPartitionRangeManager({
        queryType: QueryExecutionContextType.Parallel,
        queryInfo: baseQueryInfo,
      });

      const ranges = [createRange("1", "", "AA")];
      const result = manager.filterPartitionRanges(ranges, undefined, additionalQueryInfo);

      expect(result.rangeTokenPairs.length).toBe(1);
    });
  });

  describe("updateStrategy", function () {
    it("should update strategy type", function () {
      const manager = new TargetPartitionRangeManager({
        queryType: QueryExecutionContextType.Parallel,
        queryInfo: {},
      });

      expect(manager.getStrategyType()).toBe("ParallelQuery");

      manager.updateStrategy({
        queryType: QueryExecutionContextType.OrderBy,
        queryInfo: { orderByItems: [{ item: "testValue" }] },
      });

      expect(manager.getStrategyType()).toBe("OrderByQuery");
    });
  });

  describe("Static Factory Methods", function () {
    it("should create parallel query manager", function () {
      const manager = TargetPartitionRangeManager.createForParallelQuery({});
      expect(manager.getStrategyType()).toBe("ParallelQuery");
    });

    it("should create order by query manager", function () {
      const manager = TargetPartitionRangeManager.createForOrderByQuery({});
      expect(manager.getStrategyType()).toBe("OrderByQuery");
    });

    it("should create managers with query info", function () {
      const queryInfo = { orderBy: ["Ascending"] };

      const parallelManager = TargetPartitionRangeManager.createForParallelQuery(queryInfo);
      const orderByManager = TargetPartitionRangeManager.createForOrderByQuery(queryInfo);

      expect(parallelManager.getStrategyType()).toBe("ParallelQuery");
      expect(orderByManager.getStrategyType()).toBe("OrderByQuery");
    });
  });

  describe("Error Handling", function () {
    it("should handle null target ranges", function () {
      const manager = TargetPartitionRangeManager.createForParallelQuery({});
      const result = manager.filterPartitionRanges(null as any);
      expect(result.rangeTokenPairs).toEqual([]);
    });

    it("should handle undefined range tokens", function () {
      const manager = TargetPartitionRangeManager.createForParallelQuery({});
      const ranges = [createRange("1", "", "AA")];
      const result = manager.filterPartitionRanges(ranges, undefined);
      expect(result.rangeTokenPairs.length).toBe(1);
    });
  });
});

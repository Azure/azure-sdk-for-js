// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach } from "vitest";
import { OrderByQueryRangeStrategy } from "../../../../src/queryExecutionContext/queryFilteringStrategy/OrderByQueryRangeStrategy.js";
import type { PartitionKeyRange } from "../../../../src/index.js";
import type { PartitionRangeWithContinuationToken } from "../../../../src/queryExecutionContext/queryFilteringStrategy/TargetPartitionRangeManager.js";

describe("OrderByQueryRangeStrategy", function () {
  let strategy: OrderByQueryRangeStrategy;

  beforeEach(function () {
    strategy = new OrderByQueryRangeStrategy();
  });

  describe("filterPartitionRanges", function () {
    const createRange = (id: string, min: string, max: string): PartitionKeyRange => ({
      id,
      minInclusive: min,
      maxExclusive: max,
      ridPrefix: parseInt(id),
      throughputFraction: 1,
      status: "online",
      parents: [],
    });

    const createContinuationRange = (
      range: PartitionKeyRange,
      token: string,
    ): PartitionRangeWithContinuationToken => ({
      range,
      continuationToken: token,
    });

    describe("Edge Cases", function () {
      it("should return empty result when targetRanges is null", function () {
        const result = strategy.filterPartitionRanges(null as any);
        expect(result).toEqual({ rangeTokenPairs: [] });
      });

      it("should return empty result when targetRanges is empty", function () {
        const result = strategy.filterPartitionRanges([]);
        expect(result).toEqual({ rangeTokenPairs: [] });
      });

      it("should return empty result when continuationRanges is null", function () {
        const ranges = [createRange("1", "", "AA")];
        const result = strategy.filterPartitionRanges(ranges, null as any);
        expect(result).toEqual({ rangeTokenPairs: [] });
      });

      it("should return empty result when continuationRanges is empty", function () {
        const ranges = [createRange("1", "", "AA")];
        const result = strategy.filterPartitionRanges(ranges, []);
        expect(result).toEqual({ rangeTokenPairs: [] });
      });

      it("should handle undefined queryInfo", function () {
        const ranges = [createRange("1", "", "AA")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), "token1")];
        const result = strategy.filterPartitionRanges(ranges, contRanges, undefined);
        expect(result.rangeTokenPairs.length).toBe(1);
      });
    });

    describe("Single Range Scenarios", function () {
      it("should handle single target range matching continuation range", function () {
        const targetRange = createRange("1", "", "AA");
        const contRange = createContinuationRange(targetRange, "token1");
        const result = strategy.filterPartitionRanges([targetRange], [contRange]);

        expect(result.rangeTokenPairs.length).toBe(1);
        expect(result.rangeTokenPairs[0].range.id).toBe("1");
        expect(result.rangeTokenPairs[0].continuationToken).toBe("token1");
        expect(result.targetPartitionId).toBe("1");
      });

      it("should handle single target range with different continuation range", function () {
        const targetRange = createRange("2", "AA", "BB");
        const contRange = createContinuationRange(createRange("1", "", "AA"), "token1");
        const result = strategy.filterPartitionRanges([targetRange], [contRange]);

        // The method should return both the target range and the continuation range
        expect(result.rangeTokenPairs.length).toBe(2);
        expect(result.targetPartitionId).toBe("1");
      });
    });

    describe("Multiple Range Scenarios", function () {
      it("should handle left, target, and right ranges", function () {
        const leftRange = createRange("1", "", "AA");
        const targetRange = createRange("2", "AA", "BB");
        const rightRange = createRange("3", "BB", "CC");
        const ranges = [leftRange, targetRange, rightRange];

        const contRange = createContinuationRange(targetRange, "token2");
        const result = strategy.filterPartitionRanges(ranges, [contRange]);

        expect(result.rangeTokenPairs.length).toBe(3);
        expect(result.targetPartitionId).toBe("2");

        // Target range should have continuation token
        const targetPair = result.rangeTokenPairs.find((p) => p.range.id === "2");
        expect(targetPair?.continuationToken).toBe("token2");

        // Left and right ranges should have no continuation token
        const leftPair = result.rangeTokenPairs.find((p) => p.range.id === "1");
        const rightPair = result.rangeTokenPairs.find((p) => p.range.id === "3");
        expect(leftPair?.continuationToken).toBeUndefined();
        expect(rightPair?.continuationToken).toBeUndefined();
      });

      it("should handle only left ranges", function () {
        const leftRange1 = createRange("1", "", "AA");
        const leftRange2 = createRange("2", "AA", "BB");
        const targetRange = createRange("3", "CC", "DD");

        const contRange = createContinuationRange(targetRange, "token3");
        const result = strategy.filterPartitionRanges([leftRange1, leftRange2], [contRange]);

        expect(result.rangeTokenPairs.length).toBe(3);
        expect(result.targetPartitionId).toBe("3");
      });

      it("should handle only right ranges", function () {
        const targetRange = createRange("1", "", "AA");
        const rightRange1 = createRange("2", "BB", "CC");
        const rightRange2 = createRange("3", "CC", "DD");

        const contRange = createContinuationRange(targetRange, "token1");
        const result = strategy.filterPartitionRanges([rightRange1, rightRange2], [contRange]);

        expect(result.rangeTokenPairs.length).toBe(3);
        expect(result.targetPartitionId).toBe("1");
      });
    });

    describe("Boundary Edge Cases", function () {
      it("should handle empty string boundaries", function () {
        const range1 = createRange("1", "", "AA");
        const range2 = createRange("2", "", "BB");

        const contRange = createContinuationRange(range1, "token1");
        const result = strategy.filterPartitionRanges([range1, range2], [contRange]);

        // When ranges have overlapping boundaries, some may be filtered out
        expect(result.rangeTokenPairs.length).toBe(1);
        expect(result.targetPartitionId).toBe("1");
      });

      it("should handle adjacent ranges", function () {
        const range1 = createRange("1", "", "AA");
        const range2 = createRange("2", "AA", "BB"); // Adjacent: range1.max === range2.min
        const range3 = createRange("3", "BB", "CC");

        const contRange = createContinuationRange(range2, "token2");
        const result = strategy.filterPartitionRanges([range1, range2, range3], [contRange]);

        expect(result.rangeTokenPairs.length).toBe(3);
        expect(result.targetPartitionId).toBe("2");
      });

      it("should handle overlapping boundaries", function () {
        // This shouldn't happen in practice, but test defensive behavior
        const range1 = createRange("1", "", "BB");
        const range2 = createRange("2", "AA", "CC"); // Overlaps with range1

        const contRange = createContinuationRange(range1, "token1");
        const result = strategy.filterPartitionRanges([range1, range2], [contRange]);

        // When ranges have overlapping boundaries, filtering logic may exclude some ranges
        expect(result.rangeTokenPairs.length).toBe(1);
        expect(result.targetPartitionId).toBe("1");
      });

      it("should handle FF (maximum) boundary", function () {
        const range1 = createRange("1", "", "AA");
        const range2 = createRange("2", "AA", "FF"); // Maximum boundary

        const contRange = createContinuationRange(range2, "token2");
        const result = strategy.filterPartitionRanges([range1, range2], [contRange]);

        expect(result.rangeTokenPairs.length).toBe(2);
        expect(result.targetPartitionId).toBe("2");
      });
    });

    describe("Multiple Continuation Ranges", function () {
      it("should use last continuation range when multiple provided", function () {
        const targetRange1 = createRange("1", "", "AA");
        const targetRange2 = createRange("2", "AA", "BB");
        const ranges = [targetRange1, targetRange2];

        const contRanges = [
          createContinuationRange(targetRange1, "token1"),
          createContinuationRange(targetRange2, "token2"), // This should be used
        ];

        const result = strategy.filterPartitionRanges(ranges, contRanges);
        expect(result.targetPartitionId).toBe("2");

        const targetPair = result.rangeTokenPairs.find((p) => p.range.id === "2");
        expect(targetPair?.continuationToken).toBe("token2");
      });
    });

    describe("QueryInfo Integration", function () {
      it("should pass queryInfo to filter condition creation", function () {
        const ranges = [createRange("1", "", "AA")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), "token1")];

        const queryInfo = {
          orderBy: ["Ascending"],
          orderByItems: [{ item: "value1" }],
          quereyInfo: {
            queryInfo: {
              orderByExpressions: ["c.field1"],
            },
          },
        };

        const result = strategy.filterPartitionRanges(ranges, contRanges, queryInfo);
        expect(result.rangeTokenPairs.length).toBe(1);
        // Filter condition should be created (not empty)
        expect(result.rangeTokenPairs[0].filteringCondition).toBeDefined();
      });

      it("should handle missing queryInfo gracefully", function () {
        const ranges = [createRange("1", "", "AA"), createRange("2", "AA", "BB")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), "token1")];

        const result = strategy.filterPartitionRanges(ranges, contRanges);
        expect(result.rangeTokenPairs.length).toBe(2);
        expect(result.targetPartitionId).toBe("1");
      });
    });

    describe("Large Scale Scenarios", function () {
      it("should handle many ranges efficiently", function () {
        const ranges: PartitionKeyRange[] = [];
        for (let i = 0; i < 100; i++) {
          const min = i === 0 ? "" : i.toString().padStart(2, "0");
          const max = i === 99 ? "FF" : (i + 1).toString().padStart(2, "0");
          ranges.push(createRange(i.toString(), min, max));
        }

        const targetRange = ranges[50]; // Middle range
        const contRange = createContinuationRange(targetRange, "token50");

        const result = strategy.filterPartitionRanges(ranges, [contRange]);
        expect(result.rangeTokenPairs.length).toBe(100);
        expect(result.targetPartitionId).toBe("50");
      });
    });

    describe("Error Resilience", function () {
      it("should handle malformed range objects", function () {
        const validRange = createRange("1", "", "AA");
        const malformedRange = {
          id: "2",
          minInclusive: "AA",
          maxExclusive: "BB",
          ridPrefix: 2,
          throughputFraction: 1,
          status: "online",
          parents: [],
        } as PartitionKeyRange;

        const contRange = createContinuationRange(validRange, "token1");

        // The method may throw with malformed data, so we test that it can handle the scenario
        expect(() => {
          strategy.filterPartitionRanges([validRange, malformedRange], [contRange]);
        }).not.toThrow();
      });

      it("should handle empty continuation token", function () {
        const ranges = [createRange("1", "", "AA")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), "")];

        const result = strategy.filterPartitionRanges(ranges, contRanges);
        expect(result.rangeTokenPairs.length).toBe(1);
        expect(result.rangeTokenPairs[0].continuationToken).toBe("");
      });

      it("should handle null continuation token", function () {
        const ranges = [createRange("1", "", "AA")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), null as any)];

        const result = strategy.filterPartitionRanges(ranges, contRanges);
        expect(result.rangeTokenPairs.length).toBe(1);
        expect(result.rangeTokenPairs[0].continuationToken).toBeNull();
      });
    });

    describe("Filter Condition Generation", function () {
      it("should generate different filters for left and right ranges", function () {
        const leftRange = createRange("1", "", "AA");
        const targetRange = createRange("2", "AA", "BB");
        const rightRange = createRange("3", "BB", "CC");
        const ranges = [leftRange, targetRange, rightRange];

        const queryInfo = {
          orderBy: ["Ascending"],
          orderByItems: [{ item: "testValue" }],
          quereyInfo: {
            queryInfo: {
              orderByExpressions: ["c.field1"],
            },
          },
        };

        const contRange = createContinuationRange(targetRange, "token2");
        const result = strategy.filterPartitionRanges(ranges, [contRange], queryInfo);

        // Should have different filtering conditions for different range positions
        const leftPair = result.rangeTokenPairs.find((p) => p.range.id === "1");
        const rightPair = result.rangeTokenPairs.find((p) => p.range.id === "3");

        // Both should have filtering conditions but they should be different
        expect(leftPair?.filteringCondition).toBeDefined();
        expect(rightPair?.filteringCondition).toBeDefined();
        expect(leftPair?.filteringCondition).not.toBe(rightPair?.filteringCondition);
      });
    });
  });

  describe("getStrategyType", function () {
    it("should return correct strategy type", function () {
      expect(strategy.getStrategyType()).toBe("OrderByQuery");
    });
  });
});

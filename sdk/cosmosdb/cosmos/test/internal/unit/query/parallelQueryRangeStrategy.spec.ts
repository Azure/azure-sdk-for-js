// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach } from "vitest";
import { ParallelQueryRangeStrategy } from "../../../../src/queryExecutionContext/queryFilteringStrategy/ParallelQueryRangeStrategy.js";
import type { PartitionKeyRange } from "../../../../src/index.js";
import type { PartitionRangeWithContinuationToken } from "../../../../src/queryExecutionContext/queryFilteringStrategy/TargetPartitionRangeManager.js";

describe("ParallelQueryRangeStrategy", function () {
  let strategy: ParallelQueryRangeStrategy;

  beforeEach(function () {
    strategy = new ParallelQueryRangeStrategy();
  });

  describe("getStrategyType", function () {
    it("should return correct strategy type", function () {
      expect(strategy.getStrategyType()).toBe("ParallelQuery");
    });
  });

  describe("validateContinuationToken", function () {
    it("should validate correct composite continuation token", function () {
      const validToken = JSON.stringify({
        rangeMappings: [{ partitionKeyRange: { id: "1", minInclusive: "", maxExclusive: "AA" } }],
      });
      expect(strategy.validateContinuationToken(validToken)).toBe(true);
    });

    it("should reject invalid tokens", function () {
      expect(strategy.validateContinuationToken("")).toBe(false);
      expect(strategy.validateContinuationToken("invalid")).toBe(false);
      expect(strategy.validateContinuationToken("{}")).toBe(false);
      expect(strategy.validateContinuationToken('{"rangeMappings": []}')).toBe(true);
    });
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
      token: string | null,
      filteringCondition?: string,
    ): PartitionRangeWithContinuationToken => ({
      range,
      continuationToken: token,
      filteringCondition,
    });

    describe("Edge Cases", function () {
      it("should return empty result when targetRanges is empty", function () {
        const result = strategy.filterPartitionRanges([]);
        expect(result.rangeTokenPairs).toEqual([]);
      });

      it("should return all ranges when no continuation ranges", function () {
        const ranges = [createRange("1", "", "AA"), createRange("2", "AA", "BB")];
        const result = strategy.filterPartitionRanges(ranges);

        expect(result.rangeTokenPairs.length).toBe(2);
        expect(result.rangeTokenPairs[0].continuationToken).toBeUndefined();
        expect(result.rangeTokenPairs[1].continuationToken).toBeUndefined();
      });
    });

    describe("Continuation Token Processing", function () {
      it("should include non-exhausted ranges with tokens", function () {
        const range1 = createRange("1", "", "AA");
        const range2 = createRange("2", "AA", "BB");
        const targetRanges = [range1, range2];

        const contRanges = [
          createContinuationRange(range1, "token1"),
          createContinuationRange(range2, null), // exhausted
        ];

        const result = strategy.filterPartitionRanges(targetRanges, contRanges);

        // Should only include non-exhausted range
        expect(result.rangeTokenPairs.length).toBe(1);
        expect(result.rangeTokenPairs[0].range.id).toBe("1");
        expect(result.rangeTokenPairs[0].continuationToken).toBe("token1");
      });

      it("should add new target ranges after last processed range", function () {
        const processedRange = createRange("1", "", "AA");
        const newRange = createRange("2", "AA", "BB"); // Should be included
        const beforeRange = createRange("0", "", "A"); // Should not be included

        const targetRanges = [beforeRange, processedRange, newRange];
        const contRanges = [createContinuationRange(processedRange, "token1")];

        const result = strategy.filterPartitionRanges(targetRanges, contRanges);

        expect(result.rangeTokenPairs.length).toBe(2);
        expect(result.rangeTokenPairs.some((p) => p.range.id === "1")).toBe(true);
        expect(result.rangeTokenPairs.some((p) => p.range.id === "2")).toBe(true);
        expect(result.rangeTokenPairs.some((p) => p.range.id === "0")).toBe(false);
      });

      it("should sort continuation ranges by minInclusive", function () {
        const range1 = createRange("1", "BB", "CC");
        const range2 = createRange("2", "AA", "BB");

        const contRanges = [
          createContinuationRange(range1, "token1"), // Should be second
          createContinuationRange(range2, "token2"), // Should be first
        ];

        const result = strategy.filterPartitionRanges([range1, range2], contRanges);

        // Verify ranges are processed in correct order
        expect(result.rangeTokenPairs.length).toBe(2);
      });
    });

    describe("Exhaustion Logic", function () {
      it("should filter out exhausted ranges", function () {
        const range1 = createRange("1", "", "AA");
        const contRanges = [
          createContinuationRange(range1, ""), // exhausted
          createContinuationRange(range1, "null"), // exhausted
          createContinuationRange(range1, null), // exhausted
        ];

        const result = strategy.filterPartitionRanges([range1], contRanges);
        expect(result.rangeTokenPairs.length).toBe(0);
      });

      it("should handle mixed exhausted and non-exhausted ranges", function () {
        const range1 = createRange("1", "", "AA");
        const range2 = createRange("2", "AA", "BB");

        const contRanges = [
          createContinuationRange(range1, "token1"), // active
          createContinuationRange(range2, ""), // exhausted
        ];

        const result = strategy.filterPartitionRanges([range1, range2], contRanges);

        expect(result.rangeTokenPairs.length).toBe(1);
        expect(result.rangeTokenPairs[0].continuationToken).toBe("token1");
      });
    });

    describe("Boundary Conditions", function () {
      it("should handle adjacent ranges correctly", function () {
        const range1 = createRange("1", "", "AA");
        const range2 = createRange("2", "AA", "BB"); // Adjacent

        const contRanges = [createContinuationRange(range1, "token1")];
        const result = strategy.filterPartitionRanges([range1, range2], contRanges);

        // Should include both: processed range + adjacent new range
        expect(result.rangeTokenPairs.length).toBe(2);
      });

      it("should handle FF (maximum) boundary", function () {
        const range1 = createRange("1", "", "AA");
        const maxRange = createRange("2", "AA", "FF");

        const contRanges = [createContinuationRange(range1, "token1")];
        const result = strategy.filterPartitionRanges([range1, maxRange], contRanges);

        expect(result.rangeTokenPairs.length).toBe(2);
        expect(result.rangeTokenPairs.some((p) => p.range.maxExclusive === "FF")).toBe(true);
      });
    });

    describe("Filtering Conditions", function () {
      it("should preserve filtering conditions from continuation ranges", function () {
        const range1 = createRange("1", "", "AA");
        const contRanges = [createContinuationRange(range1, "token1", "c.id > 5")];

        const result = strategy.filterPartitionRanges([range1], contRanges);

        expect(result.rangeTokenPairs.length).toBe(1);
        expect(result.rangeTokenPairs[0].filteringCondition).toBe("c.id > 5");
      });
    });
  });
});

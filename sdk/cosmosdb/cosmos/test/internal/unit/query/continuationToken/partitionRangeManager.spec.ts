// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, beforeEach, assert } from "vitest";
import { PartitionRangeManager } from "../../../../../src/queryExecutionContext/PartitionRangeManager.js";
import type { QueryRangeMapping } from "../../../../../src/queryExecutionContext/QueryRangeMapping.js";
import type { PartitionKeyRange } from "../../../../../src/client/Container/PartitionKeyRange.js";

describe("PartitionRangeManager", () => {
  let partitionRangeManager: PartitionRangeManager;
  let mockPartitionKeyRange: PartitionKeyRange;

  beforeEach(() => {
    partitionRangeManager = new PartitionRangeManager();
    mockPartitionKeyRange = {
      id: "0",
      minInclusive: "",
      maxExclusive: "FF",
      throughputFraction: 1,
      ridPrefix: 1,
      status: "un",
      parents: [],
    };
  });

  const createMockRangeMapping = (
    itemCount: number,
    continuationToken: string | null = "token123",
    hashedLastResult?: string,
    offset?: number,
    limit?: number,
  ): QueryRangeMapping => ({
    itemCount,
    continuationToken,
    partitionKeyRange: mockPartitionKeyRange,
    hashedLastResult,
    offset,
    limit,
  });

  describe("constructor", () => {
    it("should initialize with empty partition key range map", () => {
      const manager = new PartitionRangeManager();
      assert.isFalse(manager.hasUnprocessedRanges());
    });
  });

  describe("setPartitionKeyRangeMap", () => {
    it("should add new range mappings", () => {
      const rangeMap = new Map<string, QueryRangeMapping>();
      rangeMap.set("range1", createMockRangeMapping(10));
      rangeMap.set("range2", createMockRangeMapping(5));

      partitionRangeManager.setPartitionKeyRangeMap(rangeMap);

      assert.isTrue(partitionRangeManager.hasUnprocessedRanges());
    });

    it("should not overwrite existing range mappings", () => {
      const initialMap = new Map<string, QueryRangeMapping>();
      initialMap.set("range1", createMockRangeMapping(10, "initial-token"));
      partitionRangeManager.setPartitionKeyRangeMap(initialMap);

      const updateMap = new Map<string, QueryRangeMapping>();
      updateMap.set("range1", createMockRangeMapping(20, "updated-token"));
      partitionRangeManager.setPartitionKeyRangeMap(updateMap);

      // Should still have unprocessed ranges but original mapping preserved
      assert.isTrue(partitionRangeManager.hasUnprocessedRanges());
    });

    it("should handle null/undefined range map", () => {
      partitionRangeManager.setPartitionKeyRangeMap(null as any);
      assert.isFalse(partitionRangeManager.hasUnprocessedRanges());

      partitionRangeManager.setPartitionKeyRangeMap(undefined as any);
      assert.isFalse(partitionRangeManager.hasUnprocessedRanges());
    });

    it("should add multiple distinct ranges", () => {
      const rangeMap = new Map<string, QueryRangeMapping>();
      rangeMap.set("range1", createMockRangeMapping(10));
      rangeMap.set("range2", createMockRangeMapping(5));
      rangeMap.set("range3", createMockRangeMapping(15));

      partitionRangeManager.setPartitionKeyRangeMap(rangeMap);

      assert.isTrue(partitionRangeManager.hasUnprocessedRanges());
    });
  });

  describe("removePartitionRangeMapping", () => {
    it("should remove existing range mapping", () => {
      const rangeMap = new Map<string, QueryRangeMapping>();
      rangeMap.set("range1", createMockRangeMapping(10));
      partitionRangeManager.setPartitionKeyRangeMap(rangeMap);

      assert.isTrue(partitionRangeManager.hasUnprocessedRanges());

      partitionRangeManager.removePartitionRangeMapping("range1");
      assert.isFalse(partitionRangeManager.hasUnprocessedRanges());
    });

    it("should handle removal of non-existent range", () => {
      partitionRangeManager.removePartitionRangeMapping("non-existent");
      assert.isFalse(partitionRangeManager.hasUnprocessedRanges());
    });

    it("should only remove specified range", () => {
      const rangeMap = new Map<string, QueryRangeMapping>();
      rangeMap.set("range1", createMockRangeMapping(10));
      rangeMap.set("range2", createMockRangeMapping(5));
      partitionRangeManager.setPartitionKeyRangeMap(rangeMap);

      partitionRangeManager.removePartitionRangeMapping("range1");
      assert.isTrue(partitionRangeManager.hasUnprocessedRanges());
    });
  });

  describe("hasUnprocessedRanges", () => {
    it("should return false for empty manager", () => {
      assert.isFalse(partitionRangeManager.hasUnprocessedRanges());
    });

    it("should return false after all ranges are removed", () => {
      const rangeMap = new Map<string, QueryRangeMapping>();
      rangeMap.set("range1", createMockRangeMapping(10));
      rangeMap.set("range2", createMockRangeMapping(5));
      partitionRangeManager.setPartitionKeyRangeMap(rangeMap);

      partitionRangeManager.removePartitionRangeMapping("range1");
      partitionRangeManager.removePartitionRangeMapping("range2");

      assert.isFalse(partitionRangeManager.hasUnprocessedRanges());
    });
  });

  describe("removeExhaustedRanges", () => {
    it("should return empty array for null input", () => {
      const result = partitionRangeManager.removeExhaustedRanges(null as any);
      assert.deepEqual(result, []);
    });

    it("should return empty array for undefined input", () => {
      const result = partitionRangeManager.removeExhaustedRanges(undefined as any);
      assert.deepEqual(result, []);
    });

    it("should return empty array for non-array input", () => {
      const result = partitionRangeManager.removeExhaustedRanges({} as any);
      assert.deepEqual(result, []);
    });

    it("should filter out ranges with null continuation token", () => {
      const ranges = [
        createMockRangeMapping(10, "valid-token"),
        createMockRangeMapping(5, null),
        createMockRangeMapping(15, "another-token"),
      ];

      const result = partitionRangeManager.removeExhaustedRanges(ranges);
      assert.equal(result.length, 2);
      assert.equal(result[0].itemCount, 10);
      assert.equal(result[1].itemCount, 15);
    });

    it("should filter out ranges with empty string continuation token", () => {
      const ranges = [
        createMockRangeMapping(10, "valid-token"),
        createMockRangeMapping(5, ""),
        createMockRangeMapping(15, "another-token"),
      ];

      const result = partitionRangeManager.removeExhaustedRanges(ranges);
      assert.equal(result.length, 2);
      assert.equal(result[0].itemCount, 10);
      assert.equal(result[1].itemCount, 15);
    });

    it("should filter out ranges with 'null' string continuation token", () => {
      const ranges = [
        createMockRangeMapping(10, "valid-token"),
        createMockRangeMapping(5, "null"),
        createMockRangeMapping(15, "another-token"),
      ];

      const result = partitionRangeManager.removeExhaustedRanges(ranges);
      assert.equal(result.length, 2);
      assert.equal(result[0].itemCount, 10);
      assert.equal(result[1].itemCount, 15);
    });

    it("should filter out ranges with case-insensitive 'null' string continuation token", () => {
      const ranges = [
        createMockRangeMapping(10, "valid-token"),
        createMockRangeMapping(5, "NULL"),
        createMockRangeMapping(7, "Null"),
        createMockRangeMapping(15, "another-token"),
      ];

      const result = partitionRangeManager.removeExhaustedRanges(ranges);
      assert.equal(result.length, 2);
      assert.equal(result[0].itemCount, 10);
      assert.equal(result[1].itemCount, 15);
    });

    it("should filter out null/undefined range mappings", () => {
      const ranges = [
        createMockRangeMapping(10, "valid-token"),
        null as any,
        createMockRangeMapping(15, "another-token"),
        undefined as any,
      ];

      const result = partitionRangeManager.removeExhaustedRanges(ranges);
      assert.equal(result.length, 2);
      assert.equal(result[0].itemCount, 10);
      assert.equal(result[1].itemCount, 15);
    });

    it("should return all ranges when none are exhausted", () => {
      const ranges = [
        createMockRangeMapping(10, "token1"),
        createMockRangeMapping(5, "token2"),
        createMockRangeMapping(15, "token3"),
      ];

      const result = partitionRangeManager.removeExhaustedRanges(ranges);
      assert.equal(result.length, 3);
      assert.deepEqual(result, ranges);
    });

    it("should return empty array when all ranges are exhausted", () => {
      const ranges = [
        createMockRangeMapping(10, null),
        createMockRangeMapping(5, ""),
        createMockRangeMapping(15, "null"),
      ];

      const result = partitionRangeManager.removeExhaustedRanges(ranges);
      assert.equal(result.length, 0);
    });
  });

  describe("processOrderByRanges", () => {
    beforeEach(() => {
      const rangeMap = new Map<string, QueryRangeMapping>();
      rangeMap.set("range1", createMockRangeMapping(10));
      rangeMap.set("range2", createMockRangeMapping(5));
      rangeMap.set("range3", createMockRangeMapping(15));
      rangeMap.set("range4", createMockRangeMapping(8));
      partitionRangeManager.setPartitionKeyRangeMap(rangeMap);
    });

    it("should process ranges that fit within page size", () => {
      const result = partitionRangeManager.processOrderByRanges(20);

      assert.equal(result.endIndex, 15); // 10 + 5 = 15
      assert.deepEqual(result.processedRanges, ["range1", "range2"]);
      assert.isNotNull(result.lastRangeBeforePageLimit);
      assert.equal(result.lastRangeBeforePageLimit?.itemCount, 5);
    });

    it("should process single range when it exactly matches page size", () => {
      const result = partitionRangeManager.processOrderByRanges(10);

      assert.equal(result.endIndex, 10);
      assert.deepEqual(result.processedRanges, ["range1"]);
      assert.isNotNull(result.lastRangeBeforePageLimit);
      assert.equal(result.lastRangeBeforePageLimit?.itemCount, 10);
    });

    it("should stop when next range would exceed page size", () => {
      const result = partitionRangeManager.processOrderByRanges(12);

      assert.equal(result.endIndex, 10); // Only range1 fits
      assert.deepEqual(result.processedRanges, ["range1"]);
      assert.isNotNull(result.lastRangeBeforePageLimit);
      assert.equal(result.lastRangeBeforePageLimit?.itemCount, 10);
    });

    it("should process all ranges when page size is very large", () => {
      const result = partitionRangeManager.processOrderByRanges(100);

      assert.equal(result.endIndex, 38); // 10 + 5 + 15 + 8 = 38
      assert.deepEqual(result.processedRanges, ["range1", "range2", "range3", "range4"]);
      assert.isNotNull(result.lastRangeBeforePageLimit);
      assert.equal(result.lastRangeBeforePageLimit?.itemCount, 8);
    });

    it("should return empty result when page size is 0", () => {
      const result = partitionRangeManager.processOrderByRanges(0);

      assert.equal(result.endIndex, 0);
      assert.deepEqual(result.processedRanges, []);
      assert.isNull(result.lastRangeBeforePageLimit);
    });

    it("should handle empty range map", () => {
      const emptyManager = new PartitionRangeManager();
      const result = emptyManager.processOrderByRanges(10);

      assert.equal(result.endIndex, 0);
      assert.deepEqual(result.processedRanges, []);
      assert.isNull(result.lastRangeBeforePageLimit);
    });

    it("should process ranges in insertion order", () => {
      const orderedManager = new PartitionRangeManager();
      const rangeMap = new Map<string, QueryRangeMapping>();
      rangeMap.set("alpha", createMockRangeMapping(3));
      rangeMap.set("beta", createMockRangeMapping(4));
      rangeMap.set("gamma", createMockRangeMapping(5));
      orderedManager.setPartitionKeyRangeMap(rangeMap);

      const result = orderedManager.processOrderByRanges(8);

      assert.equal(result.endIndex, 7); // 3 + 4 = 7
      assert.deepEqual(result.processedRanges, ["alpha", "beta"]);
      assert.equal(result.lastRangeBeforePageLimit?.itemCount, 4);
    });
  });

  describe("processParallelRanges", () => {
    beforeEach(() => {
      const rangeMap = new Map<string, QueryRangeMapping>();
      rangeMap.set("range1", createMockRangeMapping(10));
      rangeMap.set("range2", createMockRangeMapping(5));
      rangeMap.set("range3", createMockRangeMapping(15));
      rangeMap.set("range4", createMockRangeMapping(8));
      partitionRangeManager.setPartitionKeyRangeMap(rangeMap);
    });

    it("should process ranges that fit within page size", () => {
      const result = partitionRangeManager.processParallelRanges(20);

      assert.equal(result.endIndex, 15); // 10 + 5 = 15
      assert.deepEqual(result.processedRanges, ["range1", "range2"]);
      assert.equal(result.processedRangeMappings.length, 2);
      assert.equal(result.processedRangeMappings[0].itemCount, 10);
      assert.equal(result.processedRangeMappings[1].itemCount, 5);
      assert.isDefined(result.lastPartitionBeforeCutoff);
      assert.equal(result.lastPartitionBeforeCutoff?.rangeId, "range2");
      assert.equal(result.lastPartitionBeforeCutoff?.mapping.itemCount, 5);
    });

    it("should process single range when it exactly matches page size", () => {
      const result = partitionRangeManager.processParallelRanges(10);

      assert.equal(result.endIndex, 10);
      assert.deepEqual(result.processedRanges, ["range1"]);
      assert.equal(result.processedRangeMappings.length, 1);
      assert.equal(result.processedRangeMappings[0].itemCount, 10);
      assert.isDefined(result.lastPartitionBeforeCutoff);
      assert.equal(result.lastPartitionBeforeCutoff?.rangeId, "range1");
    });

    it("should stop when next range would exceed page size", () => {
      const result = partitionRangeManager.processParallelRanges(12);

      assert.equal(result.endIndex, 10); // Only range1 fits
      assert.deepEqual(result.processedRanges, ["range1"]);
      assert.equal(result.processedRangeMappings.length, 1);
      assert.isDefined(result.lastPartitionBeforeCutoff);
      assert.equal(result.lastPartitionBeforeCutoff?.rangeId, "range1");
    });

    it("should process all ranges when page size is very large", () => {
      const result = partitionRangeManager.processParallelRanges(100);

      assert.equal(result.endIndex, 38); // 10 + 5 + 15 + 8 = 38
      assert.deepEqual(result.processedRanges, ["range1", "range2", "range3", "range4"]);
      assert.equal(result.processedRangeMappings.length, 4);
      assert.isDefined(result.lastPartitionBeforeCutoff);
      assert.equal(result.lastPartitionBeforeCutoff?.rangeId, "range4");
    });

    it("should return empty result when page size is 0", () => {
      const result = partitionRangeManager.processParallelRanges(0);

      assert.equal(result.endIndex, 0);
      assert.deepEqual(result.processedRanges, []);
      assert.equal(result.processedRangeMappings.length, 0);
      assert.isUndefined(result.lastPartitionBeforeCutoff);
    });

    it("should handle empty range map", () => {
      const emptyManager = new PartitionRangeManager();
      const result = emptyManager.processParallelRanges(10);

      assert.equal(result.endIndex, 0);
      assert.deepEqual(result.processedRanges, []);
      assert.equal(result.processedRangeMappings.length, 0);
      assert.isUndefined(result.lastPartitionBeforeCutoff);
    });

    it("should skip invalid ranges with undefined itemCount", () => {
      const managerWithInvalidRanges = new PartitionRangeManager();
      const rangeMap = new Map<string, QueryRangeMapping>();
      rangeMap.set("valid1", createMockRangeMapping(10));
      rangeMap.set("invalid", { itemCount: undefined, continuationToken: "token" } as any);
      rangeMap.set("valid2", createMockRangeMapping(5));
      managerWithInvalidRanges.setPartitionKeyRangeMap(rangeMap);

      const result = managerWithInvalidRanges.processParallelRanges(20);

      assert.equal(result.endIndex, 15); // 10 + 5 = 15 (invalid range skipped)
      assert.deepEqual(result.processedRanges, ["valid1", "valid2"]);
      assert.equal(result.processedRangeMappings.length, 2);
    });

    it("should skip null range mappings", () => {
      const managerWithNullRanges = new PartitionRangeManager();
      const rangeMap = new Map<string, QueryRangeMapping>();
      rangeMap.set("valid1", createMockRangeMapping(10));
      rangeMap.set("null-range", null as any);
      rangeMap.set("valid2", createMockRangeMapping(5));
      managerWithNullRanges.setPartitionKeyRangeMap(rangeMap);

      const result = managerWithNullRanges.processParallelRanges(20);

      assert.equal(result.endIndex, 15); // 10 + 5 = 15 (null range skipped)
      assert.deepEqual(result.processedRanges, ["valid1", "valid2"]);
      assert.equal(result.processedRangeMappings.length, 2);
    });

    it("should maintain range order in processed results", () => {
      const orderedManager = new PartitionRangeManager();
      const rangeMap = new Map<string, QueryRangeMapping>();
      rangeMap.set("first", createMockRangeMapping(3));
      rangeMap.set("second", createMockRangeMapping(4));
      rangeMap.set("third", createMockRangeMapping(5));
      orderedManager.setPartitionKeyRangeMap(rangeMap);

      const result = orderedManager.processParallelRanges(8);

      assert.equal(result.endIndex, 7); // 3 + 4 = 7
      assert.deepEqual(result.processedRanges, ["first", "second"]);
      assert.equal(result.processedRangeMappings[0].itemCount, 3);
      assert.equal(result.processedRangeMappings[1].itemCount, 4);
      assert.equal(result.lastPartitionBeforeCutoff?.rangeId, "second");
    });
  });
});

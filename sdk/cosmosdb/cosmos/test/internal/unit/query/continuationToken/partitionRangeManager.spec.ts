// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, beforeEach, assert } from "vitest";
import { PartitionRangeManager } from "../../../../../src/queryExecutionContext/PartitionRangeManager.js";
import type { QueryRangeMapping } from "../../../../../src/queryExecutionContext/queryRangeMapping.js";
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

      partitionRangeManager.addPartitionKeyRangeMap(rangeMap);

      assert.isTrue(partitionRangeManager.hasUnprocessedRanges());
    });

    it("should not overwrite existing range mappings", () => {
      const initialMap = new Map<string, QueryRangeMapping>();
      initialMap.set("range1", createMockRangeMapping(10, "initial-token"));
      partitionRangeManager.addPartitionKeyRangeMap(initialMap);

      const updateMap = new Map<string, QueryRangeMapping>();
      updateMap.set("range1", createMockRangeMapping(20, "updated-token"));
      partitionRangeManager.addPartitionKeyRangeMap(updateMap);

      // Should still have unprocessed ranges but original mapping preserved
      assert.isTrue(partitionRangeManager.hasUnprocessedRanges());
    });

    it("should handle null/undefined range map", () => {
      partitionRangeManager.addPartitionKeyRangeMap(null as any);
      assert.isFalse(partitionRangeManager.hasUnprocessedRanges());

      partitionRangeManager.addPartitionKeyRangeMap(undefined as any);
      assert.isFalse(partitionRangeManager.hasUnprocessedRanges());
    });

    it("should add multiple distinct ranges", () => {
      const rangeMap = new Map<string, QueryRangeMapping>();
      rangeMap.set("range1", createMockRangeMapping(10));
      rangeMap.set("range2", createMockRangeMapping(5));
      rangeMap.set("range3", createMockRangeMapping(15));

      partitionRangeManager.addPartitionKeyRangeMap(rangeMap);

      assert.isTrue(partitionRangeManager.hasUnprocessedRanges());
    });
  });

  describe("removePartitionRangeMapping", () => {
    it("should remove existing range mapping", () => {
      const rangeMap = new Map<string, QueryRangeMapping>();
      rangeMap.set("range1", createMockRangeMapping(10));
      partitionRangeManager.addPartitionKeyRangeMap(rangeMap);

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
      partitionRangeManager.addPartitionKeyRangeMap(rangeMap);

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
      partitionRangeManager.addPartitionKeyRangeMap(rangeMap);

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
      partitionRangeManager.addPartitionKeyRangeMap(rangeMap);
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
      orderedManager.addPartitionKeyRangeMap(rangeMap);

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
      partitionRangeManager.addPartitionKeyRangeMap(rangeMap);
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
      managerWithInvalidRanges.addPartitionKeyRangeMap(rangeMap);

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
      managerWithNullRanges.addPartitionKeyRangeMap(rangeMap);

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
      orderedManager.addPartitionKeyRangeMap(rangeMap);

      const result = orderedManager.processParallelRanges(8);

      assert.equal(result.endIndex, 7); // 3 + 4 = 7
      assert.deepEqual(result.processedRanges, ["first", "second"]);
      assert.equal(result.processedRangeMappings[0].itemCount, 3);
      assert.equal(result.processedRangeMappings[1].itemCount, 4);
      assert.equal(result.lastPartitionBeforeCutoff?.rangeId, "second");
    });
  });

  describe("Sliding Window Behavior - Removing Finished Ranges", () => {
    /**
     * These tests validate the sliding window fix from PR #36765 which ensures
     * finished partition key ranges are properly removed and don't persist in continuation tokens.
     */

    it("should remove single finished range and advance sliding window", () => {
      // Arrange: Add three ranges to the manager
      const rangeMap = new Map<string, QueryRangeMapping>();
      rangeMap.set("range1", createMockRangeMapping(10, "token1"));
      rangeMap.set("range2", createMockRangeMapping(5, "token2"));
      rangeMap.set("range3", createMockRangeMapping(15, "token3"));
      partitionRangeManager.addPartitionKeyRangeMap(rangeMap);

      assert.isTrue(partitionRangeManager.hasUnprocessedRanges());

      // Act: Remove range1 (simulating it finished)
      partitionRangeManager.removePartitionRangeMapping("range1");

      // Assert: Sliding window should still have unprocessed ranges (range2, range3)
      assert.isTrue(partitionRangeManager.hasUnprocessedRanges());
    });

    it("should remove intermediate finished range and advance sliding window", () => {
      // Arrange: Add three ranges
      const rangeMap = new Map<string, QueryRangeMapping>();
      rangeMap.set("range1", createMockRangeMapping(10, "token1"));
      rangeMap.set("range2", createMockRangeMapping(5, "token2"));
      rangeMap.set("range3", createMockRangeMapping(15, "token3"));
      partitionRangeManager.addPartitionKeyRangeMap(rangeMap);

      // Act: Remove intermediate range2
      partitionRangeManager.removePartitionRangeMapping("range2");

      // Assert: Sliding window should advance, still having range1 and range3
      assert.isTrue(partitionRangeManager.hasUnprocessedRanges());
    });

    it("should remove multiple intermediate ranges and advance sliding window", () => {
      // Arrange: Add five ranges
      const rangeMap = new Map<string, QueryRangeMapping>();
      rangeMap.set("range1", createMockRangeMapping(10, "token1"));
      rangeMap.set("range2", createMockRangeMapping(5, "token2"));
      rangeMap.set("range3", createMockRangeMapping(8, "token3"));
      rangeMap.set("range4", createMockRangeMapping(12, "token4"));
      rangeMap.set("range5", createMockRangeMapping(20, "token5"));
      partitionRangeManager.addPartitionKeyRangeMap(rangeMap);

      // Act: Remove ranges 2, 3, 4 (intermediate ranges)
      partitionRangeManager.removePartitionRangeMapping("range2");
      partitionRangeManager.removePartitionRangeMapping("range3");
      partitionRangeManager.removePartitionRangeMapping("range4");

      // Assert: Window advanced, still has range1 and range5
      assert.isTrue(partitionRangeManager.hasUnprocessedRanges());
    });

    it("should report no unprocessed ranges when all ranges finish", () => {
      // Arrange: Add two ranges
      const rangeMap = new Map<string, QueryRangeMapping>();
      rangeMap.set("range1", createMockRangeMapping(10, "token1"));
      rangeMap.set("range2", createMockRangeMapping(5, "token2"));
      partitionRangeManager.addPartitionKeyRangeMap(rangeMap);

      assert.isTrue(partitionRangeManager.hasUnprocessedRanges());

      // Act: Remove all ranges
      partitionRangeManager.removePartitionRangeMapping("range1");
      partitionRangeManager.removePartitionRangeMapping("range2");

      // Assert: No unprocessed ranges remain
      assert.isFalse(partitionRangeManager.hasUnprocessedRanges());
    });

    it("should handle sequential removal of ranges simulating sliding window progression", () => {
      // Arrange: Add ranges sequentially and remove as they finish
      const rangeMap1 = new Map<string, QueryRangeMapping>();
      rangeMap1.set("range1", createMockRangeMapping(10, "token1"));
      rangeMap1.set("range2", createMockRangeMapping(5, "token2"));
      partitionRangeManager.addPartitionKeyRangeMap(rangeMap1);

      assert.isTrue(partitionRangeManager.hasUnprocessedRanges());

      // Act: Remove range1
      partitionRangeManager.removePartitionRangeMapping("range1");
      assert.isTrue(partitionRangeManager.hasUnprocessedRanges());

      // Act: Add a new range while range2 is still active (simulating new ranges arriving)
      const rangeMap2 = new Map<string, QueryRangeMapping>();
      rangeMap2.set("range3", createMockRangeMapping(15, "token3"));
      partitionRangeManager.addPartitionKeyRangeMap(rangeMap2);

      // Act: Remove range2
      partitionRangeManager.removePartitionRangeMapping("range2");
      assert.isTrue(partitionRangeManager.hasUnprocessedRanges()); // range3 still there

      // Act: Remove range3
      partitionRangeManager.removePartitionRangeMapping("range3");
      assert.isFalse(partitionRangeManager.hasUnprocessedRanges());
    });

    it("should correctly process ranges after some are removed", () => {
      // Arrange: Add ranges and remove some
      const rangeMap = new Map<string, QueryRangeMapping>();
      rangeMap.set("range1", createMockRangeMapping(10, "token1"));
      rangeMap.set("range2", createMockRangeMapping(5, "token2"));
      rangeMap.set("range3", createMockRangeMapping(15, "token3"));
      rangeMap.set("range4", createMockRangeMapping(8, "token4"));
      partitionRangeManager.addPartitionKeyRangeMap(rangeMap);

      // Remove range1 and range2
      partitionRangeManager.removePartitionRangeMapping("range1");
      partitionRangeManager.removePartitionRangeMapping("range2");

      // Act: Process remaining ranges
      const result = partitionRangeManager.processParallelRanges(20);

      // Assert: Should process range3 and range4
      assert.equal(result.endIndex, 15); // Only range3 fits in pageSize 20
      assert.deepEqual(result.processedRanges, ["range3"]);
    });

    it("should handle removeExhaustedRanges correctly in sliding window", () => {
      // Arrange: Create ranges with some exhausted
      const ranges = [
        createMockRangeMapping(10, "valid-token1"),
        createMockRangeMapping(5, null), // Exhausted
        createMockRangeMapping(8, "valid-token2"),
        createMockRangeMapping(12, ""), // Exhausted
        createMockRangeMapping(15, "valid-token3"),
      ];

      // Act: Filter exhausted ranges
      const result = partitionRangeManager.removeExhaustedRanges(ranges);

      // Assert: Only non-exhausted ranges remain
      assert.equal(result.length, 3);
      assert.equal(result[0].itemCount, 10);
      assert.equal(result[0].continuationToken, "valid-token1");
      assert.equal(result[1].itemCount, 8);
      assert.equal(result[1].continuationToken, "valid-token2");
      assert.equal(result[2].itemCount, 15);
      assert.equal(result[2].continuationToken, "valid-token3");
    });

    it("should not process removed ranges in ORDER BY queries", () => {
      // Arrange: Add ranges
      const rangeMap = new Map<string, QueryRangeMapping>();
      rangeMap.set("range1", createMockRangeMapping(10, "token1"));
      rangeMap.set("range2", createMockRangeMapping(5, "token2"));
      rangeMap.set("range3", createMockRangeMapping(15, "token3"));
      partitionRangeManager.addPartitionKeyRangeMap(rangeMap);

      // Remove range1
      partitionRangeManager.removePartitionRangeMapping("range1");

      // Act: Process ORDER BY ranges
      const result = partitionRangeManager.processOrderByRanges(10);

      // Assert: Should start with range2 (range1 was removed from sliding window)
      assert.equal(result.endIndex, 5); // Only range2 fits in pageSize 10
      assert.deepEqual(result.processedRanges, ["range2"]);
      assert.isNotNull(result.lastRangeBeforePageLimit);
      assert.equal(result.lastRangeBeforePageLimit?.itemCount, 5);
    });

    it("should maintain correct sliding window state after multiple operations", () => {
      // Arrange: Complex scenario with adds and removes
      const rangeMap1 = new Map<string, QueryRangeMapping>();
      rangeMap1.set("range1", createMockRangeMapping(10, "token1"));
      rangeMap1.set("range2", createMockRangeMapping(5, "token2"));
      partitionRangeManager.addPartitionKeyRangeMap(rangeMap1);

      assert.isTrue(partitionRangeManager.hasUnprocessedRanges());

      // Remove range1
      partitionRangeManager.removePartitionRangeMapping("range1");
      assert.isTrue(partitionRangeManager.hasUnprocessedRanges());

      // Add more ranges
      const rangeMap2 = new Map<string, QueryRangeMapping>();
      rangeMap2.set("range3", createMockRangeMapping(15, "token3"));
      rangeMap2.set("range4", createMockRangeMapping(8, "token4"));
      partitionRangeManager.addPartitionKeyRangeMap(rangeMap2);

      // Remove range2 and range3
      partitionRangeManager.removePartitionRangeMapping("range2");
      partitionRangeManager.removePartitionRangeMapping("range3");

      // Assert: Only range4 remains
      assert.isTrue(partitionRangeManager.hasUnprocessedRanges());

      // Process remaining ranges
      const result = partitionRangeManager.processParallelRanges(10);
      assert.equal(result.endIndex, 8);
      assert.deepEqual(result.processedRanges, ["range4"]);
    });
  });
});

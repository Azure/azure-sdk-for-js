// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { ParallelQueryContinuationTokenManager } from "../../../../../src/queryExecutionContext/ContinuationTokenManager/ParallelQueryContinuationTokenManager.js";
import type { ParallelQueryResult } from "../../../../../src/queryExecutionContext/parallelQueryResult.js";
import type { QueryRangeMapping } from "../../../../../src/queryExecutionContext/queryRangeMapping.js";
import type { PartitionKeyRange } from "../../../../../src/client/Container/PartitionKeyRange.js";
import { parseCompositeQueryContinuationToken } from "../../../../../src/documents/ContinuationToken/CompositeQueryContinuationToken.js";

describe("ParallelQueryContinuationTokenManager - Sliding Window Flow", () => {
  const testCollectionLink = "dbs/testdb/colls/testcoll";

  /**
   * Helper to create a mock partition key range
   */
  const createMockPartitionKeyRange = (
    id: string,
    minInclusive: string,
    maxExclusive: string,
  ): PartitionKeyRange => ({
    id,
    minInclusive,
    maxExclusive,
    ridPrefix: parseInt(id),
    throughputFraction: 1.0,
    status: "online",
    parents: [],
  });

  /**
   * Helper to create a QueryRangeMapping
   */
  const createRangeMapping = (
    id: string,
    min: string,
    max: string,
    itemCount: number,
    continuationToken: string | null = `token-${id}`,
  ): QueryRangeMapping => ({
    itemCount,
    continuationToken: continuationToken ?? undefined,
    partitionKeyRange: createMockPartitionKeyRange(id, min, max),
  });

  /**
   * Helper to simulate adding ranges to partition manager and getting a response
   */
  const createParallelQueryResult = (
    rangeMappings: Map<string, QueryRangeMapping>,
  ): ParallelQueryResult => ({
    buffer: [],
    partitionKeyRangeMap: rangeMappings,
  });

  describe("Sliding Window with 6 Partition Ranges (a,b,c,d,e,f) - Window Size 3", () => {
    /**
     * Scenario:
     * - Total 6 partition ranges: a, b, c, d, e, f
     * - Window size (max degree of parallelism) = 3
     * - Initial window: a, b, c
     * - As ranges become empty, they are removed and new ranges slide in
     *
     * Flow:
     * 1. Initial: [a, b, c] returned (window size 3)
     * 2. b becomes empty → [a, c, d] (d slides in)
     * 3. a becomes empty → [c, d, e] (e slides in)
     * 4. d becomes empty → [c, e, f] (f slides in)
     * 5. f becomes empty → [c, e] (no more ranges to add)
     * 6. c, e become empty → [] (all exhausted)
     */

    it("should correctly manage sliding window as ranges become exhausted", () => {
      const tokenManager = new ParallelQueryContinuationTokenManager(testCollectionLink);

      // Step 1: Initial window with ranges a, b, c
      // Each range has some items (let's say 5 items each)
      const initialRanges = new Map<string, QueryRangeMapping>();
      initialRanges.set("a", createRangeMapping("1", "00", "10", 5, "token-a"));
      initialRanges.set("b", createRangeMapping("2", "10", "20", 5, "token-b"));
      initialRanges.set("c", createRangeMapping("3", "20", "30", 5, "token-c"));

      let result = tokenManager.paginateResults(
        15,
        false,
        createParallelQueryResult(initialRanges),
      );

      expect(result.continuationToken).toBeDefined();
      let parsedToken = parseCompositeQueryContinuationToken(result.continuationToken!);
      expect(parsedToken.rangeMappings).toHaveLength(3);
      expect(parsedToken.rid).toBe(testCollectionLink);

      // Verify all three initial ranges are in the token
      const rangeMinValues = parsedToken.rangeMappings.map((r) => r.queryRange.min);
      expect(rangeMinValues).toContain("00");
      expect(rangeMinValues).toContain("10");
      expect(rangeMinValues).toContain("20");

      // Step 2: Range 'b' becomes exhausted (token = null), 'd' slides in
      const rangesAfterBExhausted = new Map<string, QueryRangeMapping>();
      rangesAfterBExhausted.set("a", createRangeMapping("1", "00", "10", 3, "token-a-updated"));
      rangesAfterBExhausted.set("b", createRangeMapping("2", "10", "20", 0, null)); // Exhausted
      rangesAfterBExhausted.set("c", createRangeMapping("3", "20", "30", 4, "token-c-updated"));
      rangesAfterBExhausted.set("d", createRangeMapping("4", "30", "40", 5, "token-d")); // New range slides in

      result = tokenManager.paginateResults(
        12,
        false,
        createParallelQueryResult(rangesAfterBExhausted),
      );

      expect(result.continuationToken).toBeDefined();
      parsedToken = parseCompositeQueryContinuationToken(result.continuationToken!);

      // Verify 'b' range (10-20) is not present with an active token
      const rangeBPresent = parsedToken.rangeMappings.find(
        (r) => r.queryRange.min === "10" && r.queryRange.max === "20" && r.continuationToken,
      );
      expect(rangeBPresent?.continuationToken).toBeUndefined();

      // Verify 'd' range (30-40) is now present
      const rangeDPresent = parsedToken.rangeMappings.find(
        (r) => r.queryRange.min === "30" && r.queryRange.max === "40",
      );
      expect(rangeDPresent).toBeDefined();
      expect(rangeDPresent?.continuationToken).toBe("token-d");
    });

    it("should handle complete exhaustion flow from initial window to empty", () => {
      const tokenManager = new ParallelQueryContinuationTokenManager(testCollectionLink);

      // Step 1: Add all 6 ranges initially, but only process first 3 (window size simulation)
      const allRanges = new Map<string, QueryRangeMapping>();
      allRanges.set("a", createRangeMapping("1", "00", "10", 5, "token-a"));
      allRanges.set("b", createRangeMapping("2", "10", "20", 5, "token-b"));
      allRanges.set("c", createRangeMapping("3", "20", "30", 5, "token-c"));

      let result = tokenManager.paginateResults(15, false, createParallelQueryResult(allRanges));
      expect(result.continuationToken).toBeDefined();

      // Step 2: All initial ranges exhausted (marked as null), new ranges come in
      const rangesStep2 = new Map<string, QueryRangeMapping>();
      rangesStep2.set("a", createRangeMapping("1", "00", "10", 0, null)); // exhausted
      rangesStep2.set("b", createRangeMapping("2", "10", "20", 0, null)); // exhausted
      rangesStep2.set("c", createRangeMapping("3", "20", "30", 0, null)); // exhausted
      rangesStep2.set("d", createRangeMapping("4", "30", "40", 5, "token-d"));
      rangesStep2.set("e", createRangeMapping("5", "40", "50", 5, "token-e"));
      rangesStep2.set("f", createRangeMapping("6", "50", "FF", 5, "token-f"));

      result = tokenManager.paginateResults(15, false, createParallelQueryResult(rangesStep2));
      expect(result.continuationToken).toBeDefined();

      // Verify old ranges (a,b,c) are filtered out and new ranges (d,e,f) are present
      let parsedToken = parseCompositeQueryContinuationToken(result.continuationToken!);
      let activeRanges = parsedToken.rangeMappings.filter(
        (r) => r.continuationToken && r.continuationToken !== "null" && r.continuationToken !== "",
      );
      // Should have d, e, f active
      expect(activeRanges.length).toBeGreaterThanOrEqual(3);
      const activeMinValues = activeRanges.map((r) => r.queryRange.min);
      expect(activeMinValues).toContain("30"); // d
      expect(activeMinValues).toContain("40"); // e
      expect(activeMinValues).toContain("50"); // f

      // Step 3: All new ranges also exhausted
      const rangesStep3 = new Map<string, QueryRangeMapping>();
      rangesStep3.set("d", createRangeMapping("4", "30", "40", 0, null));
      rangesStep3.set("e", createRangeMapping("5", "40", "50", 0, null));
      rangesStep3.set("f", createRangeMapping("6", "50", "FF", 0, null));

      result = tokenManager.paginateResults(0, true, createParallelQueryResult(rangesStep3));

      // Token should be defined but have no active ranges (all exhausted)
      if (result.continuationToken) {
        parsedToken = parseCompositeQueryContinuationToken(result.continuationToken);
        activeRanges = parsedToken.rangeMappings.filter(
          (r) =>
            r.continuationToken && r.continuationToken !== "null" && r.continuationToken !== "",
        );
        // All ranges are exhausted, no active ranges should remain
        expect(activeRanges).toHaveLength(0);
      }
    });
  });

  describe("Continuation Token Range Synchronization", () => {
    /**
     * Tests for the bug fix: rangeMappings in continuationToken should stay
     * synchronized with rangeList in the manager
     */

    it("should keep rangeMappings synchronized with rangeList on initial creation", () => {
      const tokenManager = new ParallelQueryContinuationTokenManager(testCollectionLink);

      const initialRanges = new Map<string, QueryRangeMapping>();
      initialRanges.set("a", createRangeMapping("1", "00", "10", 5, "token-a"));
      initialRanges.set("b", createRangeMapping("2", "10", "20", 5, "token-b"));

      const result = tokenManager.paginateResults(
        10,
        false,
        createParallelQueryResult(initialRanges),
      );

      expect(result.continuationToken).toBeDefined();
      const parsedToken = parseCompositeQueryContinuationToken(result.continuationToken!);

      // Both ranges should be in the token
      expect(parsedToken.rangeMappings).toHaveLength(2);
    });

    it("should keep rangeMappings synchronized when adding new ranges", () => {
      const tokenManager = new ParallelQueryContinuationTokenManager(testCollectionLink);

      // First batch
      const firstBatch = new Map<string, QueryRangeMapping>();
      firstBatch.set("a", createRangeMapping("1", "00", "10", 5, "token-a"));

      let result = tokenManager.paginateResults(5, false, createParallelQueryResult(firstBatch));
      expect(result.continuationToken).toBeDefined();

      // Second batch - adding new range
      const secondBatch = new Map<string, QueryRangeMapping>();
      secondBatch.set("b", createRangeMapping("2", "10", "20", 5, "token-b"));

      result = tokenManager.paginateResults(5, false, createParallelQueryResult(secondBatch));
      expect(result.continuationToken).toBeDefined();

      const parsedToken = parseCompositeQueryContinuationToken(result.continuationToken!);

      // New range should now be in the token
      const hasRangeB = parsedToken.rangeMappings.some(
        (r) => r.queryRange.min === "10" && r.queryRange.max === "20",
      );
      expect(hasRangeB).toBe(true);
    });

    it("should keep rangeMappings synchronized when updating existing ranges", () => {
      const tokenManager = new ParallelQueryContinuationTokenManager(testCollectionLink);

      // Initial setup
      const initialRanges = new Map<string, QueryRangeMapping>();
      initialRanges.set("a", createRangeMapping("1", "00", "10", 5, "token-a-initial"));

      let result = tokenManager.paginateResults(5, false, createParallelQueryResult(initialRanges));
      expect(result.continuationToken).toBeDefined();
      let parsedToken = parseCompositeQueryContinuationToken(result.continuationToken!);
      expect(parsedToken.rangeMappings[0].continuationToken).toBe("token-a-initial");

      // Update existing range with new token
      const updatedRanges = new Map<string, QueryRangeMapping>();
      updatedRanges.set("a", createRangeMapping("1", "00", "10", 3, "token-a-updated"));

      result = tokenManager.paginateResults(3, false, createParallelQueryResult(updatedRanges));
      expect(result.continuationToken).toBeDefined();
      parsedToken = parseCompositeQueryContinuationToken(result.continuationToken!);

      // The range should have updated token
      const rangeA = parsedToken.rangeMappings.find(
        (r) => r.queryRange.min === "00" && r.queryRange.max === "10",
      );
      expect(rangeA).toBeDefined();
      expect(rangeA?.continuationToken).toBe("token-a-updated");
    });
  });

  describe("Edge Cases for Sliding Window", () => {
    it("should handle single range becoming exhausted", () => {
      const tokenManager = new ParallelQueryContinuationTokenManager(testCollectionLink);

      const singleRange = new Map<string, QueryRangeMapping>();
      singleRange.set("a", createRangeMapping("1", "00", "FF", 10, "token-a"));

      let result = tokenManager.paginateResults(10, false, createParallelQueryResult(singleRange));
      expect(result.continuationToken).toBeDefined();

      // Range becomes exhausted
      const exhaustedRange = new Map<string, QueryRangeMapping>();
      exhaustedRange.set("a", createRangeMapping("1", "00", "FF", 0, null));

      result = tokenManager.paginateResults(0, true, createParallelQueryResult(exhaustedRange));

      // Should have no active ranges
      if (result.continuationToken) {
        const parsedToken = parseCompositeQueryContinuationToken(result.continuationToken);
        const activeRanges = parsedToken.rangeMappings.filter(
          (r) => r.continuationToken && r.continuationToken !== "null",
        );
        expect(activeRanges).toHaveLength(0);
      }
    });

    it("should handle multiple ranges becoming exhausted simultaneously", () => {
      const tokenManager = new ParallelQueryContinuationTokenManager(testCollectionLink);

      const initialRanges = new Map<string, QueryRangeMapping>();
      initialRanges.set("a", createRangeMapping("1", "00", "10", 5, "token-a"));
      initialRanges.set("b", createRangeMapping("2", "10", "20", 5, "token-b"));
      initialRanges.set("c", createRangeMapping("3", "20", "30", 5, "token-c"));

      let result = tokenManager.paginateResults(
        15,
        false,
        createParallelQueryResult(initialRanges),
      );
      expect(result.continuationToken).toBeDefined();

      // All ranges become exhausted at once
      const exhaustedRanges = new Map<string, QueryRangeMapping>();
      exhaustedRanges.set("a", createRangeMapping("1", "00", "10", 0, null));
      exhaustedRanges.set("b", createRangeMapping("2", "10", "20", 0, null));
      exhaustedRanges.set("c", createRangeMapping("3", "20", "30", 0, null));

      result = tokenManager.paginateResults(0, true, createParallelQueryResult(exhaustedRanges));

      if (result.continuationToken) {
        const parsedToken = parseCompositeQueryContinuationToken(result.continuationToken);
        const activeRanges = parsedToken.rangeMappings.filter(
          (r) => r.continuationToken && r.continuationToken !== "null",
        );
        expect(activeRanges).toHaveLength(0);
      }
    });

    it("should handle empty response with existing ranges", () => {
      const tokenManager = new ParallelQueryContinuationTokenManager(testCollectionLink);

      const initialRanges = new Map<string, QueryRangeMapping>();
      initialRanges.set("a", createRangeMapping("1", "00", "10", 5, "token-a"));

      let result = tokenManager.paginateResults(5, false, createParallelQueryResult(initialRanges));
      expect(result.continuationToken).toBeDefined();

      // Empty response - no new ranges
      const emptyRanges = new Map<string, QueryRangeMapping>();

      result = tokenManager.paginateResults(0, true, createParallelQueryResult(emptyRanges));

      // Previous ranges should still be tracked
      if (result.continuationToken) {
        const parsedToken = parseCompositeQueryContinuationToken(result.continuationToken);
        expect(parsedToken.rangeMappings).toBeDefined();
      }
    });

    it("should correctly track offset and limit in continuation token", () => {
      const tokenManager = new ParallelQueryContinuationTokenManager(testCollectionLink);

      const rangesWithOffsetLimit = new Map<string, QueryRangeMapping>();
      rangesWithOffsetLimit.set("a", {
        itemCount: 5,
        continuationToken: "token-a",
        partitionKeyRange: createMockPartitionKeyRange("1", "00", "10"),
        offset: 10,
        limit: 50,
      });

      const result = tokenManager.paginateResults(
        5,
        false,
        createParallelQueryResult(rangesWithOffsetLimit),
      );
      expect(result.continuationToken).toBeDefined();

      const parsedToken = parseCompositeQueryContinuationToken(result.continuationToken!);
      expect(parsedToken.offset).toBe(10);
      expect(parsedToken.limit).toBe(50);
    });
  });

  describe("Token Parsing and Resumption", () => {
    it("should correctly resume from a serialized continuation token", () => {
      // Create an initial token
      const initialTokenManager = new ParallelQueryContinuationTokenManager(testCollectionLink);

      const initialRanges = new Map<string, QueryRangeMapping>();
      initialRanges.set("a", createRangeMapping("1", "00", "10", 5, "token-a"));
      initialRanges.set("b", createRangeMapping("2", "10", "20", 5, "token-b"));

      const result = initialTokenManager.paginateResults(
        10,
        false,
        createParallelQueryResult(initialRanges),
      );
      const serializedToken = result.continuationToken!;

      // Create a new token manager with the serialized token (simulating resume)
      const resumedTokenManager = new ParallelQueryContinuationTokenManager(
        testCollectionLink,
        serializedToken,
      );

      // Add more data and continue
      const newRanges = new Map<string, QueryRangeMapping>();
      newRanges.set("c", createRangeMapping("3", "20", "30", 5, "token-c"));

      const resumedResult = resumedTokenManager.paginateResults(
        5,
        false,
        createParallelQueryResult(newRanges),
      );

      expect(resumedResult.continuationToken).toBeDefined();
      const parsedToken = parseCompositeQueryContinuationToken(resumedResult.continuationToken!);

      // Resumed token should include newly observed range
      const hasRangeC = parsedToken.rangeMappings.some(
        (r) => r.queryRange.min === "20" && r.queryRange.max === "30",
      );
      expect(hasRangeC).toBe(true);
    });
  });
});

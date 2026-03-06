// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach } from "vitest";
import { BaseContinuationTokenManager } from "../../../../../src/queryExecutionContext/ContinuationTokenManager/BaseContinuationTokenManager.js";
import type { ParallelQueryResult } from "../../../../../src/queryExecutionContext/parallelQueryResult.js";
import type { PartitionRangeUpdates } from "../../../../../src/documents/ContinuationToken/PartitionRangeUpdate.js";
import type { QueryRangeWithContinuationToken } from "../../../../../src/documents/ContinuationToken/CompositeQueryContinuationToken.js";
import { QueryRange } from "../../../../../src/routing/QueryRange.js";

/**
 * Test implementation of BaseContinuationTokenManager for unit testing.
 * This implementation focuses on testing the partition range split/merge functionality.
 */
class TestContinuationTokenManager extends BaseContinuationTokenManager {
  constructor(_collectionLink: string, initialToken?: string) {
    super(initialToken);
  }

  // Implement required abstract methods for testing
  protected processRangesForPagination(
    _pageSize: number,
    _isResponseEmpty: boolean,
  ): { endIndex: number; processedRanges: string[] } {
    return { endIndex: 0, processedRanges: [] };
  }

  protected processQuerySpecificResponse(_responseResult: ParallelQueryResult): void {
    // No query-specific processing needed for these tests
  }

  protected performQuerySpecificDataTrim(_processedRanges: string[], _endIndex: number): void {
    // No query-specific cleanup needed for these tests
  }

  protected getCurrentContinuationToken(): any {
    return undefined; // No token for test implementation
  }

  protected getSerializationFunction(): (token: any) => string {
    return (token: any) => JSON.stringify(token); // Simple serialization for tests
  }

  // Expose rangeList for testing via getter
  public getRanges(): QueryRangeWithContinuationToken[] {
    return this.rangeList;
  }

  /**
   * Test helper to initialize ranges directly for partition range update testing.
   */
  public initializeTestRanges(ranges: QueryRangeWithContinuationToken[]): void {
    // Clear existing ranges and add new ones
    this.rangeList.splice(0, this.rangeList.length, ...ranges);
  }

  /**
   * Test helper to trigger partition range changes processing.
   * This simulates receiving updated continuation ranges in a query response.
   */
  public simulatePartitionRangeUpdates(updatedContinuationRanges: PartitionRangeUpdates): void {
    const mockResponseResult: ParallelQueryResult = {
      buffer: [],
      partitionKeyRangeMap: new Map(),
      updatedContinuationRanges,
    };

    // Use the public paginateResults method which will trigger the private processing
    this.paginateResults(100, false, mockResponseResult);
  }
}

describe("BaseContinuationTokenManager - Partition Range Split and Merge", () => {
  let tokenManager: TestContinuationTokenManager;
  const testCollectionLink = "dbs/testdb/colls/testcoll";

  beforeEach(() => {
    tokenManager = new TestContinuationTokenManager(testCollectionLink);
  });

  describe("Initial Setup with 5 Ranges", () => {
    it("should initialize with 5 partition ranges", () => {
      const initialRanges = createFivePartitionRanges();
      tokenManager.initializeTestRanges(initialRanges);

      const ranges = tokenManager.getRanges();
      expect(ranges).toHaveLength(5);
      expect(ranges[0].queryRange.min).toBe("");
      expect(ranges[0].queryRange.max).toBe("20");
      expect(ranges[4].queryRange.min).toBe("80");
      expect(ranges[4].queryRange.max).toBe("FF");
    });
  });

  describe("Partition Range Splits", () => {
    beforeEach(() => {
      const initialRanges = createFivePartitionRanges();
      tokenManager.initializeTestRanges(initialRanges);
    });

    const splitTestCases = [
      {
        name: "single range split",
        updates: {
          "single-split": {
            oldRange: new QueryRange("20", "40", true, false),
            newRanges: [
              new QueryRange("20", "30", true, false),
              new QueryRange("30", "40", true, false),
            ],
            continuationToken: "split-token",
          },
        },
        expectedTotalRanges: 6,
        expectedRemovedRanges: [{ min: "20", max: "40" }],
        expectedNewRanges: [
          { min: "20", max: "30", token: "split-token" },
          { min: "30", max: "40", token: "split-token" },
        ],
      },
      {
        name: "multiple simultaneous splits",
        updates: {
          split1: {
            oldRange: new QueryRange("20", "40", true, false),
            newRanges: [
              new QueryRange("20", "25", true, false),
              new QueryRange("25", "30", true, false),
              new QueryRange("30", "40", true, false),
            ],
            continuationToken: "multi-split-token1",
          },
          split2: {
            oldRange: new QueryRange("60", "80", true, false),
            newRanges: [
              new QueryRange("60", "70", true, false),
              new QueryRange("70", "80", true, false),
            ],
            continuationToken: "multi-split-token2",
          },
        },
        expectedTotalRanges: 8,
        expectedRemovedRanges: [
          { min: "20", max: "40" },
          { min: "60", max: "80" },
        ],
        expectedNewRanges: [
          { min: "20", max: "25", token: "multi-split-token1" },
          { min: "25", max: "30", token: "multi-split-token1" },
          { min: "30", max: "40", token: "multi-split-token1" },
          { min: "60", max: "70", token: "multi-split-token2" },
          { min: "70", max: "80", token: "multi-split-token2" },
        ],
      },
      {
        name: "range fragmentation",
        updates: {
          fragment: {
            oldRange: new QueryRange("20", "40", true, false),
            newRanges: [
              new QueryRange("20", "25", true, false),
              new QueryRange("25", "30", true, false),
              new QueryRange("30", "35", true, false),
              new QueryRange("35", "40", true, false),
            ],
            continuationToken: "fragment-token",
          },
        },
        expectedTotalRanges: 8,
        expectedRemovedRanges: [{ min: "20", max: "40" }],
        expectedNewRanges: [
          { min: "20", max: "25", token: "fragment-token" },
          { min: "25", max: "30", token: "fragment-token" },
          { min: "30", max: "35", token: "fragment-token" },
          { min: "35", max: "40", token: "fragment-token" },
        ],
      },
    ];

    splitTestCases.forEach(
      ({ name, updates, expectedTotalRanges, expectedRemovedRanges, expectedNewRanges }) => {
        it(`should handle ${name}`, () => {
          // Act
          tokenManager.simulatePartitionRangeUpdates(updates);

          // Assert
          const ranges = tokenManager.getRanges();
          expect(ranges).toHaveLength(expectedTotalRanges);

          // Verify removed ranges
          expectedRemovedRanges.forEach(({ min, max }) => {
            const removedRange = ranges.find(
              (r) => r.queryRange.min === min && r.queryRange.max === max,
            );
            expect(removedRange).toBeUndefined();
          });

          // Verify new ranges
          expectedNewRanges.forEach(({ min, max, token }) => {
            const newRange = ranges.find(
              (r) => r.queryRange.min === min && r.queryRange.max === max,
            );
            expect(newRange).toBeDefined();
            expect(newRange?.continuationToken).toBe(token);
          });
        });
      },
    );
  });

  describe("Partition Range Merges", () => {
    beforeEach(() => {
      const initialRanges = createFivePartitionRanges();
      tokenManager.initializeTestRanges(initialRanges);
    });

    const mergeTestCases = [
      {
        name: "single range expansion",
        updates: {
          expand: {
            oldRange: new QueryRange("20", "40", true, false),
            newRanges: [new QueryRange("15", "45", true, false)],
            continuationToken: "merge-token-expanded",
          },
        },
        expectedTotalRanges: 5,
        expectedRemovedRanges: [{ min: "20", max: "40" }],
        expectedNewRanges: [{ min: "15", max: "45", token: "merge-token-expanded" }],
      },
      {
        name: "multiple simultaneous merges",
        updates: {
          merge1: {
            oldRange: new QueryRange("", "20", true, false),
            newRanges: [new QueryRange("", "25", true, false)],
            continuationToken: "merge-token1",
          },
          merge2: {
            oldRange: new QueryRange("80", "FF", true, false),
            newRanges: [new QueryRange("75", "FF", true, false)],
            continuationToken: "merge-token2",
          },
        },
        expectedTotalRanges: 5,
        expectedRemovedRanges: [
          { min: "", max: "20" },
          { min: "80", max: "FF" },
        ],
        expectedNewRanges: [
          { min: "", max: "25", token: "merge-token1" },
          { min: "75", max: "FF", token: "merge-token2" },
        ],
      },
    ];

    mergeTestCases.forEach(
      ({ name, updates, expectedTotalRanges, expectedRemovedRanges, expectedNewRanges }) => {
        it(`should handle ${name}`, () => {
          // Act
          tokenManager.simulatePartitionRangeUpdates(updates);

          // Assert
          const ranges = tokenManager.getRanges();
          expect(ranges).toHaveLength(expectedTotalRanges);

          // Verify removed ranges
          expectedRemovedRanges.forEach(({ min, max }) => {
            const removedRange = ranges.find(
              (r) => r.queryRange.min === min && r.queryRange.max === max,
            );
            expect(removedRange).toBeUndefined();
          });

          // Verify new ranges
          expectedNewRanges.forEach(({ min, max, token }) => {
            const newRange = ranges.find(
              (r) => r.queryRange.min === min && r.queryRange.max === max,
            );
            expect(newRange).toBeDefined();
            expect(newRange?.continuationToken).toBe(token);
          });
        });
      },
    );
  });

  describe("Mixed Split and Merge Operations", () => {
    beforeEach(() => {
      const initialRanges = createFivePartitionRanges();
      tokenManager.initializeTestRanges(initialRanges);
    });

    it("should handle simultaneous splits and merges", () => {
      // Arrange: Complex scenario with both splits and merges
      const partitionRangeUpdates: PartitionRangeUpdates = {
        // Split range [20-40] into 2 parts
        "range2-split": {
          oldRange: new QueryRange("20", "40", true, false),
          newRanges: [
            new QueryRange("20", "30", true, false),
            new QueryRange("30", "40", true, false),
          ],
          continuationToken: "split-token",
        },
        // Merge range [60-80] into expanded range
        "range4-merge": {
          oldRange: new QueryRange("60", "80", true, false),
          newRanges: [new QueryRange("55", "85", true, false)],
          continuationToken: "merge-token",
        },
      };

      // Act
      tokenManager.simulatePartitionRangeUpdates(partitionRangeUpdates);

      // Assert
      const ranges = tokenManager.getRanges();
      expect(ranges).toHaveLength(6); // 5 original - 2 updated + 2 new from split + 1 merged = 6

      // Verify split results
      const splitRanges = ranges.filter((r) => r.continuationToken === "split-token");
      expect(splitRanges).toHaveLength(2);
      expect(
        splitRanges.find((r) => r.queryRange.min === "20" && r.queryRange.max === "30"),
      ).toBeDefined();
      expect(
        splitRanges.find((r) => r.queryRange.min === "30" && r.queryRange.max === "40"),
      ).toBeDefined();

      // Verify merge results
      const mergedRange = ranges.find(
        (r) => r.queryRange.min === "55" && r.queryRange.max === "85",
      );
      expect(mergedRange).toBeDefined();
      expect(mergedRange?.continuationToken).toBe("merge-token");

      // Verify unchanged ranges still exist
      expect(
        ranges.find((r) => r.queryRange.min === "" && r.queryRange.max === "20"),
      ).toBeDefined();
      expect(
        ranges.find((r) => r.queryRange.min === "40" && r.queryRange.max === "60"),
      ).toBeDefined();
    });
  });

  describe("Edge Cases and Error Scenarios", () => {
    beforeEach(() => {
      const initialRanges = createFivePartitionRanges();
      tokenManager.initializeTestRanges(initialRanges);
    });

    interface EdgeCaseTestCase {
      name: string;
      updates: PartitionRangeUpdates;
      expectedTotalRanges: number;
      expectedUnchanged?: boolean;
      expectedRemovedRanges?: Array<{ min: string; max: string }>;
      expectedNewRanges?: Array<{ min: string; max: string; token: string }>;
    }

    const edgeCaseTestCases: EdgeCaseTestCase[] = [
      {
        name: "empty partition range updates",
        updates: {},
        expectedTotalRanges: 5,
        expectedUnchanged: true,
      },
      {
        name: "range update with empty newRanges array",
        updates: {
          "empty-ranges": {
            oldRange: new QueryRange("", "20", true, false),
            newRanges: [] as QueryRange[],
            continuationToken: "empty-ranges-token",
          },
        },
        expectedTotalRanges: 4,
        expectedRemovedRanges: [{ min: "", max: "20" }],
      },
      {
        name: "nonexistent range update",
        updates: {
          nonexistent: {
            oldRange: new QueryRange("90", "95", true, false),
            newRanges: [new QueryRange("90", "A0", true, false)],
            continuationToken: "should-not-apply",
          },
        },
        expectedTotalRanges: 5,
        expectedUnchanged: true,
      },
    ];

    edgeCaseTestCases.forEach((testCase) => {
      const {
        name,
        updates,
        expectedTotalRanges,
        expectedUnchanged,
        expectedRemovedRanges,
        expectedNewRanges,
      } = testCase;
      it(`should handle ${name}`, () => {
        const originalRanges = tokenManager.getRanges();

        // Act
        tokenManager.simulatePartitionRangeUpdates(updates);

        // Assert
        const ranges = tokenManager.getRanges();
        expect(ranges).toHaveLength(expectedTotalRanges);

        if (expectedUnchanged) {
          expect(ranges).toEqual(originalRanges);
        } else {
          // Verify removed ranges
          expectedRemovedRanges?.forEach((removedRange) => {
            const { min, max } = removedRange;
            const foundRange = ranges.find(
              (r) => r.queryRange.min === min && r.queryRange.max === max,
            );
            expect(foundRange).toBeUndefined();
          });

          // Verify new ranges
          expectedNewRanges?.forEach((newRange) => {
            const { min, max, token } = newRange;
            const foundRange = ranges.find(
              (r) => r.queryRange.min === min && r.queryRange.max === max,
            );
            expect(foundRange).toBeDefined();
            expect(foundRange?.continuationToken).toBe(token);
          });
        }
      });
    });

    it("should preserve other ranges when specific ranges are updated", () => {
      // Arrange: Update only one range
      const partitionRangeUpdates: PartitionRangeUpdates = {
        "middle-range": {
          oldRange: new QueryRange("40", "60", true, false),
          newRanges: [
            new QueryRange("40", "50", true, false),
            new QueryRange("50", "60", true, false),
          ],
          continuationToken: "preserve-others-token",
        },
      };

      const originalRanges = tokenManager.getRanges();
      const unaffectedRanges = originalRanges.filter(
        (r) => !(r.queryRange.min === "40" && r.queryRange.max === "60"),
      );

      // Act
      tokenManager.simulatePartitionRangeUpdates(partitionRangeUpdates);

      // Assert
      const newRanges = tokenManager.getRanges();

      // Verify unaffected ranges are preserved
      unaffectedRanges.forEach((originalRange) => {
        const preservedRange = newRanges.find(
          (r) =>
            r.queryRange.min === originalRange.queryRange.min &&
            r.queryRange.max === originalRange.queryRange.max &&
            r.continuationToken === originalRange.continuationToken,
        );
        expect(preservedRange).toBeDefined();
      });

      // Verify the split happened
      const splitRanges = newRanges.filter((r) => r.continuationToken === "preserve-others-token");
      expect(splitRanges).toHaveLength(2);
    });
  });

  describe("Continuation Token Validation", () => {
    beforeEach(() => {
      const initialRanges = createFivePartitionRanges();
      tokenManager.initializeTestRanges(initialRanges);
    });

    const tokenTestCases = [
      {
        name: "splits with string token",
        updates: {
          "token-test": {
            oldRange: new QueryRange("20", "40", true, false),
            newRanges: [
              new QueryRange("20", "30", true, false),
              new QueryRange("30", "40", true, false),
            ],
            continuationToken: "test-continuation-token-12345",
          },
        },
        expectedTokenCount: 2,
        expectedToken: "test-continuation-token-12345",
      },
      {
        name: "merge with string token",
        updates: {
          "merge-token-test": {
            oldRange: new QueryRange("40", "60", true, false),
            newRanges: [new QueryRange("35", "65", true, false)],
            continuationToken: "merge-continuation-token-67890",
          },
        },
        expectedTokenCount: 1,
        expectedToken: "merge-continuation-token-67890",
      },
      {
        name: "complex JSON token format",
        updates: {
          "complex-token": {
            oldRange: new QueryRange("", "20", true, false),
            newRanges: [
              new QueryRange("", "10", true, false),
              new QueryRange("10", "20", true, false),
            ],
            continuationToken: '{"rid":"test","continuation":"complex-token-data","version":1}',
          },
        },
        expectedTokenCount: 2,
        expectedToken: '{"rid":"test","continuation":"complex-token-data","version":1}',
      },
    ];

    tokenTestCases.forEach(({ name, updates, expectedTokenCount, expectedToken }) => {
      it(`should correctly assign continuation tokens for ${name}`, () => {
        // Act
        tokenManager.simulatePartitionRangeUpdates(updates);

        // Assert
        const ranges = tokenManager.getRanges();
        const tokenRanges = ranges.filter(
          (r: QueryRangeWithContinuationToken) => r.continuationToken === expectedToken,
        );
        expect(tokenRanges).toHaveLength(expectedTokenCount);
        tokenRanges.forEach((range: QueryRangeWithContinuationToken) => {
          expect(range.continuationToken).toBe(expectedToken);
        });
      });
    });
  });

  describe("Sliding Window - Removing Finished Ranges", () => {
    /**
     * These tests validate the fix from PR #36765 which ensures that finished/exhausted
     * partition key ranges are properly removed from continuation tokens using the sliding window approach.
     */

    /**
     * Extended test implementation that tracks processed ranges for sliding window tests.
     */
    class SlidingWindowTestManager extends TestContinuationTokenManager {
      private processedRangesTracking: string[][] = [];
      private returnedProcessedRanges: string[] = [];

      protected override processRangesForPagination(
        pageSize: number,
        _isResponseEmpty: boolean,
      ): { endIndex: number; processedRanges: string[] } {
        // Simulate processing ranges - use the processed ranges set by test
        const result = {
          endIndex: pageSize,
          processedRanges: this.returnedProcessedRanges,
        };
        this.processedRangesTracking.push([...this.returnedProcessedRanges]);
        return result;
      }

      public setProcessedRanges(ranges: string[]): void {
        this.returnedProcessedRanges = ranges;
      }

      public getProcessedRangesHistory(): string[][] {
        return this.processedRangesTracking;
      }

      public hasUnprocessedRanges(): boolean {
        return this.partitionManager.hasUnprocessedRanges();
      }
    }

    beforeEach(() => {
      tokenManager = new TestContinuationTokenManager(testCollectionLink);
    });

    it("should remove single finished range from sliding window", () => {
      // Arrange: Create a manager with partition ranges
      const manager = new SlidingWindowTestManager(testCollectionLink);
      const rangeMap = new Map([
        ["range1", { itemCount: 10, continuationToken: "token1", partitionKeyRange: null }],
        ["range2", { itemCount: 5, continuationToken: "token2", partitionKeyRange: null }],
        ["range3", { itemCount: 15, continuationToken: "token3", partitionKeyRange: null }],
      ]);

      const mockResponse: ParallelQueryResult = {
        buffer: [],
        partitionKeyRangeMap: rangeMap,
      };

      // Act: Process first page - range1 completes
      manager.setProcessedRanges(["range1"]);
      manager.paginateResults(10, false, mockResponse);

      // Assert: range1 should be removed from sliding window
      expect(manager.hasUnprocessedRanges()).toBe(true); // range2 and range3 remain
      const history = manager.getProcessedRangesHistory();
      expect(history[0]).toEqual(["range1"]);
    });

    it("should remove intermediate finished range from sliding window", () => {
      // Arrange: Three ranges where the middle one finishes
      const manager = new SlidingWindowTestManager(testCollectionLink);
      const rangeMap = new Map([
        ["range1", { itemCount: 10, continuationToken: "token1", partitionKeyRange: null }],
        ["range2", { itemCount: 5, continuationToken: "token2", partitionKeyRange: null }],
        ["range3", { itemCount: 15, continuationToken: "token3", partitionKeyRange: null }],
      ]);

      const mockResponse: ParallelQueryResult = {
        buffer: [],
        partitionKeyRangeMap: rangeMap,
      };

      // Act: Process ranges - range1 and range2 complete (intermediate range2 finishes)
      manager.setProcessedRanges(["range1", "range2"]);
      manager.paginateResults(15, false, mockResponse);

      // Assert: Both range1 and range2 removed, only range3 remains
      expect(manager.hasUnprocessedRanges()).toBe(true); // range3 still there
      const history = manager.getProcessedRangesHistory();
      expect(history[0]).toEqual(["range1", "range2"]);
    });

    it("should handle multiple intermediate ranges finishing", () => {
      // Arrange: Five ranges where ranges 2, 3, and 4 (intermediate) finish
      const manager = new SlidingWindowTestManager(testCollectionLink);
      const rangeMap = new Map([
        ["range1", { itemCount: 10, continuationToken: "token1", partitionKeyRange: null }],
        ["range2", { itemCount: 5, continuationToken: "token2", partitionKeyRange: null }],
        ["range3", { itemCount: 8, continuationToken: "token3", partitionKeyRange: null }],
        ["range4", { itemCount: 12, continuationToken: "token4", partitionKeyRange: null }],
        ["range5", { itemCount: 20, continuationToken: "token5", partitionKeyRange: null }],
      ]);

      const mockResponse: ParallelQueryResult = {
        buffer: [],
        partitionKeyRangeMap: rangeMap,
      };

      // Act: First page processes range1, range2, range3, range4
      manager.setProcessedRanges(["range1", "range2", "range3", "range4"]);
      manager.paginateResults(35, false, mockResponse);

      // Assert: Four ranges removed, only range5 remains
      expect(manager.hasUnprocessedRanges()).toBe(true);
      const history = manager.getProcessedRangesHistory();
      expect(history[0]).toEqual(["range1", "range2", "range3", "range4"]);
    });

    it("should remove all ranges when all finish", () => {
      // Arrange
      const manager = new SlidingWindowTestManager(testCollectionLink);
      const rangeMap = new Map([
        ["range1", { itemCount: 10, continuationToken: "token1", partitionKeyRange: null }],
        ["range2", { itemCount: 5, continuationToken: "token2", partitionKeyRange: null }],
      ]);

      const mockResponse: ParallelQueryResult = {
        buffer: [],
        partitionKeyRangeMap: rangeMap,
      };

      // Act: All ranges finish
      manager.setProcessedRanges(["range1", "range2"]);
      manager.paginateResults(15, false, mockResponse);

      // Assert: No unprocessed ranges remain
      expect(manager.hasUnprocessedRanges()).toBe(false);
    });

    it("should handle sequential processing of ranges with sliding window", () => {
      // Arrange: Simulate multiple pages where ranges finish one by one
      const manager = new SlidingWindowTestManager(testCollectionLink);

      // First batch of ranges
      const rangeMap1 = new Map([
        ["range1", { itemCount: 10, continuationToken: "token1", partitionKeyRange: null }],
        ["range2", { itemCount: 5, continuationToken: "token2", partitionKeyRange: null }],
        ["range3", { itemCount: 15, continuationToken: "token3", partitionKeyRange: null }],
      ]);

      const mockResponse1: ParallelQueryResult = {
        buffer: [],
        partitionKeyRangeMap: rangeMap1,
      };

      // Act: First page - range1 finishes
      manager.setProcessedRanges(["range1"]);
      manager.paginateResults(10, false, mockResponse1);

      // Assert after first page
      expect(manager.hasUnprocessedRanges()).toBe(true);

      // Act: Second page - range2 finishes
      manager.setProcessedRanges(["range2"]);
      manager.paginateResults(5, false);

      // Assert after second page
      expect(manager.hasUnprocessedRanges()).toBe(true);

      // Act: Third page - range3 finishes
      manager.setProcessedRanges(["range3"]);
      manager.paginateResults(15, false);

      // Assert after third page - all ranges processed
      expect(manager.hasUnprocessedRanges()).toBe(false);

      // Verify history
      const history = manager.getProcessedRangesHistory();
      expect(history).toHaveLength(3);
      expect(history[0]).toEqual(["range1"]);
      expect(history[1]).toEqual(["range2"]);
      expect(history[2]).toEqual(["range3"]);
    });

    it("should not keep exhausted ranges with null continuation tokens", () => {
      // Arrange: Ranges with null continuation tokens (exhausted)
      const manager = new SlidingWindowTestManager(testCollectionLink);
      const initialRanges: QueryRangeWithContinuationToken[] = [
        { queryRange: { min: "", max: "20" }, continuationToken: "token1" },
        { queryRange: { min: "20", max: "40" }, continuationToken: null as any }, // Exhausted
        { queryRange: { min: "40", max: "60" }, continuationToken: "token3" },
      ];
      manager.initializeTestRanges(initialRanges);

      // Act: Paginate results which should remove exhausted ranges
      manager.paginateResults(10, false);

      // Assert: Exhausted range should be filtered out
      const remainingRanges = manager.getRanges();
      expect(remainingRanges).toHaveLength(2);
      expect(remainingRanges.find((r) => r.queryRange.min === "20")).toBeUndefined();
    });

    it("should not keep exhausted ranges with empty string continuation tokens", () => {
      // Arrange: Ranges with empty string continuation tokens (exhausted)
      const manager = new SlidingWindowTestManager(testCollectionLink);
      const initialRanges: QueryRangeWithContinuationToken[] = [
        { queryRange: { min: "", max: "20" }, continuationToken: "token1" },
        { queryRange: { min: "20", max: "40" }, continuationToken: "" }, // Exhausted
        { queryRange: { min: "40", max: "60" }, continuationToken: "token3" },
      ];
      manager.initializeTestRanges(initialRanges);

      // Act: Paginate results
      manager.paginateResults(10, false);

      // Assert: Exhausted range removed
      const remainingRanges = manager.getRanges();
      expect(remainingRanges).toHaveLength(2);
      expect(remainingRanges.find((r) => r.queryRange.min === "20")).toBeUndefined();
    });

    it("should not keep exhausted ranges with 'null' string continuation tokens", () => {
      // Arrange: Ranges with "null" string continuation tokens (exhausted)
      const manager = new SlidingWindowTestManager(testCollectionLink);
      const initialRanges: QueryRangeWithContinuationToken[] = [
        { queryRange: { min: "", max: "20" }, continuationToken: "token1" },
        { queryRange: { min: "20", max: "40" }, continuationToken: "null" }, // Exhausted
        { queryRange: { min: "40", max: "60" }, continuationToken: "NULL" }, // Exhausted (case insensitive)
        { queryRange: { min: "60", max: "80" }, continuationToken: "token4" },
      ];
      manager.initializeTestRanges(initialRanges);

      // Act: Paginate results
      manager.paginateResults(10, false);

      // Assert: Both exhausted ranges removed
      const remainingRanges = manager.getRanges();
      expect(remainingRanges).toHaveLength(2);
      expect(remainingRanges.find((r) => r.queryRange.min === "20")).toBeUndefined();
      expect(remainingRanges.find((r) => r.queryRange.min === "40")).toBeUndefined();
    });

    it("should advance sliding window correctly with mixed exhausted and active ranges", () => {
      // Arrange: Mix of exhausted and active ranges
      const manager = new SlidingWindowTestManager(testCollectionLink);
      const initialRanges: QueryRangeWithContinuationToken[] = [
        { queryRange: { min: "", max: "10" }, continuationToken: null as any }, // Exhausted
        { queryRange: { min: "10", max: "20" }, continuationToken: "token2" }, // Active
        { queryRange: { min: "20", max: "30" }, continuationToken: "" }, // Exhausted
        { queryRange: { min: "30", max: "40" }, continuationToken: "token4" }, // Active
        { queryRange: { min: "40", max: "50" }, continuationToken: "null" }, // Exhausted
      ];
      manager.initializeTestRanges(initialRanges);

      // Act: Paginate to remove exhausted ranges
      manager.paginateResults(10, false);

      // Assert: Only active ranges remain
      const remainingRanges = manager.getRanges();
      expect(remainingRanges).toHaveLength(2);
      expect(remainingRanges[0].queryRange.min).toBe("10");
      expect(remainingRanges[0].continuationToken).toBe("token2");
      expect(remainingRanges[1].queryRange.min).toBe("30");
      expect(remainingRanges[1].continuationToken).toBe("token4");
    });
  });

  /**
   * Helper function to create initial set of 5 partition ranges for testing
   */
  function createFivePartitionRanges(): QueryRangeWithContinuationToken[] {
    return [
      {
        queryRange: { min: "", max: "20" },
        continuationToken: "token-range1",
      },
      {
        queryRange: { min: "20", max: "40" },
        continuationToken: "token-range2",
      },
      {
        queryRange: { min: "40", max: "60" },
        continuationToken: "token-range3",
      },
      {
        queryRange: { min: "60", max: "80" },
        continuationToken: "token-range4",
      },
      {
        queryRange: { min: "80", max: "FF" },
        continuationToken: "token-range5",
      },
    ];
  }
});

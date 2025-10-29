// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach } from "vitest";
import { BaseContinuationTokenManager } from "../../../../../src/queryExecutionContext/ContinuationTokenManager/BaseContinuationTokenManager.js";
import type {
  QueryResponseResult,
} from "../../../../../src/queryExecutionContext/ContinuationTokenManager/BaseContinuationTokenManager.js";
import type {
  PartitionRangeUpdate,
  PartitionRangeUpdates,
} from "../../../../../src/documents/ContinuationToken/PartitionRangeUpdate.js";
import type { QueryRangeWithContinuationToken } from "../../../../../src/documents/ContinuationToken/CompositeQueryContinuationToken.js";
import { QueryRange } from "../../../../../src/routing/QueryRange.js";

/**
 * Test implementation of BaseContinuationTokenManager for unit testing
 */
class TestContinuationTokenManager extends BaseContinuationTokenManager {
  constructor(collectionLink: string, initialRanges?: QueryRangeWithContinuationToken[]) {
    super(collectionLink, false);
    if (initialRanges) {
      this.ranges = [...initialRanges];
    }
  }

  protected initializeFromToken(_token: string): void {
    // Test implementation - not needed for these tests
  }

  public createContinuationToken(
    _pageSize: number,
    _isResponseEmpty: boolean,
    _responseResult?: QueryResponseResult,
  ): {
    endIndex: number;
    processedRanges: string[];
    continuationToken?: string;
  } {
    // Simple test implementation
    return {
      endIndex: 0,
      processedRanges: [],
      continuationToken: undefined,
    };
  }

  // Expose protected methods for testing
  public testProcessResponseResult(responseResult: QueryResponseResult): void {
    this.processResponseResult(responseResult);
  }

  public testHandlePartitionRangeChanges(updatedContinuationRanges: PartitionRangeUpdates): void {
    this.handlePartitionRangeChanges(updatedContinuationRanges);
  }

  public testProcessRangeChange(rangeKey: string, rangeChange: PartitionRangeUpdate): void {
    this.processRangeChange(rangeKey, rangeChange);
  }

  public getRanges(): QueryRangeWithContinuationToken[] {
    return this.ranges;
  }

  public setRanges(ranges: QueryRangeWithContinuationToken[]): void {
    this.ranges = ranges;
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
      tokenManager.setRanges(initialRanges);

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
      tokenManager.setRanges(initialRanges);
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
          "split1": {
            oldRange: new QueryRange("20", "40", true, false),
            newRanges: [
              new QueryRange("20", "25", true, false),
              new QueryRange("25", "30", true, false),
              new QueryRange("30", "40", true, false),
            ],
            continuationToken: "multi-split-token1",
          },
          "split2": {
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
          "fragment": {
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

    splitTestCases.forEach(({ name, updates, expectedTotalRanges, expectedRemovedRanges, expectedNewRanges }) => {
      it(`should handle ${name}`, () => {
        // Act
        tokenManager.testHandlePartitionRangeChanges(updates);

        // Assert
        const ranges = tokenManager.getRanges();
        expect(ranges).toHaveLength(expectedTotalRanges);

        // Verify removed ranges
        expectedRemovedRanges.forEach(({ min, max }) => {
          const removedRange = ranges.find(r => r.queryRange.min === min && r.queryRange.max === max);
          expect(removedRange).toBeUndefined();
        });

        // Verify new ranges
        expectedNewRanges.forEach(({ min, max, token }) => {
          const newRange = ranges.find(r => r.queryRange.min === min && r.queryRange.max === max);
          expect(newRange).toBeDefined();
          expect(newRange?.continuationToken).toBe(token);
        });
      });
    });
  });

  describe("Partition Range Merges", () => {
    beforeEach(() => {
      const initialRanges = createFivePartitionRanges();
      tokenManager.setRanges(initialRanges);
    });

    const mergeTestCases = [
      {
        name: "single range expansion",
        updates: {
          "expand": {
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
          "merge1": {
            oldRange: new QueryRange("", "20", true, false),
            newRanges: [new QueryRange("", "25", true, false)],
            continuationToken: "merge-token1",
          },
          "merge2": {
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

    mergeTestCases.forEach(({ name, updates, expectedTotalRanges, expectedRemovedRanges, expectedNewRanges }) => {
      it(`should handle ${name}`, () => {
        // Act
        tokenManager.testHandlePartitionRangeChanges(updates);

        // Assert
        const ranges = tokenManager.getRanges();
        expect(ranges).toHaveLength(expectedTotalRanges);

        // Verify removed ranges
        expectedRemovedRanges.forEach(({ min, max }) => {
          const removedRange = ranges.find(r => r.queryRange.min === min && r.queryRange.max === max);
          expect(removedRange).toBeUndefined();
        });

        // Verify new ranges
        expectedNewRanges.forEach(({ min, max, token }) => {
          const newRange = ranges.find(r => r.queryRange.min === min && r.queryRange.max === max);
          expect(newRange).toBeDefined();
          expect(newRange?.continuationToken).toBe(token);
        });
      });
    });
  });

  describe("Mixed Split and Merge Operations", () => {
    beforeEach(() => {
      const initialRanges = createFivePartitionRanges();
      tokenManager.setRanges(initialRanges);
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
          newRanges: [
            new QueryRange("55", "85", true, false),
          ],
          continuationToken: "merge-token",
        },
      };

      // Act
      tokenManager.testHandlePartitionRangeChanges(partitionRangeUpdates);

      // Assert
      const ranges = tokenManager.getRanges();
      expect(ranges).toHaveLength(6); // 5 original - 2 updated + 2 new from split + 1 merged = 6

      // Verify split results
      const splitRanges = ranges.filter(r => r.continuationToken === "split-token");
      expect(splitRanges).toHaveLength(2);
      expect(splitRanges.find(r => r.queryRange.min === "20" && r.queryRange.max === "30")).toBeDefined();
      expect(splitRanges.find(r => r.queryRange.min === "30" && r.queryRange.max === "40")).toBeDefined();

      // Verify merge results
      const mergedRange = ranges.find(r => r.queryRange.min === "55" && r.queryRange.max === "85");
      expect(mergedRange).toBeDefined();
      expect(mergedRange?.continuationToken).toBe("merge-token");

      // Verify unchanged ranges still exist
      expect(ranges.find(r => r.queryRange.min === "" && r.queryRange.max === "20")).toBeDefined();
      expect(ranges.find(r => r.queryRange.min === "40" && r.queryRange.max === "60")).toBeDefined();
    });
  });

  describe("Edge Cases and Error Scenarios", () => {
    beforeEach(() => {
      const initialRanges = createFivePartitionRanges();
      tokenManager.setRanges(initialRanges);
    });

    describe("Edge Cases and Error Scenarios", () => {
      beforeEach(() => {
        const initialRanges = createFivePartitionRanges();
        tokenManager.setRanges(initialRanges);
      });

      const edgeCaseTestCases = [
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
            "nonexistent": {
              oldRange: new QueryRange("90", "95", true, false),
              newRanges: [new QueryRange("90", "A0", true, false)],
              continuationToken: "should-not-apply",
            },
          },
          expectedTotalRanges: 5,
          expectedUnchanged: true,
        },
        {
          name: "range boundaries with special characters",
          updates: {
            "special-chars": {
              oldRange: new QueryRange("80", "FF", true, false),
              newRanges: [
                new QueryRange("80", "A0", true, false),
                new QueryRange("A0", "FF", true, false),
              ],
              continuationToken: "special-boundary-token",
            },
          },
          expectedTotalRanges: 6,
          expectedRemovedRanges: [{ min: "80", max: "FF" }],
          expectedNewRanges: [
            { min: "80", max: "A0", token: "special-boundary-token" },
            { min: "A0", max: "FF", token: "special-boundary-token" },
          ],
        },
      ];

      edgeCaseTestCases.forEach(({ name, updates, expectedTotalRanges, expectedUnchanged, expectedRemovedRanges, expectedNewRanges }) => {
        it(`should handle ${name}`, () => {
          const originalRanges = tokenManager.getRanges();

          // Act
          tokenManager.testHandlePartitionRangeChanges(updates);

          // Assert
          const ranges = tokenManager.getRanges();
          expect(ranges).toHaveLength(expectedTotalRanges);

          if (expectedUnchanged) {
            expect(ranges).toEqual(originalRanges);
          } else {
            // Verify removed ranges
            expectedRemovedRanges?.forEach(({ min, max }) => {
              const removedRange = ranges.find(r => r.queryRange.min === min && r.queryRange.max === max);
              expect(removedRange).toBeUndefined();
            });

            // Verify new ranges
            expectedNewRanges?.forEach(({ min, max, token }) => {
              const newRange = ranges.find(r => r.queryRange.min === min && r.queryRange.max === max);
              expect(newRange).toBeDefined();
              expect(newRange?.continuationToken).toBe(token);
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
        const unaffectedRanges = originalRanges.filter(r =>
          !(r.queryRange.min === "40" && r.queryRange.max === "60")
        );

        // Act
        tokenManager.testHandlePartitionRangeChanges(partitionRangeUpdates);

        // Assert
        const newRanges = tokenManager.getRanges();

        // Verify unaffected ranges are preserved
        unaffectedRanges.forEach(originalRange => {
          const preservedRange = newRanges.find(r =>
            r.queryRange.min === originalRange.queryRange.min &&
            r.queryRange.max === originalRange.queryRange.max &&
            r.continuationToken === originalRange.continuationToken
          );
          expect(preservedRange).toBeDefined();
        });

        // Verify the split happened
        const splitRanges = newRanges.filter(r => r.continuationToken === "preserve-others-token");
        expect(splitRanges).toHaveLength(2);
      });
    });

    it("should handle range boundaries with special characters", () => {
      // Arrange: Test with boundary cases
      const partitionRangeUpdates: PartitionRangeUpdates = {
        "special-chars": {
          oldRange: new QueryRange("80", "FF", true, false),
          newRanges: [
            new QueryRange("80", "A0", true, false),
            new QueryRange("A0", "FF", true, false),
          ],
          continuationToken: "special-boundary-token",
        },
      };

      // Act
      tokenManager.testHandlePartitionRangeChanges(partitionRangeUpdates);

      // Assert
      const ranges = tokenManager.getRanges();
      const specialRanges = ranges.filter(r => r.continuationToken === "special-boundary-token");
      expect(specialRanges).toHaveLength(2);
      expect(specialRanges.find(r => r.queryRange.min === "80" && r.queryRange.max === "A0")).toBeDefined();
      expect(specialRanges.find(r => r.queryRange.min === "A0" && r.queryRange.max === "FF")).toBeDefined();
    });
  });

  describe("Continuation Token Validation", () => {
    beforeEach(() => {
      const initialRanges = createFivePartitionRanges();
      tokenManager.setRanges(initialRanges);
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
        tokenManager.testHandlePartitionRangeChanges(updates);

        // Assert
        const ranges = tokenManager.getRanges();
        const tokenRanges = ranges.filter(r => r.continuationToken === expectedToken);
        expect(tokenRanges).toHaveLength(expectedTokenCount);
        tokenRanges.forEach(range => {
          expect(range.continuationToken).toBe(expectedToken);
        });
      });
    });
  });
});

/**
 * Helper function to create initial set of 5 partition ranges for testing
 */
function createFivePartitionRanges(): QueryRangeWithContinuationToken[] {
  return [
    {
      queryRange: new QueryRange("", "20", true, false),
      continuationToken: "token-range1",
    },
    {
      queryRange: new QueryRange("20", "40", true, false),
      continuationToken: "token-range2",
    },
    {
      queryRange: new QueryRange("40", "60", true, false),
      continuationToken: "token-range3",
    },
    {
      queryRange: new QueryRange("60", "80", true, false),
      continuationToken: "token-range4",
    },
    {
      queryRange: new QueryRange("80", "FF", true, false),
      continuationToken: "token-range5",
    },
  ];
}

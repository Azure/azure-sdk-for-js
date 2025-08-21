// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, beforeEach } from "vitest";
import { ParallelQueryRangeStrategy } from "../../../../src/queryExecutionContext/ParallelQueryRangeStrategy.js";
import type { PartitionKeyRange } from "../../../../src/index.js";

describe("ParallelQueryRangeStrategy", () => {
  let strategy: ParallelQueryRangeStrategy;
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
    strategy = new ParallelQueryRangeStrategy();
    mockPartitionRanges = [
      createMockPartitionKeyRange("0", "", "AA"),
      createMockPartitionKeyRange("1", "AA", "BB"),
      createMockPartitionKeyRange("2", "BB", "FF"),
      createMockPartitionKeyRange("3", "FF", "ZZ"),
    ];
  });

  describe("getStrategyType", () => {
    it("should return ParallelQuery strategy type", () => {
      assert.equal(strategy.getStrategyType(), "ParallelQuery");
    });
  });

  describe("validateContinuationToken", () => {
    it("should validate valid composite continuation token", () => {
      const validToken = JSON.stringify({
        rangeMappings: [
          {
            partitionKeyRange: { id: "1", minInclusive: "AA", maxExclusive: "BB" },
            continuationToken: "mock-token",
            itemCount: 5,
          }
        ]
      });

      assert.isTrue(strategy.validateContinuationToken(validToken));
    });

    it("should reject invalid JSON", () => {
      const invalidToken = "{ invalid json";
      assert.isFalse(strategy.validateContinuationToken(invalidToken));
    });

    it("should reject token without rangeMappings", () => {
      const invalidToken = JSON.stringify({
        someOtherProperty: "value"
      });
      assert.isFalse(strategy.validateContinuationToken(invalidToken));
    });

    it("should reject token with non-array rangeMappings", () => {
      const invalidToken = JSON.stringify({
        rangeMappings: "not-an-array"
      });
      assert.isFalse(strategy.validateContinuationToken(invalidToken));
    });

    it("should validate empty rangeMappings array", () => {
      const validToken = JSON.stringify({
        rangeMappings: []
      });
      assert.isTrue(strategy.validateContinuationToken(validToken));
    });

    it("should reject null or undefined token", () => {
      assert.isFalse(strategy.validateContinuationToken(null as any));
      assert.isFalse(strategy.validateContinuationToken(undefined as any));
    });

    it("should reject empty string token", () => {
      assert.isFalse(strategy.validateContinuationToken(""));
    });
  });

  describe("filterPartitionRanges - No Continuation Token", () => {
    it("should return all ranges when no continuation token is provided", async () => {
      const result = await strategy.filterPartitionRanges(mockPartitionRanges);

      assert.deepEqual(result.filteredRanges, mockPartitionRanges);
      assert.isUndefined(result.continuationToken);
    });

    it("should handle empty target ranges", async () => {
      const result = await strategy.filterPartitionRanges([]);

      assert.deepEqual(result.filteredRanges, []);
      assert.isUndefined(result.continuationToken);
    });

    it("should handle null target ranges", async () => {
      const result = await strategy.filterPartitionRanges(null as any);

      assert.deepEqual(result.filteredRanges, []);
      assert.isUndefined(result.continuationToken);
    });
  });

  describe("filterPartitionRanges - With Continuation Token", () => {
    it("should filter ranges based on continuation token", async () => {
      const continuationToken = JSON.stringify({
        rangeMappings: [
          {
            partitionKeyRange: { 
              id: "1", 
              minInclusive: "AA", 
              maxExclusive: "BB",
              ridPrefix: 1,
              throughputFraction: 1.0,
              status: "Online",
              parents: []
            },
            continuationToken: "mock-token-1",
            itemCount: 3,
          },
          {
            partitionKeyRange: { 
              id: "2", 
              minInclusive: "BB", 
              maxExclusive: "FF",
              ridPrefix: 2,
              throughputFraction: 1.0,
              status: "Online",
              parents: []
            },
            continuationToken: "mock-token-2",
            itemCount: 7,
          }
        ]
      });

      const result = await strategy.filterPartitionRanges(mockPartitionRanges, continuationToken);

      // Should include ranges from continuation token plus target ranges after the last one
      assert.equal(result.filteredRanges.length, 3); // 2 from token + 1 target range after
      assert.equal(result.continuationToken?.length, 3);
      
      // First two should be from continuation token
      assert.equal(result.filteredRanges[0].id, "1");
      assert.equal(result.filteredRanges[1].id, "2");
      // Third should be the target range after the last continuation token range
      assert.equal(result.filteredRanges[2].id, "3"); // Range "FF" to "ZZ"
      
      // Continuation tokens should match
      assert.equal(result.continuationToken?.[0], "mock-token-1");
      assert.equal(result.continuationToken?.[1], "mock-token-2");
      assert.isUndefined(result.continuationToken?.[2]); // New range has no continuation token
    });

    it("should exclude exhausted partitions", async () => {
      const continuationToken = JSON.stringify({
        rangeMappings: [
          {
            partitionKeyRange: { 
              id: "1", 
              minInclusive: "AA", 
              maxExclusive: "BB",
              ridPrefix: 1,
              throughputFraction: 1.0,
              status: "Online",
              parents: []
            },
            continuationToken: "mock-token-1",
            itemCount: 3,
          },
          {
            partitionKeyRange: { 
              id: "2", 
              minInclusive: "BB", 
              maxExclusive: "FF",
              ridPrefix: 2,
              throughputFraction: 1.0,
              status: "Online",
              parents: []
            },
            continuationToken: null, // Exhausted partition
            itemCount: 0,
          }
        ]
      });

      const result = await strategy.filterPartitionRanges(mockPartitionRanges, continuationToken);

      // Should only include non-exhausted ranges from continuation token plus target ranges after
      assert.equal(result.filteredRanges.length, 2); // 1 from token + 1 target range after
      assert.equal(result.filteredRanges[0].id, "1");
      assert.equal(result.filteredRanges[1].id, "3"); // Next target range after "FF"
    });

    it("should handle different exhausted token formats", async () => {
      const exhaustedFormats = ["", "null", "NULL", "Null"];
      
      for (const exhaustedToken of exhaustedFormats) {
        const continuationToken = JSON.stringify({
          rangeMappings: [
            {
              partitionKeyRange: { 
                id: "1", 
                minInclusive: "AA", 
                maxExclusive: "BB",
                ridPrefix: 1,
                throughputFraction: 1.0,
                status: "Online",
                parents: []
              },
              continuationToken: exhaustedToken,
            }
          ]
        });

        const result = await strategy.filterPartitionRanges(mockPartitionRanges, continuationToken);

        // Should skip exhausted partition and include all target ranges
        assert.equal(result.filteredRanges.length, 2); // All target ranges since no valid continuation
        assert.deepEqual(result.filteredRanges, mockPartitionRanges);
      }
    });

    it("should sort ranges by minInclusive before processing", async () => {
      // Create continuation token with unsorted ranges
      const continuationToken = JSON.stringify({
        rangeMappings: [
          {
            partitionKeyRange: { 
              id: "2", 
              minInclusive: "BB", 
              maxExclusive: "FF",
              ridPrefix: 2,
              throughputFraction: 1.0,
              status: "Online",
              parents: []
            },
            continuationToken: "mock-token-2",
            itemCount: 7,
          },
          {
            partitionKeyRange: { 
              id: "1", 
              minInclusive: "AA", 
              maxExclusive: "BB",
              ridPrefix: 1,
              throughputFraction: 1.0,
              status: "Online",
              parents: []
            },
            continuationToken: "mock-token-1",
            itemCount: 3,
          }
        ]
      });

      const result = await strategy.filterPartitionRanges(mockPartitionRanges, continuationToken);

      // Should be sorted by minInclusive: "AA" before "BB"
      assert.equal(result.filteredRanges[0].id, "1"); // AA-BB
      assert.equal(result.filteredRanges[1].id, "2"); // BB-FF
      assert.equal(result.continuationToken?.[0], "mock-token-1");
      assert.equal(result.continuationToken?.[1], "mock-token-2");
    });

    it("should add target ranges after last filtered range", async () => {
      const continuationToken = JSON.stringify({
        rangeMappings: [
          {
            partitionKeyRange: { 
              id: "0", 
              minInclusive: "", 
              maxExclusive: "AA",
              ridPrefix: 0,
              throughputFraction: 1.0,
              status: "Online",
              parents: []
            },
            continuationToken: "mock-token-0",
            itemCount: 5,
          }
        ]
      });

      const result = await strategy.filterPartitionRanges(mockPartitionRanges, continuationToken);

      // Should include continuation range plus all target ranges after it
      assert.equal(result.filteredRanges.length, 4); // 1 from token + 3 target ranges after
      assert.equal(result.filteredRanges[0].id, "0"); // From continuation token
      assert.equal(result.filteredRanges[1].id, "1"); // AA-BB (after "" to "AA")
      assert.equal(result.filteredRanges[2].id, "2"); // BB-FF
      assert.equal(result.filteredRanges[3].id, "3"); // FF-ZZ
    });

    it("should not add target ranges that overlap or come before last filtered range", async () => {
      // Create a continuation token with a range that goes beyond some target ranges
      const continuationToken = JSON.stringify({
        rangeMappings: [
          {
            partitionKeyRange: { 
              id: "big-range", 
              minInclusive: "AA", 
              maxExclusive: "GG", // Goes beyond "FF"
              ridPrefix: 99,
              throughputFraction: 1.0,
              status: "Online",
              parents: []
            },
            continuationToken: "mock-token-big",
            itemCount: 10,
          }
        ]
      });

      const result = await strategy.filterPartitionRanges(mockPartitionRanges, continuationToken);

      // Should include continuation range plus only target ranges that start at or after "GG"
      assert.equal(result.filteredRanges.length, 1); // Only the continuation token range
      assert.equal(result.filteredRanges[0].id, "big-range");
      
      // No target ranges should be added since none start at or after "GG"
      assert.equal(result.continuationToken?.length, 1);
    });

    it("should handle empty continuation token rangeMappings", async () => {
      const continuationToken = JSON.stringify({
        rangeMappings: []
      });

      const result = await strategy.filterPartitionRanges(mockPartitionRanges, continuationToken);

      // Should return all target ranges since no continuation ranges
      assert.deepEqual(result.filteredRanges, mockPartitionRanges);
      assert.equal(result.continuationToken?.length, 4);
      result.continuationToken?.forEach(token => assert.isUndefined(token));
    });
  });

  describe("Error Handling", () => {
    it("should throw error for invalid continuation token format", async () => {
      const invalidToken = "invalid-json";

      await expect(
        strategy.filterPartitionRanges(mockPartitionRanges, invalidToken)
      ).rejects.toThrow("Invalid continuation token format for parallel query strategy");
    });

    it("should throw error for malformed composite continuation token", async () => {
      const malformedToken = JSON.stringify({
        rangeMappings: [
          {
            // Missing required fields
            partitionKeyRange: null,
            continuationToken: "token",
          }
        ]
      });

      await expect(
        strategy.filterPartitionRanges(mockPartitionRanges, malformedToken)
      ).rejects.toThrow("Failed to parse composite continuation token");
    });

    it("should handle missing optional fields in partition key range", async () => {
      const continuationToken = JSON.stringify({
        rangeMappings: [
          {
            partitionKeyRange: { 
              id: "minimal", 
              minInclusive: "AA", 
              maxExclusive: "BB"
              // Missing optional fields
            },
            continuationToken: "mock-token",
            itemCount: 3,
          }
        ]
      });

      const result = await strategy.filterPartitionRanges(mockPartitionRanges, continuationToken);

      assert.equal(result.filteredRanges.length, 3); // 1 from token + 2 target ranges after
      const firstRange = result.filteredRanges[0];
      assert.equal(firstRange.id, "minimal");
      assert.equal(firstRange.ridPrefix, undefined); // Should handle missing fields gracefully
      assert.equal(firstRange.throughputFraction, undefined);
      assert.equal(firstRange.status, undefined);
      assert.equal(firstRange.parents, undefined);
    });
  });

  describe("Edge Cases", () => {
    it("should handle single partition range", async () => {
      const singleRange = [createMockPartitionKeyRange("0", "", "ZZ")];
      const result = await strategy.filterPartitionRanges(singleRange);

      assert.deepEqual(result.filteredRanges, singleRange);
    });

    it("should handle ranges with identical boundaries", async () => {
      const identicalRanges = [
        createMockPartitionKeyRange("0", "AA", "BB"),
        createMockPartitionKeyRange("1", "AA", "BB"), // Same boundaries
      ];

      const result = await strategy.filterPartitionRanges(identicalRanges);

      assert.equal(result.filteredRanges.length, 2);
      assert.deepEqual(result.filteredRanges, identicalRanges);
    });

    it("should handle very large number of ranges efficiently", async () => {
      // Create 1000 partition ranges
      const largeRangeSet = Array.from({ length: 1000 }, (_, i) => 
        createMockPartitionKeyRange(
          i.toString(),
          i.toString().padStart(4, '0'),
          (i + 1).toString().padStart(4, '0')
        )
      );

      const startTime = Date.now();
      const result = await strategy.filterPartitionRanges(largeRangeSet);
      const endTime = Date.now();

      // Should complete within reasonable time (less than 1 second)
      assert.isBelow(endTime - startTime, 1000);
      assert.equal(result.filteredRanges.length, 1000);
    });

    it("should handle ranges with empty string boundaries", async () => {
      const rangesWithEmptyBoundaries = [
        createMockPartitionKeyRange("0", "", ""),
        createMockPartitionKeyRange("1", "", "AA"),
        createMockPartitionKeyRange("2", "ZZ", ""),
      ];

      const result = await strategy.filterPartitionRanges(rangesWithEmptyBoundaries);

      assert.equal(result.filteredRanges.length, 3);
      assert.deepEqual(result.filteredRanges, rangesWithEmptyBoundaries);
    });

    it("should handle unicode partition key values", async () => {
      const unicodeRanges = [
        createMockPartitionKeyRange("0", "α", "β"),
        createMockPartitionKeyRange("1", "β", "γ"),
        createMockPartitionKeyRange("2", "γ", "δ"),
      ];

      const continuationToken = JSON.stringify({
        rangeMappings: [
          {
            partitionKeyRange: { 
              id: "unicode", 
              minInclusive: "α", 
              maxExclusive: "β",
              ridPrefix: 0,
              throughputFraction: 1.0,
              status: "Online",
              parents: []
            },
            continuationToken: "unicode-token",
            itemCount: 1,
          }
        ]
      });

      const result = await strategy.filterPartitionRanges(unicodeRanges, continuationToken);

      assert.equal(result.filteredRanges.length, 3); // 1 from token + 2 after
      assert.equal(result.filteredRanges[0].id, "unicode");
      assert.equal(result.filteredRanges[1].id, "1"); // β-γ
      assert.equal(result.filteredRanges[2].id, "2"); // γ-δ
    });
  });

  describe("Integration Scenarios", () => {
    it("should handle typical parallel query continuation scenario", async () => {
      // Simulate a scenario where a parallel query has processed first two ranges
      const continuationToken = JSON.stringify({
        rangeMappings: [
          {
            partitionKeyRange: { 
              id: "0", 
              minInclusive: "", 
              maxExclusive: "AA",
              ridPrefix: 0,
              throughputFraction: 1.0,
              status: "Online",
              parents: []
            },
            continuationToken: "token-0-continued",
            itemCount: 15,
          },
          {
            partitionKeyRange: { 
              id: "1", 
              minInclusive: "AA", 
              maxExclusive: "BB",
              ridPrefix: 1,
              throughputFraction: 1.0,
              status: "Online",
              parents: []
            },
            continuationToken: null, // This range is exhausted
            itemCount: 0,
          }
        ]
      });

      const result = await strategy.filterPartitionRanges(mockPartitionRanges, continuationToken);

      // Should include the continuing range and subsequent unprocessed ranges
      assert.equal(result.filteredRanges.length, 3);
      assert.equal(result.filteredRanges[0].id, "0"); // Continuing range
      assert.equal(result.filteredRanges[1].id, "2"); // Next unprocessed range
      assert.equal(result.filteredRanges[2].id, "3"); // Final range
      
      assert.equal(result.continuationToken?.[0], "token-0-continued");
      assert.isUndefined(result.continuationToken?.[1]); // New range
      assert.isUndefined(result.continuationToken?.[2]); // New range
    });

    it("should handle partition merge scenario", async () => {
      // Simulate scenario where multiple small ranges were merged into a larger range
      const continuationToken = JSON.stringify({
        rangeMappings: [
          {
            partitionKeyRange: { 
              id: "merged-0-1", 
              minInclusive: "", 
              maxExclusive: "BB", // Covers original ranges 0 and 1
              ridPrefix: 0,
              throughputFraction: 1.0,
              status: "Online",
              parents: ["0", "1"]
            },
            continuationToken: "merged-token",
            itemCount: 25,
          }
        ]
      });

      const result = await strategy.filterPartitionRanges(mockPartitionRanges, continuationToken);

      // Should include the merged range and subsequent ranges
      assert.equal(result.filteredRanges.length, 4);
      assert.equal(result.filteredRanges[0].id, "0");
      assert.equal(result.filteredRanges[0].id, "1");
      assert.equal(result.filteredRanges[1].id, "2"); // BB-FF
      assert.equal(result.filteredRanges[2].id, "3"); // FF-ZZ
    });

    it("should handle partition split scenario", async () => {
      // Simulate scenario where a large range was split into smaller ranges
      const continuationToken = JSON.stringify({
        rangeMappings: [
          {
            partitionKeyRange: { 
              id: "split-2a", 
              minInclusive: "BB", 
              maxExclusive: "CC",
              ridPrefix: 2,
              throughputFraction: 0.5,
              status: "Online",
              parents: ["2"]
            },
            continuationToken: "split-token-a",
            itemCount: 10,
          },
          {
            partitionKeyRange: { 
              id: "split-2b", 
              minInclusive: "CC", 
              maxExclusive: "FF",
              ridPrefix: 3,
              throughputFraction: 0.5,
              status: "Online",
              parents: ["2"]
            },
            continuationToken: "split-token-b",
            itemCount: 8,
          }
        ]
      });

      const result = await strategy.filterPartitionRanges(mockPartitionRanges, continuationToken);

      // Should include both split ranges and subsequent ranges
      assert.equal(result.filteredRanges.length, 3);
      assert.equal(result.filteredRanges[0].id, "2");
      assert.equal(result.filteredRanges[0].minInclusive, "BB");
      assert.equal(result.filteredRanges[0].maxExclusive, "FF");
      assert.equal(result.filteredRanges[0].epkMin, "BB");
      assert.equal(result.filteredRanges[0].epkMax, "CC");
      assert.equal(result.filteredRanges[1].id, "2");
      assert.equal(result.filteredRanges[1].minInclusive, "BB");
      assert.equal(result.filteredRanges[1].maxExclusive, "FF");
      assert.equal(result.filteredRanges[1].epkMin, "CC");
      assert.equal(result.filteredRanges[1].epkMax, "FF");
      assert.equal(result.filteredRanges[2].id, "3"); // FF-ZZ
    });
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, beforeEach } from "vitest";
import { OrderByQueryRangeStrategy } from "../../../../src/queryExecutionContext/OrderByQueryRangeStrategy.js";
import type { PartitionKeyRange } from "../../../../src/index.js";

describe("OrderByQueryRangeStrategy", () => {
  let strategy: OrderByQueryRangeStrategy;
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
    strategy = new OrderByQueryRangeStrategy();
    mockPartitionRanges = [
      createMockPartitionKeyRange("0", "", "AA"),
      createMockPartitionKeyRange("1", "AA", "BB"),
      createMockPartitionKeyRange("2", "BB", "FF"),
      createMockPartitionKeyRange("3", "FF", "ZZ"),
    ];
  });

  describe("getStrategyType", () => {
    it("should return OrderByQuery strategy type", () => {
      assert.equal(strategy.getStrategyType(), "OrderByQuery");
    });
  });

  describe("validateContinuationToken", () => {
    it("should validate valid ORDER BY continuation token", () => {
      const validToken = JSON.stringify({
        compositeToken: JSON.stringify({
          rangeMappings: [
            {
              partitionKeyRange: { id: "1", minInclusive: "AA", maxExclusive: "BB" },
              continuationToken: "mock-token",
              itemCount: 5,
            }
          ]
        }),
        orderByItems: [
          { item: "value1" },
          { item: "value2" }
        ]
      });

      assert.isTrue(strategy.validateContinuationToken(validToken));
    });

    it("should reject invalid JSON", () => {
      const invalidToken = "{ invalid json";
      assert.isFalse(strategy.validateContinuationToken(invalidToken));
    });

    it("should reject token without compositeToken", () => {
      const invalidToken = JSON.stringify({
        orderByItems: [{ item: "value" }]
      });
      assert.isFalse(strategy.validateContinuationToken(invalidToken));
    });

    it("should reject token without orderByItems", () => {
      const invalidToken = JSON.stringify({
        compositeToken: "some-token"
      });
      assert.isFalse(strategy.validateContinuationToken(invalidToken));
    });

    it("should reject token with non-array orderByItems", () => {
      const invalidToken = JSON.stringify({
        compositeToken: "some-token",
        orderByItems: "not-an-array"
      });
      assert.isFalse(strategy.validateContinuationToken(invalidToken));
    });

    it("should reject token with non-string compositeToken", () => {
      const invalidToken = JSON.stringify({
        compositeToken: { nested: "object" },
        orderByItems: []
      });
      assert.isFalse(strategy.validateContinuationToken(invalidToken));
    });

    it("should validate token with empty orderByItems array", () => {
      const validToken = JSON.stringify({
        compositeToken: "valid-composite-token",
        orderByItems: []
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
      assert.isUndefined(result.filteringConditions);
    });

    it("should handle empty target ranges", async () => {
      const result = await strategy.filterPartitionRanges([]);

      assert.deepEqual(result.filteredRanges, []);
    });

    it("should handle null target ranges", async () => {
      const result = await strategy.filterPartitionRanges(null as any);

      assert.deepEqual(result.filteredRanges, []);
    });
  });

  describe("filterPartitionRanges - With Continuation Token", () => {
    it("should filter ranges based on ORDER BY continuation token", async () => {
      const compositeToken = JSON.stringify({
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
          }
        ]
      });

      const orderByToken = JSON.stringify({
        compositeToken: compositeToken,
        orderByItems: [
          { item: "some-value" }
        ],
        rid: "sample-rid",
        skipCount: 5
      });

      const result = await strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);

      // Should include range from continuation token plus target ranges after it
      assert.equal(result.filteredRanges.length, 3); // 1 from token + 2 target ranges after
      assert.equal(result.continuationToken?.length, 3);
      assert.equal(result.filteringConditions?.length, 3);
      
      // First should be from continuation token
      assert.equal(result.filteredRanges[0].id, "1");
      assert.equal(result.filteredRanges[0].minInclusive, "AA");
      assert.equal(result.filteredRanges[0].maxExclusive, "BB");
      
      // Next should be target ranges after the continuation token range
      assert.equal(result.filteredRanges[1].id, "2"); // BB-FF
      assert.equal(result.filteredRanges[2].id, "3"); // FF-ZZ
      
      // Continuation tokens should match
      assert.equal(result.continuationToken?.[0], "mock-token-1");
      assert.isUndefined(result.continuationToken?.[1]); // New range
      assert.isUndefined(result.continuationToken?.[2]); // New range
    });

    it("should handle continuation token with multiple range mappings", async () => {
      const compositeToken = JSON.stringify({
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
            itemCount: 2,
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
            itemCount: 5,
          }
        ]
      });

      const orderByToken = JSON.stringify({
        compositeToken: compositeToken,
        orderByItems: [{ item: "value1" }, { item: "value2" }]
      });

      const result = await strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);

      // Should use the last range mapping (index 1) as the resume point
      assert.equal(result.filteredRanges.length, 3); // 1 from last mapping + 2 target ranges after
      assert.equal(result.filteredRanges[0].id, "1"); // From last range mapping
      assert.equal(result.filteredRanges[1].id, "2"); // BB-FF
      assert.equal(result.filteredRanges[2].id, "3"); // FF-ZZ
      
      assert.equal(result.continuationToken?.[0], "mock-token-1"); // From last mapping
      assert.isUndefined(result.continuationToken?.[1]);
      assert.isUndefined(result.continuationToken?.[2]);
    });

    it("should handle continuation token with range that covers all target ranges", async () => {
      const compositeToken = JSON.stringify({
        rangeMappings: [
          {
            partitionKeyRange: { 
              id: "big-range", 
              minInclusive: "", 
              maxExclusive: "ZZ", // Covers all target ranges
              ridPrefix: 99,
              throughputFraction: 1.0,
              status: "Online",
              parents: []
            },
            continuationToken: "big-range-token",
            itemCount: 100,
          }
        ]
      });

      const orderByToken = JSON.stringify({
        compositeToken: compositeToken,
        orderByItems: [{ item: "value" }]
      });

      const result = await strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);

      // Should only include the continuation token range since no target ranges come after it
      assert.equal(result.filteredRanges.length, 1);
      assert.equal(result.filteredRanges[0].id, "big-range");
      assert.equal(result.continuationToken?.[0], "big-range-token");
    });

    it("should handle continuation token with missing optional fields", async () => {
      const compositeToken = JSON.stringify({
        rangeMappings: [
          {
            partitionKeyRange: { 
              id: "minimal", 
              minInclusive: "AA", 
              maxExclusive: "BB"
              // Missing optional fields
            },
            continuationToken: "minimal-token",
            itemCount: 1,
          }
        ]
      });

      const orderByToken = JSON.stringify({
        compositeToken: compositeToken,
        orderByItems: [{ item: "value" }]
      });

      const result = await strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);

      assert.equal(result.filteredRanges.length, 3); // 1 from token + 2 after
      const firstRange = result.filteredRanges[0];
      assert.equal(firstRange.id, "minimal");
      assert.equal(firstRange.ridPrefix, undefined); // Should handle missing fields gracefully
      assert.equal(firstRange.throughputFraction, undefined);
      assert.equal(firstRange.status, undefined);
      assert.equal(firstRange.parents, undefined);
    });

    it("should handle empty range mappings in composite token", async () => {
      const compositeToken = JSON.stringify({
        rangeMappings: []
      });

      const orderByToken = JSON.stringify({
        compositeToken: compositeToken,
        orderByItems: [{ item: "value" }]
      });

      const result = await strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);

      // Should return all target ranges since no specific resume point found
      assert.deepEqual(result.filteredRanges, mockPartitionRanges);
    });

    it("should handle malformed composite token", async () => {
      const orderByToken = JSON.stringify({
        compositeToken: "invalid-json-token",
        orderByItems: [{ item: "value" }]
      });

      const result = await strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);

      // Should return all target ranges when composite token parsing fails
      assert.deepEqual(result.filteredRanges, mockPartitionRanges);
    });
  });

  describe("Error Handling", () => {
    it("should throw error for invalid continuation token format", async () => {
      const invalidToken = "invalid-json";

      await expect(
        strategy.filterPartitionRanges(mockPartitionRanges, invalidToken)
      ).rejects.toThrow("Invalid continuation token format for ORDER BY query strategy");
    });

    it("should throw error for malformed ORDER BY continuation token", async () => {
      // This test validates that parsing errors are caught and wrapped
      const validButUnparsableToken = JSON.stringify({
        compositeToken: "valid-composite",
        orderByItems: [],
        rid: null, // This might cause issues in constructor
        skipCount: "invalid-number" // Non-numeric skip count
      });

      await expect(
        strategy.filterPartitionRanges(mockPartitionRanges, validButUnparsableToken)
      ).rejects.toThrow("Failed to parse ORDER BY continuation token");
    });

    it("should handle null or undefined partition key range in composite token", async () => {
      const compositeToken = JSON.stringify({
        rangeMappings: [
          {
            partitionKeyRange: null, // Invalid range
            continuationToken: "token",
            itemCount: 0,
          }
        ]
      });

      const orderByToken = JSON.stringify({
        compositeToken: compositeToken,
        orderByItems: [{ item: "value" }]
      });

      const result = await strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);

      // Should return all target ranges when range mappings are invalid
      assert.deepEqual(result.filteredRanges, mockPartitionRanges);
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

    it("should handle continuation token with empty orderByItems", async () => {
      const compositeToken = JSON.stringify({
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
            continuationToken: "token",
            itemCount: 3,
          }
        ]
      });

      const orderByToken = JSON.stringify({
        compositeToken: compositeToken,
        orderByItems: [] // Empty array
      });

      const result = await strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);

      assert.equal(result.filteredRanges.length, 3); // 1 from token + 2 after
      assert.equal(result.filteredRanges[0].id, "1");
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

    it("should handle unicode partition key values", async () => {
      const unicodeRanges = [
        createMockPartitionKeyRange("0", "α", "β"),
        createMockPartitionKeyRange("1", "β", "γ"),
        createMockPartitionKeyRange("2", "γ", "δ"),
      ];

      const compositeToken = JSON.stringify({
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

      const orderByToken = JSON.stringify({
        compositeToken: compositeToken,
        orderByItems: [{ item: "unicode-value" }]
      });

      const result = await strategy.filterPartitionRanges(unicodeRanges, orderByToken);

      assert.equal(result.filteredRanges.length, 3); // 1 from token + 2 after
      assert.equal(result.filteredRanges[0].id, "unicode");
      assert.equal(result.filteredRanges[1].id, "1"); // β-γ
      assert.equal(result.filteredRanges[2].id, "2"); // γ-δ
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
  });

  describe("Integration Scenarios", () => {
    it("should handle typical ORDER BY query continuation scenario", async () => {
      // Simulate a scenario where an ORDER BY query has processed the first range
      const compositeToken = JSON.stringify({
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
            continuationToken: "order-by-token-0",
            itemCount: 25,
          }
        ]
      });

      const orderByToken = JSON.stringify({
        compositeToken: compositeToken,
        orderByItems: [
          { item: "last-processed-value" }
        ],
        rid: "last-processed-rid",
        skipCount: 10
      });

      const result = await strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);

      // Should include the continuing range and subsequent unprocessed ranges
      assert.equal(result.filteredRanges.length, 4); // 1 continuing + 3 unprocessed
      assert.equal(result.filteredRanges[0].id, "0"); // Continuing range
      assert.equal(result.filteredRanges[1].id, "1"); // Next unprocessed range
      assert.equal(result.filteredRanges[2].id, "2"); // Next unprocessed range
      assert.equal(result.filteredRanges[3].id, "3"); // Final range
      
      assert.equal(result.continuationToken?.[0], "order-by-token-0");
      assert.isUndefined(result.continuationToken?.[1]); // New range
      assert.isUndefined(result.continuationToken?.[2]); // New range
      assert.isUndefined(result.continuationToken?.[3]); // New range
    });

    it("should handle partition merge scenario in ORDER BY context", async () => {
      // Simulate scenario where multiple ranges were merged in ORDER BY context
      const compositeToken = JSON.stringify({
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
            continuationToken: "merged-order-by-token",
            itemCount: 50,
          }
        ]
      });

      const orderByToken = JSON.stringify({
        compositeToken: compositeToken,
        orderByItems: [
          { item: "merged-range-value" }
        ],
        rid: "merged-rid",
        skipCount: 15,
        offset: 100,
        limit: 50
      });

      const result = await strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);

      // Should include the merged range and subsequent ranges
      assert.equal(result.filteredRanges.length, 3); // 1 merged + 2 subsequent
      assert.equal(result.filteredRanges[0].id, "merged-0-1");
      assert.equal(result.filteredRanges[0].parents?.length, 2);
      assert.includeMembers(result.filteredRanges[0].parents || [], ["0", "1"]);
      assert.equal(result.filteredRanges[1].id, "2"); // BB-FF
      assert.equal(result.filteredRanges[2].id, "3"); // FF-ZZ
    });

    it("should handle partition split scenario in ORDER BY context", async () => {
      // Simulate scenario where a range was split in ORDER BY context
      const compositeToken = JSON.stringify({
        rangeMappings: [
          {
            partitionKeyRange: { 
              id: "split-2a", 
              minInclusive: "BB", 
              maxExclusive: "CC",
              ridPrefix: 2,
              throughputFraction: 0.3,
              status: "Online",
              parents: ["2"]
            },
            continuationToken: "split-order-by-token",
            itemCount: 15,
          }
        ]
      });

      const orderByToken = JSON.stringify({
        compositeToken: compositeToken,
        orderByItems: [
          { item: "split-range-value" }
        ],
        rid: "split-rid",
        skipCount: 8
      });

      const result = await strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);

      // Should include the split range and any subsequent ranges
      assert.equal(result.filteredRanges.length, 2); // 1 split range + 1 subsequent
      assert.equal(result.filteredRanges[0].id, "split-2a");
      assert.equal(result.filteredRanges[0].parents?.[0], "2");
      assert.equal(result.filteredRanges[1].id, "3"); // FF-ZZ (comes after CC)
    });

    it("should handle complex ORDER BY continuation with multiple orderByItems", async () => {
      const compositeToken = JSON.stringify({
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
            continuationToken: "complex-token",
            itemCount: 42,
          }
        ]
      });

      const orderByToken = JSON.stringify({
        compositeToken: compositeToken,
        orderByItems: [
          { item: "first-sort-value" },
          { item: "second-sort-value" },
          { item: "third-sort-value" }
        ],
        rid: "complex-rid",
        skipCount: 25,
        offset: 200,
        limit: 100,
        hashedLastResult: "hashed-value"
      });

      const result = await strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);

      assert.equal(result.filteredRanges.length, 3); // 1 from token + 2 subsequent
      assert.equal(result.filteredRanges[0].id, "1");
      assert.equal(result.continuationToken?.[0], "complex-token");
      
      // Verify all subsequent ranges are included
      assert.equal(result.filteredRanges[1].id, "2");
      assert.equal(result.filteredRanges[2].id, "3");
    });
  });
});

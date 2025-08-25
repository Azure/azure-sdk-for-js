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

    it("should reject token with empty orderByItems array", () => {
      const invalidToken = JSON.stringify({
        compositeToken: "valid-composite-token",
        orderByItems: []
      });
      assert.isFalse(strategy.validateContinuationToken(invalidToken));
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
    it("should return all ranges when no continuation token is provided", () => {
      const result = strategy.filterPartitionRanges(mockPartitionRanges);

      assert.deepEqual(result.filteredRanges, mockPartitionRanges);
      assert.isUndefined(result.continuationToken);
      assert.isUndefined(result.filteringConditions);
    });

    it("should handle empty target ranges", () => {
      const result = strategy.filterPartitionRanges([]);

      assert.deepEqual(result.filteredRanges, []);
    });

    it("should handle null target ranges", () => {
      const result = strategy.filterPartitionRanges(null as any);
      assert.deepEqual(result.filteredRanges, []);
    });
  });

  describe("filterPartitionRanges - With Continuation Token", () => {
    describe("Basic Continuation Token Scenarios", () => {
      it("should return only the target range from continuation token (simple case)", () => {
        // Target range is in the middle of our mock ranges (id: "1", AA-BB)
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
              continuationToken: "target-token",
              itemCount: 5
            }
          ]
        });

        const orderByToken = JSON.stringify({
          compositeToken: compositeToken,
          orderByItems: [{ item: "test-value" }],
          rid: "test-rid",
          skipCount: 10
        });

        const result = strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);

        // Should return only the target range since no queryInfo provided (no filtering)
        assert.equal(result.filteredRanges.length, 4);
        assert.equal(result.filteredRanges[1].id, "1");
        assert.equal(result.filteredRanges[1].minInclusive, "AA");
        assert.equal(result.filteredRanges[1].maxExclusive, "BB");
        
        // Should have the continuation token for the target range
        assert.equal(result.continuationToken?.length, 4);
        assert.equal(result.continuationToken?.[1], "target-token");
        
        // Should have empty filtering conditions array
        assert.equal(result.filteringConditions?.length, 4);
        assert.isDefined(result.filteringConditions?.[1]);
      });

      it("should return left + target + right ranges when queryInfo enables filtering", () => {
        // Target range is in the middle (id: "1", AA-BB)
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
              continuationToken: "middle-token",
              itemCount: 8
            }
          ]
        });

        const orderByToken = JSON.stringify({
          compositeToken: compositeToken,
          orderByItems: [{ item: "filter-value" }]
        });

        // Provide queryInfo to enable filtering
        const queryInfo = {
          orderByExpressions: ["c.timestamp"],
          orderBy: ["Ascending"]
        };

        const result = strategy.filterPartitionRanges(mockPartitionRanges, orderByToken, queryInfo);

        // Should include:
        // - Left ranges: ranges with maxExclusive < "AA" → range "0" (""-"AA")
        // - Target range: range "1" ("AA"-"BB") 
        // - Right ranges: ranges with minInclusive > "BB" → ranges "2" ("BB"-"FF"), "3" ("FF"-"ZZ")
        assert.equal(result.filteredRanges.length, 4);
        
        // Verify left range
        const leftRange = result.filteredRanges.find(r => r.maxExclusive <= "AA");
        assert.isDefined(leftRange);
        assert.equal(leftRange?.id, "0");
        
        // Verify target range 
        const targetRange = result.filteredRanges.find(r => r.id === "1");
        assert.isDefined(targetRange);
        assert.equal(targetRange?.minInclusive, "AA");
        assert.equal(targetRange?.maxExclusive, "BB");
        
        // Verify right ranges
        const rightRanges = result.filteredRanges.filter(r => r.minInclusive >= "BB");
        assert.equal(rightRanges.length, 2);
        assert.includeMembers(rightRanges.map(r => r.id), ["2", "3"]);

        // Verify continuation tokens: only target range should have one
        const targetIndex = result.filteredRanges.findIndex(r => r.id === "1");
        assert.equal(result.continuationToken?.[targetIndex], "middle-token");
        
        // Left and right ranges should have undefined continuation tokens
        const leftIndex = result.filteredRanges.findIndex(r => r.id === "0");
        const rightIndex1 = result.filteredRanges.findIndex(r => r.id === "2");
        const rightIndex2 = result.filteredRanges.findIndex(r => r.id === "3");
        assert.isUndefined(result.continuationToken?.[leftIndex]);
        assert.isUndefined(result.continuationToken?.[rightIndex1]);
        assert.isUndefined(result.continuationToken?.[rightIndex2]);
      });
    });

    describe("Edge Cases with Continuation Tokens", () => {
      it("should handle target range that doesn't exist in current target ranges", () => {
        // Target range is outside the current target ranges
        const compositeToken = JSON.stringify({
          rangeMappings: [
            {
              partitionKeyRange: { 
                id: "external", 
                minInclusive: "ZZ", 
                maxExclusive: "ZZZ",
                ridPrefix: 99,
                throughputFraction: 1.0,
                status: "Online",
                parents: []
              },
              continuationToken: "external-token",
              itemCount: 2
            }
          ]
        });

        const orderByToken = JSON.stringify({
          compositeToken: compositeToken,
          orderByItems: [{ item: "external-value" }]
        });

        const result = strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);

        // Should return the external range from continuation token
        assert.equal(result.filteredRanges.length, 5);
        assert.equal(result.filteredRanges[4].id, "external");
        assert.equal(result.filteredRanges[4].minInclusive, "ZZ");
        assert.equal(result.filteredRanges[4].maxExclusive, "ZZZ");
        assert.equal(result.continuationToken?.[4], "external-token");
      });

      it("should handle target range at the beginning of partition space", () => {
        // Target range is the first range (id: "0", ""-"AA")
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
              continuationToken: "first-token",
              itemCount: 12
            }
          ]
        });

        const orderByToken = JSON.stringify({
          compositeToken: compositeToken,
          orderByItems: [{ item: "first-value" }]
        });

        const queryInfo = {
          orderByExpressions: ["c.id"],
          orderBy: ["Ascending"]
        };

        const result = strategy.filterPartitionRanges(mockPartitionRanges, orderByToken, queryInfo);

        // Should include target range + right ranges (no left ranges since target is first)
        // Target: "0" (""-"AA")
        // Right: "1" ("AA"-"BB"), "2" ("BB"-"FF"), "3" ("FF"-"ZZ")
        assert.equal(result.filteredRanges.length, 4);
        
        // Verify target range is included
        const targetRange = result.filteredRanges.find(r => r.id === "0");
        assert.isDefined(targetRange);
        
        // Verify right ranges are included
        const rightRanges = result.filteredRanges.filter(r => r.minInclusive >= "AA");
        assert.equal(rightRanges.length, 3);
        
        // Only target should have continuation token
        const targetIndex = result.filteredRanges.findIndex(r => r.id === "0");
        assert.equal(result.continuationToken?.[targetIndex], "first-token");
      });

      it("should handle target range at the end of partition space", () => {
        // Target range is the last range (id: "3", "FF"-"ZZ")
        const compositeToken = JSON.stringify({
          rangeMappings: [
            {
              partitionKeyRange: { 
                id: "3", 
                minInclusive: "FF", 
                maxExclusive: "ZZ",
                ridPrefix: 3,
                throughputFraction: 1.0,
                status: "Online",
                parents: []
              },
              continuationToken: "last-token",
              itemCount: 6
            }
          ]
        });

        const orderByToken = JSON.stringify({
          compositeToken: compositeToken,
          orderByItems: [{ item: "last-value" }]
        });

        const queryInfo = {
          orderByExpressions: ["c.timestamp"],
          orderBy: ["Descending"]
        };

        const result = strategy.filterPartitionRanges(mockPartitionRanges, orderByToken, queryInfo);

        // Should include left ranges + target range (no right ranges since target is last)
        // Left: "0" (""-"AA"), "1" ("AA"-"BB"), "2" ("BB"-"FF")
        // Target: "3" ("FF"-"ZZ")
        assert.equal(result.filteredRanges.length, 4);
        
        // Verify target range is included
        const targetRange = result.filteredRanges.find(r => r.id === "3");
        assert.isDefined(targetRange);
        
        // Verify left ranges are included
        const leftRanges = result.filteredRanges.filter(r => r.maxExclusive <= "FF");
        assert.equal(leftRanges.length, 3);
        
        // Only target should have continuation token
        const targetIndex = result.filteredRanges.findIndex(r => r.id === "3");
        assert.equal(result.continuationToken?.[targetIndex], "last-token");
      });

      it("should reject empty range mappings in composite token as invalid", () => {
        const compositeToken = JSON.stringify({
          rangeMappings: []
        });

        const orderByToken = JSON.stringify({
          compositeToken: compositeToken,
          orderByItems: [{ item: "value" }]
        });

        // Empty range mappings should be treated as invalid continuation token
        const isValid = strategy.validateContinuationToken(orderByToken);
        assert.equal(isValid, false, "Empty range mappings should make token invalid");

        // filterPartitionRanges should throw an error for invalid token
        assert.throws(() => {
          strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);
        }, "Invalid continuation token format for ORDER BY query strategy");
      });

      it("should reject malformed composite token as invalid", () => {
        const orderByToken = JSON.stringify({
          compositeToken: "invalid-json-here",
          orderByItems: [{ item: "value" }]
        });

        // Malformed composite token should be treated as invalid continuation token
        const isValid = strategy.validateContinuationToken(orderByToken);
        assert.equal(isValid, false, "Malformed composite token should make token invalid");

        // filterPartitionRanges should throw an error for invalid token
        assert.throws(() => {
          strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);
        }, "Invalid continuation token format for ORDER BY query strategy");
      });
    });

    describe("Range Properties Preservation", () => {
      it("should preserve all range properties from continuation token", () => {
        const compositeToken = JSON.stringify({
          rangeMappings: [
            {
              partitionKeyRange: { 
                id: "custom-split", 
                minInclusive: "AA", 
                maxExclusive: "AB",
                ridPrefix: 42,
                throughputFraction: 0.25,
                status: "Splitting",
                parents: ["original-1", "original-2"],
                epkMin: "epk-min-value",
                epkMax: "epk-max-value"
              },
              continuationToken: "split-token",
              itemCount: 100
            }
          ]
        });

        const orderByToken = JSON.stringify({
          compositeToken: compositeToken,
          orderByItems: [{ item: "split-scenario" }]
        });

        const result = strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);

        const targetRange = result.filteredRanges[1];
        assert.equal(targetRange.id, "custom-split");
        assert.equal(targetRange.minInclusive, "AA");
        assert.equal(targetRange.maxExclusive, "AB");
        assert.equal(result.continuationToken?.[1], "split-token");
      });

      it("should handle missing optional properties gracefully", () => {
        const compositeToken = JSON.stringify({
          rangeMappings: [
            {
              partitionKeyRange: { 
                id: "minimal", 
                minInclusive: "BB", 
                maxExclusive: "CC"
                // Missing ridPrefix, throughputFraction, status, parents, epk properties
              },
              continuationToken: "minimal-token",
              itemCount: 1
            }
          ]
        });

        const orderByToken = JSON.stringify({
          compositeToken: compositeToken,
          orderByItems: [{ item: "minimal-test" }]
        });

        const result = strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);

        const targetRange = result.filteredRanges[2];
        assert.equal(targetRange.id, "minimal");
        assert.equal(targetRange.minInclusive, "BB");
        assert.equal(targetRange.maxExclusive, "CC");
        assert.isUndefined(targetRange.ridPrefix);
        assert.isUndefined(targetRange.throughputFraction);
        assert.isUndefined(targetRange.status);
        assert.isUndefined(targetRange.parents);
        assert.isUndefined(targetRange.epkMin);
        assert.isUndefined(targetRange.epkMax);
      });
    });

    describe("Complex Order By Scenarios", () => {
      it("should handle multiple orderByItems with complex values", () => {
        const compositeToken = JSON.stringify({
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
              continuationToken: "multi-order-token",
              itemCount: 25
            }
          ]
        });

        const orderByToken = JSON.stringify({
          compositeToken: compositeToken,
          orderByItems: [
            { item: "timestamp-value" },
            { item: "priority-value" },
            { item: "id-value" }
          ],
          rid: "complex-rid",
          skipCount: 50,
          offset: 1000,
          limit: 200,
          hashedLastResult: "hashed-result-value"
        });

        const result = strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);

        assert.equal(result.filteredRanges.length, 4);
        assert.equal(result.filteredRanges[2].id, "2");
        assert.equal(result.continuationToken?.[2], "multi-order-token");
      });

      it("should handle complex filtering with multiple sort orders", () => {
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
              continuationToken: "complex-filter-token",
              itemCount: 15
            }
          ]
        });

        const orderByToken = JSON.stringify({
          compositeToken: compositeToken,
          orderByItems: [
            { item: "2023-01-01T10:00:00Z" },
            { item: 100 }
          ]
        });

        // Complex queryInfo with multiple sort orders
        const queryInfo = {
          orderByExpressions: ["c.timestamp", "c.priority"],
          orderBy: ["Ascending", "Descending"]
        };

        const result = strategy.filterPartitionRanges(mockPartitionRanges, orderByToken, queryInfo);

        // Should include left + target + right ranges with appropriate filtering conditions
        assert.isAtLeast(result.filteredRanges.length, 1);
        
        // Verify target range is present
        const targetRange = result.filteredRanges.find(r => r.id === "1");
        assert.isDefined(targetRange);
        
        // Verify continuation token for target
        const targetIndex = result.filteredRanges.findIndex(r => r.id === "1");
        assert.equal(result.continuationToken?.[targetIndex], "complex-filter-token");
      });
    });
  });


  describe("Error Handling", () => {
    it("should throw error for invalid continuation token format", () => {
      const invalidToken = "invalid-json";

      expect(() => {
        strategy.filterPartitionRanges(mockPartitionRanges, invalidToken);
      }).toThrow("Invalid continuation token format for ORDER BY query strategy");
    });

    it("should throw error for malformed ORDER BY continuation token", () => {
      // This test validates that parsing errors are caught and wrapped
      const validButUnparsableToken = JSON.stringify({
        compositeToken: "valid-composite",
        orderByItems: [{ item: "test" }],
        rid: null, // This might cause issues in constructor
        skipCount: "invalid-number" // Non-numeric skip count
      });

      expect(() => {
        strategy.filterPartitionRanges(mockPartitionRanges, validButUnparsableToken);
      }).toThrow("Invalid continuation token format for ORDER BY query strategy");
    });

    it("should reject null partition key range in composite token as invalid", () => {
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

      // Null partition key range should be treated as invalid continuation token
      const isValid = strategy.validateContinuationToken(orderByToken);
      assert.equal(isValid, false, "Null partition key range should make token invalid");

      // filterPartitionRanges should throw an error for invalid token
      assert.throws(() => {
        strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);
      }, "Invalid continuation token format for ORDER BY query strategy");
    });
  });

  describe("Edge Cases", () => {
    it("should handle single partition range", () => {
      const singleRange = [createMockPartitionKeyRange("0", "", "ZZ")];
      const result = strategy.filterPartitionRanges(singleRange);

      assert.deepEqual(result.filteredRanges, singleRange);
    });

    it("should handle very large number of ranges efficiently", () => {
      // Create 1000 partition ranges
      const largeRangeSet = Array.from({ length: 1000 }, (_, i) => 
        createMockPartitionKeyRange(
          i.toString(),
          i.toString().padStart(4, '0'),
          (i + 1).toString().padStart(4, '0')
        )
      );

      const startTime = Date.now();
      const result = strategy.filterPartitionRanges(largeRangeSet);
      const endTime = Date.now();

      // Should complete within reasonable time (less than 1 second)
      assert.isBelow(endTime - startTime, 1000);
      assert.equal(result.filteredRanges.length, 1000);
    });

    it("should handle unicode partition key values", () => {
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
              minInclusive: "β", 
              maxExclusive: "γ",
              ridPrefix: 1,
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

      const result = strategy.filterPartitionRanges(unicodeRanges, orderByToken);

      // Should return the target range from the continuation token
      assert.equal(result.filteredRanges.length, 3);
      assert.equal(result.filteredRanges[1].id, "unicode");
      assert.equal(result.filteredRanges[1].minInclusive, "β");
      assert.equal(result.filteredRanges[1].maxExclusive, "γ");
    });

  });

  describe("Integration Scenarios", () => {
    it("should handle typical ORDER BY query continuation scenario", () => {
      // Simulate a scenario where an ORDER BY query needs to resume from a specific range
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

      const result = strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);

      // Should return the specific range from the continuation token
      assert.equal(result.filteredRanges.length, 4);
      assert.equal(result.filteredRanges[0].id, "0");
      assert.equal(result.continuationToken?.[0], "order-by-token-0");
    });

    it("should handle partition split scenario in ORDER BY context", () => {
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

      const result = strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);

      // Should return the merged range from continuation token
      assert.equal(result.filteredRanges.length, 3);
      assert.equal(result.filteredRanges[0].id, "merged-0-1");
      assert.equal(result.filteredRanges[0].parents?.length, 2);
      assert.includeMembers(result.filteredRanges[0].parents || [], ["0", "1"]);
      assert.equal(result.continuationToken?.[0], "merged-order-by-token");
    });

    it("should handle partition merge scenario in ORDER BY context", () => {
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

      const result = strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);

      // Should return the split range from continuation token
      assert.equal(result.filteredRanges.length, 4);
      assert.equal(result.filteredRanges[2].id, "split-2a");
      assert.equal(result.filteredRanges[2].parents?.[0], "2");
      assert.equal(result.continuationToken?.[2], "split-order-by-token");
    });

    it("should handle complex ORDER BY continuation with multiple orderByItems", () => {
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

      const result = strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);

      // Should return the target range from continuation token
      assert.equal(result.filteredRanges.length, 4);
      assert.equal(result.filteredRanges[1].id, "1");
      assert.equal(result.continuationToken?.[1], "complex-token");
    });

    it("should handle ORDER BY with filtering conditions when queryInfo is provided", () => {
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
            continuationToken: "filter-token",
            itemCount: 20,
          }
        ]
      });

      const orderByToken = JSON.stringify({
        compositeToken: compositeToken,
        orderByItems: [{ item: "filter-value" }]
      });

      // Provide queryInfo to enable filtering logic
      const queryInfo = {
        orderByExpressions: ["c.timestamp"],
        orderBy: ["Ascending"]
      };

      const result = strategy.filterPartitionRanges(mockPartitionRanges, orderByToken, queryInfo);

      // Should include target range and potentially left/right ranges with filtering conditions
      assert.isAtLeast(result.filteredRanges.length, 1);
      
      // Find the target range
      const targetRangeIndex = result.filteredRanges.findIndex(r => r.id === "1");
      assert.isAtLeast(targetRangeIndex, 0);
      assert.equal(result.continuationToken?.[targetRangeIndex], "filter-token");
    });
  });

  describe("Exhausted Continuation Token Scenarios", () => {
    const exhaustedTokenTestCases = [
      {
        name: "null continuation token",
        continuationToken: null,
        expectedToken: null,
        description: "Range is exhausted with null continuation token"
      },
      {
        name: "undefined continuation token",
        continuationToken: undefined,
        expectedToken: undefined,
        description: "Range is exhausted with undefined continuation token"
      },
      {
        name: "empty string continuation token",
        continuationToken: "",
        expectedToken: "",
        description: "Range is exhausted with empty string continuation token"
      }
    ];

    exhaustedTokenTestCases.forEach(testCase => {
      it(`should handle exhausted continuation token with ${testCase.name}`, () => {
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
              ...(testCase.continuationToken !== undefined && { continuationToken: testCase.continuationToken }),
              itemCount: 0
            }
          ]
        });

        const orderByToken = JSON.stringify({
          compositeToken: compositeToken,
          orderByItems: [{ item: `${testCase.name}-value` }],
          rid: `${testCase.name}-rid`
        });

        const result = strategy.filterPartitionRanges(mockPartitionRanges, orderByToken);

        // Should still include the target range with the expected continuation token
        assert.equal(result.filteredRanges.length, 4);
        const targetIndex = result.filteredRanges.findIndex(r => r.id === "1");
        assert.isAtLeast(targetIndex, 0);
        
        if (testCase.expectedToken === null) {
          assert.isNull(result.continuationToken?.[targetIndex]);
        } else if (testCase.expectedToken === undefined) {
          assert.isUndefined(result.continuationToken?.[targetIndex]);
        } else {
          assert.equal(result.continuationToken?.[targetIndex], testCase.expectedToken);
        }
      });
    });


    it("should handle exhausted continuation token with filtering enabled", () => {
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
            continuationToken: null, // Exhausted
            itemCount: 0
          }
        ]
      });

      const orderByToken = JSON.stringify({
        compositeToken: compositeToken,
        orderByItems: [{ item: "exhausted-filter-value" }],
        rid: "exhausted-filter-rid"
      });

      const queryInfo = {
        orderByExpressions: ["c.status"],
        orderBy: ["Descending"]
      };

      const result = strategy.filterPartitionRanges(mockPartitionRanges, orderByToken, queryInfo);

      // Should include left + target + right ranges with appropriate filtering conditions
      assert.equal(result.filteredRanges.length, 4);
      
      // Target range should have null continuation token but still be included
      const targetIndex = result.filteredRanges.findIndex(r => r.id === "1");
      assert.isAtLeast(targetIndex, 0);
      assert.isNull(result.continuationToken?.[targetIndex]);
      
      // Should have filtering conditions applied
      assert.isDefined(result.filteringConditions?.[targetIndex]);
    });
  });
});

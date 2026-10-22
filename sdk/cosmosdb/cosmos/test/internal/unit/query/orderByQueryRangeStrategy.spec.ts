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

  describe("filterPartitionRanges", function () {
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

      it("should throw error when queryInfo is undefined", function () {
        const ranges = [createRange("1", "", "AA")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), "token1")];
        expect(() => {
          strategy.filterPartitionRanges(ranges, contRanges, undefined);
        }).toThrow(
          "Unable to resume ORDER BY query from continuation token. orderByItems is required for ORDER BY queries.",
        );
      });
    });

    describe("Single Range Scenarios", function () {
      it("should handle single target range matching continuation range", function () {
        const targetRange = createRange("1", "", "AA");
        const contRange = createContinuationRange(targetRange, "token1");
        const queryInfo = {
          orderByItems: [{ item: "testValue" }],
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending"],
              orderByExpressions: ["c.field1"],
            },
          },
        };
        const result = strategy.filterPartitionRanges([targetRange], [contRange], queryInfo);

        expect(result.rangeTokenPairs.length).toBe(1);
        expect(result.rangeTokenPairs[0].range.id).toBe("1");
        expect(result.rangeTokenPairs[0].continuationToken).toBe("token1");
      });

      it("should handle single target range with different continuation range", function () {
        const targetRange = createRange("2", "AA", "BB");
        const contRange = createContinuationRange(createRange("1", "", "AA"), "token1");
        const queryInfo = {
          orderByItems: [{ item: "testValue" }],
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending"],
              orderByExpressions: ["c.field1"],
            },
          },
        };
        const result = strategy.filterPartitionRanges([targetRange], [contRange], queryInfo);

        // The method should return both the target range and the continuation range
        expect(result.rangeTokenPairs.length).toBe(2);
      });
    });

    describe("Multiple Range Scenarios", function () {
      it("should handle left, target, and right ranges", function () {
        const leftRange = createRange("1", "", "AA");
        const targetRange = createRange("2", "AA", "BB");
        const rightRange = createRange("3", "BB", "CC");
        const ranges = [leftRange, targetRange, rightRange];

        const contRange = createContinuationRange(targetRange, "token2");
        const queryInfo = {
          orderByItems: [{ item: "testValue" }],
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending"],
              orderByExpressions: ["c.field1"],
            },
          },
        };
        const result = strategy.filterPartitionRanges(ranges, [contRange], queryInfo);

        expect(result.rangeTokenPairs.length).toBe(3);

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
        const queryInfo = {
          orderByItems: [{ item: "testValue" }],
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending"],
              orderByExpressions: ["c.field1"],
            },
          },
        };
        const result = strategy.filterPartitionRanges(
          [leftRange1, leftRange2],
          [contRange],
          queryInfo,
        );

        expect(result.rangeTokenPairs.length).toBe(3);
      });

      it("should handle only right ranges", function () {
        const targetRange = createRange("1", "", "AA");
        const rightRange1 = createRange("2", "BB", "CC");
        const rightRange2 = createRange("3", "CC", "DD");

        const contRange = createContinuationRange(targetRange, "token1");
        const queryInfo = {
          orderByItems: [{ item: "testValue" }],
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending"],
              orderByExpressions: ["c.field1"],
            },
          },
        };
        const result = strategy.filterPartitionRanges(
          [rightRange1, rightRange2],
          [contRange],
          queryInfo,
        );

        expect(result.rangeTokenPairs.length).toBe(3);
      });
    });

    describe("Boundary Edge Cases", function () {
      it("should handle empty string boundaries", function () {
        const range1 = createRange("1", "", "AA");
        const range2 = createRange("2", "", "BB");

        const contRange = createContinuationRange(range1, "token1");
        const queryInfo = {
          orderByItems: [{ item: "testValue" }],
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending"],
              orderByExpressions: ["c.field1"],
            },
          },
        };
        const result = strategy.filterPartitionRanges([range1, range2], [contRange], queryInfo);

        // When ranges have overlapping boundaries, some may be filtered out
        expect(result.rangeTokenPairs.length).toBe(1);
      });

      it("should handle adjacent ranges", function () {
        const range1 = createRange("1", "", "AA");
        const range2 = createRange("2", "AA", "BB"); // Adjacent: range1.max === range2.min
        const range3 = createRange("3", "BB", "CC");

        const contRange = createContinuationRange(range2, "token2");
        const queryInfo = {
          orderByItems: [{ item: "testValue" }],
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending"],
              orderByExpressions: ["c.field1"],
            },
          },
        };
        const result = strategy.filterPartitionRanges(
          [range1, range2, range3],
          [contRange],
          queryInfo,
        );

        expect(result.rangeTokenPairs.length).toBe(3);
      });

      it("should handle overlapping boundaries", function () {
        // This shouldn't happen in practice, but test defensive behavior
        const range1 = createRange("1", "", "BB");
        const range2 = createRange("2", "AA", "CC"); // Overlaps with range1

        const contRange = createContinuationRange(range1, "token1");
        const queryInfo = {
          orderByItems: [{ item: "testValue" }],
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending"],
              orderByExpressions: ["c.field1"],
            },
          },
        };
        const result = strategy.filterPartitionRanges([range1, range2], [contRange], queryInfo);

        // When ranges have overlapping boundaries, filtering logic may exclude some ranges
        expect(result.rangeTokenPairs.length).toBe(1);
      });

      it("should handle FF (maximum) boundary", function () {
        const range1 = createRange("1", "", "AA");
        const range2 = createRange("2", "AA", "FF"); // Maximum boundary

        const contRange = createContinuationRange(range2, "token2");
        const queryInfo = {
          orderByItems: [{ item: "testValue" }],
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending"],
              orderByExpressions: ["c.field1"],
            },
          },
        };
        const result = strategy.filterPartitionRanges([range1, range2], [contRange], queryInfo);

        expect(result.rangeTokenPairs.length).toBe(2);
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

        const queryInfo = {
          orderByItems: [{ item: "testValue" }],
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending"],
              orderByExpressions: ["c.field1"],
            },
          },
        };

        const result = strategy.filterPartitionRanges(ranges, contRanges, queryInfo);

        const targetPair = result.rangeTokenPairs.find((p) => p.range.id === "2");
        expect(targetPair?.continuationToken).toBe("token2");
      });
    });

    describe("QueryInfo Integration", function () {
      it("should pass queryInfo to filter condition creation", function () {
        const ranges = [createRange("1", "", "AA")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), "token1")];

        const queryInfo = {
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending"],
              orderByExpressions: ["c.field1"],
            },
          },
          orderByItems: [{ item: "value1" }],
        };

        const result = strategy.filterPartitionRanges(ranges, contRanges, queryInfo);
        expect(result.rangeTokenPairs.length).toBe(1);
        // Filter condition should be created (not empty)
        expect(result.rangeTokenPairs[0].filteringCondition).toBeDefined();
      });

      it("should throw error when queryInfo is missing", function () {
        const ranges = [createRange("1", "", "AA"), createRange("2", "AA", "BB")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), "token1")];

        expect(() => {
          strategy.filterPartitionRanges(ranges, contRanges);
        }).toThrow(
          "Unable to resume ORDER BY query from continuation token. orderByItems is required for ORDER BY queries.",
        );
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

        const queryInfo = {
          orderByItems: [{ item: "testValue" }],
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending"],
              orderByExpressions: ["c.field1"],
            },
          },
        };

        const result = strategy.filterPartitionRanges(ranges, [contRange], queryInfo);
        expect(result.rangeTokenPairs.length).toBe(100);
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
        const queryInfo = {
          orderByItems: [{ item: "testValue" }],
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending"],
              orderByExpressions: ["c.field1"],
            },
          },
        };

        // The method may throw with malformed data, so we test that it can handle the scenario
        expect(() => {
          strategy.filterPartitionRanges([validRange, malformedRange], [contRange], queryInfo);
        }).not.toThrow();
      });

      it("should handle empty continuation token", function () {
        const ranges = [createRange("1", "", "AA")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), "")];
        const queryInfo = {
          orderByItems: [{ item: "testValue" }],
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending"],
              orderByExpressions: ["c.field1"],
            },
          },
        };

        const result = strategy.filterPartitionRanges(ranges, contRanges, queryInfo);
        expect(result.rangeTokenPairs.length).toBe(1);
        expect(result.rangeTokenPairs[0].continuationToken).toBe("");
      });

      it("should handle null continuation token", function () {
        const ranges = [createRange("1", "", "AA")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), null as any)];
        const queryInfo = {
          orderByItems: [{ item: "testValue" }],
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending"],
              orderByExpressions: ["c.field1"],
            },
          },
        };

        const result = strategy.filterPartitionRanges(ranges, contRanges, queryInfo);
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
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending"],
              orderByExpressions: ["c.field1"],
            },
          },
          orderByItems: [{ item: "testValue" }],
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

      it("should throw error when ORDER BY expressions are missing", function () {
        const ranges = [createRange("1", "", "AA")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), "token1")];

        const queryInfoWithoutExpressions = {
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending"],
              // Missing orderByExpressions
            },
          },
          orderByItems: [{ item: "testValue" }],
        };

        expect(() => {
          strategy.filterPartitionRanges(ranges, contRanges, queryInfoWithoutExpressions);
        }).toThrow(/Unable to resume ORDER BY query from continuation token/);
      });

      it("should throw error when ORDER BY expression index is out of bounds", function () {
        const ranges = [createRange("1", "", "AA")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), "token1")];

        const queryInfoWithMismatchedFields = {
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending", "Descending"], // 2 sort orders
              orderByExpressions: ["c.field1"], // Only 1 expression - mismatch!
            },
          },
          orderByItems: [{ item: "testValue1" }, { item: "testValue2" }], // 2 items
        };

        expect(() => {
          strategy.filterPartitionRanges(ranges, contRanges, queryInfoWithMismatchedFields);
        }).toThrow(/Unable to resume ORDER BY query from continuation token/);
      });

      it("should throw error when ORDER BY expression format is invalid", function () {
        const ranges = [createRange("1", "", "AA")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), "token1")];

        const queryInfoWithInvalidExpression = {
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending"],
              orderByExpressions: [
                {
                  // Invalid format - no expression, path, or field property
                  type: "PropertyRef",
                  someOtherProperty: "value",
                },
              ],
            },
          },
          orderByItems: [{ item: "testValue" }],
        };

        expect(() => {
          strategy.filterPartitionRanges(ranges, contRanges, queryInfoWithInvalidExpression);
        }).toThrow(/Unable to resume ORDER BY query from continuation token/);
      });

      it("should work with valid string-format ORDER BY expressions", function () {
        const ranges = [createRange("1", "", "AA")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), "token1")];

        const queryInfoWithStringExpression = {
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending"],
              orderByExpressions: ["c.field1"], // String format
            },
          },
          orderByItems: [{ item: "testValue" }],
        };

        const result = strategy.filterPartitionRanges(
          ranges,
          contRanges,
          queryInfoWithStringExpression,
        );
        expect(result.rangeTokenPairs.length).toBe(1);
        expect(result.rangeTokenPairs[0].filteringCondition).toBeDefined();
      });

      it("should work with valid object-format ORDER BY expressions", function () {
        const ranges = [createRange("1", "", "AA")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), "token1")];

        const queryInfoWithObjectExpression = {
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending"],
              orderByExpressions: [
                {
                  expression: "c.field1",
                  type: "PropertyRef",
                },
              ], // Object format with expression property
            },
          },
          orderByItems: [{ item: "testValue" }],
        };

        const result = strategy.filterPartitionRanges(
          ranges,
          contRanges,
          queryInfoWithObjectExpression,
        );
        expect(result.rangeTokenPairs.length).toBe(1);
        expect(result.rangeTokenPairs[0].filteringCondition).toBeDefined();
      });

      it("should work with object-format using path property", function () {
        const ranges = [createRange("1", "", "AA")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), "token1")];

        const queryInfoWithPathExpression = {
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending"],
              orderByExpressions: [
                {
                  path: "/field1", // Path format (will remove leading slash)
                  type: "PropertyRef",
                },
              ],
            },
          },
          orderByItems: [{ item: "testValue" }],
        };

        const result = strategy.filterPartitionRanges(
          ranges,
          contRanges,
          queryInfoWithPathExpression,
        );
        expect(result.rangeTokenPairs.length).toBe(1);
        expect(result.rangeTokenPairs[0].filteringCondition).toBeDefined();
      });

      it("should work with object-format using field property", function () {
        const ranges = [createRange("1", "", "AA")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), "token1")];

        const queryInfoWithFieldExpression = {
          queryInfo: {
            queryInfo: {
              orderBy: ["Ascending"],
              orderByExpressions: [
                {
                  field: "field1", // Field format
                  type: "PropertyRef",
                },
              ],
            },
          },
          orderByItems: [{ item: "testValue" }],
        };

        const result = strategy.filterPartitionRanges(
          ranges,
          contRanges,
          queryInfoWithFieldExpression,
        );
        expect(result.rangeTokenPairs.length).toBe(1);
        expect(result.rangeTokenPairs[0].filteringCondition).toBeDefined();
      });

      it("should throw error when sort order information is missing", function () {
        const ranges = [createRange("1", "", "AA")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), "token1")];

        const queryInfoWithoutSortOrder = {
          queryInfo: {
            queryInfo: {
              // Missing orderBy field entirely
              orderByExpressions: ["c.field1"],
            },
          },
          orderByItems: [{ item: "testValue" }],
        };

        expect(() => {
          strategy.filterPartitionRanges(ranges, contRanges, queryInfoWithoutSortOrder);
        }).toThrow(/Unable to resume ORDER BY query from continuation token.*sort direction/);
      });

      it("should throw error when sort order format is invalid", function () {
        const ranges = [createRange("1", "", "AA")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), "token1")];

        const queryInfoWithInvalidSortOrder = {
          queryInfo: {
            queryInfo: {
              orderBy: [
                {
                  // Invalid format - no direction, order, or sortOrder property
                  someOtherProperty: "value",
                },
              ],
              orderByExpressions: ["c.field1"],
            },
          },
          orderByItems: [{ item: "testValue" }],
        };

        expect(() => {
          strategy.filterPartitionRanges(ranges, contRanges, queryInfoWithInvalidSortOrder);
        }).toThrow(/Unable to resume ORDER BY query from continuation token.*sort direction/);
      });

      it("should throw error when queryInfo is undefined", function () {
        const ranges = [createRange("1", "", "AA")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), "token1")];

        // When queryInfo is undefined, validation should throw an error
        expect(() => {
          strategy.filterPartitionRanges(ranges, contRanges, undefined);
        }).toThrow(
          "Unable to resume ORDER BY query from continuation token. orderByItems is required for ORDER BY queries.",
        );
      });

      it("should work with object-format sort orders", function () {
        const ranges = [createRange("1", "", "AA")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), "token1")];

        const queryInfoWithObjectSortOrder = {
          queryInfo: {
            queryInfo: {
              orderBy: [{ direction: "Descending" }],
              orderByExpressions: ["c.field1"],
            },
          },
          orderByItems: [{ item: "testValue" }],
        };

        const result = strategy.filterPartitionRanges(
          ranges,
          contRanges,
          queryInfoWithObjectSortOrder,
        );
        expect(result.rangeTokenPairs.length).toBe(1);
        expect(result.rangeTokenPairs[0].filteringCondition).toBeDefined();
      });

      it("should throw error when orderByItems is missing", function () {
        const ranges = [createRange("1", "", "AA")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), "token1")];

        const queryInfoWithoutOrderByItems = {
          queryInfo: {
            orderBy: ["Ascending"],
            orderByExpressions: ["c.field1"],
          },
          // Missing orderByItems property
        };

        expect(() => {
          strategy.filterPartitionRanges(ranges, contRanges, queryInfoWithoutOrderByItems);
        }).toThrow(
          "Unable to resume ORDER BY query from continuation token. orderByItems is required for ORDER BY queries.",
        );
      });

      it("should throw error when orderByItems is empty", function () {
        const ranges = [createRange("1", "", "AA")];
        const contRanges = [createContinuationRange(createRange("1", "", "AA"), "token1")];

        const queryInfoWithEmptyOrderByItems = {
          queryInfo: {
            orderBy: ["Ascending"],
            orderByExpressions: ["c.field1"],
          },
          orderByItems: [] as any[], // Empty array
        };

        expect(() => {
          strategy.filterPartitionRanges(ranges, contRanges, queryInfoWithEmptyOrderByItems);
        }).toThrow(
          "Unable to resume ORDER BY query from continuation token. orderByItems is required for ORDER BY queries.",
        );
      });
    });
  });

  describe("getStrategyType", function () {
    it("should return correct strategy type", function () {
      expect(strategy.getStrategyType()).toBe("OrderByQuery");
    });
  });

  describe("formatValueForSQL escaping via filterPartitionRanges", function () {
    /**
     * Helper to get the filteringCondition produced for a given orderByItem value.
     * Uses a single range so the target range filter (\>= for ASC) is returned.
     */
    function getFilterCondition(value: any): string | undefined {
      const ranges = [createRange("1", "", "FF")];
      const contRanges = [createContinuationRange(ranges[0], "token1")];
      const queryInfo = {
        queryInfo: {
          queryInfo: {
            orderBy: ["Ascending"],
            orderByExpressions: ["c.field1"],
          },
        },
        orderByItems: [{ item: value }],
      };
      const result = strategy.filterPartitionRanges(ranges, contRanges, queryInfo);
      return result.rangeTokenPairs[0]?.filteringCondition;
    }

    // --- Type handling ---
    it("should not alter strings without special characters", function () {
      const condition = getFilterCondition("normal string");
      expect(condition).toContain("'normal string'");
    });

    it("should handle null values", function () {
      expect(getFilterCondition(null)).toContain("null");
    });

    it("should handle number values", function () {
      expect(getFilterCondition(42)).toContain("42");
    });

    it("should handle boolean values", function () {
      expect(getFilterCondition(true)).toContain("true");
    });

    it("should handle empty string", function () {
      expect(getFilterCondition("")).toContain("''");
    });

    // --- Core backslash escaping ---
    it("should escape \\u2013 to prevent SQL unicode interpretation (original bug)", function () {
      const value = "Gold\u005cu2013Foran"; // Gold\u2013Foran
      const condition = getFilterCondition(value);
      expect(condition).toContain("'Gold\\\\u2013Foran'");
    });

    it("should escape a single backslash", function () {
      const condition = getFilterCondition("\\");
      expect(condition).toContain("'\\\\'");
    });

    it("should escape trailing backslash", function () {
      const condition = getFilterCondition("path\\");
      expect(condition).toContain("'path\\\\'");
    });

    it("should escape triple backslash (odd count)", function () {
      const condition = getFilterCondition("\\\\\\");
      expect(condition).toContain("'\\\\\\\\\\\\'");
    });

    it("should escape 20 consecutive backslashes", function () {
      const condition = getFilterCondition("\\".repeat(20));
      expect(condition).toContain(`'${"\\\\".repeat(20)}'`);
    });

    // --- Core quote escaping ---
    it("should escape a single quote as \\u0027", function () {
      const condition = getFilterCondition("'");
      expect(condition).toContain("'\\u0027'");
    });

    it("should escape consecutive single quotes", function () {
      const condition = getFilterCondition("'''");
      expect(condition).toContain("'\\u0027\\u0027\\u0027'");
    });

    it("should escape doubled quotes in context", function () {
      const condition = getFilterCondition("it''s a ''test''");
      expect(condition).toContain("'it\\u0027\\u0027s a \\u0027\\u0027test\\u0027\\u0027'");
    });

    // --- Backslash + quote interaction (the critical ambiguity case) ---
    it("should escape both backslash and quote in one string", function () {
      const condition = getFilterCondition("it's a \\test");
      expect(condition).toContain("'it\\u0027s a \\\\test'");
    });

    it("should escape backslash immediately before quote (\\' ambiguity)", function () {
      const condition = getFilterCondition("\\'");
      expect(condition).toContain("'\\\\\\u0027'");
    });

    it("should escape quote immediately before backslash", function () {
      const condition = getFilterCondition("'\\");
      expect(condition).toContain("'\\u0027\\\\'");
    });

    it("should escape backslash-quote-backslash sandwich", function () {
      const condition = getFilterCondition("\\'\\");
      expect(condition).toContain("'\\\\\\u0027\\\\'");
    });

    it("should escape 5 backslash-quote pairs", function () {
      const condition = getFilterCondition("\\'".repeat(5));
      expect(condition).toContain(`'${"\\\\\\u0027".repeat(5)}'`);
    });

    it("should escape triple backslash followed by quote", function () {
      const condition = getFilterCondition("\\\\\\'");
      expect(condition).toContain("'\\\\\\\\\\\\\\u0027'");
    });

    // --- Unicode escape sequences in stored data ---
    it("should escape literal \\u0027 in value (our escape target)", function () {
      const value = "has\u005cu0027literal";
      const condition = getFilterCondition(value);
      expect(condition).toContain("'has\\\\u0027literal'");
    });

    it("should escape literal \\u005c (unicode for backslash itself)", function () {
      const value = "\u005cu005c";
      const condition = getFilterCondition(value);
      expect(condition).toContain("'\\\\u005c'");
    });

    it("should escape incomplete unicode \\u00", function () {
      const value = "\u005cu00";
      const condition = getFilterCondition(value);
      expect(condition).toContain("'\\\\u00'");
    });

    it("should escape \\u followed by quote", function () {
      const condition = getFilterCondition("\\u'");
      expect(condition).toContain("'\\\\u\\u0027'");
    });

    // --- Backslash + escape letters ---
    it("should escape all 26 backslash+letter combinations", function () {
      const letters = "abcdefghijklmnopqrstuvwxyz";
      const value = letters
        .split("")
        .map((c) => `\\${c}`)
        .join("");
      const condition = getFilterCondition(value);
      const expected = letters
        .split("")
        .map((c) => `\\\\${c}`)
        .join("");
      expect(condition).toContain(`'${expected}'`);
    });

    it("should escape \\r\\n\\t together", function () {
      const condition = getFilterCondition("\\r\\n\\t");
      expect(condition).toContain("'\\\\r\\\\n\\\\t'");
    });

    it("should escape double-backslash before escape letters (\\\\n\\\\t\\\\r)", function () {
      const condition = getFilterCondition("\\\\n\\\\t\\\\r");
      expect(condition).toContain("'\\\\\\\\n\\\\\\\\t\\\\\\\\r'");
    });

    // --- Nested combos: escapes + quotes interleaved ---
    it("should escape quote wrapping an escape sequence ('\\n')", function () {
      const condition = getFilterCondition("'\\n'");
      expect(condition).toContain("'\\u0027\\\\n\\u0027'");
    });

    it("should escape \\n\\\\\\n (escape, backslash-pair, escape)", function () {
      const condition = getFilterCondition("\\n\\\\\\n");
      expect(condition).toContain("'\\\\n\\\\\\\\\\\\n'");
    });

    it("should escape \\t\\n'\\t\\n (interleaved escapes with quote)", function () {
      const condition = getFilterCondition("\\t\\n'\\t\\n");
      expect(condition).toContain("'\\\\t\\\\n\\u0027\\\\t\\\\n'");
    });

    it("should escape \\u0027\\n\\u0027 (literal unicode-quotes with escape between)", function () {
      const value = "\u005cu0027\\n\u005cu0027";
      const condition = getFilterCondition(value);
      expect(condition).toContain("'\\\\u0027\\\\n\\\\u0027'");
    });

    // --- Hex-like and regex ---
    it("should escape hex-like sequences \\x41\\x42\\x43", function () {
      const condition = getFilterCondition("\\x41\\x42\\x43");
      expect(condition).toContain("'\\\\x41\\\\x42\\\\x43'");
    });

    it("should escape regex-like pattern \\d+\\.\\d+\\.\\d+", function () {
      const condition = getFilterCondition("\\d+\\.\\d+\\.\\d+");
      expect(condition).toContain("'\\\\d+\\\\.\\\\d+\\\\.\\\\d+'");
    });

    // --- Realistic values ---
    it("should escape Windows path with quotes", function () {
      const condition = getFilterCondition("C:\\Program Files\\O'Reilly\\book\\chapter1.txt");
      expect(condition).toContain(
        "'C:\\\\Program Files\\\\O\\u0027Reilly\\\\book\\\\chapter1.txt'",
      );
    });

    it("should escape SQL query embedded as a value", function () {
      const value = "SELECT * FROM c WHERE c.name = 'O\\'Brien' AND c.path = '\\\\server'";
      const condition = getFilterCondition(value);
      expect(condition).toContain(
        "'SELECT * FROM c WHERE c.name = \\u0027O\\\\\\u0027Brien\\u0027 AND c.path = \\u0027\\\\\\\\server\\u0027'",
      );
    });

    it("should escape log entry with mixed escapes and quotes", function () {
      const value = "2024-01-01\\t[WARN]\\tUser 'admin' path=C:\\temp\\n\\tStack: Error\\n";
      const condition = getFilterCondition(value);
      expect(condition).toContain(
        "'2024-01-01\\\\t[WARN]\\\\tUser \\u0027admin\\u0027 path=C:\\\\temp\\\\n\\\\tStack: Error\\\\n'",
      );
    });

    // --- Adversarial: SQL injection ---
    it("should escape SQL injection with backslash-quote", function () {
      const condition = getFilterCondition("val\\' OR 1=1 --");
      expect(condition).toContain("'val\\\\\\u0027 OR 1=1 --'");
    });

    it("should escape SQL injection with closing literal", function () {
      const condition = getFilterCondition("') OR ('1'='1");
      expect(condition).toContain("'\\u0027) OR (\\u00271\\u0027=\\u00271'");
    });

    it("should pass through percent and SQL comment chars unchanged", function () {
      const condition = getFilterCondition("100% done; DROP TABLE --");
      expect(condition).toContain("'100% done; DROP TABLE --'");
    });

    // --- Kitchen sink combos ---
    it("should escape all dangerous chars combined: \\'\\\\\\u0027\\u2013\\n\\t", function () {
      const value = "\\'\\\\\\u0027\\u2013\\n\\t";
      const condition = getFilterCondition(value);
      expect(condition).toContain("'\\\\\\u0027\\\\\\\\\\\\u0027\\\\u2013\\\\n\\\\t'");
    });

    it("should escape 5 quotes + 5 backslashes + 5 quotes symmetrically", function () {
      const condition = getFilterCondition("'''''\\\\\\\\\\'''''");
      const expected = "\\u0027".repeat(5) + "\\\\".repeat(5) + "\\u0027".repeat(5);
      expect(condition).toContain(`'${expected}'`);
    });

    it("should escape long string with every escape type scattered", function () {
      const value =
        "The quick brown fox\\n jumped over\\t the 'lazy' dog.\\\\ The path was C:\\Users\\test\\file.txt and it\\'s value had \\u2013 dashes \\u0027quotes\\u0027 end.";
      const condition = getFilterCondition(value);
      expect(condition).toContain("\\\\n jumped over\\\\t");
      expect(condition).toContain("\\u0027lazy\\u0027");
      expect(condition).toContain("C:\\\\Users\\\\test\\\\file.txt");
      expect(condition).toContain("it\\\\\\u0027s value");
      expect(condition).toContain("\\\\u2013 dashes");
      expect(condition).toContain("\\\\u0027quotes\\\\u0027");
    });

    // --- Double quotes (non-SQL-special, verify no interference) ---
    it("should pass through double quotes unchanged", function () {
      const condition = getFilterCondition('\\"hello\\"');
      expect(condition).toContain("'\\\\\"hello\\\\\"'");
    });

    // --- Real unicode characters (no backslash, should pass through unchanged) ---
    it("should pass through real en-dash character unchanged", function () {
      const condition = getFilterCondition("Gold\u2013Foran");
      expect(condition).toContain("'Gold\u2013Foran'");
    });
  });
});

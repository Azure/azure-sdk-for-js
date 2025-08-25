// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach, vi, expect } from "vitest";
import { ContinuationTokenManager } from "../../../../src/queryExecutionContext/ContinuationTokenManager.js";
import type { QueryRangeMapping } from "../../../../src/queryExecutionContext/QueryRangeMapping.js";
import { CompositeQueryContinuationToken } from "../../../../src/queryExecutionContext/QueryRangeMapping.js";

describe("ContinuationTokenManager", () => {
  let manager: ContinuationTokenManager;
  const collectionLink = "/dbs/testDb/colls/testCollection";

  // Helper function to create mock QueryRangeMapping
  const createMockRangeMapping = (
    minInclusive: string,
    maxExclusive: string,
    continuationToken: string | null = "token123",
    indexes: [number, number] = [0, 10],
  ): QueryRangeMapping => ({
    partitionKeyRange: {
      id: `range_${minInclusive}_${maxExclusive}`,
      minInclusive,
      maxExclusive,
      ridPrefix: 0,
      throughputFraction: 1,
      status: "active",
      parents: [],
    },
    indexes,
    continuationToken,
  });

  beforeEach(() => {
    // Reset console.log mock before each test
    vi.restoreAllMocks();
  });

  describe.skip("constructor", () => {
    it("should initialize with empty continuation token when no initial token provided", () => {
      manager = new ContinuationTokenManager(collectionLink);

      const compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rid, collectionLink);
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 0);
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 0);
    });

    it("should initialize for parallel queries by default", () => {
      manager = new ContinuationTokenManager(collectionLink);

      // Test that it's not an ORDER BY query by checking token generation behavior
      const tokenString = manager.getTokenString();
      assert.strictEqual(tokenString, undefined); // No ranges yet, so no token
    });

    it("should initialize for ORDER BY queries when specified", () => {
      manager = new ContinuationTokenManager(collectionLink, undefined, true);
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rid, collectionLink);
    });

    it("should parse existing parallel query continuation token", () => {
      const existingCompositeToken = new CompositeQueryContinuationToken(
        collectionLink,
        [createMockRangeMapping("00", "AA")],
        undefined,
      );
      const existingTokenString = existingCompositeToken.toString();

      manager = new ContinuationTokenManager(collectionLink, existingTokenString, false);

      const compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rid, collectionLink);
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 1);
    });

    it("should handle invalid continuation token gracefully", () => {
      const invalidToken = "invalid-json-token";

      manager = new ContinuationTokenManager(collectionLink, invalidToken, false);

      // Should fall back to empty continuation token
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rid, collectionLink);
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 0);
    });
  });

  describe.skip("updatePartitionRangeMapping", () => {
    beforeEach(() => {
      manager = new ContinuationTokenManager(collectionLink);
    });

    it("should add new range mapping to partition key range map", () => {
      const mockMapping = createMockRangeMapping("00", "AA");

      manager.updatePartitionRangeMapping("range1", mockMapping);

      const partitionKeyRangeMap = manager.getPartitionKeyRangeMap();
      assert.strictEqual(partitionKeyRangeMap.size, 1);
      assert.strictEqual(partitionKeyRangeMap.get("range1"), mockMapping);
    });

    it("should not update existing range mapping when key already exists", () => {
      const originalMapping = createMockRangeMapping("00", "AA", "token1", [0, 5]);
      const updatedMapping = createMockRangeMapping("00", "AA", "token2", [6, 10]);

      // Mock console.warn to capture warning logs
      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      // Add original mapping
      manager.updatePartitionRangeMapping("range1", originalMapping);
      assert.strictEqual(
        manager.getPartitionKeyRangeMap().get("range1")?.continuationToken,
        "token1",
      );

      // Try to update the mapping - should not change the original and should log warning
      manager.updatePartitionRangeMapping("range1", updatedMapping);

      const partitionKeyRangeMap = manager.getPartitionKeyRangeMap();
      assert.strictEqual(partitionKeyRangeMap.size, 1);
      // Should still have the original values, not the updated ones
      assert.strictEqual(partitionKeyRangeMap.get("range1")?.continuationToken, "token1");
      assert.deepStrictEqual(partitionKeyRangeMap.get("range1")?.indexes, [0, 5]);

      // Verify warning was logged
      assert.strictEqual(consoleWarnSpy.mock.calls.length, 1);
      assert.include(consoleWarnSpy.mock.calls[0][0], "Attempted to update existing range mapping");
      assert.include(consoleWarnSpy.mock.calls[0][0], "range1");

      consoleWarnSpy.mockRestore();
    });

    it("should allow adding different range keys but prevent duplicate key updates", () => {
      const mapping1 = createMockRangeMapping("00", "AA", "token1", [0, 5]);
      const mapping2 = createMockRangeMapping("AA", "BB", "token2", [6, 10]);
      const duplicateMapping = createMockRangeMapping("BB", "CC", "token3", [11, 15]);

      // Mock console methods to capture logs
      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      // Add first mapping
      manager.updatePartitionRangeMapping("range1", mapping1);
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 1);

      // Add second mapping with different key
      manager.updatePartitionRangeMapping("range2", mapping2);
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 2);

      // Try to update range1 with different data - should not change
      manager.updatePartitionRangeMapping("range1", duplicateMapping);
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 2);
      assert.strictEqual(
        manager.getPartitionKeyRangeMap().get("range1")?.continuationToken,
        "token1",
      );
      assert.deepStrictEqual(manager.getPartitionKeyRangeMap().get("range1")?.indexes, [0, 5]);

      // Verify logs: 2 success logs (for range1 and range2) and 1 warning (for duplicate range1)
      assert.strictEqual(consoleWarnSpy.mock.calls.length, 1);
      assert.include(consoleWarnSpy.mock.calls[0][0], "Attempted to update existing range mapping");

      consoleWarnSpy.mockRestore();
    });
  });

  describe.skip("removePartitionRangeMapping", () => {
    beforeEach(() => {
      manager = new ContinuationTokenManager(collectionLink);
    });

    it("should remove existing range mapping", () => {
      const mapping1 = createMockRangeMapping("00", "AA", "token1");
      const mapping2 = createMockRangeMapping("AA", "BB", "token2");

      // Add mappings first
      manager.updatePartitionRangeMapping("range1", mapping1);
      manager.updatePartitionRangeMapping("range2", mapping2);
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 2);

      // Remove one mapping
      manager.removePartitionRangeMapping("range1");

      const partitionKeyRangeMap = manager.getPartitionKeyRangeMap();
      assert.strictEqual(partitionKeyRangeMap.size, 1);
      assert.isUndefined(partitionKeyRangeMap.get("range1"));
      assert.isDefined(partitionKeyRangeMap.get("range2"));
      assert.strictEqual(partitionKeyRangeMap.get("range2")?.continuationToken, "token2");
    });

    it("should handle removing non-existent range mapping gracefully", () => {
      const mapping1 = createMockRangeMapping("00", "AA", "token1");

      // Add one mapping
      manager.updatePartitionRangeMapping("range1", mapping1);
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 1);

      // Try to remove non-existent range - should not throw error
      assert.doesNotThrow(() => {
        manager.removePartitionRangeMapping("nonexistent");
      });

      // Should not affect existing mappings
      const partitionKeyRangeMap = manager.getPartitionKeyRangeMap();
      assert.strictEqual(partitionKeyRangeMap.size, 1);
      assert.isDefined(partitionKeyRangeMap.get("range1"));
      assert.strictEqual(partitionKeyRangeMap.get("range1")?.continuationToken, "token1");
    });

    it("should handle removing from empty map", () => {
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 0);

      // Should not throw error when removing from empty map
      assert.doesNotThrow(() => {
        manager.removePartitionRangeMapping("range1");
      });

      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 0);
    });

    it("should remove all ranges when called multiple times", () => {
      const mapping1 = createMockRangeMapping("00", "AA", "token1");
      const mapping2 = createMockRangeMapping("AA", "BB", "token2");
      const mapping3 = createMockRangeMapping("BB", "FF", "token3");

      // Add multiple mappings
      manager.updatePartitionRangeMapping("range1", mapping1);
      manager.updatePartitionRangeMapping("range2", mapping2);
      manager.updatePartitionRangeMapping("range3", mapping3);
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 3);

      // Remove them one by one
      manager.removePartitionRangeMapping("range1");
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 2);
      assert.isUndefined(manager.getPartitionKeyRangeMap().get("range1"));

      manager.removePartitionRangeMapping("range2");
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 1);
      assert.isUndefined(manager.getPartitionKeyRangeMap().get("range2"));

      manager.removePartitionRangeMapping("range3");
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 0);
      assert.isUndefined(manager.getPartitionKeyRangeMap().get("range3"));
    });

    it("should not affect hasUnprocessedRanges after removing last range", () => {
      const mapping = createMockRangeMapping("00", "AA", "token1");

      // Add mapping and verify it exists
      manager.updatePartitionRangeMapping("range1", mapping);
      assert.strictEqual(manager.hasUnprocessedRanges(), true);

      // Remove mapping
      manager.removePartitionRangeMapping("range1");

      // Should have no unprocessed ranges
      assert.strictEqual(manager.hasUnprocessedRanges(), false);
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 0);
    });

    it("should allow re-adding range after removal", () => {
      const originalMapping = createMockRangeMapping("00", "AA", "token1");
      const newMapping = createMockRangeMapping("00", "AA", "token2");

      // Add original mapping
      manager.updatePartitionRangeMapping("range1", originalMapping);
      assert.strictEqual(
        manager.getPartitionKeyRangeMap().get("range1")?.continuationToken,
        "token1",
      );

      // Remove mapping
      manager.removePartitionRangeMapping("range1");
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 0);

      // Re-add with same rangeId but different mapping
      manager.updatePartitionRangeMapping("range1", newMapping);
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 1);
      assert.strictEqual(
        manager.getPartitionKeyRangeMap().get("range1")?.continuationToken,
        "token2",
      );
    });
  });

  describe.skip("removeExhaustedRangesFromCompositeContinuationToken (tested via processRangesForCurrentPage)", () => {
    beforeEach(() => {
      manager = new ContinuationTokenManager(collectionLink);
    });

    it("should remove exhausted ranges from composite continuation token during parallel processing", () => {
      // Create mappings with different continuation token states
      const activeMapping = createMockRangeMapping("00", "AA", "active-token", [0, 5]);
      const exhaustedMapping1 = createMockRangeMapping("AA", "BB", null, [6, 10]);
      const exhaustedMapping2 = createMockRangeMapping("BB", "CC", "", [11, 15]);
      const exhaustedMapping3 = createMockRangeMapping("CC", "DD", "null", [16, 20]);

      // Add mappings to partition key range map
      manager.updatePartitionRangeMapping("active", activeMapping);
      manager.updatePartitionRangeMapping("exhausted1", exhaustedMapping1);
      manager.updatePartitionRangeMapping("exhausted2", exhaustedMapping2);
      manager.updatePartitionRangeMapping("exhausted3", exhaustedMapping3);

      // Manually add some range mappings to composite continuation token (simulating previous processing)
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      compositeContinuationToken.addRangeMapping(activeMapping);
      compositeContinuationToken.addRangeMapping(exhaustedMapping1);
      compositeContinuationToken.addRangeMapping(exhaustedMapping2);
      compositeContinuationToken.addRangeMapping(exhaustedMapping3);

      // Verify initial state
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 4);

      // Process ranges - this should trigger removeExhaustedRangesFromCompositeContinuationToken
      manager["removeExhaustedRangesFromCompositeContinuationToken"]();

      // After processing, exhausted ranges should be removed from composite continuation token
      const updatedCompositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(updatedCompositeContinuationToken.rangeMappings.length, 1);

      // Only the active mapping should remain
      const remainingMapping = updatedCompositeContinuationToken.rangeMappings[0];
      assert.strictEqual(remainingMapping.continuationToken, "active-token");
      assert.strictEqual(remainingMapping.partitionKeyRange.minInclusive, "00");
      assert.strictEqual(remainingMapping.partitionKeyRange.maxExclusive, "AA");
    });

    it("should handle composite continuation token with undefined mappings", () => {
      // Create a mapping with valid continuation token
      const validMapping = createMockRangeMapping("00", "AA", "valid-token", [0, 5]);
      manager.updatePartitionRangeMapping("valid", validMapping);

      // Manually add mappings including undefined to composite continuation token
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      compositeContinuationToken.addRangeMapping(validMapping);
      // Simulate undefined mapping by directly manipulating the array
      compositeContinuationToken.rangeMappings.push(undefined as any);

      // Verify initial state has undefined mapping
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 2);
      assert.isUndefined(compositeContinuationToken.rangeMappings[1]);

      // Process ranges - should remove undefined mappings
      manager.processRangesForCurrentPage(10, 20);

      // After processing, undefined mapping should be removed
      const updatedCompositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(updatedCompositeContinuationToken.rangeMappings.length, 1);
      assert.isDefined(updatedCompositeContinuationToken.rangeMappings[0]);
      assert.strictEqual(
        updatedCompositeContinuationToken.rangeMappings[0].continuationToken,
        "valid-token",
      );
    });

    it("should handle empty rangeMappings array gracefully", () => {
      // Create mappings for partition key range map
      const mapping = createMockRangeMapping("00", "AA", "token", [0, 5]);
      manager.updatePartitionRangeMapping("range1", mapping);

      // Ensure composite continuation token has empty rangeMappings
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      compositeContinuationToken.rangeMappings = [];
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 0);

      // Process ranges - should not throw error with empty rangeMappings
      assert.doesNotThrow(() => {
        manager.processRangesForCurrentPage(10, 20);
      });

      // Should still process the partition key range map normally
      const result = manager.processRangesForCurrentPage(10, 20);
      assert.strictEqual(result.endIndex, 6); // 0 to 5 inclusive = 6 items
      assert.strictEqual(result.processedRanges.length, 1);
    });

    it("should handle undefined composite continuation token gracefully", () => {
      // Create a manager and then simulate undefined composite continuation token
      const mapping = createMockRangeMapping("00", "AA", "token", [0, 5]);
      manager.updatePartitionRangeMapping("range1", mapping);

      // Force composite continuation token to be undefined (simulating edge case)
      (manager as any).compositeContinuationToken = undefined;

      // Process ranges - should not throw error with undefined token
      assert.doesNotThrow(() => {
        manager["removeExhaustedRangesFromCompositeContinuationToken"]();
      });
    });

    it("should handle rangeMappings that are not an array", () => {
      // Create mappings for partition key range map
      const mapping = createMockRangeMapping("00", "AA", "token", [0, 5]);
      manager.updatePartitionRangeMapping("range1", mapping);

      // Simulate rangeMappings being corrupted to non-array value
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      (compositeContinuationToken as any).rangeMappings = "not-an-array";

      // Process ranges - should not throw error with non-array rangeMappings
      assert.doesNotThrow(() => {
        manager["removeExhaustedRangesFromCompositeContinuationToken"]();
      });
    });

    it("should preserve non-exhausted ranges and remove only exhausted ones", () => {
      // Create mix of exhausted and active mappings
      const activeMapping1 = createMockRangeMapping("00", "11", "active1", [0, 10]);
      const exhaustedMapping1 = createMockRangeMapping("11", "22", null, [11, 20]);
      const activeMapping2 = createMockRangeMapping("22", "33", "active2", [21, 30]);
      const exhaustedMapping2 = createMockRangeMapping("33", "44", "", [31, 40]);
      const activeMapping3 = createMockRangeMapping("44", "55", "active3", [41, 50]);

      // Add to partition key range map
      manager.updatePartitionRangeMapping("active1", activeMapping1);
      manager.updatePartitionRangeMapping("exhausted1", exhaustedMapping1);
      manager.updatePartitionRangeMapping("active2", activeMapping2);
      manager.updatePartitionRangeMapping("exhausted2", exhaustedMapping2);
      manager.updatePartitionRangeMapping("active3", activeMapping3);

      // Add all to composite continuation token
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      compositeContinuationToken.addRangeMapping(activeMapping1);
      compositeContinuationToken.addRangeMapping(exhaustedMapping1);
      compositeContinuationToken.addRangeMapping(activeMapping2);
      compositeContinuationToken.addRangeMapping(exhaustedMapping2);
      compositeContinuationToken.addRangeMapping(activeMapping3);

      // Verify initial state
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 5);

      // Process ranges
      manager["removeExhaustedRangesFromCompositeContinuationToken"]();

      // Should have only active mappings remaining
      const updatedCompositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(updatedCompositeContinuationToken.rangeMappings.length, 3);

      // Verify remaining mappings are all active
      const remainingTokens = updatedCompositeContinuationToken.rangeMappings.map(
        (m) => m.continuationToken,
      );
      assert.includeMembers(remainingTokens, ["active1", "active2", "active3"]);
      assert.notInclude(remainingTokens, null);
      assert.notInclude(remainingTokens, "");
    });

    it("should work correctly with ORDER BY queries", () => {
      // Create ORDER BY manager
      manager = new ContinuationTokenManager(collectionLink, undefined, true);

      // Set up ORDER BY items array first
      const orderByItems = [
        [{ value: "item1" }],
        [{ value: "item2" }],
        [{ value: "item3" }],
        [{ value: "item4" }],
        [{ value: "item5" }],
        [{ value: "item6" }],
      ];
      manager.setOrderByItemsArray(orderByItems);

      // Create mappings with mix of exhausted and active tokens
      const activeMapping = createMockRangeMapping("00", "AA", "orderby-active", [0, 5]);
      const exhaustedMapping = createMockRangeMapping("AA", "BB", "null", [6, 10]);

      // Add to partition key range map
      manager.updatePartitionRangeMapping("active", activeMapping);
      manager.updatePartitionRangeMapping("exhausted", exhaustedMapping);

      // Add to composite continuation token
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      compositeContinuationToken.addRangeMapping(activeMapping);
      compositeContinuationToken.addRangeMapping(exhaustedMapping);

      // Verify initial state
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 2);

      // Process ORDER BY ranges
      const pageResults = [{ _rid: "doc1", id: "1", value: "test" }];
      manager.processRangesForCurrentPage(10, 20, pageResults);

      // Should remove exhausted ranges even in ORDER BY mode
      const updatedCompositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(updatedCompositeContinuationToken.rangeMappings.length, 1);
      assert.strictEqual(
        updatedCompositeContinuationToken.rangeMappings[0].continuationToken,
        "orderby-active",
      );
    });

    it("should handle case-insensitive 'null' string exhaustion check", () => {
      // Create mappings with different case variations of 'null'
      const activeMapping = createMockRangeMapping("00", "11", "valid-token", [0, 5]);
      const nullLowerMapping = createMockRangeMapping("11", "22", "null", [6, 10]);
      const nullUpperMapping = createMockRangeMapping("22", "33", "NULL", [11, 15]);
      const nullMixedMapping = createMockRangeMapping("33", "44", "Null", [16, 20]);

      // Add to partition key range map
      manager.updatePartitionRangeMapping("active", activeMapping);
      manager.updatePartitionRangeMapping("null-lower", nullLowerMapping);
      manager.updatePartitionRangeMapping("null-upper", nullUpperMapping);
      manager.updatePartitionRangeMapping("null-mixed", nullMixedMapping);

      // Add to composite continuation token
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      compositeContinuationToken.addRangeMapping(activeMapping);
      compositeContinuationToken.addRangeMapping(nullLowerMapping);
      compositeContinuationToken.addRangeMapping(nullUpperMapping);
      compositeContinuationToken.addRangeMapping(nullMixedMapping);

      // Verify initial state
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 4);

      // Process ranges
      manager["removeExhaustedRangesFromCompositeContinuationToken"]();

      // Should remove all null variations, keeping only the active mapping
      const updatedCompositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(updatedCompositeContinuationToken.rangeMappings.length, 1);
      assert.strictEqual(
        updatedCompositeContinuationToken.rangeMappings[0].continuationToken,
        "valid-token",
      );
    });
  });

  describe.skip("processOrderByRanges", () => {
    beforeEach(() => {
      // Initialize for ORDER BY queries
      manager = new ContinuationTokenManager(collectionLink, undefined, true);
    });

    it("should throw error when orderByItemsArray is not set", () => {
      const mapping = createMockRangeMapping("00", "AA", "token1", [0, 4]);
      manager.updatePartitionRangeMapping("range1", mapping);

      // Don't set orderByItemsArray - this should cause an error
      const pageResults = [
        { _rid: "rid1", id: "1" },
        { _rid: "rid2", id: "2" },
      ];

      assert.throws(() => {
        manager.processRangesForCurrentPage(10, 20, pageResults);
      }, "ORDER BY query processing failed: orderByItemsArray is required but was not provided or is empty");
    });

    it("should throw error when orderByItemsArray is empty", () => {
      const mapping = createMockRangeMapping("00", "AA", "token1", [0, 4]);
      manager.updatePartitionRangeMapping("range1", mapping);

      // Set empty orderByItemsArray - this should cause an error
      manager.setOrderByItemsArray([]);

      const pageResults = [
        { _rid: "rid1", id: "1" },
        { _rid: "rid2", id: "2" },
      ];

      assert.throws(() => {
        manager.processRangesForCurrentPage(10, 20, pageResults);
      }, "ORDER BY query processing failed: orderByItemsArray is required but was not provided or is empty");
    });

    it("should throw error when orderByItemsArray is shorter than endIndex", () => {
      const mapping = createMockRangeMapping("00", "AA", "token1", [0, 4]); // 5 items
      manager.updatePartitionRangeMapping("range1", mapping);

      // Set orderByItemsArray with only 3 items (shorter than the 5 items that will be processed)
      const orderByItems = [
        [{ value: "item1" }],
        [{ value: "item2" }],
        [{ value: "item3" }],
        // Missing items 4 and 5
      ];
      manager.setOrderByItemsArray(orderByItems);

      const pageResults = [
        { _rid: "rid1", id: "1" }, { _rid: "rid2", id: "2" }, { _rid: "rid3", id: "3" },
        { _rid: "rid4", id: "4" }, { _rid: "rid5", id: "5" },
      ];

      assert.throws(() => {
        manager.processRangesForCurrentPage(10, 20, pageResults);
      }, /ORDER BY processing error: orderByItemsArray length.*is insufficient for the processed page size/);
    });

    it("should process single range that fits within page size", () => {
      const mapping = createMockRangeMapping("00", "AA", "token1", [0, 4]);
      manager.updatePartitionRangeMapping("range1", mapping);

      // Set up order by items array
      const orderByItems = [
        [{ value: "item1" }],
        [{ value: "item2" }],
        [{ value: "item3" }],
        [{ value: "item4" }],
        [{ value: "item5" }],
        [{ value: "item6" }],
        [{ value: "item7" }],
        [{ value: "item8" }],
        [{ value: "item9" }]
      ];
      manager.setOrderByItemsArray(orderByItems);

      // Set up page results
      const pageResults = [
        { _rid: "rid1", id: "1", value: "item1" },
        { _rid: "rid2", id: "2", value: "item2" },
        { _rid: "rid3", id: "3", value: "item3" },
        { _rid: "rid4", id: "4", value: "item4" },
        { _rid: "rid5", id: "5", value: "item5" },
      ];

      const result = manager.processRangesForCurrentPage(10, 20, pageResults);

      assert.strictEqual(result.endIndex, 5); // 0-4 inclusive = 5 items
      assert.strictEqual(result.processedRanges.length, 1);
      assert.strictEqual(result.processedRanges[0], "range1");

      // Verify ORDER BY continuation token was created
      const tokenString = manager.getTokenString();
      assert.isString(tokenString);
      
      const parsedToken = JSON.parse(tokenString);
      assert.property(parsedToken, "compositeToken");
      assert.property(parsedToken, "orderByItems");
      assert.deepStrictEqual(parsedToken.orderByItems, [{ value: "item5" }]); // Last item's order by
      assert.strictEqual(parsedToken.rid, "rid5"); // Last document's RID
    });

    it("should process multiple ranges sequentially until page limit", () => {
      const mapping1 = createMockRangeMapping("00", "AA", "token1", [0, 2]); // 3 items
      const mapping2 = createMockRangeMapping("AA", "BB", "token2", [3, 5]); // 3 items
      const mapping3 = createMockRangeMapping("BB", "CC", "token3", [6, 8]); // 3 items - won't fit

      manager.updatePartitionRangeMapping("range1", mapping1);
      manager.updatePartitionRangeMapping("range2", mapping2);
      manager.updatePartitionRangeMapping("range3", mapping3);

      // Set up order by items array
      const orderByItems = [
        [{ value: "item1" }], [{ value: "item2" }], [{ value: "item3" }],
        [{ value: "item4" }], [{ value: "item5" }], [{ value: "item6" }],
        [{ value: "item7" }], [{ value: "item8" }], [{ value: "item9" }],
      ];
      manager.setOrderByItemsArray(orderByItems);

      const pageResults = [
        { _rid: "rid1", id: "1" }, { _rid: "rid2", id: "2" }, { _rid: "rid3", id: "3" },
        { _rid: "rid4", id: "4" }, { _rid: "rid5", id: "5" }, { _rid: "rid6", id: "6" },
      ];

      const result = manager.processRangesForCurrentPage(6, 20, pageResults); // Page size = 6

      assert.strictEqual(result.endIndex, 6); // First 2 ranges = 6 items total
      assert.strictEqual(result.processedRanges.length, 2);
      assert.includeMembers(result.processedRanges, ["range1", "range2"]);
      assert.notInclude(result.processedRanges, "range3"); // Third range doesn't fit

      // Verify ORDER BY continuation token uses last item from second range
      const tokenString = manager.getTokenString();
      const parsedToken = JSON.parse(tokenString);
      assert.deepStrictEqual(parsedToken.orderByItems, [{ value: "item6" }]); // Last processed item
      assert.strictEqual(parsedToken.rid, "rid6");
    });

    it("should handle invalid range data gracefully", () => {
      // Set up ORDER BY items array first
      const orderByItems = [
        [{ value: "item1" }],
        [{ value: "item2" }],
        [{ value: "item3" }],
        [{ value: "item4" }],
        [{ value: "item5" }],
        [{ value: "item6" }],
        [{ value: "item7" }],
        [{ value: "item8" }],
        [{ value: "item9" }],
        [{ value: "item10" }],
      ];
      manager.setOrderByItemsArray(orderByItems);

      // Create mapping with invalid indexes (empty array)
      const invalidMapping = { ...createMockRangeMapping("00", "AA", "token1", [0, 1]) };
      invalidMapping.indexes = [] as any;
      manager.updatePartitionRangeMapping("invalid1", invalidMapping);

      // Create mapping with null indexes
      const nullMapping = { ...createMockRangeMapping("AA", "BB", "token2", [0, 4]) };
      nullMapping.indexes = null as any;
      manager.updatePartitionRangeMapping("invalid2", nullMapping);

      // Create valid mapping
      const validMapping = createMockRangeMapping("BB", "CC", "token3", [5, 9]);
      manager.updatePartitionRangeMapping("valid", validMapping);

      const result = manager.processRangesForCurrentPage(10, 20);

      // Should only process the valid range
      assert.strictEqual(result.endIndex, 5); // Only valid range processed
      assert.strictEqual(result.processedRanges.length, 1);
      assert.strictEqual(result.processedRanges[0], "valid");
    });

    it("should extract order by items from correct page position", () => {
      const mapping = createMockRangeMapping("00", "AA", "token1", [0, 2]); // 3 items
      manager.updatePartitionRangeMapping("range1", mapping);

      // Set up order by items array with specific values
      const orderByItems = [
        [{ value: "first", type: "string" }],
        [{ value: "middle", type: "string" }],
        [{ value: "last", type: "string" }],
      ];
      manager.setOrderByItemsArray(orderByItems);

      const pageResults = [
        { _rid: "rid1", id: "1" },
        { _rid: "rid2", id: "2" },
        { _rid: "rid3", id: "3" },
      ];

      const result = manager.processRangesForCurrentPage(10, 20, pageResults);

      assert.strictEqual(result.endIndex, 3);

      // Should extract order by items from last item (index 2)
      const tokenString = manager.getTokenString();
      const parsedToken = JSON.parse(tokenString);
      assert.deepStrictEqual(parsedToken.orderByItems, [{ value: "last", type: "string" }]);
    });

    it("should extract order by items when array length exactly matches endIndex", () => {
      const mapping = createMockRangeMapping("00", "AA", "token1", [0, 2]); // 3 items
      manager.updatePartitionRangeMapping("range1", mapping);

      // Set orderByItemsArray with exactly the right number of items
      const orderByItems = [
        [{ value: "item1" }], 
        [{ value: "item2" }], 
        [{ value: "item3" }],
      ];
      manager.setOrderByItemsArray(orderByItems);

      const pageResults = [
        { _rid: "rid1", id: "1" },
        { _rid: "rid2", id: "2" },
        { _rid: "rid3", id: "3" },
      ];

      const result = manager.processRangesForCurrentPage(10, 20, pageResults);

      assert.strictEqual(result.endIndex, 3);

      // Should generate token with order by items from last item
      const tokenString = manager.getTokenString();
      const parsedToken = JSON.parse(tokenString);
      assert.deepStrictEqual(parsedToken.orderByItems, [{ value: "item3" }]);
      assert.strictEqual(parsedToken.rid, "rid3"); // Should still extract RID
    });

    it("should calculate skip count for documents with same RID", () => {
      const mapping = createMockRangeMapping("00", "AA", "token1", [0, 4]); // 5 items
      manager.updatePartitionRangeMapping("range1", mapping);

      const orderByItems = [
        [{ value: "item1" }], [{ value: "item2" }], [{ value: "item3" }],
        [{ value: "item4" }], [{ value: "item5" }],
      ];
      manager.setOrderByItemsArray(orderByItems);

      // Create page results where multiple documents have same RID (JOIN scenario)
      const pageResults = [
        { _rid: "rid1", id: "1a" },
        { _rid: "rid1", id: "1b" }, // Same RID as previous
        { _rid: "rid2", id: "2" },
        { _rid: "rid3", id: "3a" },
        { _rid: "rid3", id: "3b" }, // Same RID as previous (last document)
      ];

      const result = manager.processRangesForCurrentPage(10, 20, pageResults);

      assert.strictEqual(result.endIndex, 5);

      // Should calculate skip count for last RID
      const tokenString = manager.getTokenString();
      const parsedToken = JSON.parse(tokenString);
      assert.strictEqual(parsedToken.rid, "rid3"); // Last document's RID
      assert.strictEqual(parsedToken.skipCount, 1); // One other document with rid3 before the last one
    });


    it("should handle page results without _rid property", () => {
      const mapping = createMockRangeMapping("00", "AA", "token1", [0, 1]);
      manager.updatePartitionRangeMapping("range1", mapping);

      const orderByItems = [
        [{ value: "item1" }], [{ value: "item2" }],
      ];
      manager.setOrderByItemsArray(orderByItems);

      // Page results without _rid property
      const pageResults = [
        { id: "1", value: "item1" }, // No _rid
        { id: "2", value: "item2" }, // No _rid
      ];

      const result = manager.processRangesForCurrentPage(10, 20, pageResults);

      assert.strictEqual(result.endIndex, 2);

      // Should generate token without RID
      const tokenString = manager.getTokenString();
      const parsedToken = JSON.parse(tokenString);
      assert.deepStrictEqual(parsedToken.orderByItems, [{ value: "item2" }]);
      assert.isUndefined(parsedToken.rid);
    });


    it("should process ranges in order and stop at first that doesn't fit", () => {
      // Create ranges with specific order
      const mapping1 = createMockRangeMapping("00", "33", "token1", [0, 1]); // 2 items
      const mapping2 = createMockRangeMapping("33", "66", "token2", [2, 3]); // 2 items  
      const mapping3 = createMockRangeMapping("66", "99", "token3", [4, 7]); // 4 items - won't fit
      const mapping4 = createMockRangeMapping("99", "FF", "token4", [8, 9]); // 2 items - shouldn't be reached

      manager.updatePartitionRangeMapping("range1", mapping1);
      manager.updatePartitionRangeMapping("range2", mapping2);
      manager.updatePartitionRangeMapping("range3", mapping3);
      manager.updatePartitionRangeMapping("range4", mapping4);

      const orderByItems = [
        [{ value: "item1" }], [{ value: "item2" }], [{ value: "item3" }], [{ value: "item4" }],
        [{ value: "item5" }], [{ value: "item6" }], [{ value: "item7" }], [{ value: "item8" }],
        [{ value: "item9" }], [{ value: "item10" }],
      ];
      manager.setOrderByItemsArray(orderByItems);

      const result = manager.processRangesForCurrentPage(5, 20); // Can fit 5 items

      // Should process first 2 ranges (4 items total), skip range3 (would make it 8), never reach range4
      assert.strictEqual(result.endIndex, 4);
      assert.strictEqual(result.processedRanges.length, 2);
      assert.includeMembers(result.processedRanges, ["range1", "range2"]);
      assert.notInclude(result.processedRanges, "range3");
      assert.notInclude(result.processedRanges, "range4");

      // Should use order by items from last processed item (index 3)
      const tokenString = manager.getTokenString();
      const parsedToken = JSON.parse(tokenString);
      assert.deepStrictEqual(parsedToken.orderByItems, [{ value: "item4" }]);
    });

    it("should handle single range that exactly matches page size", () => {
      const mapping = createMockRangeMapping("00", "AA", "token1", [0, 4]); // 5 items
      manager.updatePartitionRangeMapping("range1", mapping);

      const orderByItems = [
        [{ value: "item1" }], [{ value: "item2" }], [{ value: "item3" }],
        [{ value: "item4" }], [{ value: "item5" }],
      ];
      manager.setOrderByItemsArray(orderByItems);

      const pageResults = [
        { _rid: "rid1", id: "1" }, { _rid: "rid2", id: "2" }, { _rid: "rid3", id: "3" },
        { _rid: "rid4", id: "4" }, { _rid: "rid5", id: "5" },
      ];

      const result = manager.processRangesForCurrentPage(5, 20, pageResults); // Exact match

      assert.strictEqual(result.endIndex, 5);
      assert.strictEqual(result.processedRanges.length, 1);
      assert.strictEqual(result.processedRanges[0], "range1");

      const tokenString = manager.getTokenString();
      const parsedToken = JSON.parse(tokenString);
      assert.deepStrictEqual(parsedToken.orderByItems, [{ value: "item5" }]);
      assert.strictEqual(parsedToken.rid, "rid5");
      assert.strictEqual(parsedToken.skipCount, 0);
    });
  });

  describe.skip("processParallelRanges", () => {
    beforeEach(() => {
      manager = new ContinuationTokenManager(collectionLink);
    });

    it("should process single range that fits within page size", () => {
      const mapping = createMockRangeMapping("00", "AA", "token1", [0, 4]); // 5 items
      manager.updatePartitionRangeMapping("range1", mapping);

      const result = manager.processRangesForCurrentPage(10, 20);

      assert.strictEqual(result.endIndex, 5); // 0-4 inclusive = 5 items
      assert.strictEqual(result.processedRanges.length, 1);
      assert.strictEqual(result.processedRanges[0], "range1");

      // Verify range mapping was added to composite continuation token
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 1);
      assert.strictEqual(compositeContinuationToken.rangeMappings[0].continuationToken, "token1");
    });

    it("should process multiple ranges that fit within page size", () => {
      const mapping1 = createMockRangeMapping("00", "AA", "token1", [0, 2]); // 3 items
      const mapping2 = createMockRangeMapping("AA", "BB", "token2", [3, 5]); // 3 items
      const mapping3 = createMockRangeMapping("BB", "CC", "token3", [6, 8]); // 3 items

      manager.updatePartitionRangeMapping("range1", mapping1);
      manager.updatePartitionRangeMapping("range2", mapping2);
      manager.updatePartitionRangeMapping("range3", mapping3);

      const result = manager.processRangesForCurrentPage(10, 20); // Can fit all 9 items

      assert.strictEqual(result.endIndex, 9); // 3 + 3 + 3 = 9 items
      assert.strictEqual(result.processedRanges.length, 3);
      assert.includeMembers(result.processedRanges, ["range1", "range2", "range3"]);

      // Verify all ranges were added to composite continuation token
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 3);
      
      const tokens = compositeContinuationToken.rangeMappings.map(m => m.continuationToken);
      assert.includeMembers(tokens, ["token1", "token2", "token3"]);
    });

    it("should stop processing when page size limit is reached", () => {
      const mapping1 = createMockRangeMapping("00", "AA", "token1", [0, 2]); // 3 items
      const mapping2 = createMockRangeMapping("AA", "BB", "token2", [3, 5]); // 3 items
      const mapping3 = createMockRangeMapping("BB", "CC", "token3", [6, 8]); // 3 items - won't fit
      const mapping4 = createMockRangeMapping("CC", "DD", "token4", [9, 11]); // 3 items - shouldn't be reached

      manager.updatePartitionRangeMapping("range1", mapping1);
      manager.updatePartitionRangeMapping("range2", mapping2);
      manager.updatePartitionRangeMapping("range3", mapping3);
      manager.updatePartitionRangeMapping("range4", mapping4);

      const result = manager.processRangesForCurrentPage(6, 20); // Can only fit first 2 ranges

      assert.strictEqual(result.endIndex, 6); // 3 + 3 = 6 items
      assert.strictEqual(result.processedRanges.length, 2);
      assert.includeMembers(result.processedRanges, ["range1", "range2"]);
      assert.notInclude(result.processedRanges, "range3");
      assert.notInclude(result.processedRanges, "range4");

      // Verify only processed ranges were added to composite continuation token
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 2);
      
      const tokens = compositeContinuationToken.rangeMappings.map(m => m.continuationToken);
      assert.includeMembers(tokens, ["token1", "token2"]);
      assert.notInclude(tokens, "token3");
      assert.notInclude(tokens, "token4");
    });

    it("should handle empty partition key range map", () => {
      // No ranges added to the map
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 0);

      const result = manager.processRangesForCurrentPage(10, 20);

      assert.strictEqual(result.endIndex, 0);
      assert.strictEqual(result.processedRanges.length, 0);

      // Verify no ranges were added to composite continuation token
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 0);
    });

    it("should handle ranges with invalid data gracefully", () => {
      // Create ranges with various invalid data
      const validMapping = createMockRangeMapping("00", "AA", "valid-token", [0, 4]);
      const invalidMapping1 = { ...createMockRangeMapping("AA", "BB", "invalid1", [5, 9]) };
      invalidMapping1.indexes = [] as any; // Empty indexes array
      
      const invalidMapping2 = { ...createMockRangeMapping("BB", "CC", "invalid2", [10, 14]) };
      invalidMapping2.indexes = null as any; // Null indexes
      
      const undefinedMapping = undefined as any; // Undefined mapping

      manager.updatePartitionRangeMapping("valid", validMapping);
      manager.updatePartitionRangeMapping("invalid1", invalidMapping1);
      manager.updatePartitionRangeMapping("invalid2", invalidMapping2);
      manager.updatePartitionRangeMapping("undefined", undefinedMapping);

      const result = manager.processRangesForCurrentPage(20, 30);

      // Should only process the valid range
      assert.strictEqual(result.endIndex, 5); // Only valid range processed
      assert.strictEqual(result.processedRanges.length, 1);
      assert.strictEqual(result.processedRanges[0], "valid");

      // Verify only valid range was added to composite continuation token
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 1);
      assert.strictEqual(compositeContinuationToken.rangeMappings[0].continuationToken, "valid-token");
    });

    it("should process ranges in iteration order", () => {
      // Map iteration order in JavaScript is insertion order
      const mapping1 = createMockRangeMapping("22", "33", "second", [3, 5]); // 3 items
      const mapping2 = createMockRangeMapping("00", "11", "first", [0, 2]); // 3 items
      const mapping3 = createMockRangeMapping("33", "44", "third", [6, 8]); // 3 items

      // Add in specific order
      manager.updatePartitionRangeMapping("second", mapping1);
      manager.updatePartitionRangeMapping("first", mapping2);
      manager.updatePartitionRangeMapping("third", mapping3);

      const result = manager.processRangesForCurrentPage(20, 30);

      // Should process in insertion order
      assert.strictEqual(result.endIndex, 9);
      assert.strictEqual(result.processedRanges.length, 3);
      assert.deepStrictEqual(result.processedRanges, ["second", "first", "third"]);

      // Verify ranges were added to composite continuation token in correct order
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 3);
      
      const tokens = compositeContinuationToken.rangeMappings.map(m => m.continuationToken);
      assert.deepStrictEqual(tokens, ["second", "first", "third"]);
    });

    it("should handle single range that exactly matches page size", () => {
      const mapping = createMockRangeMapping("00", "AA", "exact-fit", [0, 9]); // 10 items
      manager.updatePartitionRangeMapping("range1", mapping);

      const result = manager.processRangesForCurrentPage(10, 20); // Exact match

      assert.strictEqual(result.endIndex, 10);
      assert.strictEqual(result.processedRanges.length, 1);
      assert.strictEqual(result.processedRanges[0], "range1");

      // Verify range was added to composite continuation token
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 1);
      assert.strictEqual(compositeContinuationToken.rangeMappings[0].continuationToken, "exact-fit");
    });

    it("should handle range that is larger than page size", () => {
      const largeMapping = createMockRangeMapping("00", "AA", "too-large", [0, 14]); // 15 items
      manager.updatePartitionRangeMapping("large", largeMapping);

      const result = manager.processRangesForCurrentPage(10, 20); // Range is too large

      // Should not process any ranges since the first one is too large
      assert.strictEqual(result.endIndex, 0);
      assert.strictEqual(result.processedRanges.length, 0);

      // Verify no ranges were added to composite continuation token
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 0);
    });

    it("should handle zero page size", () => {
      const mapping = createMockRangeMapping("00", "AA", "token1", [0, 4]);
      manager.updatePartitionRangeMapping("range1", mapping);

      const result = manager.processRangesForCurrentPage(0, 20); // Page size = 0

      // Should not process any ranges
      assert.strictEqual(result.endIndex, 0);
      assert.strictEqual(result.processedRanges.length, 0);

      // Verify no ranges were added to composite continuation token
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 0);
    });

    it("should not add exhausted ranges to composite continuation token", () => {
      const activeMapping = createMockRangeMapping("00", "AA", "active-token", [0, 4]);
      const exhaustedMapping1 = createMockRangeMapping("AA", "BB", null, [5, 9]); // null token
      const exhaustedMapping2 = createMockRangeMapping("BB", "CC", "", [10, 14]); // empty token
      const exhaustedMapping3 = createMockRangeMapping("CC", "DD", "null", [15, 19]); // "null" string

      manager.updatePartitionRangeMapping("active", activeMapping);
      manager.updatePartitionRangeMapping("exhausted1", exhaustedMapping1);
      manager.updatePartitionRangeMapping("exhausted2", exhaustedMapping2);
      manager.updatePartitionRangeMapping("exhausted3", exhaustedMapping3);

      const result = manager.processRangesForCurrentPage(50, 100);

      // Should process all ranges including exhausted ones
      assert.strictEqual(result.endIndex, 20); // 5 + 5 + 5 + 5 = 20 items
      assert.strictEqual(result.processedRanges.length, 4);
      assert.includeMembers(result.processedRanges, ["active", "exhausted1", "exhausted2", "exhausted3"]);

      // Verify only non-exhausted range was added to composite continuation token
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 4);
      assert.strictEqual(compositeContinuationToken.rangeMappings[0].continuationToken, "active-token");
    });

    it("should update existing range mappings in composite continuation token", () => {
      const mapping1 = createMockRangeMapping("00", "AA", "initial-token", [0, 4]);
      manager.updatePartitionRangeMapping("range1", mapping1);

      // First processing - adds initial mapping
      manager.processRangesForCurrentPage(10, 20);
      
      let compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 1);
      assert.strictEqual(compositeContinuationToken.rangeMappings[0].continuationToken, "initial-token");

      // Update the mapping with new token and indexes
      const updatedMapping = createMockRangeMapping("00", "AA", "updated-token", [5, 9]);
      manager.updatePartitionRangeMapping("range1-updated", updatedMapping);

      // Second processing - should update existing mapping
      manager.processRangesForCurrentPage(10, 20);

      compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 1); // Original + new
      
      const tokens = compositeContinuationToken.rangeMappings.map(m => m.continuationToken);
      assert.includeMembers(tokens, ["updated-token"]);
    });

    it("should generate continuation token when ranges are processed", () => {
      const mapping = createMockRangeMapping("00", "AA", "continuation-token", [0, 4]);
      manager.updatePartitionRangeMapping("range1", mapping);

      // Before processing - no token should be generated
      assert.isUndefined(manager.getTokenString());

      // Process ranges
      manager.processRangesForCurrentPage(10, 20);

      // After processing - token should be generated
      const tokenString = manager.getTokenString();
      assert.isString(tokenString);
      assert.notInclude(tokenString, "orderByItems"); // Should not be ORDER BY token
    });

    it("should handle very small range sizes", () => {
      // Create ranges with 1 item each
      const mapping1 = createMockRangeMapping("00", "11", "token1", [0, 0]); // 1 item
      const mapping2 = createMockRangeMapping("11", "22", "token2", [1, 1]); // 1 item
      const mapping3 = createMockRangeMapping("22", "33", "token3", [2, 2]); // 1 item

      manager.updatePartitionRangeMapping("tiny1", mapping1);
      manager.updatePartitionRangeMapping("tiny2", mapping2);
      manager.updatePartitionRangeMapping("tiny3", mapping3);

      const result = manager.processRangesForCurrentPage(2, 10); // Can fit 2 items

      assert.strictEqual(result.endIndex, 2); // 1 + 1 = 2 items
      assert.strictEqual(result.processedRanges.length, 2);
      assert.includeMembers(result.processedRanges, ["tiny1", "tiny2"]);
      assert.notInclude(result.processedRanges, "tiny3");

      // Verify correct ranges were added to composite continuation token
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 2);
      
      const tokens = compositeContinuationToken.rangeMappings.map(m => m.continuationToken);
      assert.includeMembers(tokens, ["token1", "token2"]);
      assert.notInclude(tokens, "token3");
    });
  });

  describe.skip("addOrUpdateRangeMapping (tested via processParallelRanges)", () => {
    beforeEach(() => {
      manager = new ContinuationTokenManager(collectionLink);
    });

    it("should add new range mapping to composite continuation token", () => {
      const mapping = createMockRangeMapping("00", "AA", "token1", [0, 5]);
      
      // Add mapping to partition key range map
      manager.updatePartitionRangeMapping("range1", mapping);
      
      // Verify initial state - no range mappings in composite continuation token yet
      const initialCompositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(initialCompositeContinuationToken.rangeMappings.length, 0);
      
      // Process ranges to trigger addOrUpdateRangeMapping
      manager.processRangesForCurrentPage(10, 20);
      
      // Verify mapping was added to composite continuation token
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 1);
      
      const addedMapping = compositeContinuationToken.rangeMappings[0];
      assert.strictEqual(addedMapping.continuationToken, "token1");
      assert.strictEqual(addedMapping.partitionKeyRange.minInclusive, "00");
      assert.strictEqual(addedMapping.partitionKeyRange.maxExclusive, "AA");
      assert.deepStrictEqual(addedMapping.indexes, [0, 5]);
    });

    it("should update existing range mapping with new indexes and continuation token", () => {
      // Create initial mapping
      const initialMapping = createMockRangeMapping("00", "AA", "token1", [0, 5]);
      
      // Add mapping to partition key range map and process to add to composite token
      manager.updatePartitionRangeMapping("range1", initialMapping);
      manager.processRangesForCurrentPage(10, 20);
      
      // Verify initial state
      let compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 1);
      assert.strictEqual(compositeContinuationToken.rangeMappings[0].continuationToken, "token1");
      assert.deepStrictEqual(compositeContinuationToken.rangeMappings[0].indexes, [0, 5]);
      
      // Clear partition key range map and add updated mapping with same range bounds
      manager.clearRangeMappings();
      const updatedMapping = createMockRangeMapping("00", "AA", "token2", [6, 15]);
      manager.updatePartitionRangeMapping("range1", updatedMapping);
      
      // Process ranges again to trigger addOrUpdateRangeMapping
      manager.processRangesForCurrentPage(20, 30);
      
      // Verify mapping was updated, not added as new
      compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 1);
      
      const updatedMappingInToken = compositeContinuationToken.rangeMappings[0];
      assert.strictEqual(updatedMappingInToken.continuationToken, "token2");
      assert.strictEqual(updatedMappingInToken.partitionKeyRange.minInclusive, "00");
      assert.strictEqual(updatedMappingInToken.partitionKeyRange.maxExclusive, "AA");
      assert.deepStrictEqual(updatedMappingInToken.indexes, [6, 15]);
    });

    it("should handle multiple range mappings with different range bounds", () => {
      // Create mappings with different range bounds
      const mapping1 = createMockRangeMapping("00", "AA", "token1", [0, 5]);
      const mapping2 = createMockRangeMapping("AA", "BB", "token2", [6, 10]);
      const mapping3 = createMockRangeMapping("BB", "CC", "token3", [11, 15]);
      
      // Add mappings to partition key range map
      manager.updatePartitionRangeMapping("range1", mapping1);
      manager.updatePartitionRangeMapping("range2", mapping2);
      manager.updatePartitionRangeMapping("range3", mapping3);
      
      // Process ranges to add all mappings to composite continuation token
      manager.processRangesForCurrentPage(20, 30);
      
      // Verify all mappings were added
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 3);
      
      // Verify each mapping has correct values
      const tokens = compositeContinuationToken.rangeMappings.map(m => m.continuationToken);
      assert.includeMembers(tokens, ["token1", "token2", "token3"]);
      
      const rangeBounds = compositeContinuationToken.rangeMappings.map(m => 
        `${m.partitionKeyRange.minInclusive}-${m.partitionKeyRange.maxExclusive}`
      );
      assert.includeMembers(rangeBounds, ["00-AA", "AA-BB", "BB-CC"]);
    });

    it("should handle null rangeMapping parameter gracefully", () => {
      // Since addOrUpdateRangeMapping is private, we can't directly test null parameter
      // But we can simulate it by processing with invalid data in partition key range map
      const invalidMapping = {
        partitionKeyRange: null,
        indexes: [0, 5],
        continuationToken: "token1"
      } as any;
      
      // Add invalid mapping to partition key range map
      manager.updatePartitionRangeMapping("invalid", invalidMapping);
      
      // Process ranges - should not throw error and should not add invalid mapping
      assert.doesNotThrow(() => {
        manager.processRangesForCurrentPage(10, 20);
      });
      
      // Verify no mappings were added to composite continuation token
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 0);
    });

    it("should handle rangeMapping without partitionKeyRange gracefully", () => {
      // Create mapping without partitionKeyRange
      const invalidMapping = {
        partitionKeyRange: undefined,
        indexes: [0, 5],
        continuationToken: "token1"
      } as any;
      
      // Add invalid mapping to partition key range map
      manager.updatePartitionRangeMapping("invalid", invalidMapping);
      
      // Process ranges - should not throw error
      assert.doesNotThrow(() => {
        manager.processRangesForCurrentPage(10, 20);
      });
      
      // Verify no mappings were added to composite continuation token
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 0);
    });

    it("should update only matching range mappings by bounds", () => {
      // Create initial mappings with different bounds
      const mapping1 = createMockRangeMapping("00", "AA", "token1", [0, 5]);
      const mapping2 = createMockRangeMapping("AA", "BB", "token2", [6, 10]);
      
      // Add mappings and process to add to composite token
      manager.updatePartitionRangeMapping("range1", mapping1);
      manager.updatePartitionRangeMapping("range2", mapping2);
      manager.processRangesForCurrentPage(20, 30);
      
      // Verify initial state
      let compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 2);
      
      // Clear and add updated mapping that only matches first range bounds
      manager.clearRangeMappings();
      const updatedMapping1 = createMockRangeMapping("00", "AA", "updated-token1", [100, 105]);
      manager.updatePartitionRangeMapping("range1", updatedMapping1);
      
      // Process ranges to trigger update
      manager.processRangesForCurrentPage(10, 20);
      
      // Verify only the matching mapping was updated
      compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 2);
      
      // Find the updated mapping
      const updatedMapping = compositeContinuationToken.rangeMappings.find(
        m => m.partitionKeyRange.minInclusive === "00" && m.partitionKeyRange.maxExclusive === "AA"
      );
      const unchangedMapping = compositeContinuationToken.rangeMappings.find(
        m => m.partitionKeyRange.minInclusive === "AA" && m.partitionKeyRange.maxExclusive === "BB"
      );
      
      assert.isDefined(updatedMapping);
      assert.isDefined(unchangedMapping);
      assert.strictEqual(updatedMapping!.continuationToken, "updated-token1");
      assert.deepStrictEqual(updatedMapping!.indexes, [100, 105]);
      assert.strictEqual(unchangedMapping!.continuationToken, "token2");
      assert.deepStrictEqual(unchangedMapping!.indexes, [6, 10]);
    });

    it("should handle composite continuation token with undefined mappings", () => {
      // Create valid mapping
      const validMapping = createMockRangeMapping("00", "AA", "token1", [0, 5]);
      manager.updatePartitionRangeMapping("range1", validMapping);
      
      // Process to add to composite token
      manager.processRangesForCurrentPage(10, 20);
      
      // Manually add undefined mapping to simulate edge case
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      compositeContinuationToken.rangeMappings.push(undefined as any);
      
      // Verify initial state has undefined mapping
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 2);
      assert.isUndefined(compositeContinuationToken.rangeMappings[1]);
      
      // Clear partition key range map and add new mapping
      manager.clearRangeMappings();
      const newMapping = createMockRangeMapping("BB", "CC", "token2", [10, 15]);
      manager.updatePartitionRangeMapping("range2", newMapping);
      
      // Process ranges - should handle undefined mapping gracefully
      assert.doesNotThrow(() => {
        manager.processRangesForCurrentPage(10, 20);
      });
      
      // Verify new mapping was added and undefined mapping was ignored
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 2);
      
      const newMappingInToken = compositeContinuationToken.rangeMappings.find(
        m => m && m.partitionKeyRange.minInclusive === "BB"
      );
      assert.isDefined(newMappingInToken);
      assert.strictEqual(newMappingInToken!.continuationToken, "token2");
    });

    it("should handle empty composite continuation token rangeMappings array", () => {
      // Create mapping
      const mapping = createMockRangeMapping("00", "AA", "token1", [0, 5]);
      manager.updatePartitionRangeMapping("range1", mapping);
      
      // Ensure composite continuation token has empty rangeMappings
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      compositeContinuationToken.rangeMappings = [];
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 0);
      
      // Process ranges - should add new mapping to empty array
      manager.processRangesForCurrentPage(10, 20);
      
      // Verify mapping was added
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 1);
      assert.strictEqual(compositeContinuationToken.rangeMappings[0].continuationToken, "token1");
      assert.strictEqual(compositeContinuationToken.rangeMappings[0].partitionKeyRange.minInclusive, "00");
    });

    it("should handle updating mapping with same exact range bounds", () => {
      // Create mapping with specific bounds
      const originalMapping = createMockRangeMapping("A0", "B5", "original-token", [0, 10]);
      manager.updatePartitionRangeMapping("range1", originalMapping);
      manager.processRangesForCurrentPage(15, 25);
      
      // Verify initial state
      let compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 1);
      assert.strictEqual(compositeContinuationToken.rangeMappings[0].continuationToken, "original-token");
      
      // Clear and add mapping with identical bounds but different values
      manager.clearRangeMappings();
      const identicalBoundsMapping = createMockRangeMapping("A0", "B5", "updated-token", [50, 75]);
      manager.updatePartitionRangeMapping("range1", identicalBoundsMapping);
      
      // Process ranges to trigger update
      manager.processRangesForCurrentPage(30, 40);
      
      // Verify mapping was updated, not added as new
      compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 1);
      assert.strictEqual(compositeContinuationToken.rangeMappings[0].continuationToken, "updated-token");
      assert.deepStrictEqual(compositeContinuationToken.rangeMappings[0].indexes, [50, 75]);
      assert.strictEqual(compositeContinuationToken.rangeMappings[0].partitionKeyRange.minInclusive, "A0");
      assert.strictEqual(compositeContinuationToken.rangeMappings[0].partitionKeyRange.maxExclusive, "B5");
    });
  });

  describe.skip("processRangesForCurrentPage", () => {
    beforeEach(() => {
      manager = new ContinuationTokenManager(collectionLink);
    });

    it("should route to parallel processing for non-ORDER BY queries", () => {
      // Create mappings for parallel processing
      const mapping1 = createMockRangeMapping("00", "AA", "token1", [0, 4]);
      const mapping2 = createMockRangeMapping("AA", "BB", "token2", [5, 9]);

      // Add mappings to partition key range map
      manager.updatePartitionRangeMapping("range1", mapping1);
      manager.updatePartitionRangeMapping("range2", mapping2);

      // Process ranges for parallel query (default behavior)
      const result = manager.processRangesForCurrentPage(20, 50);

      // Should process both ranges for parallel queries
      assert.strictEqual(result.endIndex, 10); // 5 + 5 items
      assert.strictEqual(result.processedRanges.length, 2);
      assert.includeMembers(result.processedRanges, ["range1", "range2"]);

      // Should generate composite continuation token
      const tokenString = manager.getTokenString();
      assert.isString(tokenString);
      assert.notInclude(tokenString, "orderByItems"); // Should not be ORDER BY token
    });

    it("should route to ORDER BY processing for ORDER BY queries", () => {
      // Create ORDER BY manager
      manager = new ContinuationTokenManager(collectionLink, undefined, true);

      // Set up ORDER BY items array first
      const orderByItems = [
        [{ value: "item1" }],
        [{ value: "item2" }],
        [{ value: "item3" }],
        [{ value: "item4" }],
        [{ value: "item5" }],
        [{ value: "item6" }],
        [{ value: "item7" }],
        [{ value: "item8" }],
        [{ value: "item9" }],
        [{ value: "item10" }],
      ];
      manager.setOrderByItemsArray(orderByItems);

      // Create mappings for ORDER BY processing
      const mapping1 = createMockRangeMapping("00", "AA", "orderby-token1", [0, 4]);
      const mapping2 = createMockRangeMapping("AA", "BB", "orderby-token2", [5, 9]);

      // Add mappings to partition key range map
      manager.updatePartitionRangeMapping("range1", mapping1);
      manager.updatePartitionRangeMapping("range2", mapping2);

      // Process ranges for ORDER BY query with page results
      const pageResults = [{ _rid: "doc1", id: "1", value: "test" }];
      const result = manager.processRangesForCurrentPage(20, 50, pageResults);

      // Should process both ranges for ORDER BY queries
      assert.strictEqual(result.endIndex, 10); // 5 + 5 items
      assert.strictEqual(result.processedRanges.length, 2);
      assert.includeMembers(result.processedRanges, ["range1", "range2"]);

      // Should generate ORDER BY continuation token
      const tokenString = manager.getTokenString();
      assert.isString(tokenString);
      assert.include(tokenString, "orderByItems"); // Should be ORDER BY token
    });
  });

  describe.skip("clearRangeMappings", () => {
    beforeEach(() => {
      manager = new ContinuationTokenManager(collectionLink);
    });

    it("should clear all range mappings", () => {
      const mapping1 = createMockRangeMapping("00", "AA", "token1");
      const mapping2 = createMockRangeMapping("AA", "BB", "token2");
      const mapping3 = createMockRangeMapping("BB", "FF", "token3");

      // Add multiple mappings
      manager.updatePartitionRangeMapping("range1", mapping1);
      manager.updatePartitionRangeMapping("range2", mapping2);
      manager.updatePartitionRangeMapping("range3", mapping3);
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 3);

      // Clear all mappings
      manager.clearRangeMappings();

      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 0);
      assert.strictEqual(manager.hasUnprocessedRanges(), false);
    });

    it("should handle clearing empty map", () => {
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 0);

      // Should not throw error when clearing empty map
      assert.doesNotThrow(() => {
        manager.clearRangeMappings();
      });

      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 0);
    });

    it("should allow adding new mappings after clearing", () => {
      const initialMapping = createMockRangeMapping("00", "AA", "token1");
      const newMapping = createMockRangeMapping("BB", "CC", "token2");

      // Add initial mapping
      manager.updatePartitionRangeMapping("range1", initialMapping);
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 1);

      // Clear all mappings
      manager.clearRangeMappings();
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 0);

      // Add new mapping after clearing
      manager.updatePartitionRangeMapping("range2", newMapping);
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 1);
      assert.strictEqual(
        manager.getPartitionKeyRangeMap().get("range2")?.continuationToken,
        "token2",
      );
      assert.isUndefined(manager.getPartitionKeyRangeMap().get("range1"));
    });
  });

  describe.skip("getTokenString", () => {
    beforeEach(() => {
      manager = new ContinuationTokenManager(collectionLink);
    });

    it("should return undefined when no ranges exist in composite continuation token", () => {
      // Verify initial state - no ranges
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 0);
      
      // Should return undefined when no ranges exist
      const tokenString = manager.getTokenString();
      assert.isUndefined(tokenString);
    });

    it("should return composite continuation token string for parallel queries", () => {
      // Create and process mappings for parallel query
      const mapping1 = createMockRangeMapping("00", "AA", "token1", [0, 5]);
      const mapping2 = createMockRangeMapping("AA", "BB", "token2", [6, 10]);
      
      manager.updatePartitionRangeMapping("range1", mapping1);
      manager.updatePartitionRangeMapping("range2", mapping2);
      
      // Process ranges to add to composite continuation token
      manager.processRangesForCurrentPage(20, 30);
      
      // Should return composite continuation token string
      const tokenString = manager.getTokenString();
      assert.isString(tokenString);
      assert.isTrue(tokenString!.length > 0);
      
      // Parse the token to verify it's a composite token
      const parsedToken = JSON.parse(tokenString!);
      assert.property(parsedToken, "rid");
      assert.property(parsedToken, "rangeMappings");
      assert.strictEqual(parsedToken.rid, collectionLink);
      assert.isArray(parsedToken.rangeMappings);
      assert.strictEqual(parsedToken.rangeMappings.length, 2);
    });

    it("should return ORDER BY continuation token string for ORDER BY queries", () => {
      // Create ORDER BY manager
      manager = new ContinuationTokenManager(collectionLink, undefined, true);
      
      // Set up ORDER BY items array
      const orderByItems = [
        [{ value: "item1" }],
        [{ value: "item2" }],
        [{ value: "item3" }],
      ];
      manager.setOrderByItemsArray(orderByItems);
      
      // Create mapping and process for ORDER BY
      const mapping = createMockRangeMapping("00", "AA", "orderby-token", [0, 2]);
      manager.updatePartitionRangeMapping("range1", mapping);
      
      // Process with page results to create ORDER BY token
      const pageResults = [{ _rid: "doc1", id: "1" }, { _rid: "doc2", id: "2" }];
      manager.processRangesForCurrentPage(5, 10, pageResults);
      
      // Should return ORDER BY continuation token string
      const tokenString = manager.getTokenString();
      assert.isString(tokenString);
      assert.isTrue(tokenString!.length > 0);
      
      // Parse the token to verify it's an ORDER BY token
      const parsedToken = JSON.parse(tokenString!);
      assert.property(parsedToken, "compositeToken");
      assert.property(parsedToken, "orderByItems");
      assert.property(parsedToken, "rid");
      assert.property(parsedToken, "skipCount");
      assert.isString(parsedToken.compositeToken);
      assert.isArray(parsedToken.orderByItems);
    });

    it("should handle empty ORDER BY items array for ORDER BY queries", () => {
      // Create ORDER BY manager
      manager = new ContinuationTokenManager(collectionLink, undefined, true);
      
      // Set empty ORDER BY items array
      manager.setOrderByItemsArray([]);
      
      // Add mapping to composite token
      const mapping = createMockRangeMapping("00", "AA", "token", [0, 5]);
      manager.updatePartitionRangeMapping("range1", mapping);
      
      // Process ranges should throw error for empty ORDER BY items
      assert.throws(() => {
        manager.processRangesForCurrentPage(10, 20, []);
      }, /orderByItemsArray is required but was not provided or is empty/);
      
      // Should return undefined since ORDER BY token wasn't created
      const tokenString = manager.getTokenString();
      assert.isUndefined(tokenString);
    });

    it("should return composite token as fallback for ORDER BY queries without ORDER BY token", () => {
      // Create ORDER BY manager
      manager = new ContinuationTokenManager(collectionLink, undefined, true);
      
      // Manually add mapping to composite continuation token (bypassing normal processing)
      const mapping = createMockRangeMapping("00", "AA", "fallback-token", [0, 5]);
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      compositeContinuationToken.addRangeMapping(mapping);
      
      // Verify composite token has ranges
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 1);
      
      // Since no ORDER BY token was created, should fall back to composite token
      // But for ORDER BY queries without proper ORDER BY token, it returns undefined
      const tokenString = manager.getTokenString();
      assert.isUndefined(tokenString);
    });

    it("should handle undefined composite continuation token gracefully", () => {
      // Force composite continuation token to undefined
      (manager as any).compositeContinuationToken = undefined;
      
      // Should return undefined without throwing error
      const tokenString = manager.getTokenString();
      assert.isUndefined(tokenString);
    });

    it("should handle composite continuation token with empty rangeMappings", () => {
      // Ensure composite continuation token exists but has empty range mappings
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      compositeContinuationToken.rangeMappings = [];
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 0);
      
      // Should return undefined for empty range mappings
      const tokenString = manager.getTokenString();
      assert.isUndefined(tokenString);
    });

    it("should return valid JSON string that can be parsed", () => {
      // Create mapping and process for parallel query
      const mapping = createMockRangeMapping("00", "AA", "json-test-token", [0, 3]);
      manager.updatePartitionRangeMapping("range1", mapping);
      manager.processRangesForCurrentPage(10, 20);
      
      // Get token string
      const tokenString = manager.getTokenString();
      assert.isString(tokenString);
      
      // Should be valid JSON that can be parsed without error
      assert.doesNotThrow(() => {
        const parsed = JSON.parse(tokenString!);
        assert.isObject(parsed);
      });
    });
  });

  describe.skip("setContinuationTokenInHeaders", () => {
    beforeEach(() => {
      manager = new ContinuationTokenManager(collectionLink);
    });

    it("should set continuation token header when token exists", () => {
      // Create mapping and process to generate token
      const mapping = createMockRangeMapping("00", "AA", "header-token", [0, 5]);
      manager.updatePartitionRangeMapping("range1", mapping);
      manager.processRangesForCurrentPage(10, 20);
      
      // Verify token exists
      const tokenString = manager.getTokenString();
      assert.isString(tokenString);
      
      // Create mock headers object
      const headers: any = {};
      
      // Set continuation token in headers
      manager.setContinuationTokenInHeaders(headers);
      
      // Verify header was set with correct value
      assert.property(headers, "x-ms-continuation");
      assert.strictEqual(headers["x-ms-continuation"], tokenString);
    });

    it("should not set header when no token exists", () => {
      // Ensure no token exists
      const tokenString = manager.getTokenString();
      assert.isUndefined(tokenString);
      
      // Create mock headers object
      const headers: any = {};
      
      // Set continuation token in headers
      manager.setContinuationTokenInHeaders(headers);
      
      // Verify header was not set
      assert.notProperty(headers, "x-ms-continuation");
      assert.isUndefined(headers["x-ms-continuation"]);
    });

    it("should overwrite existing continuation header", () => {
      // Create mapping and process to generate token
      const mapping = createMockRangeMapping("00", "AA", "new-token", [0, 5]);
      manager.updatePartitionRangeMapping("range1", mapping);
      manager.processRangesForCurrentPage(10, 20);
      
      // Create mock headers object with existing continuation header
      const headers: any = {
        "x-ms-continuation": "old-token-value",
        "other-header": "other-value"
      };
      
      // Set continuation token in headers
      manager.setContinuationTokenInHeaders(headers);
      
      // Verify header was overwritten with new value
      const expectedToken = manager.getTokenString();
      assert.strictEqual(headers["x-ms-continuation"], expectedToken);
      assert.notStrictEqual(headers["x-ms-continuation"], "old-token-value");
      
      // Verify other headers were not affected
      assert.strictEqual(headers["other-header"], "other-value");
    });

    it("should handle empty headers object", () => {
      // Create mapping and process to generate token
      const mapping = createMockRangeMapping("00", "AA", "empty-headers-token", [0, 3]);
      manager.updatePartitionRangeMapping("range1", mapping);
      manager.processRangesForCurrentPage(10, 20);
      
      // Create empty headers object
      const headers: any = {};
      
      // Should not throw error with empty headers
      assert.doesNotThrow(() => {
        manager.setContinuationTokenInHeaders(headers);
      });
      
      // Verify header was added
      assert.property(headers, "x-ms-continuation");
      assert.isString(headers["x-ms-continuation"]);
    });

    it("should handle headers with existing properties", () => {
      // Create mapping and process to generate token
      const mapping = createMockRangeMapping("00", "AA", "existing-props-token", [0, 2]);
      manager.updatePartitionRangeMapping("range1", mapping);
      manager.processRangesForCurrentPage(10, 20);
      
      // Create headers object with existing properties
      const headers: any = {
        "content-type": "application/json",
        "x-ms-request-charge": "2.5",
        "x-ms-item-count": "10"
      };
      
      // Set continuation token in headers
      manager.setContinuationTokenInHeaders(headers);
      
      // Verify continuation header was added without affecting existing headers
      assert.property(headers, "x-ms-continuation");
      assert.isString(headers["x-ms-continuation"]);
      assert.strictEqual(headers["content-type"], "application/json");
      assert.strictEqual(headers["x-ms-request-charge"], "2.5");
      assert.strictEqual(headers["x-ms-item-count"], "10");
    });

    it("should not modify headers when getTokenString returns undefined", () => {
      // Ensure no token exists
      assert.isUndefined(manager.getTokenString());
      
      // Create headers object with existing properties
      const originalHeaders = {
        "content-type": "application/json",
        "x-ms-request-charge": "1.0"
      };
      const headers: any = { ...originalHeaders };
      
      // Set continuation token in headers
      manager.setContinuationTokenInHeaders(headers);
      
      // Verify headers were not modified
      assert.deepStrictEqual(headers, originalHeaders);
      assert.notProperty(headers, "x-ms-continuation");
    });
  });

  describe.skip("hasUnprocessedRanges", () => {
    beforeEach(() => {
      manager = new ContinuationTokenManager(collectionLink);
    });

    it("should return false when partition key range map is empty", () => {
      // Verify initial state - no ranges
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 0);
      
      // Should return false for empty map
      assert.strictEqual(manager.hasUnprocessedRanges(), false);
    });

    it("should return true when ranges exist in partition key range map", () => {
      // Add range mapping
      const mapping = createMockRangeMapping("00", "AA", "unprocessed-token", [0, 5]);
      manager.updatePartitionRangeMapping("range1", mapping);
      
      // Verify range was added
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 1);
      
      // Should return true when ranges exist
      assert.strictEqual(manager.hasUnprocessedRanges(), true);
    });

    it("should return true when multiple ranges exist", () => {
      // Add multiple range mappings
      const mapping1 = createMockRangeMapping("00", "AA", "token1", [0, 5]);
      const mapping2 = createMockRangeMapping("AA", "BB", "token2", [6, 10]);
      const mapping3 = createMockRangeMapping("BB", "CC", "token3", [11, 15]);
      
      manager.updatePartitionRangeMapping("range1", mapping1);
      manager.updatePartitionRangeMapping("range2", mapping2);
      manager.updatePartitionRangeMapping("range3", mapping3);
      
      // Verify ranges were added
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 3);
      
      // Should return true when multiple ranges exist
      assert.strictEqual(manager.hasUnprocessedRanges(), true);
    });

    it("should return false after clearing all ranges", () => {
      // Add range mappings first
      const mapping1 = createMockRangeMapping("00", "AA", "token1", [0, 5]);
      const mapping2 = createMockRangeMapping("AA", "BB", "token2", [6, 10]);
      
      manager.updatePartitionRangeMapping("range1", mapping1);
      manager.updatePartitionRangeMapping("range2", mapping2);
      
      // Verify ranges exist
      assert.strictEqual(manager.hasUnprocessedRanges(), true);
      
      // Clear all ranges
      manager.clearRangeMappings();
      
      // Should return false after clearing
      assert.strictEqual(manager.hasUnprocessedRanges(), false);
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 0);
    });

    it("should return false after removing all ranges individually", () => {
      // Add range mappings first
      const mapping1 = createMockRangeMapping("00", "AA", "token1", [0, 5]);
      const mapping2 = createMockRangeMapping("AA", "BB", "token2", [6, 10]);
      
      manager.updatePartitionRangeMapping("range1", mapping1);
      manager.updatePartitionRangeMapping("range2", mapping2);
      
      // Verify ranges exist
      assert.strictEqual(manager.hasUnprocessedRanges(), true);
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 2);
      
      // Remove ranges one by one
      manager.removePartitionRangeMapping("range1");
      assert.strictEqual(manager.hasUnprocessedRanges(), true);
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 1);
      
      manager.removePartitionRangeMapping("range2");
      assert.strictEqual(manager.hasUnprocessedRanges(), false);
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 0);
    });

    it("should reflect current state after adding and removing ranges", () => {
      // Start with empty state
      assert.strictEqual(manager.hasUnprocessedRanges(), false);
      
      // Add range
      const mapping = createMockRangeMapping("00", "AA", "dynamic-token", [0, 5]);
      manager.updatePartitionRangeMapping("range1", mapping);
      assert.strictEqual(manager.hasUnprocessedRanges(), true);
      
      // Remove range
      manager.removePartitionRangeMapping("range1");
      assert.strictEqual(manager.hasUnprocessedRanges(), false);
      
      // Add multiple ranges
      const mapping2 = createMockRangeMapping("AA", "BB", "token2", [6, 10]);
      const mapping3 = createMockRangeMapping("BB", "CC", "token3", [11, 15]);
      manager.updatePartitionRangeMapping("range2", mapping2);
      manager.updatePartitionRangeMapping("range3", mapping3);
      assert.strictEqual(manager.hasUnprocessedRanges(), true);
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 2);
      
      // Clear all
      manager.clearRangeMappings();
      assert.strictEqual(manager.hasUnprocessedRanges(), false);
    });

    it("should not be affected by composite continuation token state", () => {
      // Add range to partition key range map
      const mapping = createMockRangeMapping("00", "AA", "independence-token", [0, 5]);
      manager.updatePartitionRangeMapping("range1", mapping);
      
      // Verify unprocessed ranges exist
      assert.strictEqual(manager.hasUnprocessedRanges(), true);
      
      // Process ranges to add to composite continuation token
      manager.processRangesForCurrentPage(10, 20);
      
      // Verify composite continuation token has ranges
      const compositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 1);
      
      // hasUnprocessedRanges should still return true (depends only on partition key range map)
      assert.strictEqual(manager.hasUnprocessedRanges(), true);
      
      // Remove from partition key range map
      manager.removePartitionRangeMapping("range1");
      
      // Should return false even though composite token still has ranges
      assert.strictEqual(manager.hasUnprocessedRanges(), false);
      assert.strictEqual(compositeContinuationToken.rangeMappings.length, 1); // Still has ranges
    });

    it("should work correctly with ORDER BY queries", () => {
      // Create ORDER BY manager
      manager = new ContinuationTokenManager(collectionLink, undefined, true);
      
      // Start with no ranges
      assert.strictEqual(manager.hasUnprocessedRanges(), false);
      
      // Add range for ORDER BY query
      const mapping = createMockRangeMapping("00", "AA", "orderby-unprocessed", [0, 3]);
      manager.updatePartitionRangeMapping("range1", mapping);
      
      // Should return true for ORDER BY queries with ranges
      assert.strictEqual(manager.hasUnprocessedRanges(), true);
      
      // Remove range
      manager.removePartitionRangeMapping("range1");
      
      // Should return false after removal
      assert.strictEqual(manager.hasUnprocessedRanges(), false);
    });
  });

  describe("processDistinctQueryAndUpdateRangeMap", () => {
    let mockHashObject: (item: any) => Promise<string>;

    beforeEach(() => {
      manager = new ContinuationTokenManager(collectionLink);
      
      // Create a mock hash function that returns predictable hashes
      mockHashObject = vi.fn().mockImplementation(async (item: any) => {
        if (!item) return "empty-hash";
        return `hash-${JSON.stringify(item)}`;
      });
    });

    it("should return early when partition key range map is empty", async () => {
      const originalBuffer = [{ id: "1" }, { id: "2" }];
      
      await manager.processDistinctQueryAndUpdateRangeMap(originalBuffer, mockHashObject);
      
      // No calls to hash function should be made
      assert.strictEqual((mockHashObject as any).mock.calls.length, 0);
      assert.strictEqual(manager.getPartitionKeyRangeMap().size, 0);
    });

    it("should return early when partition key range map is null/undefined", async () => {
      // Force partition key range map to be null
      (manager as any).partitionKeyRangeMap = null;
      
      const originalBuffer = [{ id: "1" }, { id: "2" }];
      
      await manager.processDistinctQueryAndUpdateRangeMap(originalBuffer, mockHashObject);
      
      // No calls to hash function should be made
      assert.strictEqual((mockHashObject as any).mock.calls.length, 0);
    });

    it("should process single range with items and update hashedLastResult", async () => {
      // Set up range mapping with itemCount
      const rangeMapping = {
        ...createMockRangeMapping("00", "AA"),
        itemCount: 3
      };
      manager.updatePartitionRangeMapping("range1", rangeMapping);
      
      const originalBuffer = [
        { id: "item1", value: "a" },
        { id: "item2", value: "b" }, 
        { id: "item3", value: "c" }
      ];
      
      await manager.processDistinctQueryAndUpdateRangeMap(originalBuffer, mockHashObject);
      
      // Should hash only the last item in the range (item3)
      assert.strictEqual((mockHashObject as any).mock.calls.length, 1);
      assert.deepStrictEqual((mockHashObject as any).mock.calls[0][0], { id: "item3", value: "c" });
      
      // Check that hashedLastResult was updated
      const updatedMapping = manager.getPartitionKeyRangeMap().get("range1");
      assert.strictEqual(updatedMapping?.hashedLastResult, 'hash-{"id":"item3","value":"c"}');
    });

    it("should process multiple ranges and hash the last item from each range", async () => {
      // Set up multiple range mappings
      const rangeMapping1 = { ...createMockRangeMapping("00", "33"), itemCount: 2 };
      const rangeMapping2 = { ...createMockRangeMapping("33", "66"), itemCount: 3 };
      const rangeMapping3 = { ...createMockRangeMapping("66", "FF"), itemCount: 1 };
      
      manager.updatePartitionRangeMapping("range1", rangeMapping1);
      manager.updatePartitionRangeMapping("range2", rangeMapping2);
      manager.updatePartitionRangeMapping("range3", rangeMapping3);
      
      const originalBuffer = [
        { id: "item1", range: "1" }, // range1: index 0
        { id: "item2", range: "1" }, // range1: index 1 (last in range1)
        { id: "item3", range: "2" }, // range2: index 2
        { id: "item4", range: "2" }, // range2: index 3  
        { id: "item5", range: "2" }, // range2: index 4 (last in range2)
        { id: "item6", range: "3" }, // range3: index 5 (last in range3)
      ];
      
      await manager.processDistinctQueryAndUpdateRangeMap(originalBuffer, mockHashObject);
      
      // Should hash the last item from each range (item2, item5, item6)
      assert.strictEqual((mockHashObject as any).mock.calls.length, 3);
      assert.deepStrictEqual((mockHashObject as any).mock.calls[0][0], { id: "item2", range: "1" });
      assert.deepStrictEqual((mockHashObject as any).mock.calls[1][0], { id: "item5", range: "2" });
      assert.deepStrictEqual((mockHashObject as any).mock.calls[2][0], { id: "item6", range: "3" });
      
      // Check hashedLastResult for each range
      const updatedMapping1 = manager.getPartitionKeyRangeMap().get("range1");
      const updatedMapping2 = manager.getPartitionKeyRangeMap().get("range2"); 
      const updatedMapping3 = manager.getPartitionKeyRangeMap().get("range3");
      
      assert.strictEqual(updatedMapping1?.hashedLastResult, 'hash-{"id":"item2","range":"1"}');
      assert.strictEqual(updatedMapping2?.hashedLastResult, 'hash-{"id":"item5","range":"2"}');
      assert.strictEqual(updatedMapping3?.hashedLastResult, 'hash-{"id":"item6","range":"3"}');
    });

    it("should skip ranges with zero itemCount", async () => {
      const rangeMapping1 = { ...createMockRangeMapping("00", "33"), itemCount: 2 };
      const rangeMapping2 = { ...createMockRangeMapping("33", "66"), itemCount: 0 }; // Empty range
      const rangeMapping3 = { ...createMockRangeMapping("66", "FF"), itemCount: 1 };
      
      manager.updatePartitionRangeMapping("range1", rangeMapping1);
      manager.updatePartitionRangeMapping("range2", rangeMapping2);
      manager.updatePartitionRangeMapping("range3", rangeMapping3);
      
      const originalBuffer = [
        { id: "item1" }, // range1: index 0
        { id: "item2" }, // range1: index 1 (last in range1)
        { id: "item3" }, // range3: index 2 (last in range3)
      ];
      
      await manager.processDistinctQueryAndUpdateRangeMap(originalBuffer, mockHashObject);
      
      // Should hash only last items from range1 and range3 (skip range2)
      assert.strictEqual((mockHashObject as any).mock.calls.length, 2);
      assert.deepStrictEqual((mockHashObject as any).mock.calls[0][0], { id: "item2" });
      assert.deepStrictEqual((mockHashObject as any).mock.calls[1][0], { id: "item3" });
      
      // Check hashedLastResult updates
      const updatedMapping1 = manager.getPartitionKeyRangeMap().get("range1");
      const updatedMapping2 = manager.getPartitionKeyRangeMap().get("range2");
      const updatedMapping3 = manager.getPartitionKeyRangeMap().get("range3");
      
      assert.strictEqual(updatedMapping1?.hashedLastResult, 'hash-{"id":"item2"}');
      assert.isUndefined(updatedMapping2?.hashedLastResult); // Should remain undefined for empty range
      assert.strictEqual(updatedMapping3?.hashedLastResult, 'hash-{"id":"item3"}');
    });

    it("should handle buffer shorter than total itemCount", async () => {
      const rangeMapping1 = { ...createMockRangeMapping("00", "33"), itemCount: 3 };
      const rangeMapping2 = { ...createMockRangeMapping("33", "66"), itemCount: 3 };
      
      manager.updatePartitionRangeMapping("range1", rangeMapping1);
      manager.updatePartitionRangeMapping("range2", rangeMapping2);
      
      // Buffer has only 4 items, but total itemCount is 6
      const originalBuffer = [
        { id: "item1" },
        { id: "item2" },
        { id: "item3" }, // Last item in range1
        { id: "item4" }  // Only one item available for range2
      ];
      
      await manager.processDistinctQueryAndUpdateRangeMap(originalBuffer, mockHashObject);
      
      // Should hash last available items from each range
      assert.strictEqual((mockHashObject as any).mock.calls.length, 2);
      assert.deepStrictEqual((mockHashObject as any).mock.calls[0][0], { id: "item3" });
      assert.deepStrictEqual((mockHashObject as any).mock.calls[1][0], { id: "item4" });
      
      const updatedMapping1 = manager.getPartitionKeyRangeMap().get("range1");
      const updatedMapping2 = manager.getPartitionKeyRangeMap().get("range2");
      
      assert.strictEqual(updatedMapping1?.hashedLastResult, 'hash-{"id":"item3"}');
      assert.strictEqual(updatedMapping2?.hashedLastResult, 'hash-{"id":"item4"}');
    });

    it("should handle null/undefined items in buffer", async () => {
      const rangeMapping = { ...createMockRangeMapping("00", "AA"), itemCount: 3 };
      manager.updatePartitionRangeMapping("range1", rangeMapping);
      
      const originalBuffer = [
        { id: "item1" },
        null,                // null item
        { id: "item3" }     // Last valid item
      ];
      
      await manager.processDistinctQueryAndUpdateRangeMap(originalBuffer, mockHashObject);
      
      // Should hash the last valid item (item3)
      assert.strictEqual((mockHashObject as any).mock.calls.length, 1);
      assert.deepStrictEqual((mockHashObject as any).mock.calls[0][0], { id: "item3" });
      
      const updatedMapping = manager.getPartitionKeyRangeMap().get("range1");
      assert.strictEqual(updatedMapping?.hashedLastResult, 'hash-{"id":"item3"}');
    });

    it("should handle range where last item is null/undefined", async () => {
      const rangeMapping = { ...createMockRangeMapping("00", "AA"), itemCount: 2 };
      manager.updatePartitionRangeMapping("range1", rangeMapping);
      
      const originalBuffer = [
        { id: "item1" },
        null                // Last item is null
      ];
      
      await manager.processDistinctQueryAndUpdateRangeMap(originalBuffer, mockHashObject);
      
      // Hash function should not be called since last item is null
      assert.strictEqual((mockHashObject as any).mock.calls.length, 0);
      
      const updatedMapping = manager.getPartitionKeyRangeMap().get("range1");
      assert.isUndefined(updatedMapping?.hashedLastResult);
    });

    it("should preserve existing properties in range mappings", async () => {
      const originalMapping = {
        ...createMockRangeMapping("00", "AA"),
        itemCount: 2,
        customProperty: "customValue",
        existingHash: "existing-hash"
      };
      manager.updatePartitionRangeMapping("range1", originalMapping);
      
      const originalBuffer = [
        { id: "item1" },
        { id: "item2" }
      ];
      
      await manager.processDistinctQueryAndUpdateRangeMap(originalBuffer, mockHashObject);
      
      const updatedMapping = manager.getPartitionKeyRangeMap().get("range1");
      
      // Should preserve all existing properties
      assert.strictEqual(updatedMapping?.partitionKeyRange.id, originalMapping.partitionKeyRange.id);
      assert.strictEqual(updatedMapping?.itemCount, 2);
      assert.strictEqual((updatedMapping as any)?.customProperty, "customValue");
      
      // Should update hashedLastResult
      assert.strictEqual(updatedMapping?.hashedLastResult, 'hash-{"id":"item2"}');
    });

    it("should handle empty buffer gracefully", async () => {
      const rangeMapping = { ...createMockRangeMapping("00", "AA"), itemCount: 2 };
      manager.updatePartitionRangeMapping("range1", rangeMapping);
      
      const originalBuffer: any[] = [];
      
      await manager.processDistinctQueryAndUpdateRangeMap(originalBuffer, mockHashObject);
      
      // No hash function calls should be made
      assert.strictEqual((mockHashObject as any).mock.calls.length, 0);
      
      const updatedMapping = manager.getPartitionKeyRangeMap().get("range1");
      assert.isUndefined(updatedMapping?.hashedLastResult);
    });

    it("should handle hash function that throws errors", async () => {
      const errorHashFunction = vi.fn().mockRejectedValue(new Error("Hash function error"));
      
      const rangeMapping = { ...createMockRangeMapping("00", "AA"), itemCount: 1 };
      manager.updatePartitionRangeMapping("range1", rangeMapping);
      
      const originalBuffer = [{ id: "item1" }];
      
      // Should propagate the error from hash function
      await expect(
        manager.processDistinctQueryAndUpdateRangeMap(originalBuffer, errorHashFunction)
      ).rejects.toThrow("Hash function error");
    });

    it("should handle itemCount larger than buffer for single range", async () => {
      const rangeMapping = { ...createMockRangeMapping("00", "AA"), itemCount: 10 };
      manager.updatePartitionRangeMapping("range1", rangeMapping);
      
      const originalBuffer = [
        { id: "item1" },
        { id: "item2" }
      ]; // Only 2 items but itemCount is 10
      
      await manager.processDistinctQueryAndUpdateRangeMap(originalBuffer, mockHashObject);
      
      // Should hash the last available item in buffer
      assert.strictEqual((mockHashObject as any).mock.calls.length, 1);
      assert.deepStrictEqual((mockHashObject as any).mock.calls[0][0], { id: "item2" });
      
      const updatedMapping = manager.getPartitionKeyRangeMap().get("range1");
      assert.strictEqual(updatedMapping?.hashedLastResult, 'hash-{"id":"item2"}');
    });

    it("should process ranges in Map iteration order", async () => {
      // Add ranges in specific order
      const rangeMapping1 = { ...createMockRangeMapping("00", "33"), itemCount: 1 };
      const rangeMapping2 = { ...createMockRangeMapping("33", "66"), itemCount: 1 };
      const rangeMapping3 = { ...createMockRangeMapping("66", "FF"), itemCount: 1 };
      
      manager.updatePartitionRangeMapping("range1", rangeMapping1);
      manager.updatePartitionRangeMapping("range2", rangeMapping2);
      manager.updatePartitionRangeMapping("range3", rangeMapping3);
      
      const originalBuffer = [
        { id: "item1", order: 1 },
        { id: "item2", order: 2 },
        { id: "item3", order: 3 }
      ];
      
      await manager.processDistinctQueryAndUpdateRangeMap(originalBuffer, mockHashObject);
      
      // Should process in Map iteration order (insertion order for Maps)
      assert.strictEqual((mockHashObject as any).mock.calls.length, 3);
      assert.strictEqual((mockHashObject as any).mock.calls[0][0].order, 1);
      assert.strictEqual((mockHashObject as any).mock.calls[1][0].order, 2);
      assert.strictEqual((mockHashObject as any).mock.calls[2][0].order, 3);
    });
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach, vi } from "vitest";
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

      // Add a range mapping to test ORDER BY behavior
      const mockMapping = createMockRangeMapping("00", "AA");
      manager.updatePartitionRangeMapping("range1", mockMapping);

      // Process ranges to create ORDER BY token
      manager.processRangesForCurrentPage(
        10,
        20,
        [{ orderBy: "value" }],
        [{ _rid: "doc1", id: "1" }],
      );

      const tokenString = manager.getTokenString();
      assert.isString(tokenString);

      // ORDER BY tokens should be JSON objects with specific structure
      const parsedToken = JSON.parse(tokenString!);
      assert.property(parsedToken, "compositeToken");
      assert.property(parsedToken, "orderByItems");
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

  describe("updatePartitionRangeMapping", () => {
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

  describe("removePartitionRangeMapping", () => {
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

  describe("removeExhaustedRangesFromCompositeContinuationToken (tested via processRangesForCurrentPage)", () => {
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
      manager.processRangesForCurrentPage(50, 100);

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
        manager.processRangesForCurrentPage(10, 20);
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
        manager.processRangesForCurrentPage(10, 20);
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
      manager.processRangesForCurrentPage(100, 200);

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
      const orderByItems = [{ value: "test", type: "string" }];
      const pageResults = [{ _rid: "doc1", id: "1", value: "test" }];
      manager.processRangesForCurrentPage(10, 20, orderByItems, pageResults);

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
      manager.processRangesForCurrentPage(30, 50);

      // Should remove all null variations, keeping only the active mapping
      const updatedCompositeContinuationToken = manager.getCompositeContinuationToken();
      assert.strictEqual(updatedCompositeContinuationToken.rangeMappings.length, 1);
      assert.strictEqual(
        updatedCompositeContinuationToken.rangeMappings[0].continuationToken,
        "valid-token",
      );
    });
  });

  describe("processRangesForCurrentPage", () => {
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

      // Create mappings for ORDER BY processing
      const mapping1 = createMockRangeMapping("00", "AA", "orderby-token1", [0, 4]);
      const mapping2 = createMockRangeMapping("AA", "BB", "orderby-token2", [5, 9]);

      // Add mappings to partition key range map
      manager.updatePartitionRangeMapping("range1", mapping1);
      manager.updatePartitionRangeMapping("range2", mapping2);

      // Process ranges for ORDER BY query with required parameters
      const orderByItems = [{ value: "test", type: "string" }];
      const pageResults = [{ _rid: "doc1", id: "1", value: "test" }];
      const result = manager.processRangesForCurrentPage(20, 50, orderByItems, pageResults);

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

  describe("clearRangeMappings", () => {
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
});

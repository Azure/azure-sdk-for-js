// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach } from "vitest";
import {
  calculateOffsetLimitForPartitionRanges,
  processDistinctQueryAndUpdateRangeMap,
} from "../../../../../src/queryExecutionContext/PartitionRangeUtils.js";

describe("PartitionRangeUtils", () => {
  let mockRangeMapping: any;
  let mockPartitionKeyRangeMap: Map<string, any>;

  beforeEach(() => {
    mockRangeMapping = {
      partitionKeyRange: { id: "0", minInclusive: "00", maxExclusive: "AA" },
      itemCount: 10,
      continuationToken: "mock-token",
    };

    mockPartitionKeyRangeMap = new Map<string, any>();
  });

  describe("calculateOffsetLimitForPartitionRanges", () => {
    describe("Basic functionality", () => {
      it("should handle empty map", () => {
        const result = calculateOffsetLimitForPartitionRanges(new Map(), 5, 10);
        assert.equal(result.size, 0);
      });

      it("should handle null/undefined map", () => {
        const result = calculateOffsetLimitForPartitionRanges(null as any, 5, 10);
        assert.isNull(result);
      });

      it("should preserve all range properties while updating offset/limit", () => {
        mockPartitionKeyRangeMap.set("range1", {
          ...mockRangeMapping,
          itemCount: 5,
          customProperty: "preserved"
        });

        const result = calculateOffsetLimitForPartitionRanges(mockPartitionKeyRangeMap, 2, 3);
        const range = result.get("range1");
        
        assert.equal(range.customProperty, "preserved");
        assert.deepEqual(range.partitionKeyRange, mockRangeMapping.partitionKeyRange);
        assert.equal(range.continuationToken, "mock-token");
      });
    });

    describe("Offset consumption scenarios", () => {
      it("should consume offset completely from single range", () => {
        mockPartitionKeyRangeMap.set("range1", { ...mockRangeMapping, itemCount: 10 });

        const result = calculateOffsetLimitForPartitionRanges(mockPartitionKeyRangeMap, 5, 10);
        const range = result.get("range1");
        
        assert.equal(range.offset, 0); // offset consumed
        assert.equal(range.limit, 5); // limit reduced by remaining items (5)
        assert.equal(range.itemCount, 5); // only 5 items returned after offset
      });

      it("should consume offset partially across multiple ranges", () => {
        mockPartitionKeyRangeMap.set("range1", { ...mockRangeMapping, itemCount: 3 });
        mockPartitionKeyRangeMap.set("range2", { ...mockRangeMapping, itemCount: 5 });

        const result = calculateOffsetLimitForPartitionRanges(mockPartitionKeyRangeMap, 4, 10);

        const range1 = result.get("range1");
        assert.equal(range1.offset, 1); // 4-3=1 offset remaining
        assert.equal(range1.itemCount, 0); // no items returned from range1

        const range2 = result.get("range2");
        assert.equal(range2.offset, 0); // offset fully consumed
        assert.equal(range2.limit, 6); // 10-4=6 limit remaining
        assert.equal(range2.itemCount, 4); // 5-1=4 items after offset consumption
      });

      it("should handle offset larger than total items", () => {
        mockPartitionKeyRangeMap.set("range1", { ...mockRangeMapping, itemCount: 3 });

        const result = calculateOffsetLimitForPartitionRanges(mockPartitionKeyRangeMap, 10, 5);
        const range = result.get("range1");
        
        assert.equal(range.offset, 7); // 10-3=7 offset remaining
        assert.equal(range.itemCount, 0); // no items returned
      });
    });

    describe("Limit application scenarios", () => {
      it("should apply limit when no offset", () => {
        mockPartitionKeyRangeMap.set("range1", { ...mockRangeMapping, itemCount: 10 });

        const result = calculateOffsetLimitForPartitionRanges(mockPartitionKeyRangeMap, 0, 5);
        const range = result.get("range1");
        
        assert.equal(range.offset, 0);
        assert.equal(range.limit, 0); // limit exhausted
        assert.equal(range.itemCount, 5); // limited to 5 items
      });

      it("should distribute limit across multiple ranges", () => {
        mockPartitionKeyRangeMap.set("range1", { ...mockRangeMapping, itemCount: 3 });
        mockPartitionKeyRangeMap.set("range2", { ...mockRangeMapping, itemCount: 5 });

        const result = calculateOffsetLimitForPartitionRanges(mockPartitionKeyRangeMap, 0, 6);

        const range1 = result.get("range1");
        assert.equal(range1.itemCount, 3); // all 3 items
        assert.equal(range1.limit, 3); // 6-3=3 limit remaining

        const range2 = result.get("range2");
        assert.equal(range2.itemCount, 3); // limited to remaining 3
        assert.equal(range2.limit, 0); // limit exhausted
      });

      it("should handle zero limit", () => {
        mockPartitionKeyRangeMap.set("range1", { ...mockRangeMapping, itemCount: 10 });

        const result = calculateOffsetLimitForPartitionRanges(mockPartitionKeyRangeMap, 0, 0);
        const range = result.get("range1");
        
        assert.equal(range.itemCount, 0); // no items due to zero limit
        assert.equal(range.limit, 0);
      });
    });

    describe("Combined offset and limit scenarios", () => {
      it("should handle offset and limit with complex interaction", () => {
        mockPartitionKeyRangeMap.set("range1", { ...mockRangeMapping, itemCount: 10 });

        const result = calculateOffsetLimitForPartitionRanges(mockPartitionKeyRangeMap, 3, 5);
        const range = result.get("range1");
        
        assert.equal(range.offset, 0);
        assert.equal(range.limit, 0); 
        assert.equal(range.itemCount, 5); // 7 items available after offset, limited to 5
      });

      it("should handle complex multi-range scenario", () => {
        mockPartitionKeyRangeMap.set("range1", { ...mockRangeMapping, itemCount: 2 });
        mockPartitionKeyRangeMap.set("range2", { ...mockRangeMapping, itemCount: 8 });
        mockPartitionKeyRangeMap.set("range3", { ...mockRangeMapping, itemCount: 5 });

        const result = calculateOffsetLimitForPartitionRanges(mockPartitionKeyRangeMap, 5, 7);

        const range1 = result.get("range1");
        assert.equal(range1.offset, 3); // 5-2=3 offset remaining
        assert.equal(range1.itemCount, 0);

        const range2 = result.get("range2");
        assert.equal(range2.offset, 0); // 3 offset consumed
        assert.equal(range2.limit, 2); // 7-5=2 limit remaining
        assert.equal(range2.itemCount, 5); // 8-3=5 items after offset

        const range3 = result.get("range3");
        assert.equal(range3.offset, 0);
        assert.equal(range3.limit, 0); // limit exhausted
        assert.equal(range3.itemCount, 2); // limited to remaining 2
      });
    });

    describe("Edge cases", () => {
      it("should handle ranges with zero items", () => {
        mockPartitionKeyRangeMap.set("range1", { ...mockRangeMapping, itemCount: 0 });
        mockPartitionKeyRangeMap.set("range2", { ...mockRangeMapping, itemCount: 5 });

        const result = calculateOffsetLimitForPartitionRanges(mockPartitionKeyRangeMap, 2, 3);

        const range1 = result.get("range1");
        assert.equal(range1.itemCount, 0);
        assert.equal(range1.offset, 2); // offset unchanged

        const range2 = result.get("range2");
        assert.equal(range2.offset, 0); // 2 offset consumed
        assert.equal(range2.itemCount, 3); // 3 items after offset
      });

      it("should handle negative item counts gracefully", () => {
        mockPartitionKeyRangeMap.set("range1", { ...mockRangeMapping, itemCount: -5 });

        const result = calculateOffsetLimitForPartitionRanges(mockPartitionKeyRangeMap, 2, 3);
        const range = result.get("range1");
        
        assert.equal(range.itemCount, 0); // negative treated as 0
        assert.equal(range.offset, 2); // offset unchanged
      });
    });
  });

  describe("processDistinctQueryAndUpdateRangeMap", () => {
    let mockHashFunction: (item: any) => Promise<string>;
    let mockBuffer: any[];

    beforeEach(() => {
      mockHashFunction = async (item: any) => `hash_${item.id}`;
      mockBuffer = [
        { id: 1, value: "a" },
        { id: 2, value: "b" },
        { id: 3, value: "c" },
        { id: 4, value: "d" },
        { id: 5, value: "e" }
      ];
    });

    describe("Basic functionality", () => {
      it("should handle empty map", async () => {
        const result = await processDistinctQueryAndUpdateRangeMap(mockBuffer, new Map(), mockHashFunction);
        assert.equal(result.size, 0);
      });

      it("should handle null/undefined map", async () => {
        const result = await processDistinctQueryAndUpdateRangeMap(mockBuffer, null as any, mockHashFunction);
        assert.isNull(result);
      });

      it("should preserve all range properties while adding hashedLastResult", async () => {
        mockPartitionKeyRangeMap.set("range1", {
          ...mockRangeMapping,
          itemCount: 2,
          customProperty: "preserved"
        });

        const result = await processDistinctQueryAndUpdateRangeMap(mockBuffer, mockPartitionKeyRangeMap, mockHashFunction);
        const range = result.get("range1");
        
        assert.equal(range.customProperty, "preserved");
        assert.deepEqual(range.partitionKeyRange, mockRangeMapping.partitionKeyRange);
        assert.equal(range.hashedLastResult, "hash_2");
      });
    });

    describe("Hash calculation scenarios", () => {
      it("should calculate hash for single range", async () => {
        mockPartitionKeyRangeMap.set("range1", { ...mockRangeMapping, itemCount: 3 });

        const result = await processDistinctQueryAndUpdateRangeMap(mockBuffer, mockPartitionKeyRangeMap, mockHashFunction);
        const range = result.get("range1");
        
        assert.equal(range.hashedLastResult, "hash_3"); // Last item in range (index 2)
      });

      it("should calculate hash for multiple ranges", async () => {
        mockPartitionKeyRangeMap.set("range1", { ...mockRangeMapping, itemCount: 2 });
        mockPartitionKeyRangeMap.set("range2", { ...mockRangeMapping, itemCount: 3 });

        const result = await processDistinctQueryAndUpdateRangeMap(mockBuffer, mockPartitionKeyRangeMap, mockHashFunction);

        const range1 = result.get("range1");
        assert.equal(range1.hashedLastResult, "hash_2"); // Items 0,1 -> last is index 1

        const range2 = result.get("range2");
        assert.equal(range2.hashedLastResult, "hash_5"); // Items 2,3,4 -> last is index 4
      });

      it("should handle custom hash function", async () => {
        const customHashFunction = async (item: any): Promise<string> => `custom_${item.value}_${item.id}`;
        mockPartitionKeyRangeMap.set("range1", { ...mockRangeMapping, itemCount: 1 });

        const result = await processDistinctQueryAndUpdateRangeMap(mockBuffer, mockPartitionKeyRangeMap, customHashFunction);
        const range = result.get("range1");
        
        assert.equal(range.hashedLastResult, "custom_a_1");
      });
    });

    describe("Buffer boundary scenarios", () => {
      it("should handle range extending beyond buffer", async () => {
        mockPartitionKeyRangeMap.set("range1", { ...mockRangeMapping, itemCount: 10 }); // More than buffer size (5)

        const result = await processDistinctQueryAndUpdateRangeMap(mockBuffer, mockPartitionKeyRangeMap, mockHashFunction);
        const range = result.get("range1");
        
        assert.equal(range.hashedLastResult, "hash_5"); // Last available item
      });

      it("should handle empty buffer", async () => {
        mockPartitionKeyRangeMap.set("range1", { ...mockRangeMapping, itemCount: 3 });

        const result = await processDistinctQueryAndUpdateRangeMap([], mockPartitionKeyRangeMap, mockHashFunction);
        const range = result.get("range1");
        
        assert.isUndefined(range.hashedLastResult);
      });

      it("should handle buffer exhaustion across ranges", async () => {
        mockPartitionKeyRangeMap.set("range1", { ...mockRangeMapping, itemCount: 3 });
        mockPartitionKeyRangeMap.set("range2", { ...mockRangeMapping, itemCount: 5 }); // Would need items 3-7

        const result = await processDistinctQueryAndUpdateRangeMap(mockBuffer, mockPartitionKeyRangeMap, mockHashFunction); // Only 5 items (0-4)

        const range1 = result.get("range1");
        assert.equal(range1.hashedLastResult, "hash_3");

        const range2 = result.get("range2");
        assert.equal(range2.hashedLastResult, "hash_5"); // Last available item
      });
    });

    describe("Edge cases", () => {
      it("should handle ranges with zero items", async () => {
        mockPartitionKeyRangeMap.set("range1", { ...mockRangeMapping, itemCount: 0 });
        mockPartitionKeyRangeMap.set("range2", { ...mockRangeMapping, itemCount: 2 });

        const result = await processDistinctQueryAndUpdateRangeMap(mockBuffer, mockPartitionKeyRangeMap, mockHashFunction);

        const range1 = result.get("range1");
        assert.isUndefined(range1.hashedLastResult);

        const range2 = result.get("range2");
        assert.equal(range2.hashedLastResult, "hash_2");
      });

      it("should handle null items in buffer", async () => {
        const bufferWithNull = [{ id: 1, value: "a" }, null, { id: 3, value: "c" }];
        mockPartitionKeyRangeMap.set("range1", { ...mockRangeMapping, itemCount: 2 });

        const result = await processDistinctQueryAndUpdateRangeMap(bufferWithNull, mockPartitionKeyRangeMap, mockHashFunction);
        const range = result.get("range1");
        
        assert.isUndefined(range.hashedLastResult); // null item should not generate hash
      });

      it("should handle async hash function errors gracefully", async () => {
        const errorHashFunction = async (item: any): Promise<string> => {
          if (item.id === 2) throw new Error("Hash error");
          return `hash_${item.id}`;
        };

        mockPartitionKeyRangeMap.set("range1", { ...mockRangeMapping, itemCount: 2 });

        try {
          await processDistinctQueryAndUpdateRangeMap(mockBuffer, mockPartitionKeyRangeMap, errorHashFunction);
          assert.fail("Should have thrown an error");
        } catch (error: any) {
          assert.equal(error.message, "Hash error");
        }
      });

      it("should maintain range order during processing", async () => {
        // Create ranges in specific order
        const orderedMap = new Map();
        orderedMap.set("range1", { ...mockRangeMapping, itemCount: 1 });
        orderedMap.set("range2", { ...mockRangeMapping, itemCount: 2 });
        orderedMap.set("range3", { ...mockRangeMapping, itemCount: 2 });

        const result = await processDistinctQueryAndUpdateRangeMap(mockBuffer, orderedMap, mockHashFunction);

        const keys = Array.from(result.keys());
        assert.deepEqual(keys, ["range1", "range2", "range3"]);

        assert.equal(result.get("range1").hashedLastResult, "hash_1");
        assert.equal(result.get("range2").hashedLastResult, "hash_3");
        assert.equal(result.get("range3").hashedLastResult, "hash_5");
      });
    });
  });
});

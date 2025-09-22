// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import {
  createCompositeQueryContinuationToken,
  addRangeMappingToCompositeToken,
  serializeCompositeToken,
  parseCompositeQueryContinuationToken,
  convertRangeMappingToQueryRange,
  type QueryRangeWithContinuationToken,
} from "../../../../../src/documents/ContinuationToken/CompositeQueryContinuationToken.js";
import { QueryRange } from "../../../../../src/routing/QueryRange.js";
import type { QueryRangeMapping } from "../../../../../src/queryExecutionContext/QueryRangeMapping.js";
import type { PartitionKeyRange } from "../../../../../src/client/Container/PartitionKeyRange.js";
describe("CompositeQueryContinuationToken", () => {
  const mockRid = "test-resource-id";

  // Helper function to create mock partition key range
  const createMockPartitionKeyRange = (
    id: string,
    minInclusive: string,
    maxExclusive: string,
  ): PartitionKeyRange => ({
    id,
    minInclusive,
    maxExclusive,
    ridPrefix: 0,
    throughputFraction: 1.0,
    status: "online",
    parents: [],
  });

  const mockRangeMappings: QueryRangeWithContinuationToken[] = [
    {
      queryRange: new QueryRange("00", "FF", true, false),
      continuationToken: "token1",
    },
    {
      queryRange: new QueryRange("FF", "ZZ", true, false),
      continuationToken: "token2",
    },
  ];

  describe("createCompositeQueryContinuationToken", () => {
    it("should create a token with required parameters", () => {
      const token = createCompositeQueryContinuationToken(mockRid, mockRangeMappings);

      assert.equal(token.rid, mockRid);
      assert.deepEqual(token.rangeMappings, mockRangeMappings);
      assert.isUndefined(token.offset);
      assert.isUndefined(token.limit);
    });

    it("should create a token with all parameters including offset and limit", () => {
      const offset = 10;
      const limit = 20;
      const token = createCompositeQueryContinuationToken(
        mockRid,
        mockRangeMappings,
        offset,
        limit,
      );

      assert.equal(token.rid, mockRid);
      assert.deepEqual(token.rangeMappings, mockRangeMappings);
      assert.equal(token.offset, offset);
      assert.equal(token.limit, limit);
    });

    it("should throw error when rangeMappings is empty array", () => {
      assert.throws(() => {
        createCompositeQueryContinuationToken(mockRid, []);
      }, "Range mappings are required to create a continuation token");
    });

    it("should throw error when rangeMappings is null or undefined", () => {
      assert.throws(() => {
        createCompositeQueryContinuationToken(mockRid, null as any);
      }, "Range mappings are required to create a continuation token");

      assert.throws(() => {
        createCompositeQueryContinuationToken(mockRid, undefined as any);
      }, "Range mappings are required to create a continuation token");
    });
  });

  describe("addRangeMappingToCompositeToken", () => {
    it("should add a range mapping to existing token", () => {
      const token = createCompositeQueryContinuationToken(mockRid, mockRangeMappings);
      const rangeMapping: QueryRangeMapping = {
        itemCount: 5,
        continuationToken: "new-token",
        partitionKeyRange: createMockPartitionKeyRange("1", "AA", "BB"),
      };

      addRangeMappingToCompositeToken(token, rangeMapping);

      assert.equal(token.rangeMappings.length, 3); // 2 original + 1 new
      assert.equal(token.rangeMappings[2].continuationToken, "new-token");
      assert.equal(token.rangeMappings[2].queryRange.min, "AA");
      assert.equal(token.rangeMappings[2].queryRange.max, "BB");
    });

    it("should add multiple range mappings", () => {
      const token = createCompositeQueryContinuationToken(mockRid, mockRangeMappings);
      const rangeMapping1: QueryRangeMapping = {
        itemCount: 5,
        continuationToken: "token1",
        partitionKeyRange: createMockPartitionKeyRange("1", "AA", "BB"),
      };
      const rangeMapping2: QueryRangeMapping = {
        itemCount: 3,
        continuationToken: "token2",
        partitionKeyRange: createMockPartitionKeyRange("2", "CC", "DD"),
      };

      addRangeMappingToCompositeToken(token, rangeMapping1);
      addRangeMappingToCompositeToken(token, rangeMapping2);

      assert.equal(token.rangeMappings.length, 4); // 2 original + 2 new
      assert.equal(token.rangeMappings[2].continuationToken, "token1");
      assert.equal(token.rangeMappings[3].continuationToken, "token2");
    });
  });

  describe("serializeCompositeToken", () => {
    it("should serialize token to JSON string", () => {
      const token = createCompositeQueryContinuationToken(mockRid, mockRangeMappings, 10, 20);
      const serialized = serializeCompositeToken(token);
      const parsed = JSON.parse(serialized);

      assert.equal(parsed.rid, mockRid);
      assert.equal(parsed.offset, 10);
      assert.equal(parsed.limit, 20);
      assert.equal(parsed.rangeMappings.length, 2);
    });

    it("should serialize token without offset and limit", () => {
      const token = createCompositeQueryContinuationToken(mockRid, mockRangeMappings);
      const serialized = serializeCompositeToken(token);
      const parsed = JSON.parse(serialized);

      assert.equal(parsed.rid, mockRid);
      assert.isUndefined(parsed.offset);
      assert.isUndefined(parsed.limit);
    });
  });

  describe("parseCompositeQueryContinuationToken", () => {
    it("should parse valid JSON string to token", () => {
      const originalToken = createCompositeQueryContinuationToken(
        mockRid,
        mockRangeMappings,
        10,
        20,
      );
      const serialized = serializeCompositeToken(originalToken);
      const parsedToken = parseCompositeQueryContinuationToken(serialized);

      assert.equal(parsedToken.rid, mockRid);
      assert.equal(parsedToken.offset, 10);
      assert.equal(parsedToken.limit, 20);
      assert.equal(parsedToken.rangeMappings.length, 2);
    });

    it("should throw error for invalid JSON", () => {
      assert.throws(() => {
        parseCompositeQueryContinuationToken("invalid-json");
      });
    });

    it("should parse empty JSON object", () => {
      const token = parseCompositeQueryContinuationToken("{}");
      assert.isUndefined(token.rid);
      assert.isUndefined(token.rangeMappings);
    });
  });

  describe("convertRangeMappingToQueryRange", () => {
    it("should convert range mapping with logical boundaries", () => {
      const rangeMapping: QueryRangeMapping = {
        itemCount: 5,
        continuationToken: "test-token",
        partitionKeyRange: createMockPartitionKeyRange("1", "AA", "BB"),
      };

      const result = convertRangeMappingToQueryRange(rangeMapping);

      assert.equal(result.continuationToken, "test-token");
      assert.equal(result.queryRange.min, "AA");
      assert.equal(result.queryRange.max, "BB");
      assert.isTrue(result.queryRange.isMinInclusive);
      assert.isFalse(result.queryRange.isMaxInclusive);
    });

    it("should prefer EPK boundaries over logical boundaries", () => {
      const rangeMapping: QueryRangeMapping = {
        itemCount: 5,
        continuationToken: "test-token",
        partitionKeyRange: createMockPartitionKeyRange("1", "AA", "BB"),
      };

      const result = convertRangeMappingToQueryRange(rangeMapping);

      assert.equal(result.continuationToken, "test-token");
      assert.equal(result.queryRange.min, "EPK_AA");
      assert.equal(result.queryRange.max, "EPK_BB");
    });

    it("should handle null continuation token", () => {
      const rangeMapping: QueryRangeMapping = {
        itemCount: 0,
        continuationToken: null,
        partitionKeyRange: createMockPartitionKeyRange("1", "AA", "BB"),
      };

      const result = convertRangeMappingToQueryRange(rangeMapping);

      assert.isNull(result.continuationToken);
      assert.equal(result.queryRange.min, "AA");
      assert.equal(result.queryRange.max, "BB");
    });

    it("should throw error when partitionKeyRange is undefined", () => {
      const rangeMapping: QueryRangeMapping = {
        itemCount: 5,
        continuationToken: "test-token",
      };

      assert.throws(() => {
        convertRangeMappingToQueryRange(rangeMapping);
      }, "QueryRangeMapping must have a partitionKeyRange");
    });
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import {
  createCompositeQueryContinuationToken,
  serializeCompositeToken,
  parseCompositeQueryContinuationToken,
  convertRangeMappingToQueryRange,
  type QueryRangeWithContinuationToken,
} from "../../../../../src/documents/ContinuationToken/CompositeQueryContinuationToken.js";
import type { QueryRangeMapping } from "../../../../../src/queryExecutionContext/queryRangeMapping.js";
import type { PartitionKeyRange } from "../../../../../src/client/Container/PartitionKeyRange.js";
describe.skip("CompositeQueryContinuationToken", () => {
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
      queryRange: { min: "00", max: "FF" },
      continuationToken: "token1",
    },
    {
      queryRange: { min: "FF", max: "ZZ" },
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
      }, "Failed to create composite continuation token: No partition range mappings provided");
    });

    it("should throw error when rangeMappings is null or undefined", () => {
      assert.throws(() => {
        createCompositeQueryContinuationToken(mockRid, null as any);
      }, "Failed to create composite continuation token: No partition range mappings provided");

      assert.throws(() => {
        createCompositeQueryContinuationToken(mockRid, undefined as any);
      }, "Failed to create composite continuation token: No partition range mappings provided");
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
    });

    it("should use minInclusive and maxExclusive boundaries from partition key range", () => {
      const rangeMapping: QueryRangeMapping = {
        itemCount: 5,
        continuationToken: "test-token",
        partitionKeyRange: createMockPartitionKeyRange("1", "AA", "BB"),
      };

      const result = convertRangeMappingToQueryRange(rangeMapping);

      assert.equal(result.continuationToken, "test-token");
      assert.equal(result.queryRange.min, "AA");
      assert.equal(result.queryRange.max, "BB");
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
      }, "Failed to convert range mapping: Missing partition key range information");
    });
  });
});

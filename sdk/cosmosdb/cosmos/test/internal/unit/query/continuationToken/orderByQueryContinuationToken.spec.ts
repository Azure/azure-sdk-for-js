// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import {
  createOrderByQueryContinuationToken,
  serializeOrderByQueryContinuationToken,
  parseOrderByQueryContinuationToken,
} from "../../../../../src/documents/ContinuationToken/OrderByQueryContinuationToken.js";
import { QueryRange } from "../../../../../src/routing/QueryRange.js";
import type { QueryRangeWithContinuationToken } from "../../../../../src/documents/ContinuationToken/CompositeQueryContinuationToken.js";

describe("OrderByQueryContinuationToken", () => {
  const mockRid = "test-resource-id";
  const mockSkipCount = 10;
  const mockDocumentRid = "doc-123";
  const mockOrderByItems = [
    { value: "test-value-1", type: "string" },
    { value: 42, type: "number" },
  ];
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

  describe("createOrderByQueryContinuationToken", () => {
    it("should create a token with required parameters", () => {
      const token = createOrderByQueryContinuationToken(
        mockRangeMappings,
        mockOrderByItems,
        mockRid,
        mockSkipCount,
      );

      assert.deepEqual(token.rangeMappings, mockRangeMappings);
      assert.deepEqual(token.orderByItems, mockOrderByItems);
      assert.equal(token.rid, mockRid);
      assert.equal(token.skipCount, mockSkipCount);
      assert.isUndefined(token.documentRid);
      assert.isUndefined(token.offset);
      assert.isUndefined(token.limit);
      assert.isUndefined(token.hashedLastResult);
    });

    it("should create a token with all optional parameters", () => {
      const offset = 5;
      const limit = 20;
      const hashedLastResult = "hash123";

      const token = createOrderByQueryContinuationToken(
        mockRangeMappings,
        mockOrderByItems,
        mockRid,
        mockSkipCount,
        mockDocumentRid,
        offset,
        limit,
        hashedLastResult,
      );

      assert.deepEqual(token.rangeMappings, mockRangeMappings);
      assert.deepEqual(token.orderByItems, mockOrderByItems);
      assert.equal(token.rid, mockRid);
      assert.equal(token.skipCount, mockSkipCount);
      assert.equal(token.documentRid, mockDocumentRid);
      assert.equal(token.offset, offset);
      assert.equal(token.limit, limit);
      assert.equal(token.hashedLastResult, hashedLastResult);
    });

    it("should throw error when range mappings is empty", () => {
      assert.throws(() => {
        createOrderByQueryContinuationToken([], mockOrderByItems, mockRid, mockSkipCount);
      }, "rangeMappings must contain at least one element");
    });

    it("should throw error when order by items is empty", () => {
      assert.throws(() => {
        createOrderByQueryContinuationToken(mockRangeMappings, [], mockRid, mockSkipCount);
      }, "orderByItems must contain at least one element");
    });

    it("should throw error when range mappings is null or undefined", () => {
      assert.throws(() => {
        createOrderByQueryContinuationToken(null as any, mockOrderByItems, mockRid, mockSkipCount);
      }, "rangeMappings must contain at least one element");

      assert.throws(() => {
        createOrderByQueryContinuationToken(
          undefined as any,
          mockOrderByItems,
          mockRid,
          mockSkipCount,
        );
      }, "rangeMappings must contain at least one element");
    });

    it("should throw error when order by items is null or undefined", () => {
      assert.throws(() => {
        createOrderByQueryContinuationToken(mockRangeMappings, null as any, mockRid, mockSkipCount);
      }, "orderByItems must contain at least one element");

      assert.throws(() => {
        createOrderByQueryContinuationToken(
          mockRangeMappings,
          undefined as any,
          mockRid,
          mockSkipCount,
        );
      }, "orderByItems must contain at least one element");
    });

    it("should throw error when both arrays are empty", () => {
      assert.throws(() => {
        createOrderByQueryContinuationToken([], [], mockRid, mockSkipCount);
      }, "rangeMappings must contain at least one element");
    });

    it("should create a token with zero skip count", () => {
      const token = createOrderByQueryContinuationToken(
        mockRangeMappings,
        mockOrderByItems,
        mockRid,
        0,
      );

      assert.deepEqual(token.rangeMappings, mockRangeMappings);
      assert.deepEqual(token.orderByItems, mockOrderByItems);
      assert.equal(token.rid, mockRid);
      assert.equal(token.skipCount, 0);
    });

    it("should create a token with complex order by items", () => {
      const complexOrderByItems = [
        { value: null, type: "null" },
        { value: true, type: "boolean" },
        { value: [1, 2, 3], type: "array" },
        { value: { nested: "object" }, type: "object" },
      ];

      const token = createOrderByQueryContinuationToken(
        mockRangeMappings,
        complexOrderByItems,
        mockRid,
        mockSkipCount,
      );

      assert.deepEqual(token.orderByItems, complexOrderByItems);
    });
  });

  describe("serializeOrderByQueryContinuationToken", () => {
    it("should serialize token to JSON string", () => {
      const token = createOrderByQueryContinuationToken(
        mockRangeMappings,
        mockOrderByItems,
        mockRid,
        mockSkipCount,
        mockDocumentRid,
        5,
        20,
        "hash123",
      );

      const serialized = serializeOrderByQueryContinuationToken(token);
      const parsed = JSON.parse(serialized);

      assert.equal(parsed.rid, mockRid);
      assert.equal(parsed.skipCount, mockSkipCount);
      assert.equal(parsed.documentRid, mockDocumentRid);
      assert.equal(parsed.offset, 5);
      assert.equal(parsed.limit, 20);
      assert.equal(parsed.hashedLastResult, "hash123");
      assert.equal(parsed.rangeMappings.length, 2);
      assert.equal(parsed.orderByItems.length, 2);
    });

    it("should serialize token without optional parameters", () => {
      const token = createOrderByQueryContinuationToken(
        mockRangeMappings,
        mockOrderByItems,
        mockRid,
        mockSkipCount,
      );

      const serialized = serializeOrderByQueryContinuationToken(token);
      const parsed = JSON.parse(serialized);

      assert.equal(parsed.rid, mockRid);
      assert.equal(parsed.skipCount, mockSkipCount);
      assert.isUndefined(parsed.documentRid);
      assert.isUndefined(parsed.offset);
      assert.isUndefined(parsed.limit);
      assert.isUndefined(parsed.hashedLastResult);
    });

    it("should serialize token with complex order by items", () => {
      const complexOrderByItems = [
        { value: null, type: "null" },
        { value: { nested: { deep: "value" } }, type: "object" },
      ];
      const token = createOrderByQueryContinuationToken(
        mockRangeMappings,
        complexOrderByItems,
        mockRid,
        mockSkipCount,
      );

      const serialized = serializeOrderByQueryContinuationToken(token);
      const parsed = JSON.parse(serialized);

      assert.deepEqual(parsed.orderByItems, complexOrderByItems);
    });
  });

  describe("parseOrderByQueryContinuationToken", () => {
    it("should parse valid JSON string to token", () => {
      const originalToken = createOrderByQueryContinuationToken(
        mockRangeMappings,
        mockOrderByItems,
        mockRid,
        mockSkipCount,
        mockDocumentRid,
        5,
        20,
        "hash123",
      );
      const serialized = serializeOrderByQueryContinuationToken(originalToken);
      const parsedToken = parseOrderByQueryContinuationToken(serialized);

      assert.equal(parsedToken.rid, mockRid);
      assert.equal(parsedToken.skipCount, mockSkipCount);
      assert.equal(parsedToken.documentRid, mockDocumentRid);
      assert.equal(parsedToken.offset, 5);
      assert.equal(parsedToken.limit, 20);
      assert.equal(parsedToken.hashedLastResult, "hash123");
      assert.equal(parsedToken.rangeMappings.length, 2);
      assert.equal(parsedToken.orderByItems.length, 2);
    });

    it("should parse token without optional parameters", () => {
      const originalToken = createOrderByQueryContinuationToken(
        mockRangeMappings,
        mockOrderByItems,
        mockRid,
        mockSkipCount,
      );
      const serialized = serializeOrderByQueryContinuationToken(originalToken);
      const parsedToken = parseOrderByQueryContinuationToken(serialized);

      assert.equal(parsedToken.rid, mockRid);
      assert.equal(parsedToken.skipCount, mockSkipCount);
      assert.isUndefined(parsedToken.documentRid);
      assert.isUndefined(parsedToken.offset);
      assert.isUndefined(parsedToken.limit);
      assert.isUndefined(parsedToken.hashedLastResult);
    });

    it("should throw error for invalid JSON", () => {
      assert.throws(() => {
        parseOrderByQueryContinuationToken("invalid-json");
      });
    });

    it("should parse empty JSON object", () => {
      const token = parseOrderByQueryContinuationToken("{}");
      assert.isUndefined(token.rid);
      assert.isUndefined(token.rangeMappings);
      assert.isUndefined(token.orderByItems);
      assert.isUndefined(token.skipCount);
    });

    it("should preserve complex order by items during serialization round trip", () => {
      const complexOrderByItems = [
        { value: null, type: "null" },
        { value: true, type: "boolean" },
        { value: [1, 2, 3], type: "array" },
        { value: { nested: { deep: "value" } }, type: "object" },
      ];
      const originalToken = createOrderByQueryContinuationToken(
        mockRangeMappings,
        complexOrderByItems,
        mockRid,
        mockSkipCount,
      );
      const serialized = serializeOrderByQueryContinuationToken(originalToken);
      const parsedToken = parseOrderByQueryContinuationToken(serialized);

      assert.deepEqual(parsedToken.orderByItems, complexOrderByItems);
    });

    it("should handle large skip count values", () => {
      const largeSkipCount = 1000000;
      const originalToken = createOrderByQueryContinuationToken(
        mockRangeMappings,
        mockOrderByItems,
        mockRid,
        largeSkipCount,
      );
      const serialized = serializeOrderByQueryContinuationToken(originalToken);
      const parsedToken = parseOrderByQueryContinuationToken(serialized);

      assert.equal(parsedToken.skipCount, largeSkipCount);
    });

    it("should handle special characters in rid and documentRid", () => {
      const specialRid = "test-resource-id-with-special-chars!@#$%";
      const specialDocumentRid = "doc-with-special-chars!@#$%";
      const originalToken = createOrderByQueryContinuationToken(
        mockRangeMappings,
        mockOrderByItems,
        specialRid,
        mockSkipCount,
        specialDocumentRid,
      );
      const serialized = serializeOrderByQueryContinuationToken(originalToken);
      const parsedToken = parseOrderByQueryContinuationToken(serialized);

      assert.equal(parsedToken.rid, specialRid);
      assert.equal(parsedToken.documentRid, specialDocumentRid);
    });
  });

  describe("Integration tests", () => {
    it("should maintain token integrity through multiple serialization cycles", () => {
      const originalToken = createOrderByQueryContinuationToken(
        mockRangeMappings,
        mockOrderByItems,
        mockRid,
        mockSkipCount,
        mockDocumentRid,
        5,
        20,
        "hash123",
      );

      // First cycle
      const serialized1 = serializeOrderByQueryContinuationToken(originalToken);
      const parsed1 = parseOrderByQueryContinuationToken(serialized1);

      // Second cycle
      const serialized2 = serializeOrderByQueryContinuationToken(parsed1);
      const parsed2 = parseOrderByQueryContinuationToken(serialized2);

      // Third cycle
      const serialized3 = serializeOrderByQueryContinuationToken(parsed2);
      const parsed3 = parseOrderByQueryContinuationToken(serialized3);

      // All should be identical
      assert.deepEqual(parsed1, originalToken);
      assert.deepEqual(parsed2, originalToken);
      assert.deepEqual(parsed3, originalToken);
    });

    it("should handle token with all edge case values", () => {
      const edgeCaseOrderByItems = [
        { value: "", type: "string" }, // empty string
        { value: 0, type: "number" }, // zero
        { value: false, type: "boolean" }, // false
        { value: [] as any[], type: "array" }, // empty array
        { value: {}, type: "object" }, // empty object
      ];
      const singleRangeMapping: QueryRangeWithContinuationToken[] = [
        {
          queryRange: new QueryRange("", "", true, false),
          continuationToken: "",
        },
      ];
      const originalToken = createOrderByQueryContinuationToken(
        singleRangeMapping,
        edgeCaseOrderByItems,
        "",
        0,
        "",
        0,
        0,
        "",
      );
      const serialized = serializeOrderByQueryContinuationToken(originalToken);
      const parsedToken = parseOrderByQueryContinuationToken(serialized);

      assert.deepEqual(parsedToken, originalToken);
    });
  });
});

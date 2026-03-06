// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Focused unit tests for ContinuationTokenCodec
 * This file is separated to avoid memory issues when running all god-class decomposition tests together.
 */

import { describe, it, expect } from "vitest";
import { ContinuationTokenCodec } from "../../../src/documents/ContinuationToken/ContinuationTokenCodec.js";
import { ErrorResponse } from "../../../src/request/ErrorResponse.js";
import type { BaseContinuationToken } from "../../../src/documents/ContinuationToken/CompositeQueryContinuationToken.js";
import type { OrderByQueryContinuationToken } from "../../../src/documents/ContinuationToken/OrderByQueryContinuationToken.js";

describe("ContinuationTokenCodec", () => {
  describe("encode()", () => {
    it("should stamp version field on encode", () => {
      const token: BaseContinuationToken = {
        rid: "test-rid",
        rangeMappings: [
          {
            queryRange: { min: "00", max: "FF" },
            continuationToken: "token1",
          },
        ],
      };

      const encoded = ContinuationTokenCodec.encode(token);
      const decoded = JSON.parse(encoded);

      expect(decoded.version).toBe(ContinuationTokenCodec.CURRENT_VERSION);
    });

    it("should produce valid JSON string", () => {
      const token: BaseContinuationToken = {
        rid: "test-rid",
        rangeMappings: [
          {
            queryRange: { min: "00", max: "FF" },
            continuationToken: "token1",
          },
        ],
      };

      const encoded = ContinuationTokenCodec.encode(token);

      expect(() => JSON.parse(encoded)).not.toThrow();
      expect(typeof encoded).toBe("string");
    });

    it("should preserve all token fields", () => {
      const token: BaseContinuationToken = {
        rid: "test-rid",
        rangeMappings: [
          {
            queryRange: { min: "00", max: "FF" },
            continuationToken: "token1",
          },
        ],
        offset: 10,
        limit: 100,
      };

      const encoded = ContinuationTokenCodec.encode(token);
      const decoded = JSON.parse(encoded);

      expect(decoded.rid).toBe("test-rid");
      expect(decoded.rangeMappings).toEqual(token.rangeMappings);
      expect(decoded.offset).toBe(10);
      expect(decoded.limit).toBe(100);
    });
  });

  describe("decode()", () => {
    it("should parse valid tokens", () => {
      const tokenString = JSON.stringify({
        version: 1,
        rid: "test-rid",
        rangeMappings: [
          {
            queryRange: { min: "00", max: "FF" },
            continuationToken: "token1",
          },
        ],
      });

      const decoded = ContinuationTokenCodec.decode(tokenString);

      expect(decoded.rid).toBe("test-rid");
      expect(decoded.rangeMappings).toHaveLength(1);
    });

    it("should handle legacy tokens (no version field)", () => {
      const legacyToken = JSON.stringify({
        rid: "test-rid",
        rangeMappings: [
          {
            queryRange: { min: "00", max: "FF" },
            continuationToken: "token1",
          },
        ],
      });

      const decoded = ContinuationTokenCodec.decode(legacyToken);

      expect(decoded.rid).toBe("test-rid");
      expect(decoded.version).toBeUndefined();
    });

    it("should throw ErrorResponse on malformed JSON", () => {
      const invalidJson = "{ invalid json";

      expect(() => ContinuationTokenCodec.decode(invalidJson)).toThrow(ErrorResponse);
      expect(() => ContinuationTokenCodec.decode(invalidJson)).toThrow(/failed to parse JSON/);
    });

    it("should throw on empty string", () => {
      expect(() => ContinuationTokenCodec.decode("")).toThrow(ErrorResponse);
      expect(() => ContinuationTokenCodec.decode("")).toThrow(/must be a non-empty string/);
    });

    it("should throw on missing required field: rid", () => {
      const tokenString = JSON.stringify({
        version: 1,
        rangeMappings: [
          {
            queryRange: { min: "00", max: "FF" },
            continuationToken: "token1",
          },
        ],
      });

      expect(() => ContinuationTokenCodec.decode(tokenString)).toThrow(ErrorResponse);
      expect(() => ContinuationTokenCodec.decode(tokenString)).toThrow(/missing or invalid 'rid'/);
    });

    it("should throw on missing required field: rangeMappings", () => {
      const tokenString = JSON.stringify({
        version: 1,
        rid: "test-rid",
      });

      expect(() => ContinuationTokenCodec.decode(tokenString)).toThrow(ErrorResponse);
      expect(() => ContinuationTokenCodec.decode(tokenString)).toThrow(
        /missing or invalid 'rangeMappings'/,
      );
    });

    it("should throw on empty rangeMappings array", () => {
      const tokenString = JSON.stringify({
        version: 1,
        rid: "test-rid",
        rangeMappings: [],
      });

      expect(() => ContinuationTokenCodec.decode(tokenString)).toThrow(ErrorResponse);
      expect(() => ContinuationTokenCodec.decode(tokenString)).toThrow(
        /rangeMappings' array cannot be empty/,
      );
    });

    it("should throw on invalid queryRange structure", () => {
      const tokenString = JSON.stringify({
        version: 1,
        rid: "test-rid",
        rangeMappings: [
          {
            queryRange: { min: "00" }, // missing max
            continuationToken: "token1",
          },
        ],
      });

      expect(() => ContinuationTokenCodec.decode(tokenString)).toThrow(ErrorResponse);
      expect(() => ContinuationTokenCodec.decode(tokenString)).toThrow(/missing or invalid 'max'/);
    });
  });

  describe("decodeComposite()", () => {
    it("should return CompositeQueryContinuationToken", () => {
      const tokenString = JSON.stringify({
        version: 1,
        rid: "test-rid",
        rangeMappings: [
          {
            queryRange: { min: "00", max: "FF" },
            continuationToken: "token1",
          },
        ],
      });

      const decoded = ContinuationTokenCodec.decodeComposite(tokenString);

      expect(decoded.rid).toBe("test-rid");
      expect(decoded.rangeMappings).toHaveLength(1);
    });

    it("should throw if token contains orderByItems", () => {
      const orderByToken = JSON.stringify({
        version: 1,
        rid: "test-rid",
        rangeMappings: [
          {
            queryRange: { min: "00", max: "FF" },
            continuationToken: "token1",
          },
        ],
        orderByItems: [{ item: "field1" }],
        skipCount: 0,
        documentRid: "doc1",
      });

      expect(() => ContinuationTokenCodec.decodeComposite(orderByToken)).toThrow(ErrorResponse);
      expect(() => ContinuationTokenCodec.decodeComposite(orderByToken)).toThrow(
        /expected composite token but found ORDER BY token/,
      );
    });
  });

  describe("decodeOrderBy()", () => {
    it("should return OrderByQueryContinuationToken with required fields", () => {
      const orderByToken = JSON.stringify({
        version: 1,
        rid: "test-rid",
        rangeMappings: [
          {
            queryRange: { min: "00", max: "FF" },
            continuationToken: "token1",
          },
        ],
        orderByItems: [{ item: "field1" }],
        skipCount: 5,
        documentRid: "doc1",
      });

      const decoded = ContinuationTokenCodec.decodeOrderBy(orderByToken);

      expect(decoded.orderByItems).toEqual([{ item: "field1" }]);
      expect(decoded.skipCount).toBe(5);
      expect(decoded.documentRid).toBe("doc1");
    });

    it("should throw if token is missing orderByItems", () => {
      const tokenString = JSON.stringify({
        version: 1,
        rid: "test-rid",
        rangeMappings: [
          {
            queryRange: { min: "00", max: "FF" },
            continuationToken: "token1",
          },
        ],
      });

      expect(() => ContinuationTokenCodec.decodeOrderBy(tokenString)).toThrow(ErrorResponse);
      expect(() => ContinuationTokenCodec.decodeOrderBy(tokenString)).toThrow(
        /expected ORDER BY token but missing required fields/,
      );
    });
  });

  describe("isOrderByToken()", () => {
    it("should return true for ORDER BY tokens", () => {
      const orderByToken: OrderByQueryContinuationToken = {
        rid: "test-rid",
        rangeMappings: [
          {
            queryRange: { min: "00", max: "FF" },
            continuationToken: "token1",
          },
        ],
        orderByItems: [{ item: "field1" }],
        skipCount: 0,
        documentRid: "doc1",
      };

      expect(ContinuationTokenCodec.isOrderByToken(orderByToken)).toBe(true);
    });

    it("should return false for composite tokens", () => {
      const compositeToken: BaseContinuationToken = {
        rid: "test-rid",
        rangeMappings: [
          {
            queryRange: { min: "00", max: "FF" },
            continuationToken: "token1",
          },
        ],
      };

      expect(ContinuationTokenCodec.isOrderByToken(compositeToken)).toBe(false);
    });
  });

  describe("Roundtrip", () => {
    it("should produce equivalent token after encode-decode roundtrip", () => {
      const originalToken: BaseContinuationToken = {
        rid: "test-rid",
        rangeMappings: [
          {
            queryRange: { min: "00", max: "FF" },
            continuationToken: "token1",
          },
        ],
        offset: 10,
        limit: 100,
      };

      const encoded = ContinuationTokenCodec.encode(originalToken);
      const decoded = ContinuationTokenCodec.decode(encoded);

      expect(decoded.rid).toBe(originalToken.rid);
      expect(decoded.rangeMappings).toEqual(originalToken.rangeMappings);
      expect(decoded.offset).toBe(originalToken.offset);
      expect(decoded.limit).toBe(originalToken.limit);
      expect(decoded.version).toBe(ContinuationTokenCodec.CURRENT_VERSION);
    });
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { truncateCustomDimensions } from "../../src/utils/common.js";
import { CUSTOM_DIMENSIONS_GENAI_KEYS } from "../../src/Declarations/Constants.js";
import { MaxPropertyLengths } from "../../src/types.js";
import { describe, it, assert } from "vitest";

describe("Custom Dimensions Size Limits", () => {
  describe("#truncateCustomDimensions", () => {
    it("should return properties unchanged when under 8KB limit", () => {
      const properties: { [key: string]: string } = {
        key1: "value1",
        key2: "value2",
        key3: "value3",
      };
      const result = truncateCustomDimensions(properties);
      assert.deepStrictEqual(result, properties);
    });

    it("should return empty object when given empty properties", () => {
      const result = truncateCustomDimensions({});
      assert.deepStrictEqual(result, {});
    });

    it("should truncate a single value that exceeds 8KB", () => {
      const largeValue = "x".repeat(MaxPropertyLengths.THIRTEEN_BIT + 1000);
      const properties: { [key: string]: string } = {
        largeKey: largeValue,
      };

      const result = truncateCustomDimensions(properties);

      // Value should be truncated to the 8KB limit
      assert.isTrue(
        Buffer.byteLength(result["largeKey"], "utf-8") <= MaxPropertyLengths.THIRTEEN_BIT,
        "largeKey value should be truncated to 8KB",
      );
      assert.isTrue(
        Buffer.byteLength(result["largeKey"], "utf-8") < Buffer.byteLength(largeValue, "utf-8"),
        "largeKey value should be shorter than the original",
      );
    });

    it("should only truncate values that individually exceed 8KB", () => {
      const smallValue = "hello";
      const properties: { [key: string]: string } = {
        small: smallValue,
        large: "x".repeat(MaxPropertyLengths.THIRTEEN_BIT + 500),
      };

      const result = truncateCustomDimensions(properties);

      // Small property should be unchanged
      assert.strictEqual(result["small"], smallValue);

      // Large property should be truncated to 8KB
      assert.isTrue(
        Buffer.byteLength(result["large"], "utf-8") <= MaxPropertyLengths.THIRTEEN_BIT,
        "large property should be truncated to 8KB",
      );
    });

    it("should not truncate values that are each under 8KB even if combined total exceeds it", () => {
      // Two properties that together exceed 8KB but each is under 8KB individually
      const halfSize = 5 * 1024;
      const properties: { [key: string]: string } = {
        key1: "a".repeat(halfSize),
        key2: "b".repeat(halfSize),
      };

      const result = truncateCustomDimensions(properties);

      // Neither value should be truncated since each is under 8KB
      assert.strictEqual(result["key1"].length, halfSize);
      assert.strictEqual(result["key2"].length, halfSize);
    });

    it("should truncate gen_ai keys at 256KB instead of 8KB", () => {
      const over8KBValue = "x".repeat(MaxPropertyLengths.THIRTEEN_BIT + 1000);
      const over256KBValue = "x".repeat(MaxPropertyLengths.EIGHTEEN_BIT + 1000);

      for (const genAiKey of CUSTOM_DIMENSIONS_GENAI_KEYS) {
        // Value over 8KB but under 256KB should NOT be truncated
        const smallResult = truncateCustomDimensions({ [genAiKey]: over8KBValue });
        assert.strictEqual(
          smallResult[genAiKey],
          over8KBValue,
          `Gen AI key '${genAiKey}' under 256KB should not be truncated`,
        );

        // Value over 256KB SHOULD be truncated
        const largeResult = truncateCustomDimensions({ [genAiKey]: over256KBValue });
        assert.isTrue(
          Buffer.byteLength(largeResult[genAiKey], "utf-8") <= MaxPropertyLengths.EIGHTEEN_BIT,
          `Gen AI key '${genAiKey}' over 256KB should be truncated to 256KB`,
        );
      }
    });

    it("should truncate non-gen_ai keys at 8KB while gen_ai keys use 256KB limit", () => {
      const largeValue = "x".repeat(MaxPropertyLengths.THIRTEEN_BIT + 1000);
      const properties: { [key: string]: string } = {
        "gen_ai.input.messages": largeValue,
        regularKey: largeValue,
      };

      const result = truncateCustomDimensions(properties);

      // Gen AI key should be preserved (under 256KB)
      assert.strictEqual(result["gen_ai.input.messages"], largeValue);

      // Non-gen_ai key should be truncated to 8KB
      assert.isTrue(
        Buffer.byteLength(result["regularKey"], "utf-8") <= MaxPropertyLengths.THIRTEEN_BIT,
        "Non-gen_ai key should be truncated to 8KB",
      );
    });

    it("should truncate keys not in the gen_ai list even if they start with gen_ai", () => {
      const largeValue = "x".repeat(MaxPropertyLengths.THIRTEEN_BIT + 1000);
      const properties: { [key: string]: string } = {
        "gen_ai.other_attribute": largeValue,
      };

      const result = truncateCustomDimensions(properties);
      assert.isTrue(
        Buffer.byteLength(result["gen_ai.other_attribute"], "utf-8") <=
          MaxPropertyLengths.THIRTEEN_BIT,
        "Non-listed gen_ai key should still be truncated",
      );
    });

    it("should not drop entries regardless of total size", () => {
      const properties: { [key: string]: string } = {};
      // Many small entries whose combined size exceeds 8KB
      for (let i = 0; i < 128; i++) {
        properties["k".repeat(512) + i.toString()] = "value" + i;
      }

      const result = truncateCustomDimensions(properties);

      // All entries should be preserved since no individual value exceeds 8KB
      assert.strictEqual(
        Object.keys(result).length,
        Object.keys(properties).length,
        "No entries should be dropped",
      );
    });

    it("should truncate multiple values that each exceed 8KB independently", () => {
      const oversize = MaxPropertyLengths.THIRTEEN_BIT + 2000;
      const properties: { [key: string]: string } = {
        big1: "a".repeat(oversize),
        big2: "b".repeat(oversize),
      };

      const result = truncateCustomDimensions(properties);

      // Both values should be truncated to 8KB
      assert.isTrue(
        Buffer.byteLength(result["big1"], "utf-8") <= MaxPropertyLengths.THIRTEEN_BIT,
        "big1 should be truncated to 8KB",
      );
      assert.isTrue(
        Buffer.byteLength(result["big2"], "utf-8") <= MaxPropertyLengths.THIRTEEN_BIT,
        "big2 should be truncated to 8KB",
      );
      // Both entries should still exist
      assert.isDefined(result["big1"]);
      assert.isDefined(result["big2"]);
    });

    it("should verify default limit is 8KB", () => {
      assert.strictEqual(MaxPropertyLengths.THIRTEEN_BIT, 8 * 1024);
    });

    it("should verify gen_ai limit is 256KB", () => {
      assert.strictEqual(MaxPropertyLengths.EIGHTEEN_BIT, 256 * 1024);
    });

    it("should stringify non-string values (number, boolean, object, array)", () => {
      const properties: Record<string, unknown> = {
        aNumber: 42,
        aBool: true,
        anObject: { nested: "value" },
        anArray: [1, 2, 3],
      };

      const result = truncateCustomDimensions(properties);

      assert.strictEqual(result["aNumber"], "42");
      assert.strictEqual(result["aBool"], "true");
      assert.strictEqual(result["anObject"], '{"nested":"value"}');
      assert.strictEqual(result["anArray"], "[1,2,3]");
    });
  });
});

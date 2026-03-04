// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { truncateCustomDimensions } from "../../src/utils/common.js";
import { ENV_AZURE_MONITOR_DISABLE_CUSTOM_DIMENSIONS_LIMIT } from "../../src/Declarations/Constants.js";
import { MaxPropertyLengths } from "../../src/types.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Custom Dimensions Size Limits", () => {
  let originalEnvValue: string | undefined;

  beforeEach(() => {
    originalEnvValue = process.env[ENV_AZURE_MONITOR_DISABLE_CUSTOM_DIMENSIONS_LIMIT];
    delete process.env[ENV_AZURE_MONITOR_DISABLE_CUSTOM_DIMENSIONS_LIMIT];
  });

  afterEach(() => {
    if (originalEnvValue !== undefined) {
      process.env[ENV_AZURE_MONITOR_DISABLE_CUSTOM_DIMENSIONS_LIMIT] = originalEnvValue;
    } else {
      delete process.env[ENV_AZURE_MONITOR_DISABLE_CUSTOM_DIMENSIONS_LIMIT];
    }
  });

  describe("#truncateCustomDimensions", () => {
    it("should return properties unchanged when under 64KB limit", () => {
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

    it("should truncate a single value that exceeds 64KB", () => {
      const largeValue = "x".repeat(MaxPropertyLengths.SIXTEEN_BIT + 1000);
      const properties: { [key: string]: string } = {
        largeKey: largeValue,
      };

      const result = truncateCustomDimensions(properties);

      // Value should be truncated to the 64KB limit
      assert.isTrue(
        Buffer.byteLength(result["largeKey"], "utf-8") <= MaxPropertyLengths.SIXTEEN_BIT,
        "largeKey value should be truncated to 64KB",
      );
      assert.isTrue(
        Buffer.byteLength(result["largeKey"], "utf-8") < Buffer.byteLength(largeValue, "utf-8"),
        "largeKey value should be shorter than the original",
      );
    });

    it("should only truncate values that individually exceed 64KB", () => {
      const smallValue = "hello";
      const properties: { [key: string]: string } = {
        small: smallValue,
        large: "x".repeat(MaxPropertyLengths.SIXTEEN_BIT + 500),
      };

      const result = truncateCustomDimensions(properties);

      // Small property should be unchanged
      assert.strictEqual(result["small"], smallValue);

      // Large property should be truncated to 64KB
      assert.isTrue(
        Buffer.byteLength(result["large"], "utf-8") <= MaxPropertyLengths.SIXTEEN_BIT,
        "large property should be truncated to 64KB",
      );
    });

    it("should not truncate values that are each under 64KB even if combined total exceeds it", () => {
      // Two properties that together exceed 64KB but each is under 64KB individually
      const halfSize = 40 * 1024;
      const properties: { [key: string]: string } = {
        key1: "a".repeat(halfSize),
        key2: "b".repeat(halfSize),
      };

      const result = truncateCustomDimensions(properties);

      // Neither value should be truncated since each is under 64KB
      assert.strictEqual(result["key1"].length, halfSize);
      assert.strictEqual(result["key2"].length, halfSize);
    });

    it("should not truncate when env var disables the limit", () => {
      process.env[ENV_AZURE_MONITOR_DISABLE_CUSTOM_DIMENSIONS_LIMIT] = "true";

      const largeValue = "x".repeat(MaxPropertyLengths.SIXTEEN_BIT + 1000);
      const properties: { [key: string]: string } = {
        largeKey: largeValue,
      };

      const result = truncateCustomDimensions(properties);
      assert.strictEqual(result["largeKey"], largeValue);
      assert.strictEqual(result["largeKey"].length, largeValue.length);
    });

    it("should not truncate when env var is set to TRUE (uppercase)", () => {
      process.env[ENV_AZURE_MONITOR_DISABLE_CUSTOM_DIMENSIONS_LIMIT] = "TRUE";

      const largeValue = "x".repeat(MaxPropertyLengths.SIXTEEN_BIT + 1000);
      const properties: { [key: string]: string } = {
        largeKey: largeValue,
      };

      const result = truncateCustomDimensions(properties);
      assert.strictEqual(result["largeKey"], largeValue);
    });

    it("should not truncate when env var is set to ' true ' (with spaces)", () => {
      process.env[ENV_AZURE_MONITOR_DISABLE_CUSTOM_DIMENSIONS_LIMIT] = " true ";

      const largeValue = "x".repeat(MaxPropertyLengths.SIXTEEN_BIT + 1000);
      const properties: { [key: string]: string } = {
        largeKey: largeValue,
      };

      const result = truncateCustomDimensions(properties);
      assert.strictEqual(result["largeKey"], largeValue);
    });

    it("should truncate when env var is set to 'false'", () => {
      process.env[ENV_AZURE_MONITOR_DISABLE_CUSTOM_DIMENSIONS_LIMIT] = "false";

      const largeValue = "x".repeat(MaxPropertyLengths.SIXTEEN_BIT + 1000);
      const properties: { [key: string]: string } = {
        largeKey: largeValue,
      };

      const result = truncateCustomDimensions(properties);
      assert.isTrue(
        Buffer.byteLength(result["largeKey"], "utf-8") <= MaxPropertyLengths.SIXTEEN_BIT,
        "Value should be truncated when env var is 'false'",
      );
    });

    it("should truncate when env var is empty string", () => {
      process.env[ENV_AZURE_MONITOR_DISABLE_CUSTOM_DIMENSIONS_LIMIT] = "";

      const largeValue = "x".repeat(MaxPropertyLengths.SIXTEEN_BIT + 1000);
      const properties: { [key: string]: string } = {
        largeKey: largeValue,
      };

      const result = truncateCustomDimensions(properties);
      assert.isTrue(
        Buffer.byteLength(result["largeKey"], "utf-8") <= MaxPropertyLengths.SIXTEEN_BIT,
        "Value should be truncated when env var is empty string",
      );
    });

    it("should truncate when env var is an invalid value", () => {
      process.env[ENV_AZURE_MONITOR_DISABLE_CUSTOM_DIMENSIONS_LIMIT] = "yes";

      const largeValue = "x".repeat(MaxPropertyLengths.SIXTEEN_BIT + 1000);
      const properties: { [key: string]: string } = {
        largeKey: largeValue,
      };

      const result = truncateCustomDimensions(properties);
      assert.isTrue(
        Buffer.byteLength(result["largeKey"], "utf-8") <= MaxPropertyLengths.SIXTEEN_BIT,
        "Value should be truncated when env var is not 'true'",
      );
    });

    it("should not drop entries regardless of total size", () => {
      const properties: { [key: string]: string } = {};
      // Many small entries whose combined size exceeds 64KB
      for (let i = 0; i < 128; i++) {
        properties["k".repeat(512) + i.toString()] = "value" + i;
      }

      const result = truncateCustomDimensions(properties);

      // All entries should be preserved since no individual value exceeds 64KB
      assert.strictEqual(
        Object.keys(result).length,
        Object.keys(properties).length,
        "No entries should be dropped",
      );
    });

    it("should truncate multiple values that each exceed 64KB independently", () => {
      const oversize = MaxPropertyLengths.SIXTEEN_BIT + 2000;
      const properties: { [key: string]: string } = {
        big1: "a".repeat(oversize),
        big2: "b".repeat(oversize),
      };

      const result = truncateCustomDimensions(properties);

      // Both values should be truncated to 64KB
      assert.isTrue(
        Buffer.byteLength(result["big1"], "utf-8") <= MaxPropertyLengths.SIXTEEN_BIT,
        "big1 should be truncated to 64KB",
      );
      assert.isTrue(
        Buffer.byteLength(result["big2"], "utf-8") <= MaxPropertyLengths.SIXTEEN_BIT,
        "big2 should be truncated to 64KB",
      );
      // Both entries should still exist
      assert.isDefined(result["big1"]);
      assert.isDefined(result["big2"]);
    });

    it("should verify default limit is 64KB", () => {
      assert.strictEqual(MaxPropertyLengths.SIXTEEN_BIT, 64 * 1024);
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

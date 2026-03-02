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

    it("should truncate the largest property first when total size exceeds 64KB", () => {
      const largeValue = "x".repeat(MaxPropertyLengths.SIXTEEN_BIT);
      const properties: { [key: string]: string } = {
        largeKey: largeValue,
      };

      const result = truncateCustomDimensions(properties);

      // Value should be truncated
      assert.isTrue(
        Buffer.byteLength(result["largeKey"], "utf-8") < Buffer.byteLength(largeValue, "utf-8"),
        "largeKey value should be truncated",
      );

      // Total should be within limit
      let totalSize = 0;
      for (const key of Object.keys(result)) {
        totalSize += Buffer.byteLength(key, "utf-8") + Buffer.byteLength(result[key], "utf-8");
      }
      assert.isTrue(
        totalSize <= MaxPropertyLengths.SIXTEEN_BIT,
        `Total size ${totalSize} should be <= ${MaxPropertyLengths.SIXTEEN_BIT}`,
      );
    });

    it("should truncate the largest value first and leave smaller ones intact", () => {
      const smallValue = "hello";
      const properties: { [key: string]: string } = {
        small: smallValue,
        large: "x".repeat(MaxPropertyLengths.SIXTEEN_BIT),
      };

      const result = truncateCustomDimensions(properties);

      // Small property should be unchanged
      assert.strictEqual(result["small"], smallValue);

      // Large property should be truncated
      assert.isTrue(
        Buffer.byteLength(result["large"], "utf-8") < MaxPropertyLengths.SIXTEEN_BIT,
        "large property should be truncated",
      );

      // Total should be within limit
      let totalSize = 0;
      for (const key of Object.keys(result)) {
        totalSize += Buffer.byteLength(key, "utf-8") + Buffer.byteLength(result[key], "utf-8");
      }
      assert.isTrue(
        totalSize <= MaxPropertyLengths.SIXTEEN_BIT,
        `Total size ${totalSize} should be <= ${MaxPropertyLengths.SIXTEEN_BIT}`,
      );
    });

    it("should truncate multiple properties starting from the largest", () => {
      // Two properties that together exceed 64KB
      const halfSize = 40 * 1024;
      const properties: { [key: string]: string } = {
        key1: "a".repeat(halfSize),
        key2: "b".repeat(halfSize),
      };

      const result = truncateCustomDimensions(properties);

      // Total should be within limit
      let totalSize = 0;
      for (const key of Object.keys(result)) {
        totalSize += Buffer.byteLength(key, "utf-8") + Buffer.byteLength(result[key], "utf-8");
      }
      assert.isTrue(
        totalSize <= MaxPropertyLengths.SIXTEEN_BIT,
        `Total size ${totalSize} should be <= ${MaxPropertyLengths.SIXTEEN_BIT}`,
      );
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

    it("should handle properties with only keys and no values (keys exceed limit)", () => {
      const properties: { [key: string]: string } = {};
      // 128 keys of 512 bytes each = 64KB just in keys
      for (let i = 0; i < 128; i++) {
        properties["k".repeat(512) + i.toString()] = "value" + i;
      }

      const result = truncateCustomDimensions(properties);
      // Should still return all keys, even if values are truncated
      assert.strictEqual(Object.keys(result).length, Object.keys(properties).length);
    });

    it("should verify default limit is 64KB", () => {
      assert.strictEqual(MaxPropertyLengths.SIXTEEN_BIT, 64 * 1024);
    });
  });
});

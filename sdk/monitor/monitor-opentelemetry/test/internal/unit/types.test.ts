// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it } from "vitest";
import { APPLICATIONINSIGHTS_SDKSTATS_DISABLED } from "../../../src/types.js";

describe("Types Constants", () => {
  describe("APPLICATIONINSIGHTS_SDKSTATS_DISABLED", () => {
    it("should be defined and have the correct string value", () => {
      assert.strictEqual(typeof APPLICATIONINSIGHTS_SDKSTATS_DISABLED, "string");
      assert.strictEqual(
        APPLICATIONINSIGHTS_SDKSTATS_DISABLED,
        "APPLICATIONINSIGHTS_SDKSTATS_DISABLED",
      );
    });

    it("should be usable as an environment variable key", () => {
      // Save original value
      const originalValue = process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED];

      try {
        // Test setting the environment variable
        process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED] = "true";
        assert.strictEqual(process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED], "true");

        // Test checking for undefined
        delete process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED];
        assert.strictEqual(process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED], undefined);

        // Test setting to false
        process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED] = "false";
        assert.strictEqual(process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED], "false");

        // Test case insensitivity (uppercase should work)
        process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED] = "TRUE";
        assert.strictEqual(
          process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED]?.toLowerCase(),
          "true",
        );
      } finally {
        // Restore original value
        if (originalValue !== undefined) {
          process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED] = originalValue;
        } else {
          delete process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED];
        }
      }
    });

    it("should be importable and accessible at runtime", () => {
      // Verify the constant can be accessed dynamically
      const constantValue = APPLICATIONINSIGHTS_SDKSTATS_DISABLED;
      assert.isDefined(constantValue);
      assert.strictEqual(constantValue.length > 0, true);

      // Verify it can be used in object property access
      const testObj: Record<string, string> = {};
      testObj[APPLICATIONINSIGHTS_SDKSTATS_DISABLED] = "test";
      assert.strictEqual(testObj[APPLICATIONINSIGHTS_SDKSTATS_DISABLED], "test");
    });

    it("should match expected runtime behavior patterns", () => {
      // Save original value
      const originalValue = process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED];

      try {
        // Test the exact pattern used in the codebase (case-insensitive check for "true")
        process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED] = "true";
        const isDisabled =
          process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED]?.toLowerCase() === "true";
        assert.strictEqual(isDisabled, true);

        // Test when not "true"
        process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED] = "false";
        const isNotDisabled =
          process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED]?.toLowerCase() === "true";
        assert.strictEqual(isNotDisabled, false);

        // Test when undefined
        delete process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED];
        const isUndefined =
          process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED]?.toLowerCase() === "true";
        assert.strictEqual(isUndefined, false);

        // Test case insensitivity (should be true for uppercase "TRUE")
        process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED] = "TRUE";
        const isCaseInsensitive =
          process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED]?.toLowerCase() === "true";
        assert.strictEqual(isCaseInsensitive, true);
      } finally {
        // Restore original value
        if (originalValue !== undefined) {
          process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED] = originalValue;
        } else {
          delete process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED];
        }
      }
    });
  });
});

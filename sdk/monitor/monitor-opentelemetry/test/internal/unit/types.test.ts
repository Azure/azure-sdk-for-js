// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import { strict as assert } from "assert";
import { APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW } from "../../../src/types.js";

describe("Types Constants", () => {
  describe("APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW", () => {
    it("should be defined and have the correct string value", () => {
      assert.strictEqual(typeof APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW, "string");
      assert.strictEqual(
        APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW,
        "APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW",
      );
    });

    it("should be usable as an environment variable key", () => {
      // Save original value
      const originalValue = process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW];

      try {
        // Test setting the environment variable
        process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW] = "True";
        assert.strictEqual(process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW], "True");

        // Test checking for undefined
        delete process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW];
        assert.strictEqual(process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW], undefined);

        // Test setting to false
        process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW] = "false";
        assert.strictEqual(process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW], "false");

        // Test case sensitivity
        process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW] = "true";
        assert.notStrictEqual(process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW], "True");
      } finally {
        // Restore original value
        if (originalValue !== undefined) {
          process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW] = originalValue;
        } else {
          delete process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW];
        }
      }
    });

    it("should be importable and accessible at runtime", () => {
      // Verify the constant can be accessed dynamically
      const constantValue = APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW;
      assert.ok(constantValue);
      assert.strictEqual(constantValue.length > 0, true);

      // Verify it can be used in object property access
      const testObj: Record<string, string> = {};
      testObj[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW] = "test";
      assert.strictEqual(testObj[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW], "test");
    });

    it("should match expected runtime behavior patterns", () => {
      // Save original value
      const originalValue = process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW];

      try {
        // Test the exact pattern used in the codebase
        process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW] = "True";
        const isEnabled = process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW] === "True";
        assert.strictEqual(isEnabled, true);

        // Test when not "True"
        process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW] = "false";
        const isNotEnabled = process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW] === "True";
        assert.strictEqual(isNotEnabled, false);

        // Test when undefined
        delete process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW];
        const isUndefined = process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW] === "True";
        assert.strictEqual(isUndefined, false);

        // Test case sensitivity (should be false for lowercase "true")
        process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW] = "true";
        const isCaseSensitive =
          process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW] === "True";
        assert.strictEqual(isCaseSensitive, false);
      } finally {
        // Restore original value
        if (originalValue !== undefined) {
          process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW] = originalValue;
        } else {
          delete process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW];
        }
      }
    });
  });
});

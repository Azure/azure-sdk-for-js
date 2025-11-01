// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { createRecorder, createRecordedClient } from "./utils/recordedClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { PlanetaryComputerProClient } from "../../src/index.js";

/**
 * Test suite for Map Legend operations.
 * Ported from Python test_planetary_computer_06_map_legends.py
 */
describe("Map Legend Operations", () => {
  let recorder: Recorder;
  let client: PlanetaryComputerProClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    client = await createRecordedClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("test_01: Get a class map legend (categorical color map)", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_01_get_class_map_legend");
    console.log("=" + "=".repeat(79));
    const classmapName = "mtbs-severity";
    console.log(`Input - classmap_name: ${classmapName}`);

    console.log(`Calling: getClassMapLegend(classmap_name='${classmapName}')`);
    const response = await client.data.getClassMapLegend(classmapName);

    console.log(`Response type: ${typeof response}`);
    console.log(`Response: ${JSON.stringify(response)}`);

    // Assert response is an object
    assert.isObject(response, `Response should be an object, got ${typeof response}`);
    assert.isTrue(Object.keys(response).length > 0, "Response should not be empty");

    // Assert MTBS Severity classes are present (0-6)
    const expectedClasses = ["0", "1", "2", "3", "4", "5", "6"];
    for (const classValue of expectedClasses) {
      assert.property(response, classValue, `Class '${classValue}' should be in response`);
    }

    // Validate color structure for each class
    for (const [classValue, color] of Object.entries(response)) {
      // Each color should be an array of 4 RGBA values
      assert.isArray(color, `Color for class '${classValue}' should be an array`);
      assert.strictEqual(
        color.length,
        4,
        `Color for class '${classValue}' should have 4 RGBA values, got ${color.length}`,
      );

      // Each RGBA component should be an integer 0-255
      const componentNames = ["R", "G", "B", "A"];
      for (let i = 0; i < color.length; i++) {
        const component = color[i];
        const componentName = componentNames[i];
        assert.isNumber(component, `${componentName} for class '${classValue}' should be a number`);
        assert.isTrue(
          Number.isInteger(component),
          `${componentName} for class '${classValue}' should be an integer`,
        );
        assert.isTrue(
          component >= 0 && component <= 255,
          `${componentName} for class '${classValue}' should be 0-255, got ${component}`,
        );
      }
    }

    // Validate specific colors for known MTBS severity classes
    // Class 0: Transparent (no fire)
    assert.deepEqual(response["0"], [0, 0, 0, 0], "Class 0 should be transparent black");

    // Class 4: Red (high severity)
    assert.strictEqual(
      response["4"][0],
      255,
      "Class 4 (high severity) should have high red component",
    );

    console.log("Test PASSED\n");
  });

  it("test_02: Get an interval legend (continuous color map)", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_02_get_interval_legend");
    console.log("=" + "=".repeat(79));
    const classmapName = "modis-64A1";
    console.log(`Input - classmap_name: ${classmapName}`);

    console.log(`Calling: getIntervalLegend(classmap_name='${classmapName}')`);
    const response = await client.data.getIntervalLegend(classmapName);

    console.log(`Response type: ${typeof response}`);
    console.log(`Response: ${JSON.stringify(response)}`);

    // Assert response is an array
    assert.isArray(response, `Response should be an array, got ${typeof response}`);
    assert.isTrue(response.length > 0, "Response should not be empty");

    // Validate each interval structure
    for (let idx = 0; idx < response.length; idx++) {
      const interval = response[idx];
      // Each interval should be an array with 2 elements: [range, color]
      assert.isArray(interval, `Interval ${idx} should be an array`);
      assert.strictEqual(
        interval.length,
        2,
        `Interval ${idx} should have 2 elements: [[min, max], [R, G, B, A]]`,
      );

      // Validate range component
      const valueRange = interval[0] as any;
      assert.isArray(valueRange, `Interval ${idx} range should be an array`);
      assert.strictEqual(valueRange.length, 2, `Interval ${idx} range should have [min, max]`);
      const minVal = valueRange[0] as number;
      const maxVal = valueRange[1] as number;
      assert.isNumber(minVal, `Interval ${idx} min should be numeric`);
      assert.isNumber(maxVal, `Interval ${idx} max should be numeric`);
      assert.isTrue(
        minVal <= maxVal,
        `Interval ${idx} min (${minVal}) should be <= max (${maxVal})`,
      );

      // Validate color component
      const color = interval[1] as any;
      assert.isArray(color, `Interval ${idx} color should be an array`);
      const colorLength = (color as any[]).length;
      assert.strictEqual(colorLength, 4, `Interval ${idx} color should have 4 RGBA values`);
      const componentNames = ["R", "G", "B", "A"];
      for (let i = 0; i < colorLength; i++) {
        const component = color[i] as number;
        const componentName = componentNames[i];
        assert.isNumber(component, `Interval ${idx} ${componentName} should be a number`);
        assert.isTrue(
          Number.isInteger(component),
          `Interval ${idx} ${componentName} should be an integer`,
        );
        assert.isTrue(
          component >= 0 && component <= 255,
          `Interval ${idx} ${componentName} should be 0-255`,
        );
      }
    }

    // Validate intervals are sequential (each max should connect to next min)
    for (let i = 0; i < response.length - 1; i++) {
      const currentMax = (response[i][0] as any)[1] as number;
      const nextMin = (response[i + 1][0] as any)[0] as number;
      // Allow some tolerance for continuous intervals
      assert.isTrue(
        Math.abs(currentMax - nextMin) <= 1,
        `Interval ${i} max (${currentMax}) should connect to interval ${i + 1} min (${nextMin})`,
      );
    }

    console.log("Test PASSED\n");
  });

  it("test_03: Get a legend as PNG image", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_03_get_legend_as_png");
    console.log("=" + "=".repeat(79));
    const colorMapName = "rdylgn";
    console.log(`Input - color_map_name: ${colorMapName}`);

    console.log(`Calling: getLegend(color_map_name='${colorMapName}')`);
    const response = await client.data.getLegend(colorMapName);

    console.log(`Response type: ${typeof response}`);

    // Response comes as a string (binary data encoded as string), convert to Buffer
    const legendBytes = Buffer.from(response as any, "binary");
    console.log(`Legend size: ${legendBytes.length} bytes`);
    console.log(`First 16 bytes (hex): ${legendBytes.subarray(0, 16).toString("hex")}`);

    // Verify PNG magic bytes (89 50 4E 47 0D 0A 1A 0A)
    const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    console.log(`PNG magic bytes: ${pngMagic.toString("hex")}`);
    console.log(`Response starts with PNG magic: ${legendBytes.subarray(0, 8).equals(pngMagic)}`);

    // Assert response is valid PNG
    assert.isTrue(legendBytes.length > 0, "Legend bytes should not be empty");
    assert.isTrue(
      legendBytes.length > 100,
      `Legend should be substantial image, got only ${legendBytes.length} bytes`,
    );
    assert.isTrue(
      legendBytes.subarray(0, 8).equals(pngMagic),
      "Response should be a valid PNG image (magic bytes mismatch)",
    );

    console.log("Test PASSED\n");
  });

  it("test_04: Get a legend with different colormap (viridis)", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_04_get_legend_with_different_colormap");
    console.log("=" + "=".repeat(79));
    const colorMapName = "viridis";
    console.log(`Input - color_map_name: ${colorMapName}`);

    console.log(`Calling: getLegend(color_map_name='${colorMapName}')`);
    const response = await client.data.getLegend(colorMapName);

    console.log(`Response type: ${typeof response}`);

    // Response comes as a string (binary data encoded as string), convert to Buffer
    const legendBytes = Buffer.from(response as any, "binary");
    console.log(`Legend size: ${legendBytes.length} bytes`);

    // Verify PNG magic bytes
    const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    assert.isTrue(legendBytes.length > 0, "Legend bytes should not be empty");
    assert.isTrue(
      legendBytes.length > 100,
      `Legend should be substantial image, got only ${legendBytes.length} bytes`,
    );
    assert.isTrue(
      legendBytes.subarray(0, 8).equals(pngMagic),
      "Response should be a valid PNG image",
    );

    console.log("Test PASSED\n");
  });

  it("test_05: Validate class map legend structure and color consistency", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_05_class_map_legend_structure");
    console.log("=" + "=".repeat(79));
    const classmapName = "mtbs-severity";
    console.log(`Input - classmap_name: ${classmapName}`);

    console.log(`Calling: getClassMapLegend(classmap_name='${classmapName}')`);
    const response = await client.data.getClassMapLegend(classmapName);

    console.log(`Response type: ${typeof response}`);
    console.log(`Response: ${JSON.stringify(response)}`);

    // Assert response is an object
    assert.isObject(response, "Response should be an object");

    // Validate all keys are string class values
    for (const key of Object.keys(response)) {
      assert.isString(key, `Key '${key}' should be a string`);
    }

    // Validate color consistency - all colors should be [R, G, B, A] format
    const allColors = Object.values(response);
    for (const color of allColors) {
      assert.strictEqual(color.length, 4, "All colors should have RGBA format");
      assert.isTrue(
        color.every((c: any) => Number.isInteger(c) && c >= 0 && c <= 255),
        "All color components should be integers 0-255",
      );
    }

    // Validate that different classes have different colors (except transparent)
    const nonTransparentColors = allColors.filter((c) => c[3] !== 0); // Exclude transparent
    // Convert to set to check uniqueness
    const uniqueColors = new Set(nonTransparentColors.map((c) => JSON.stringify(c)));
    assert.isTrue(uniqueColors.size > 1, "Non-transparent classes should have different colors");

    console.log(
      `Found ${Object.keys(response).length} classes with ${uniqueColors.size} unique non-transparent colors`,
    );
    console.log("Test PASSED\n");
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sample test for copyAnalyzer.ts - Copy an analyzer within the same resource.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import {
  type ContentAnalyzer,
  type ContentAnalyzerConfig,
  type ContentFieldSchema,
} from "../../../../src/index.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import { createRecorder, createClient, testPollingOptions } from "./sampleTestUtils.js";

describe("Sample: copyAnalyzer", () => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;
  let sourceAnalyzerId: string;
  let targetAnalyzerId: string;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder);
    // Generate unique analyzer IDs
    const baseId = recorder.variable(
      "copyBaseId",
      `test_analyzer_${Math.floor(Date.now() / 1000)}`,
    );
    sourceAnalyzerId = `${baseId}_source`;
    targetAnalyzerId = `${baseId}_target`;
  });

  afterEach(async () => {
    // Clean up: try to delete test analyzers if they exist
    try {
      await client.deleteAnalyzer(sourceAnalyzerId);
      console.log(`Cleaned up source analyzer: ${sourceAnalyzerId}`);
    } catch {
      // Ignore errors during cleanup
    }
    try {
      await client.deleteAnalyzer(targetAnalyzerId);
      console.log(`Cleaned up target analyzer: ${targetAnalyzerId}`);
    } catch {
      // Ignore errors during cleanup
    }
    await recorder.stop();
  });

  it("should copy an analyzer within the same resource", async () => {
    // Step 1: Create the source analyzer
    console.log(`Creating source analyzer '${sourceAnalyzerId}'...`);

    const fieldSchema: ContentFieldSchema = {
      name: "company_schema",
      description: "Schema for extracting company information",
      fields: {
        company_name: {
          type: "string",
          method: "extract",
          description: "Name of the company",
        },
        total_amount: {
          type: "number",
          method: "extract",
          description: "Total amount on the document",
        },
      },
    };

    const config: ContentAnalyzerConfig = {
      enableFormula: false,
      enableLayout: true,
      enableOcr: true,
      estimateFieldSourceAndConfidence: true,
      returnDetails: true,
    };

    const analyzer: ContentAnalyzer = {
      baseAnalyzerId: "prebuilt-document",
      description: "Source analyzer for copying",
      config,
      fieldSchema,
      models: { completion: "gpt-4.1" },
      tags: { modelType: "in_development" },
    } as ContentAnalyzer;

    const createPoller = client.createAnalyzer(sourceAnalyzerId, analyzer, testPollingOptions);
    await createPoller.pollUntilDone();
    console.log(`Source analyzer '${sourceAnalyzerId}' created successfully!`);

    // Verify source analyzer
    const sourceAnalyzerInfo = await client.getAnalyzer(sourceAnalyzerId);
    console.log(`Source analyzer description: ${sourceAnalyzerInfo.description}`);
    assert.ok(sourceAnalyzerInfo, "Source analyzer should exist");

    // Step 2: Copy the analyzer
    console.log(`Copying analyzer from '${sourceAnalyzerId}' to '${targetAnalyzerId}'...`);

    const copyPoller = client.copyAnalyzer(targetAnalyzerId, sourceAnalyzerId, testPollingOptions);
    await copyPoller.pollUntilDone();
    console.log("Analyzer copied successfully!");

    // Step 3: Verify the target analyzer
    const targetAnalyzer = await client.getAnalyzer(targetAnalyzerId);
    assert.ok(targetAnalyzer, "Target analyzer should exist");
    assert.equal(targetAnalyzer.analyzerId, targetAnalyzerId, "Target analyzer ID should match");
    console.log(`Target analyzer '${targetAnalyzerId}' verified`);

    // Update the target analyzer with a production tag
    const updatedAnalyzer: ContentAnalyzer = {
      baseAnalyzerId: targetAnalyzer.baseAnalyzerId,
      tags: { modelType: "model_in_production" },
    } as ContentAnalyzer;

    console.log("Updating target analyzer with production tag...");
    const updateResult = await client.updateAnalyzer(targetAnalyzerId, updatedAnalyzer);

    if (updateResult.tags) {
      assert.equal(updateResult.tags["modelType"], "model_in_production", "Tag should be updated");
      console.log(`Target analyzer tag updated: modelType=${updateResult.tags["modelType"]}`);
    }
  });
});

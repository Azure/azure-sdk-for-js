// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sample test for updateAnalyzer.ts - Update an existing custom analyzer.
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

describe("Sample: updateAnalyzer", () => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;
  let testAnalyzerId: string;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder);
    // Generate a unique analyzer ID with prefix to avoid conflicts with other tests
    testAnalyzerId = recorder.variable(
      "updateAnalyzerTestId",
      `test_update_analyzer_${Math.floor(Date.now() / 1000)}_${Math.floor(Math.random() * 10000)}`,
    );
  });

  afterEach(async () => {
    // Clean up: try to delete test analyzer if it exists
    try {
      await client.deleteAnalyzer(testAnalyzerId);
      console.log(`Cleaned up test analyzer: ${testAnalyzerId}`);
    } catch {
      // Ignore errors during cleanup
    }
    await recorder.stop();
  });

  it("should update an existing custom analyzer", async () => {
    // Create initial analyzer
    const analyzer: ContentAnalyzer = {
      baseAnalyzerId: "prebuilt-document",
      description: "Initial description",
      config: { returnDetails: true } as ContentAnalyzerConfig,
      fieldSchema: {
        name: "demo_schema",
        description: "Schema for update demo",
        fields: {
          company_name: {
            type: "string",
            method: "extract",
            description: "Name of the company",
          },
        },
      } as ContentFieldSchema,
      models: { completion: "gpt-4.1" },
      tags: { tag1: "tag1_initial_value" },
    } as ContentAnalyzer;

    const poller = client.createAnalyzer(testAnalyzerId, analyzer, testPollingOptions);
    await poller.pollUntilDone();
    console.log(`Analyzer '${testAnalyzerId}' created successfully!`);

    // Get the current analyzer
    const currentAnalyzer = await client.getAnalyzer(testAnalyzerId);
    console.log(`Current description: ${currentAnalyzer.description}`);

    // Create an updated analyzer with new description and tags
    const updatedAnalyzer: ContentAnalyzer = {
      baseAnalyzerId: currentAnalyzer.baseAnalyzerId,
      description: "Updated description",
      tags: {
        tag1: "tag1_updated_value", // Update existing tag
        tag3: "tag3_value", // Add new tag
      },
    } as ContentAnalyzer;

    // Update the analyzer
    const updateResult = await client.updateAnalyzer(testAnalyzerId, updatedAnalyzer);

    // Assertions
    assert.ok(updateResult, "Update result should not be null");
    assert.equal(updateResult.description, "Updated description", "Description should be updated");
    console.log(`Analyzer updated. New description: ${updateResult.description}`);

    // Verify tags
    if (updateResult.tags) {
      assert.equal(updateResult.tags["tag1"], "tag1_updated_value", "tag1 should be updated");
      assert.equal(updateResult.tags["tag3"], "tag3_value", "tag3 should be added");
      console.log("Tags verified after update");
    }
  });
});

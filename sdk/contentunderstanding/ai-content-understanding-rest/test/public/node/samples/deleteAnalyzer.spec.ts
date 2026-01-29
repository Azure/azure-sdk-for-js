// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sample test for deleteAnalyzer.ts - Delete a custom analyzer.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import { type ContentAnalyzer, type ContentAnalyzerConfig } from "../../../../src/index.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import { createRecorder, createClient, testPollingOptions } from "./sampleTestUtils.js";

describe("Sample: deleteAnalyzer", () => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;
  let testAnalyzerId: string;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder);
    // Generate a unique analyzer ID with prefix to avoid conflicts with other tests
    testAnalyzerId = recorder.variable(
      "deleteAnalyzerTestId",
      `test_delete_analyzer_${Math.floor(Date.now() / 1000)}_${Math.floor(Math.random() * 10000)}`,
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should delete a custom analyzer", async () => {
    // Create a simple analyzer
    const analyzer: ContentAnalyzer = {
      baseAnalyzerId: "prebuilt-document",
      description: "Simple analyzer for deletion example",
      config: { returnDetails: true } as ContentAnalyzerConfig,
      models: { completion: "gpt-4.1" },
    } as ContentAnalyzer;

    const poller = client.createAnalyzer(testAnalyzerId, analyzer, testPollingOptions);
    await poller.pollUntilDone();
    console.log(`Analyzer '${testAnalyzerId}' created successfully.`);

    // Verify the analyzer exists
    const createdAnalyzer = await client.getAnalyzer(testAnalyzerId);
    assert.ok(createdAnalyzer, "Created analyzer should exist");

    // Delete the analyzer
    await client.deleteAnalyzer(testAnalyzerId);
    console.log(`Analyzer '${testAnalyzerId}' deleted successfully.`);

    // Verify deletion by trying to get it (should fail)
    try {
      await client.getAnalyzer(testAnalyzerId);
      assert.fail("Expected error when getting deleted analyzer");
    } catch (error) {
      assert.ok(error, "Expected error when getting deleted analyzer");
      console.log("Verified analyzer was deleted (get returned expected error)");
    }
  });
});

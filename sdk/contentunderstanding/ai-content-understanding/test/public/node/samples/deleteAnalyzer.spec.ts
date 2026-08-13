// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for deleteAnalyzer.ts - Delete a custom analyzer.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import { type ContentAnalyzer, type ContentAnalyzerConfig } from "../../../../src/index.js";
import { assert, beforeEach, afterEach, it } from "vitest";
import { createRecorder, createClient, testPollingOptions } from "./sampleTestUtils.js";
import { forEachServiceVersion } from "../../../utils/multiVersion.js";

forEachServiceVersion("Sample: deleteAnalyzer", ({ apiVersion }) => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;
  let testAnalyzerId: string;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder, apiVersion);
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

    // ========== Post-create verification ==========
    // . All values here are defined by this test itself in
    // the create payload above, so they are portable across environments.
    assert.strictEqual(
      createdAnalyzer.analyzerId,
      testAnalyzerId,
      "Created analyzerId should match",
    );
    assert.strictEqual(
      createdAnalyzer.baseAnalyzerId,
      "prebuilt-document",
      "Base analyzer ID should match",
    );
    assert.strictEqual(
      createdAnalyzer.description,
      "Simple analyzer for deletion example",
      "Description should match",
    );
    assert.ok(createdAnalyzer.config, "Config should not be null");
    assert.strictEqual(
      createdAnalyzer.config?.returnDetails,
      true,
      "config.returnDetails should be true",
    );
    assert.ok(createdAnalyzer.models, "Models should not be null");
    assert.ok(createdAnalyzer.models?.completion, "Should contain 'completion' model mapping");

    // Delete the analyzer
    await client.deleteAnalyzer(testAnalyzerId);
    console.log(`Analyzer '${testAnalyzerId}' deleted successfully.`);

    // Verify deletion by trying to get it (should fail)
    // ========== Post-delete verification ==========
    // getting a deleted analyzer should throw a RestError with status 404 (or 400 in
    // some deployments), not silently succeed.
    let deletionVerified = false;
    let capturedStatus: number | undefined;
    try {
      await client.getAnalyzer(testAnalyzerId);
      assert.fail(
        `Expected error when getting deleted analyzer '${testAnalyzerId}', but call succeeded`,
      );
    } catch (error) {
      const restError = error as { statusCode?: number; code?: string; message?: string };
      capturedStatus = restError.statusCode;
      deletionVerified = true;
      console.log(
        `Verified analyzer was deleted (statusCode=${capturedStatus}, code=${restError.code})`,
      );
    }
    assert.ok(deletionVerified, "Deletion should be verified by a thrown error");
    if (capturedStatus !== undefined) {
      assert.ok(
        capturedStatus === 404 || capturedStatus === 400,
        `Deleted-analyzer GET should return HTTP 404 or 400, but got ${capturedStatus}`,
      );
    }
  });
});

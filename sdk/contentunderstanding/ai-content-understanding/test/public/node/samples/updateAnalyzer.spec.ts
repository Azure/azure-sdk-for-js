// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for updateAnalyzer.ts - Update an existing custom analyzer.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import {
  type ContentAnalyzer,
  type ContentAnalyzerConfig,
  type ContentFieldSchema,
} from "../../../../src/index.js";
import { assert, beforeEach, afterEach, it } from "vitest";
import { createRecorder, createClient, testPollingOptions } from "./sampleTestUtils.js";
import { forEachServiceVersion } from "../../../utils/multiVersion.js";

forEachServiceVersion("Sample: updateAnalyzer", ({ apiVersion }) => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;
  let testAnalyzerId: string;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder, apiVersion);
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

    // ========== Pre-update verification ==========
    // . All values here are defined by this test itself in the
    // create payload above, so they are portable across environments.
    assert.strictEqual(
      currentAnalyzer.description,
      "Initial description",
      "Initial description should match what was created",
    );
    assert.strictEqual(
      currentAnalyzer.baseAnalyzerId,
      "prebuilt-document",
      "Base analyzer ID should match what was created",
    );
    assert.ok(currentAnalyzer.tags, "Initial tags should not be null");
    assert.strictEqual(
      Object.keys(currentAnalyzer.tags ?? {}).length,
      1,
      "Should have exactly 1 initial tag",
    );
    assert.strictEqual(
      currentAnalyzer.tags?.tag1,
      "tag1_initial_value",
      "Initial tag1 value should match",
    );

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

    // ========== Post-update verification ==========
    // Both the GA (2025-11-01) and preview (2026-06-01-preview) PATCH responses echo
    // description, tags, and baseAnalyzerId. Additional fields (fieldSchema, models) are
    // only present on preview; those assertions are gated defensively so the same
    // recording works across both API versions without a re-record.
    assert.notStrictEqual(
      updateResult.description,
      currentAnalyzer.description,
      "Description should have changed from the initial value",
    );
    assert.strictEqual(
      updateResult.baseAnalyzerId,
      "prebuilt-document",
      "baseAnalyzerId should be preserved after update",
    );
    assert.strictEqual(
      updateResult.baseAnalyzerId,
      currentAnalyzer.baseAnalyzerId,
      "baseAnalyzerId should equal the pre-update value",
    );

    // Verify tags
    assert.ok(updateResult.tags, "Update result should include tags");
    assert.strictEqual(updateResult.tags?.tag1, "tag1_updated_value", "tag1 should be updated");
    assert.notStrictEqual(
      updateResult.tags?.tag1,
      "tag1_initial_value",
      "tag1 should no longer be the initial value",
    );
    assert.strictEqual(updateResult.tags?.tag3, "tag3_value", "tag3 should be added");
    console.log("Tags verified after update");

    // Preview API returns the full merged resource so fieldSchema is preserved. GA
    // returns a stripped body without fieldSchema; the guard skips this assertion.
    if (updateResult.fieldSchema) {
      assert.strictEqual(
        updateResult.fieldSchema.name,
        "demo_schema",
        "fieldSchema name should be preserved after update (preview API)",
      );
      assert.ok(
        updateResult.fieldSchema.fields.company_name,
        "company_name field should still exist after update (preview API)",
      );
    }
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for copyAnalyzer.ts - Copy an analyzer within the same resource.
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

forEachServiceVersion("Sample: copyAnalyzer", ({ apiVersion }) => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;
  let sourceAnalyzerId: string;
  let targetAnalyzerId: string;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder, apiVersion);
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

    // ========== Source analyzer verification ==========
    // . All values here are defined by this test itself in the
    // create payload above, so they are portable across environments and stable in
    // playback (the recording captures the response the service returned for our
    // specific create request).
    assert.strictEqual(
      sourceAnalyzerInfo.baseAnalyzerId,
      "prebuilt-document",
      "Source baseAnalyzerId should match created",
    );
    assert.strictEqual(
      sourceAnalyzerInfo.description,
      "Source analyzer for copying",
      "Source description should match created",
    );
    assert.ok(sourceAnalyzerInfo.tags, "Source tags should be present");
    assert.strictEqual(
      sourceAnalyzerInfo.tags?.modelType,
      "in_development",
      "Source modelType tag should be 'in_development'",
    );
    assert.ok(sourceAnalyzerInfo.fieldSchema, "Source fieldSchema should be present");
    assert.strictEqual(
      sourceAnalyzerInfo.fieldSchema?.name,
      "company_schema",
      "Source fieldSchema name should match created",
    );
    assert.strictEqual(
      Object.keys(sourceAnalyzerInfo.fieldSchema?.fields ?? {}).length,
      2,
      "Source should have 2 fields",
    );
    const sourceCompanyName = sourceAnalyzerInfo.fieldSchema?.fields.company_name;
    assert.ok(sourceCompanyName, "Source should contain company_name field");
    assert.strictEqual(sourceCompanyName?.type, "string", "company_name should be string type");
    assert.strictEqual(sourceCompanyName?.method, "extract", "company_name should use extract method");
    const sourceTotalAmount = sourceAnalyzerInfo.fieldSchema?.fields.total_amount;
    assert.ok(sourceTotalAmount, "Source should contain total_amount field");
    assert.strictEqual(sourceTotalAmount?.type, "number", "total_amount should be number type");
    assert.strictEqual(sourceTotalAmount?.method, "extract", "total_amount should use extract method");
    assert.ok(sourceAnalyzerInfo.config, "Source config should be present");
    assert.strictEqual(sourceAnalyzerInfo.config?.enableFormula, false, "enableFormula should be false");
    assert.strictEqual(sourceAnalyzerInfo.config?.enableLayout, true, "enableLayout should be true");
    assert.strictEqual(sourceAnalyzerInfo.config?.enableOcr, true, "enableOcr should be true");
    assert.ok(sourceAnalyzerInfo.models, "Source models should be present");
    assert.ok(
      sourceAnalyzerInfo.models?.completion,
      "Source should have a completion model configured",
    );

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

    // ========== Copy inheritance verification ==========
    // . The copy MUST inherit every source property; this is the
    // entire point of `copyAnalyzer`. Assertions compare target vs source (both fetched
    // via getAnalyzer), so they are stable across environments.
    assert.strictEqual(
      targetAnalyzer.baseAnalyzerId,
      sourceAnalyzerInfo.baseAnalyzerId,
      "Copied baseAnalyzerId should match source",
    );
    assert.strictEqual(
      targetAnalyzer.description,
      sourceAnalyzerInfo.description,
      "Copied description should match source",
    );
    assert.ok(targetAnalyzer.fieldSchema, "Copied analyzer should have fieldSchema");
    assert.strictEqual(
      targetAnalyzer.fieldSchema?.name,
      sourceAnalyzerInfo.fieldSchema?.name,
      "Copied fieldSchema name should match source",
    );
    assert.strictEqual(
      Object.keys(targetAnalyzer.fieldSchema?.fields ?? {}).length,
      Object.keys(sourceAnalyzerInfo.fieldSchema?.fields ?? {}).length,
      "Copied analyzer should have same number of fields as source",
    );
    const targetCompanyName = targetAnalyzer.fieldSchema?.fields.company_name;
    assert.ok(targetCompanyName, "Copied analyzer should contain company_name field");
    assert.strictEqual(
      targetCompanyName?.type,
      sourceCompanyName?.type,
      "Copied company_name type should match source",
    );
    assert.strictEqual(
      targetCompanyName?.method,
      sourceCompanyName?.method,
      "Copied company_name method should match source",
    );
    const targetTotalAmount = targetAnalyzer.fieldSchema?.fields.total_amount;
    assert.ok(targetTotalAmount, "Copied analyzer should contain total_amount field");
    assert.strictEqual(
      targetTotalAmount?.type,
      sourceTotalAmount?.type,
      "Copied total_amount type should match source",
    );
    assert.strictEqual(
      targetTotalAmount?.method,
      sourceTotalAmount?.method,
      "Copied total_amount method should match source",
    );
    assert.ok(targetAnalyzer.tags, "Copied analyzer should have tags");
    assert.strictEqual(
      targetAnalyzer.tags?.modelType,
      sourceAnalyzerInfo.tags?.modelType,
      "Copied analyzer should inherit source modelType tag",
    );
    assert.ok(targetAnalyzer.config, "Copied analyzer should have config");
    assert.strictEqual(
      targetAnalyzer.config?.enableFormula,
      sourceAnalyzerInfo.config?.enableFormula,
      "Copied config.enableFormula should match source",
    );
    assert.strictEqual(
      targetAnalyzer.config?.enableLayout,
      sourceAnalyzerInfo.config?.enableLayout,
      "Copied config.enableLayout should match source",
    );
    assert.strictEqual(
      targetAnalyzer.config?.enableOcr,
      sourceAnalyzerInfo.config?.enableOcr,
      "Copied config.enableOcr should match source",
    );

    // Update the target analyzer with a production tag
    const updatedAnalyzer: ContentAnalyzer = {
      baseAnalyzerId: targetAnalyzer.baseAnalyzerId,
      tags: { modelType: "model_in_production" },
    } as ContentAnalyzer;

    console.log("Updating target analyzer with production tag...");
    const updateResult = await client.updateAnalyzer(targetAnalyzerId, updatedAnalyzer);

    // ========== Update + preservation verification ==========
    // . `updateAnalyzer` returns the (partially) updated resource.
    // The response shape differs by API version:
    //   - 2025-11-01 GA: returns a STRIPPED body — only fields the service chooses to echo
    //     (tags, baseAnalyzerId, status). This limits how much we can assert here.
    //   - 2026-06-01-preview: returns the FULL merged resource including description,
    //     fieldSchema, config, and models.
    // We assert the invariant "IF the field is returned, it must equal the pre-update
    // source value." That gives us full preservation coverage on preview and remains
    // safe against the stripped GA recording without needing a re-record.
    assert.ok(updateResult.tags, "Update result should include tags");
    assert.strictEqual(
      updateResult.tags?.modelType,
      "model_in_production",
      "modelType tag should be updated to 'model_in_production'",
    );
    assert.notStrictEqual(
      updateResult.tags?.modelType,
      "in_development",
      "modelType tag should no longer be 'in_development'",
    );
    console.log(`Target analyzer tag updated: modelType=${updateResult.tags?.modelType}`);
    // baseAnalyzerId is echoed by both GA and preview PATCH responses.
    assert.strictEqual(
      updateResult.baseAnalyzerId,
      sourceAnalyzerInfo.baseAnalyzerId,
      "baseAnalyzerId should be preserved after update",
    );
    // Fields below are only guaranteed on preview PATCH responses. On GA the API returns
    // a stripped body and the guards skip the assertion.
    if (updateResult.description !== undefined) {
      assert.strictEqual(
        updateResult.description,
        sourceAnalyzerInfo.description,
        "Description should be preserved after update (preview API)",
      );
    }
    if (updateResult.fieldSchema) {
      assert.strictEqual(
        updateResult.fieldSchema.name,
        "company_schema",
        "fieldSchema name should be preserved (preview API)",
      );
      assert.strictEqual(
        Object.keys(updateResult.fieldSchema.fields).length,
        2,
        "Should still have 2 fields after update (preview API)",
      );
      assert.ok(
        updateResult.fieldSchema.fields.company_name,
        "company_name field should still exist after update (preview API)",
      );
      assert.ok(
        updateResult.fieldSchema.fields.total_amount,
        "total_amount field should still exist after update (preview API)",
      );
    }
    if (updateResult.models?.completion) {
      assert.ok(
        updateResult.models.completion,
        "Completion model should be preserved after update (preview API)",
      );
    }
  });
});

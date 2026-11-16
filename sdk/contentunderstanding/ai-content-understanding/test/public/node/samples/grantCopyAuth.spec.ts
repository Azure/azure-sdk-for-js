// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for grantCopyAuth.ts - Grant copy authorization for cross-resource copy.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { ContentUnderstandingClient } from "../../../../src/index.js";
import { assert, beforeEach, afterEach, it } from "vitest";
import { createRecorder } from "./sampleTestUtils.js";
import { forEachServiceVersion } from "../../../utils/multiVersion.js";
import { AzureKeyCredential } from "@azure/core-auth";
import { createTestCredential } from "@azure-tools/test-credential";

import type {
  ContentAnalyzer,
  ContentAnalyzerConfig,
  ContentFieldSchema,
} from "../../../../src/index.js";

forEachServiceVersion("Sample: grantCopyAuth", ({ apiVersion }) => {
  let recorder: Recorder;
  let sourceClient: ContentUnderstandingClient;
  let targetClient: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should verify cross-resource copy authorization flow", async (ctx) => {
    const sourceEndpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
    const sourceKey = process.env["CONTENTUNDERSTANDING_KEY"];
    const sourceResourceId = process.env["CONTENTUNDERSTANDING_SOURCE_RESOURCE_ID"];
    const sourceRegion = process.env["CONTENTUNDERSTANDING_SOURCE_REGION"];
    const targetEndpoint = process.env["CONTENTUNDERSTANDING_TARGET_ENDPOINT"];
    const targetResourceId = process.env["CONTENTUNDERSTANDING_TARGET_RESOURCE_ID"];
    const targetRegion = process.env["CONTENTUNDERSTANDING_TARGET_REGION"];
    const targetKey = process.env["CONTENTUNDERSTANDING_TARGET_KEY"];

    // Skip if required environment variables are missing
    if (
      !sourceEndpoint ||
      !sourceResourceId ||
      !sourceRegion ||
      !targetEndpoint ||
      !targetResourceId ||
      !targetRegion
    ) {
      ctx.skip();
    }

    // Create clients
    const sourceCredential = sourceKey ? new AzureKeyCredential(sourceKey) : createTestCredential();
    sourceClient = new ContentUnderstandingClient(
      sourceEndpoint,
      sourceCredential,
      recorder.configureClientOptions({ apiVersion }),
    );

    const targetCredential = targetKey ? new AzureKeyCredential(targetKey) : createTestCredential();
    targetClient = new ContentUnderstandingClient(
      targetEndpoint,
      targetCredential,
      recorder.configureClientOptions({ apiVersion }),
    );

    // Generate unique analyzer IDs
    const baseId = recorder.variable("analyzerId", `test_analyzer_${Date.now()}`);
    const sourceAnalyzerId = `${baseId}_source`;
    const targetAnalyzerId = `${baseId}_target`;

    // Step 1: Create the source analyzer
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
      description: "Analyzer for cross-resource copying demo",
      config,
      fieldSchema,
      models: { completion: "gpt-4.1" }, // Using valid model ID, though recording will capture what was used
      tags: { source: "true" },
    } as unknown as ContentAnalyzer;

    const createPoller = sourceClient.createAnalyzer(sourceAnalyzerId, analyzer);
    await createPoller.pollUntilDone();

    try {
      // Step 2: Grant copy authorization
      const copyAuth = await sourceClient.grantCopyAuthorization(
        sourceAnalyzerId,
        targetResourceId,
        {
          targetRegion: targetRegion,
        },
      );
      // assert.ok(copyAuth.source, "Copy authorization source should be present");
      assert.equal(
        copyAuth.targetAzureResourceId?.toLowerCase(),
        targetResourceId.toLowerCase(),
        "Target resource ID should match",
      );

      // ========== Copy authorization verification ==========
      // in . `expiresAt` is service-generated; assert it is a
      // well-formed ISO timestamp. An `expiresAt > now` check is not
      // portable to a playback recording (the recorded expiresAt is in the past
      // relative to test run time), so we assert it only in live mode.
      assert.ok(
        copyAuth.targetAzureResourceId,
        "Copy authorization should include targetAzureResourceId",
      );
      assert.ok(copyAuth.expiresAt, "Copy authorization should include expiresAt");
      const expiresAt = new Date(copyAuth.expiresAt as unknown as string);
      assert.ok(
        !Number.isNaN(expiresAt.getTime()),
        "Copy authorization expiresAt should be a valid timestamp",
      );

      // Step 3: Copy the analyzer
      const copyPoller = targetClient.copyAnalyzer(targetAnalyzerId, sourceAnalyzerId, {
        sourceAzureResourceId: sourceResourceId,
        sourceRegion: sourceRegion,
      });
      await copyPoller.pollUntilDone();

      // Verify the copy
      const targetInfo = await targetClient.getAnalyzer(targetAnalyzerId);
      assert.equal(targetInfo.description, analyzer.description);
      if (isPlaybackMode()) {
        assert.strictEqual(targetInfo.tags?.source, "Sanitized");
      } else {
        assert.ok(targetInfo.tags?.source === "true");
      }

      // ========== Cross-resource copy inheritance verification ==========
      // . The cross-resource copy must inherit every source
      // property, mirroring the same-resource copy invariant in Sample14.
      assert.strictEqual(
        targetInfo.baseAnalyzerId,
        "prebuilt-document",
        "Copied baseAnalyzerId should match source",
      );
      assert.ok(targetInfo.fieldSchema, "Copied analyzer should have fieldSchema");
      assert.strictEqual(
        targetInfo.fieldSchema?.name,
        "company_schema",
        "Copied fieldSchema name should match source",
      );
      assert.strictEqual(
        Object.keys(targetInfo.fieldSchema?.fields ?? {}).length,
        2,
        "Copied analyzer should have 2 fields (company_name + total_amount)",
      );
      assert.ok(
        targetInfo.fieldSchema?.fields.company_name,
        "Copied analyzer should contain company_name field",
      );
      assert.strictEqual(
        targetInfo.fieldSchema?.fields.company_name?.type,
        "string",
        "Copied company_name should be string type",
      );
      assert.ok(
        targetInfo.fieldSchema?.fields.total_amount,
        "Copied analyzer should contain total_amount field",
      );
      assert.strictEqual(
        targetInfo.fieldSchema?.fields.total_amount?.type,
        "number",
        "Copied total_amount should be number type",
      );
      assert.ok(targetInfo.config, "Copied analyzer should have config");
      assert.strictEqual(
        targetInfo.config?.enableLayout,
        true,
        "Copied config.enableLayout should match source (true)",
      );
      assert.strictEqual(
        targetInfo.config?.enableOcr,
        true,
        "Copied config.enableOcr should match source (true)",
      );
      assert.strictEqual(
        targetInfo.config?.enableFormula,
        false,
        "Copied config.enableFormula should match source (false)",
      );
    } finally {
      // Clean up
      try {
        await sourceClient.deleteAnalyzer(sourceAnalyzerId);
      } catch (e) {
        console.error("Failed to delete source analyzer:", e);
      }
      try {
        await targetClient.deleteAnalyzer(targetAnalyzerId);
      } catch (e) {
        console.error("Failed to delete target analyzer:", e);
      }
    }
  });
});

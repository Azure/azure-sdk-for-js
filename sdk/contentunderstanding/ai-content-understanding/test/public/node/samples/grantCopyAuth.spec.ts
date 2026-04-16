// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sample test for grantCopyAuth.ts - Grant copy authorization for cross-resource copy.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { ContentUnderstandingClient } from "../../../../src/index.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import { createRecorder } from "./sampleTestUtils.js";
import { AzureKeyCredential } from "@azure/core-auth";
import { createTestCredential } from "@azure-tools/test-credential";

import type {
  ContentAnalyzer,
  ContentAnalyzerConfig,
  ContentFieldSchema,
} from "../../../../src/index.js";

describe("Sample: grantCopyAuth", () => {
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
      recorder.configureClientOptions({}),
    );

    const targetCredential = targetKey ? new AzureKeyCredential(targetKey) : createTestCredential();
    targetClient = new ContentUnderstandingClient(
      targetEndpoint,
      targetCredential,
      recorder.configureClientOptions({}),
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

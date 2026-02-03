// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sample test for getAnalyzer.ts - Retrieve information about analyzers.
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

describe("Sample: getAnalyzer", () => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;
  let testAnalyzerId: string;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder);
    // Generate a unique analyzer ID with prefix to avoid conflicts with other tests
    testAnalyzerId = recorder.variable(
      "getAnalyzerTestId",
      `test_get_analyzer_${Math.floor(Date.now() / 1000)}_${Math.floor(Math.random() * 10000)}`,
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

  it("should retrieve a prebuilt analyzer", async () => {
    const prebuiltAnalyzer = await client.getAnalyzer("prebuilt-documentSearch");

    // Assertions
    assert.ok(prebuiltAnalyzer, "Prebuilt analyzer should not be null");
    assert.equal(
      prebuiltAnalyzer.analyzerId,
      "prebuilt-documentSearch",
      "Analyzer ID should match",
    );
    console.log("Retrieved prebuilt-documentSearch analyzer");
    console.log(`Status: ${prebuiltAnalyzer.status}`);

    if (prebuiltAnalyzer.description) {
      console.log(`Description: ${prebuiltAnalyzer.description}`);
    }
  });

  it("should retrieve a prebuilt-invoice analyzer", async () => {
    const invoiceAnalyzer = await client.getAnalyzer("prebuilt-invoice");

    // Assertions
    assert.ok(invoiceAnalyzer, "Prebuilt invoice analyzer should not be null");
    assert.equal(invoiceAnalyzer.analyzerId, "prebuilt-invoice", "Analyzer ID should match");
    console.log("Retrieved prebuilt-invoice analyzer");
  });

  it("should retrieve a custom analyzer after creation", async () => {
    // First create a custom analyzer
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

    const customAnalyzer: ContentAnalyzer = {
      baseAnalyzerId: "prebuilt-document",
      description: "Custom analyzer for extracting company information",
      config: { returnDetails: true } as ContentAnalyzerConfig,
      fieldSchema,
      models: { completion: "gpt-4.1" },
    } as ContentAnalyzer;

    const poller = client.createAnalyzer(testAnalyzerId, customAnalyzer, testPollingOptions);
    await poller.pollUntilDone();
    console.log(`Custom analyzer '${testAnalyzerId}' created successfully!`);

    // Now retrieve the custom analyzer
    const retrievedAnalyzer = await client.getAnalyzer(testAnalyzerId);

    // Assertions
    assert.ok(retrievedAnalyzer, "Retrieved analyzer should not be null");
    assert.equal(retrievedAnalyzer.analyzerId, testAnalyzerId, "Analyzer ID should match");
    assert.equal(
      retrievedAnalyzer.baseAnalyzerId,
      "prebuilt-document",
      "Base analyzer ID should match",
    );
    console.log(`Retrieved custom analyzer '${testAnalyzerId}'`);

    if (retrievedAnalyzer.fieldSchema) {
      assert.equal(
        retrievedAnalyzer.fieldSchema.name,
        "company_schema",
        "Field schema name should match",
      );
      console.log(`Field schema name: ${retrievedAnalyzer.fieldSchema.name}`);
    }
  });
});

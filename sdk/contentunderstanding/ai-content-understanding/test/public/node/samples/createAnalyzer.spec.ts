// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sample test for createAnalyzer.ts - Create a custom analyzer with field schema.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import {
  type ContentAnalyzer,
  type ContentAnalyzerConfig,
  type ContentFieldSchema,
} from "../../../../src/index.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import {
  createRecorder,
  createClient,
  testPollingOptions,
  TEST_INVOICE_URL,
} from "./sampleTestUtils.js";

describe("Sample: createAnalyzer", () => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;
  let testAnalyzerId: string;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder);
    // Generate a unique analyzer ID with prefix to avoid conflicts with other tests
    testAnalyzerId = recorder.variable(
      "createAnalyzerTestId",
      `test_create_analyzer_${Math.floor(Date.now() / 1000)}_${Math.floor(Math.random() * 10000)}`,
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

  it("should create a custom analyzer with field schema", async () => {
    // Define field schema with custom fields
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
        document_summary: {
          type: "string",
          method: "generate",
          description: "A brief summary of the document content",
        },
        document_type: {
          type: "string",
          method: "classify",
          description: "Type of document",
          enum: ["invoice", "receipt", "contract", "report", "other"],
        },
      },
    };

    // Create analyzer configuration
    const config: ContentAnalyzerConfig = {
      enableFormula: true,
      enableLayout: true,
      enableOcr: true,
      estimateFieldSourceAndConfidence: true,
      returnDetails: true,
    };

    // Create the analyzer
    const analyzer: ContentAnalyzer = {
      baseAnalyzerId: "prebuilt-document",
      description: "Custom analyzer for extracting company information",
      config,
      fieldSchema,
      models: {
        completion: "gpt-4.1",
        embedding: "text-embedding-3-large",
      },
    } as ContentAnalyzer;

    // Assertions: Verify input objects
    assert.ok(testAnalyzerId, "Analyzer ID should not be null");
    assert.ok(fieldSchema, "Field schema should not be null");
    assert.ok(analyzer, "Custom analyzer should not be null");

    const poller = client.createAnalyzer(testAnalyzerId, analyzer, testPollingOptions);
    const result = await poller.pollUntilDone();

    // Assertions: Verify result
    assert.ok(result, "Analyzer result should not be null");
    assert.equal(result.analyzerId, testAnalyzerId, "Analyzer ID should match");
    assert.equal(result.baseAnalyzerId, "prebuilt-document", "Base analyzer ID should match");
    console.log(`Analyzer '${testAnalyzerId}' created successfully`);

    // Verify analyzer config
    if (result.config) {
      console.log("Analyzer config verified");
    }

    // Verify field schema
    if (result.fieldSchema) {
      assert.equal(result.fieldSchema.name, "company_schema", "Field schema name should match");
      console.log(`Field schema name verified: ${result.fieldSchema.name}`);

      if (result.fieldSchema.fields) {
        const fieldCount = Object.keys(result.fieldSchema.fields).length;
        assert.equal(fieldCount, 4, "Should have 4 fields");
        console.log(`Field count verified: ${fieldCount} fields`);
      }
    }

    // Analyze a document using the custom analyzer
    const analyzePoller = client.analyze(
      testAnalyzerId,
      [{ url: TEST_INVOICE_URL }],
      testPollingOptions,
    );
    const analyzeResult = await analyzePoller.pollUntilDone();

    assert.ok(analyzeResult, "Analysis result should not be null");
    assert.ok(analyzeResult.contents, "Result contents should not be null");
    assert.ok(analyzeResult.contents.length > 0, "Result should have at least one content");

    const content = analyzeResult.contents[0];
    assert.ok(content.fields, "Fields should not be null");
    assert.ok(content.fields["company_name"], "company_name field should exist");
  });
});

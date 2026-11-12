// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for createAnalyzer.ts - Create a custom analyzer with field schema.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import {
  type ContentAnalyzer,
  type ContentAnalyzerConfig,
  type ContentFieldSchema,
} from "../../../../src/index.js";
import { assert, beforeEach, afterEach, it } from "vitest";
import {
  createRecorder,
  createClient,
  testPollingOptions,
  TEST_INVOICE_URL,
} from "./sampleTestUtils.js";
import { forEachServiceVersion } from "../../../utils/multiVersion.js";

forEachServiceVersion("Sample: createAnalyzer", ({ apiVersion }) => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;
  let testAnalyzerId: string;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder, apiVersion);
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

    // ========== Analyzer creation verification ==========
    // . All values here are defined by this test itself in the
    // create payload above, so they are portable across environments and stable in
    // playback (the recording captures the response the service returned for our
    // specific create request). Both the GA (2025-11-01) and preview (2026-06-01-preview)
    // recordings return the full merged resource on the create LRO GET.

    // Verify analyzer config (all values sent in the create payload).
    assert.ok(result.config, "Analyzer config should not be null");
    assert.strictEqual(result.config?.enableFormula, true, "config.enableFormula should be true");
    assert.strictEqual(result.config?.enableLayout, true, "config.enableLayout should be true");
    assert.strictEqual(result.config?.enableOcr, true, "config.enableOcr should be true");
    assert.strictEqual(
      result.config?.estimateFieldSourceAndConfidence,
      true,
      "config.estimateFieldSourceAndConfidence should be true",
    );
    assert.strictEqual(result.config?.returnDetails, true, "config.returnDetails should be true");

    // Verify field schema.
    assert.ok(result.fieldSchema, "Field schema should not be null");
    assert.strictEqual(
      result.fieldSchema?.name,
      "company_schema",
      "Field schema name should match",
    );
    assert.strictEqual(
      result.fieldSchema?.description,
      "Schema for extracting company information",
      "Field schema description should match",
    );
    assert.ok(result.fieldSchema?.fields, "Field schema fields should not be null");
    const fieldCount = Object.keys(result.fieldSchema?.fields ?? {}).length;
    assert.strictEqual(fieldCount, 4, "Should have 4 custom fields");
    console.log(`Field schema verified: ${result.fieldSchema?.name} (${fieldCount} fields)`);

    // Verify individual fields.
    const companyName = result.fieldSchema?.fields.company_name;
    assert.ok(companyName, "Should contain company_name field");
    assert.strictEqual(companyName?.type, "string", "company_name should be string type");
    assert.strictEqual(companyName?.method, "extract", "company_name should use extract method");
    assert.ok(companyName?.description, "company_name should have a description");

    const totalAmount = result.fieldSchema?.fields.total_amount;
    assert.ok(totalAmount, "Should contain total_amount field");
    assert.strictEqual(totalAmount?.type, "number", "total_amount should be number type");
    assert.strictEqual(totalAmount?.method, "extract", "total_amount should use extract method");
    assert.ok(totalAmount?.description, "total_amount should have a description");

    const summary = result.fieldSchema?.fields.document_summary;
    assert.ok(summary, "Should contain document_summary field");
    assert.strictEqual(summary?.type, "string", "document_summary should be string type");
    assert.strictEqual(summary?.method, "generate", "document_summary should use generate method");
    assert.ok(summary?.description, "document_summary should have a description");

    const docType = result.fieldSchema?.fields.document_type;
    assert.ok(docType, "Should contain document_type field");
    assert.strictEqual(docType?.type, "string", "document_type should be string type");
    assert.strictEqual(docType?.method, "classify", "document_type should use classify method");
    assert.ok(docType?.description, "document_type should have a description");
    assert.ok(docType?.enum, "document_type should have enum values");
    assert.strictEqual(docType?.enum?.length, 5, "document_type should have 5 enum values");
    for (const expected of ["invoice", "receipt", "contract", "report", "other"]) {
      assert.ok(
        docType?.enum?.includes(expected),
        `document_type enum should contain '${expected}'`,
      );
    }

    // Verify models mapping (both keys are sent by the sample).
    assert.ok(result.models, "Models should not be null");
    assert.ok(
      Object.keys(result.models ?? {}).length >= 2,
      "Should have at least 2 model mappings",
    );
    assert.ok(result.models?.completion, "Should contain 'completion' model mapping");
    assert.strictEqual(
      result.models?.embedding,
      "text-embedding-3-large",
      "Embedding model should match the sample-defined 'text-embedding-3-large'",
    );

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

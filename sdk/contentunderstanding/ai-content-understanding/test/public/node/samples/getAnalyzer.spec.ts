// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for getAnalyzer.ts - Retrieve information about analyzers.
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

forEachServiceVersion("Sample: getAnalyzer", ({ apiVersion }) => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;
  let testAnalyzerId: string;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder, apiVersion);
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

    // ========== prebuilt-invoice field schema verification ==========
    // . prebuilt-invoice ships with a well-known field schema;
    // asserting basic shape catches regressions in service-side prebuilt schemas.
    assert.ok(invoiceAnalyzer.fieldSchema, "Prebuilt-invoice should have a field schema");
    assert.ok(
      invoiceAnalyzer.fieldSchema?.fields,
      "Prebuilt-invoice fieldSchema should have fields",
    );
    const invoiceFieldCount = Object.keys(invoiceAnalyzer.fieldSchema?.fields ?? {}).length;
    assert.ok(
      invoiceFieldCount > 0,
      "Prebuilt-invoice should have at least one field defined",
    );
    // Every field in the prebuilt schema should have a description.
    for (const [name, field] of Object.entries(invoiceAnalyzer.fieldSchema?.fields ?? {})) {
      assert.ok(
        field?.description,
        `Prebuilt-invoice field '${name}' should have a description`,
      );
    }
    console.log(
      `Prebuilt-invoice fieldSchema verified: ${invoiceFieldCount} field(s)`,
    );
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

    // ========== Custom analyzer GET verification ==========
    // . All values here are defined by this test itself in the
    // create payload above, so they are portable across environments.
    assert.strictEqual(
      retrievedAnalyzer.description,
      "Custom analyzer for extracting company information",
      "Description should match what was created",
    );

    // Verify field schema.
    assert.ok(retrievedAnalyzer.fieldSchema, "Field schema should not be null");
    assert.equal(
      retrievedAnalyzer.fieldSchema?.name,
      "company_schema",
      "Field schema name should match",
    );
    assert.strictEqual(
      retrievedAnalyzer.fieldSchema?.description,
      "Schema for extracting company information",
      "Field schema description should match",
    );
    assert.ok(retrievedAnalyzer.fieldSchema?.fields, "Field schema fields should not be null");
    const fieldCount = Object.keys(retrievedAnalyzer.fieldSchema?.fields ?? {}).length;
    assert.strictEqual(fieldCount, 2, "Should have 2 fields (company_name + total_amount)");

    // Verify individual fields (sample-defined).
    const companyName = retrievedAnalyzer.fieldSchema?.fields.company_name;
    assert.ok(companyName, "Should contain company_name field");
    assert.strictEqual(companyName?.type, "string", "company_name should be string type");
    assert.strictEqual(companyName?.method, "extract", "company_name should use extract method");
    assert.strictEqual(
      companyName?.description,
      "Name of the company",
      "company_name description should match",
    );

    const totalAmount = retrievedAnalyzer.fieldSchema?.fields.total_amount;
    assert.ok(totalAmount, "Should contain total_amount field");
    assert.strictEqual(totalAmount?.type, "number", "total_amount should be number type");
    assert.strictEqual(totalAmount?.method, "extract", "total_amount should use extract method");
    assert.strictEqual(
      totalAmount?.description,
      "Total amount on the document",
      "total_amount description should match",
    );

    // Verify config.
    assert.ok(retrievedAnalyzer.config, "Config should not be null");
    assert.strictEqual(
      retrievedAnalyzer.config?.returnDetails,
      true,
      "config.returnDetails should be true",
    );

    // Verify models mapping.
    assert.ok(retrievedAnalyzer.models, "Models should not be null");
    assert.ok(
      retrievedAnalyzer.models?.completion,
      "Should contain 'completion' model mapping",
    );
  });
});

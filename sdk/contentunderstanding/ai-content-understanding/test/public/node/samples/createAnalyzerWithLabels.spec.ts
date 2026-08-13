// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for createAnalyzerWithLabels.ts - Create a custom analyzer with labeled
 * training data.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import {
  type ContentAnalyzer,
  type ContentAnalyzerConfig,
  type ContentFieldSchema,
  type ContentFieldDefinition,
  type LabeledDataKnowledgeSource,
  type KnowledgeSourceUnion,
} from "../../../../src/index.js";
import { assert, describe, beforeAll, beforeEach, afterEach, it } from "vitest";
import {
  createRecorder,
  createClient,
  testPollingOptions,
  resolveTrainingDataSasUrl,
} from "./sampleTestUtils.js";

describe("Sample: createAnalyzerWithLabels", () => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;
  let testAnalyzerId: string;
  let trainingDataSasUrl: string | undefined;

  // Resolve the SAS URL once before all tests, before the recorder patches
  // transports. This ensures Azure Storage SDK calls are not intercepted.
  beforeAll(async () => {
    trainingDataSasUrl = await resolveTrainingDataSasUrl();
  });

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder);
    // Generate a unique analyzer ID with prefix to avoid conflicts with other tests
    testAnalyzerId = recorder.variable(
      "createAnalyzerWithLabelsTestId",
      `test_labels_analyzer_${Math.floor(Date.now() / 1000)}_${Math.floor(Math.random() * 10000)}`,
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

  it("should create a custom analyzer with labeled training data", async () => {
    if (!trainingDataSasUrl) {
      console.warn(
        "Training data SAS URL not available. Set CONTENTUNDERSTANDING_TRAINING_DATA_SAS_URL " +
          "or CONTENTUNDERSTANDING_TRAINING_DATA_STORAGE_ACCOUNT + CONTENTUNDERSTANDING_TRAINING_DATA_CONTAINER. " +
          "Skipping test.",
      );
      return;
    }

    // Step 1: Build the receipt field schema
    const itemDefinition: ContentFieldDefinition = {
      type: "object",
      method: "extract",
      description: "Individual item details",
      properties: {
        Quantity: {
          type: "string",
          method: "extract",
          description: "Quantity of the item",
        },
        Name: {
          type: "string",
          method: "extract",
          description: "Name of the item",
        },
        Price: {
          type: "string",
          method: "extract",
          description: "Price of the item",
        },
      },
    };

    const fieldSchema: ContentFieldSchema = {
      name: "receipt_schema",
      description: "Schema for receipt extraction with items",
      fields: {
        MerchantName: {
          type: "string",
          method: "extract",
          description: "Name of the merchant",
        },
        Items: {
          type: "array",
          method: "generate",
          description: "List of items purchased",
          itemDefinition,
        },
        TotalPrice: {
          type: "string",
          method: "extract",
          description: "Total amount",
        },
      },
    };

    // Step 2: Resolve training data SAS URL
    // The SAS URL was resolved in beforeAll (before the recorder patches transports).
    // Training data is assumed to already exist in the container.
    const trainingDataPrefix =
      process.env["CONTENTUNDERSTANDING_TRAINING_DATA_PREFIX"] || undefined;

    // Step 3: Create knowledge source from labeled data
    const labeledSource: LabeledDataKnowledgeSource = {
      kind: "labeledData",
      containerUrl: trainingDataSasUrl,
      fileListPath: "",
      ...(trainingDataPrefix ? { prefix: trainingDataPrefix } : {}),
    };
    const knowledgeSources: KnowledgeSourceUnion[] = [labeledSource];

    // Step 4: Create the analyzer
    const config: ContentAnalyzerConfig = {
      enableLayout: true,
      enableOcr: true,
    };

    const customAnalyzer: ContentAnalyzer = {
      baseAnalyzerId: "prebuilt-document",
      description: "Receipt analyzer with labeled training data",
      config,
      fieldSchema,
      models: {
        completion: "gpt-4.1",
        embedding: "text-embedding-3-large",
      },
      knowledgeSources,
    } as unknown as ContentAnalyzer;

    // Assertions: Verify input objects
    assert.ok(testAnalyzerId, "Analyzer ID should not be null");
    assert.ok(fieldSchema, "Field schema should not be null");
    assert.ok(customAnalyzer, "Custom analyzer should not be null");

    const poller = client.createAnalyzer(testAnalyzerId, customAnalyzer, {
      ...testPollingOptions,
      allowReplace: true,
    });
    const result = await poller.pollUntilDone();

    // Assertions: Verify result
    assert.ok(result, "Analyzer result should not be null");
    assert.equal(result.analyzerId, testAnalyzerId, "Analyzer ID should match");
    assert.equal(result.baseAnalyzerId, "prebuilt-document", "Base analyzer ID should match");
    assert.equal(
      result.description,
      "Receipt analyzer with labeled training data",
      "Description should match",
    );
    console.log(`Analyzer '${testAnalyzerId}' created successfully`);

    // ========== Analyzer creation verification ==========
    //  (labeled-data variant). All values here are defined by
    // this test itself in the create payload above, so they are portable across
    // environments. This test bails early in playback (no SAS URL), so these assertions
    // are effectively live-only.

    // Verify analyzer config (all values sent in the create payload).
    assert.ok(result.config, "Analyzer config should not be null");
    assert.strictEqual(result.config?.enableLayout, true, "config.enableLayout should be true");
    assert.strictEqual(result.config?.enableOcr, true, "config.enableOcr should be true");

    // Verify field schema.
    assert.ok(result.fieldSchema, "Field schema should not be null");
    assert.equal(result.fieldSchema!.name, "receipt_schema", "Field schema name should match");
    assert.strictEqual(
      result.fieldSchema!.description,
      "Schema for receipt extraction with items",
      "Field schema description should match",
    );
    if (result.fieldSchema!.fields) {
      const fieldCount = Object.keys(result.fieldSchema!.fields).length;
      assert.equal(fieldCount, 3, "Should have 3 fields (MerchantName, Items, TotalPrice)");
      assert.ok(result.fieldSchema!.fields["MerchantName"], "MerchantName field should exist");
      assert.ok(result.fieldSchema!.fields["Items"], "Items field should exist");
      assert.ok(result.fieldSchema!.fields["TotalPrice"], "TotalPrice field should exist");
      console.log(`Field schema verified: ${fieldCount} fields`);
    }

    // Verify individual field types/methods (sample-defined values).
    const merchantName = result.fieldSchema!.fields.MerchantName;
    assert.strictEqual(merchantName?.type, "string", "MerchantName should be string type");
    assert.strictEqual(merchantName?.method, "extract", "MerchantName should use extract method");
    assert.ok(merchantName?.description, "MerchantName should have a description");

    const items = result.fieldSchema!.fields.Items;
    assert.strictEqual(items?.type, "array", "Items should be array type");
    assert.strictEqual(items?.method, "generate", "Items should use generate method");
    assert.ok(items?.description, "Items should have a description");

    // Verify nested item definition (Items array element schema).
    assert.ok(items?.itemDefinition, "Items should have itemDefinition");
    assert.strictEqual(
      items?.itemDefinition?.type,
      "object",
      "Items.itemDefinition should be object type",
    );
    assert.ok(
      items?.itemDefinition?.properties,
      "Items.itemDefinition should have properties",
    );
    const itemProps = items?.itemDefinition?.properties ?? {};
    assert.strictEqual(
      Object.keys(itemProps).length,
      3,
      "Items.itemDefinition should have 3 properties (Quantity, Name, Price)",
    );
    assert.strictEqual(itemProps.Quantity?.type, "string", "Quantity should be string type");
    assert.strictEqual(itemProps.Quantity?.method, "extract", "Quantity should use extract method");
    assert.strictEqual(itemProps.Name?.type, "string", "Name should be string type");
    assert.strictEqual(itemProps.Name?.method, "extract", "Name should use extract method");
    assert.strictEqual(itemProps.Price?.type, "string", "Price should be string type");
    assert.strictEqual(itemProps.Price?.method, "extract", "Price should use extract method");

    const totalPrice = result.fieldSchema!.fields.TotalPrice;
    assert.strictEqual(totalPrice?.type, "string", "TotalPrice should be string type");
    assert.strictEqual(totalPrice?.method, "extract", "TotalPrice should use extract method");
    assert.ok(totalPrice?.description, "TotalPrice should have a description");

    // Verify models mapping (both keys are sent by the sample).
    assert.ok(result.models, "Models should not be null");
    assert.ok(result.models?.completion, "Should contain 'completion' model mapping");
    assert.strictEqual(
      result.models?.embedding,
      "text-embedding-3-large",
      "Embedding model should match the sample-defined 'text-embedding-3-large'",
    );

    // Verify knowledge sources
    assert.ok(result.knowledgeSources, "Knowledge sources should not be null");
    assert.equal(result.knowledgeSources!.length, 1, "Should have 1 knowledge source");
    assert.equal(
      result.knowledgeSources![0].kind,
      "labeledData",
      "Knowledge source should be labeledData",
    );
    console.log(`Knowledge sources verified: ${result.knowledgeSources!.length} source(s)`);
  });
});

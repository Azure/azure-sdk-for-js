// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sample test for createAnalyzerWithLabels.ts - Create a custom analyzer with labeled
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

    // Verify field schema
    assert.ok(result.fieldSchema, "Field schema should not be null");
    assert.equal(result.fieldSchema!.name, "receipt_schema", "Field schema name should match");
    if (result.fieldSchema!.fields) {
      const fieldCount = Object.keys(result.fieldSchema!.fields).length;
      assert.equal(fieldCount, 3, "Should have 3 fields (MerchantName, Items, TotalPrice)");
      assert.ok(result.fieldSchema!.fields["MerchantName"], "MerchantName field should exist");
      assert.ok(result.fieldSchema!.fields["Items"], "Items field should exist");
      assert.ok(result.fieldSchema!.fields["TotalPrice"], "TotalPrice field should exist");
      console.log(`Field schema verified: ${fieldCount} fields`);
    }

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

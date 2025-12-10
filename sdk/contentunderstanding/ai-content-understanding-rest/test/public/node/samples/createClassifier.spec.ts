// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sample test for createClassifier.ts - Create a classifier analyzer.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import { type ContentAnalyzer, type ContentAnalyzerConfig } from "../../../../src/index.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import { createRecorder, createClient, testPollingOptions } from "./sampleTestUtils.js";

describe("Sample: createClassifier", () => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;
  let testAnalyzerId: string;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder);
    // Generate a unique analyzer ID
    testAnalyzerId = recorder.variable(
      "createClassifierTestId",
      `test_classifier_${Math.floor(Date.now() / 1000)}`,
    );
  });

  afterEach(async () => {
    // Clean up: try to delete test analyzer if it exists
    try {
      await client.deleteAnalyzer(testAnalyzerId);
      console.log(`Cleaned up test classifier: ${testAnalyzerId}`);
    } catch {
      // Ignore errors during cleanup
    }
    await recorder.stop();
  });

  it("should create a classifier analyzer with content categories", async () => {
    // Define content categories for classification
    const contentCategories = {
      Loan_Application: {
        description:
          "Documents submitted by individuals or businesses to request funding, " +
          "typically including personal or business details, financial history, " +
          "loan amount, purpose, and supporting documentation.",
      },
      Invoice: {
        description:
          "Billing documents issued by sellers or service providers to request " +
          "payment for goods or services, detailing items, prices, taxes, totals, " +
          "and payment terms.",
      },
      Bank_Statement: {
        description:
          "Official statements issued by banks that summarize account activity " +
          "over a period, including deposits, withdrawals, fees, and balances.",
      },
    };

    // Create analyzer configuration
    const config: ContentAnalyzerConfig = {
      returnDetails: true,
      enableSegment: true, // Enable automatic segmentation by category
      contentCategories,
    };

    // Create the classifier analyzer
    const classifier: ContentAnalyzer = {
      baseAnalyzerId: "prebuilt-document",
      description: "Custom classifier for financial document categorization",
      config,
      models: { completion: "gpt-4.1" },
    } as ContentAnalyzer;

    const poller = client.createAnalyzer(testAnalyzerId, classifier, testPollingOptions);
    await poller.pollUntilDone();

    // Get the full analyzer details after creation
    const result = await client.getAnalyzer(testAnalyzerId);

    // Assertions
    assert.ok(result, "Classifier result should not be null");
    assert.equal(result.analyzerId, testAnalyzerId, "Analyzer ID should match");
    console.log(`Classifier '${testAnalyzerId}' created successfully!`);

    if (result.description) {
      console.log(`Description: ${result.description}`);
    }

    // Verify content categories were set
    if (result.config && result.config.contentCategories) {
      const categoryCount = Object.keys(result.config.contentCategories).length;
      assert.equal(categoryCount, 3, "Should have 3 content categories");
      console.log(`Content categories verified: ${categoryCount} categories`);
    }
  });
});

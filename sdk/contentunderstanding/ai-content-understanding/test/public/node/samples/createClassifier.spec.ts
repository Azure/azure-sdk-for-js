// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for createClassifier.ts - Create a classifier analyzer.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import { type ContentAnalyzer, type ContentAnalyzerConfig } from "../../../../src/index.js";
import { assert, beforeEach, afterEach, it } from "vitest";
import { createRecorder, createClient, testPollingOptions } from "./sampleTestUtils.js";
import { forEachServiceVersion } from "../../../utils/multiVersion.js";

forEachServiceVersion("Sample: createClassifier", ({ apiVersion }) => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;
  let testAnalyzerId: string;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder, apiVersion);
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
    // Define content categories for classification.
    // The Invoice category sets analyzerId: "prebuilt-invoice" so matched segments are
    // routed to the prebuilt invoice analyzer for field extraction (mirrors the sample).
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
        analyzerId: "prebuilt-invoice",
      },
      Bank_Statement: {
        description:
          "Official statements issued by banks that summarize account activity " +
          "over a period, including deposits, withdrawals, fees, and balances.",
      },
    };

    // Assert Invoice category routes segments for field extraction
    assert.equal(
      contentCategories.Invoice.analyzerId,
      "prebuilt-invoice",
      "Invoice category should route segments to prebuilt-invoice for field extraction",
    );

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

    // ========== Classifier creation verification ==========
    // . All values here are defined by this test itself in
    // the create payload above, so they are portable across environments.

    // Verify base properties.
    assert.strictEqual(
      result.baseAnalyzerId,
      "prebuilt-document",
      "Base analyzer ID should match",
    );
    assert.strictEqual(
      result.description,
      "Custom classifier for financial document categorization",
      "Description should match",
    );

    // Verify classifier config (all values sent in the create payload).
    assert.ok(result.config, "Classifier config should not be null");
    assert.strictEqual(result.config?.returnDetails, true, "config.returnDetails should be true");
    assert.strictEqual(result.config?.enableSegment, true, "config.enableSegment should be true");

    // Verify content categories.
    assert.ok(
      result.config?.contentCategories,
      "Config should include contentCategories",
    );
    const categories = result.config?.contentCategories ?? {};
    assert.strictEqual(
      Object.keys(categories).length,
      3,
      "Should have 3 content categories",
    );
    for (const name of ["Loan_Application", "Invoice", "Bank_Statement"]) {
      assert.ok(
        categories[name],
        `Should contain '${name}' category`,
      );
      assert.ok(
        categories[name]?.description,
        `'${name}' category should have a description`,
      );
    }
    // The Invoice category was configured with `analyzerId: "prebuilt-invoice"` so
    // matched segments route to prebuilt-invoice for field extraction. This is
    // preserved by the 2026-06-01-preview API. The 2025-11-01 GA response strips
    // per-category `analyzerId`, so we only assert this on preview via a guard.
    const invoiceAnalyzerId = categories.Invoice?.analyzerId;
    if (invoiceAnalyzerId !== undefined && invoiceAnalyzerId !== null) {
      assert.strictEqual(
        invoiceAnalyzerId,
        "prebuilt-invoice",
        "Invoice category should route to 'prebuilt-invoice' (preview API)",
      );
    }
    console.log(`Content categories verified: ${Object.keys(categories).length} categories`);

    // Verify models mapping.
    assert.ok(result.models, "Models should not be null");
    assert.ok(result.models?.completion, "Should contain 'completion' model mapping");
  });
});

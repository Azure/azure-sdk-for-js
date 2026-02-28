// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sample test for analyzeConfigs.ts - Extract additional features like charts, formulas.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import { type DocumentContent } from "../../../../src/index.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import {
  createRecorder,
  createClient,
  testPollingOptions,
  getSampleFilePath,
  TEST_DOCUMENT_URL,
} from "./sampleTestUtils.js";
import fs from "node:fs";

describe("Sample: analyzeConfigs", () => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should analyze with additional feature extraction (charts, formulas, etc.)", async () => {
    const filePath = getSampleFilePath("sample_document_features.pdf");

    // Skip if file doesn't exist
    if (!fs.existsSync(filePath)) {
      console.warn(`Sample file not found at ${filePath}, using URL-based analysis instead`);
      // Use URL-based analysis as fallback
      const poller = client.analyze(
        "prebuilt-documentSearch",
        [{ url: TEST_DOCUMENT_URL }],
        testPollingOptions,
      );

      const result = await poller.pollUntilDone();

      assert.ok(result, "Analysis result should not be null");
      assert.ok(result.contents, "Result contents should not be null");
      return;
    }

    const pdfBytes = fs.readFileSync(filePath);
    console.log(`Analyzing ${filePath} with prebuilt-documentSearch...`);
    console.log("Note: prebuilt-documentSearch has formulas, layout, and OCR enabled by default.");

    const poller = client.analyzeBinary("prebuilt-documentSearch", pdfBytes, testPollingOptions);
    const result = await poller.pollUntilDone();

    // Assertions
    assert.ok(result, "Analysis result should not be null");
    assert.ok(result.contents, "Result contents should not be null");
    assert.ok(result.contents.length > 0, "Result should have at least one content");

    const content = result.contents[0];

    if (content.kind === "document") {
      const documentContent = content as DocumentContent;

      // Check for figures (which may include charts)
      if (documentContent.figures && documentContent.figures.length > 0) {
        console.log(`Found ${documentContent.figures.length} figure(s)`);
        const chartFigures = documentContent.figures.filter((f) => f.kind === "chart");
        console.log(`  Including ${chartFigures.length} chart(s)`);
      }

      // Check for formulas
      if (documentContent.formulas && documentContent.formulas.length > 0) {
        console.log(`Found ${documentContent.formulas.length} formula(s)`);
      }

      // Check for tables
      if (documentContent.tables && documentContent.tables.length > 0) {
        console.log(`Found ${documentContent.tables.length} table(s)`);
      }
    }
  });
});

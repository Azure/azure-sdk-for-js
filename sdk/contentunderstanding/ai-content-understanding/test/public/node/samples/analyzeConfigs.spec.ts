// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for analyzeConfigs.ts - Extract additional features like charts, formulas.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import { type DocumentContent } from "../../../../src/index.js";
import { assert, beforeEach, afterEach, it } from "vitest";
import {
  createRecorder,
  createClient,
  testPollingOptions,
  getSampleFilePath,
  TEST_DOCUMENT_URL,
} from "./sampleTestUtils.js";
import { forEachServiceVersion } from "../../../utils/multiVersion.js";
import fs from "node:fs";

forEachServiceVersion("Sample: analyzeConfigs", ({ apiVersion }) => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder, apiVersion);
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

    // The GA (2025-11-01) playback recording expects
    // `Content-Type: application/pdf`, so on the GA cell we pass the explicit
    // MIME type. The preview (2026-06-01-preview) recording expects
    // `application/octet-stream`, so we pass `undefined` there (the SDK
    // default). This mirrors the current sample-dev/analyzeConfigs.ts flow
    // while keeping GA recordings frozen during preview development.
    const pdfContentType = apiVersion === "2025-11-01" ? "application/pdf" : undefined;

    const poller = client.analyzeBinary("prebuilt-documentSearch", pdfBytes, {
      ...testPollingOptions,
      contentType: pdfContentType,
      updateIntervalInMs: 0,
    });
    const result = await poller.pollUntilDone();

    // Assertions
    assert.ok(result, "Analysis result should not be null");
    assert.ok(result.contents, "Result contents should not be null");
    assert.ok(result.contents.length > 0, "Result should have at least one content");

    const content = result.contents[0];

    // ========== Configured document verification ==========
    // region in . prebuilt-documentSearch on a PDF should
    // always produce document-kind content with application/pdf MIME type and pages.
    assert.strictEqual(
      content.kind,
      "document",
      "prebuilt-documentSearch on a PDF should produce document-kind content",
    );
    assert.ok(content.markdown, "Configured analysis should produce markdown content");

    if (content.kind === "document") {
      const documentContent = content as DocumentContent;

      assert.strictEqual(
        documentContent.mimeType,
        "application/pdf",
        "MIME type should be application/pdf for a PDF input",
      );
      assert.ok(documentContent.pages, "Pages collection should be present");
      assert.ok(documentContent.pages!.length > 0, "Pages collection should not be empty");

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

      // Check for signatures (preview API surface — populated when layout details are enabled).
      // Guarded so it stays playback-safe against older recordings that pre-date the preview field.
      if (documentContent.signatures && documentContent.signatures.length > 0) {
        console.log(`Found ${documentContent.signatures.length} signature(s)`);
        for (const signature of documentContent.signatures) {
          assert.ok(signature.id, "Each signature should have an id");
          if (signature.span) {
            assert.ok(signature.span.length > 0, "Signature span length should be positive");
          }
          if (signature.elements) {
            for (const element of signature.elements) {
              assert.ok(element, "Signature element identifiers should not be empty");
            }
          }
        }
      }
    }
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sample test for analyzeBinary.ts - Analyze a PDF file from disk.
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
} from "./sampleTestUtils.js";
import fs from "node:fs";

describe("Sample: analyzeBinary", () => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should analyze a PDF file from binary using prebuilt-documentSearch", async () => {
    const filePath = getSampleFilePath("sample_invoice.pdf");

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.warn(`Sample file not found at ${filePath}, skipping test`);
      return;
    }

    // Read the file
    const pdfBytes = fs.readFileSync(filePath);

    // Assertions: Verify file was read correctly
    assert.ok(pdfBytes, "PDF bytes should not be null");
    assert.ok(pdfBytes.length > 0, "PDF bytes should not be empty");
    console.log(`Read ${pdfBytes.length.toLocaleString()} bytes from ${filePath}`);

    // Analyze the document using analyzeBinary
    const poller = client.analyzeBinary("prebuilt-documentSearch", pdfBytes, testPollingOptions);

    const result = await poller.pollUntilDone();

    // Assertions: Verify result
    assert.ok(result, "Analysis result should not be null");
    assert.ok(result.contents, "Result contents should not be null");
    assert.ok(result.contents.length > 0, "Result should have at least one content");
    assert.equal(result.contents.length, 1, "PDF file should have exactly one content element");
    console.log(`Analysis result contains ${result.contents.length} content(s)`);

    // Extract and verify markdown content
    const content = result.contents[0];
    assert.ok(content, "Content should not be null");
    assert.ok(content.markdown, "Markdown content should not be null");
    assert.ok(content.markdown.length > 0, "Markdown content should not be empty");
    console.log(`Markdown content extracted successfully (${content.markdown.length} characters)`);

    // Verify document-specific properties if it's a document
    if (content.kind === "document") {
      const documentContent = content as DocumentContent;

      // Verify page information
      assert.ok(documentContent.startPageNumber >= 1, "Start page should be >= 1");
      assert.ok(
        documentContent.endPageNumber >= documentContent.startPageNumber,
        "End page should be >= start page",
      );

      const totalPages = documentContent.endPageNumber - documentContent.startPageNumber + 1;
      assert.ok(totalPages > 0, "Total pages should be positive");
      console.log(
        `Document pages: ${documentContent.startPageNumber} to ${documentContent.endPageNumber} (${totalPages} pages)`,
      );
    }
  });
});

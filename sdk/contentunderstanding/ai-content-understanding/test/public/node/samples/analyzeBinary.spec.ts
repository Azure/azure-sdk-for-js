// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sample test for analyzeBinary.ts - Analyze a PDF file from disk.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient } from "../../../../src/index.js";
import { type DocumentContent, ContentRange } from "../../../../src/index.js";
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

  it("should analyze specific pages with ContentRange.page", async () => {
    const filePath = getSampleFilePath("mixed_financial_invoices.pdf");
    if (!fs.existsSync(filePath)) {
      console.warn(`Sample file not found at ${filePath}, skipping test`);
      return;
    }
    const pdfBytes = fs.readFileSync(filePath);

    const poller = client.analyzeBinary("prebuilt-documentSearch", pdfBytes, testPollingOptions, {
      contentRange: ContentRange.page(2),
    });
    const result = await poller.pollUntilDone();

    assert.ok(result.contents);
    assert.ok(result.contents.length > 0);
    const doc = result.contents[0] as DocumentContent;
    assert.equal(doc.startPageNumber, 2);
    assert.equal(doc.endPageNumber, 2);
  });

  it("should analyze a page range with ContentRange.pages", async () => {
    const filePath = getSampleFilePath("mixed_financial_invoices.pdf");
    if (!fs.existsSync(filePath)) {
      console.warn(`Sample file not found at ${filePath}, skipping test`);
      return;
    }
    const pdfBytes = fs.readFileSync(filePath);

    const poller = client.analyzeBinary("prebuilt-documentSearch", pdfBytes, testPollingOptions, {
      contentRange: ContentRange.pages(1, 3),
    });
    const result = await poller.pollUntilDone();

    assert.ok(result.contents);
    assert.ok(result.contents.length > 0);
    const doc = result.contents[0] as DocumentContent;
    assert.equal(doc.startPageNumber, 1);
    assert.equal(doc.endPageNumber, 3);
  });

  it("should analyze from a start page with ContentRange.pagesFrom", async () => {
    const filePath = getSampleFilePath("mixed_financial_invoices.pdf");
    if (!fs.existsSync(filePath)) {
      console.warn(`Sample file not found at ${filePath}, skipping test`);
      return;
    }
    const pdfBytes = fs.readFileSync(filePath);

    const poller = client.analyzeBinary("prebuilt-documentSearch", pdfBytes, testPollingOptions, {
      contentRange: ContentRange.pagesFrom(8),
    });
    const result = await poller.pollUntilDone();

    assert.ok(result.contents);
    assert.ok(result.contents.length > 0);
    const doc = result.contents[0] as DocumentContent;
    assert.ok(doc.startPageNumber >= 8);
    assert.equal(doc.endPageNumber, 10);
  });

  it("should analyze combined pages with ContentRange.combine", async () => {
    const filePath = getSampleFilePath("mixed_financial_invoices.pdf");
    if (!fs.existsSync(filePath)) {
      console.warn(`Sample file not found at ${filePath}, skipping test`);
      return;
    }
    const pdfBytes = fs.readFileSync(filePath);

    const poller = client.analyzeBinary("prebuilt-documentSearch", pdfBytes, testPollingOptions, {
      contentRange: ContentRange.combine(
        ContentRange.pages(1, 3),
        ContentRange.page(5),
        ContentRange.pagesFrom(9),
      ),
    });
    const result = await poller.pollUntilDone();

    assert.ok(result.contents);
    assert.ok(result.contents.length > 0);
  });

  it("should analyze with raw ContentRange string", async () => {
    const filePath = getSampleFilePath("mixed_financial_invoices.pdf");
    if (!fs.existsSync(filePath)) {
      console.warn(`Sample file not found at ${filePath}, skipping test`);
      return;
    }
    const pdfBytes = fs.readFileSync(filePath);

    const poller = client.analyzeBinary("prebuilt-documentSearch", pdfBytes, testPollingOptions, {
      contentRange: new ContentRange("1-3,5,9-"),
    });
    const result = await poller.pollUntilDone();

    assert.ok(result.contents);
    assert.ok(result.contents.length > 0);
  });
});

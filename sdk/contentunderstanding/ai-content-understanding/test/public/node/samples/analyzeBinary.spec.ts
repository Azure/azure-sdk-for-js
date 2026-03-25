// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sample test for analyzeBinary.ts - Analyze a PDF file from disk.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type { ContentUnderstandingClient, DocumentContent } from "../../../../src/index.js";
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
    const poller = client.analyzeBinary("prebuilt-documentSearch", pdfBytes, "application/pdf", {
      ...testPollingOptions,
      // Use updateIntervalInMs to configure LRO polling; 0 makes playback fast
      updateIntervalInMs: 0,
    });

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

  it("should analyze binary with content ranges", async () => {
    const filePath = getSampleFilePath("mixed_financial_invoices.pdf");
    if (!fs.existsSync(filePath)) {
      console.warn(`Sample file not found at ${filePath}, skipping test`);
      return;
    }
    const pdfBytes = fs.readFileSync(filePath);

    // Full analysis for comparison baseline
    const fullPoller = client.analyzeBinary(
      "prebuilt-documentSearch",
      pdfBytes,
      "application/pdf",
      testPollingOptions,
    );
    const fullResult = await fullPoller.pollUntilDone();
    assert.ok(fullResult.contents);
    const fullDoc = fullResult.contents[0] as DocumentContent;
    const fullPageCount = fullDoc.pages ? fullDoc.pages.length : 0;
    console.log(`Full document: ${fullPageCount} pages, ${(fullDoc.markdown || "").length} chars`);

    // "2" — single page
    console.log("\nAnalyzing page 2 only with content range '2'...");
    const page2Poller = client.analyzeBinary(
      "prebuilt-documentSearch",
      pdfBytes,
      "application/pdf",
      { ...testPollingOptions, contentRange: "2" },
    );
    const page2Result = await page2Poller.pollUntilDone();
    assert.ok(page2Result.contents);
    const page2Doc = page2Result.contents[0] as DocumentContent;
    const page2PageCount = page2Doc.pages ? page2Doc.pages.length : 0;
    assert.equal(page2PageCount, 1, `'2' should return exactly 1 page, got ${page2PageCount}`);
    assert.equal(page2Doc.startPageNumber, 2, "'2' should start at page 2");
    assert.equal(page2Doc.endPageNumber, 2, "'2' should end at page 2");
    assert.equal(page2Doc.pages![0].pageNumber, 2, "'2' page[0].pageNumber should be 2");
    console.log(`'2': ${page2PageCount} page, page number: ${page2Doc.pages![0].pageNumber}`);

    // "1-3" — page range
    console.log("\nAnalyzing pages 1-3 with content range '1-3'...");
    const pages13Poller = client.analyzeBinary(
      "prebuilt-documentSearch",
      pdfBytes,
      "application/pdf",
      { ...testPollingOptions, contentRange: "1-3" },
    );
    const pages13Result = await pages13Poller.pollUntilDone();
    assert.ok(pages13Result.contents);
    assert.ok(pages13Result.contents.length > 0);
    const pages13Doc = pages13Result.contents[0] as DocumentContent;
    const pages13PageCount = pages13Doc.pages ? pages13Doc.pages.length : 0;
    assert.equal(
      pages13PageCount,
      3,
      `'1-3' should return exactly 3 pages, got ${pages13PageCount}`,
    );
    assert.equal(pages13Doc.startPageNumber, 1, "'1-3' should start at page 1");
    assert.equal(pages13Doc.endPageNumber, 3, "'1-3' should end at page 3");
    const actualPages13 = pages13Doc.pages!.map((p) => p.pageNumber).sort((a, b) => a - b);
    assert.deepEqual(actualPages13, [1, 2, 3]);
    console.log(`'1-3': ${pages13PageCount} pages, page numbers: ${actualPages13}`);

    // "1,3-4" — combined page ranges
    console.log("\nAnalyzing combined pages (1, 3-4) with content range '1,3-4'...");
    const combine2Poller = client.analyzeBinary(
      "prebuilt-documentSearch",
      pdfBytes,
      "application/pdf",
      { ...testPollingOptions, contentRange: "1,3-4" },
    );
    const combine2Result = await combine2Poller.pollUntilDone();
    assert.ok(combine2Result.contents);
    assert.ok(combine2Result.contents.length > 0);
    const combine2Doc = combine2Result.contents[0] as DocumentContent;
    const combine2PageCount = combine2Doc.pages ? combine2Doc.pages.length : 0;
    assert.equal(
      combine2PageCount,
      3,
      `'1,3-4' should return exactly 3 pages, got ${combine2PageCount}`,
    );
    assert.equal(combine2Doc.startPageNumber, 1, "'1,3-4' should start at page 1");
    assert.equal(combine2Doc.endPageNumber, 4, "'1,3-4' should end at page 4");
    const actualCombine2Pages = combine2Doc.pages!.map((p) => p.pageNumber).sort((a, b) => a - b);
    assert.deepEqual(actualCombine2Pages, [1, 3, 4]);
    console.log(`'1,3-4': ${combine2PageCount} pages, page numbers: ${actualCombine2Pages}`);

    // "3-" — pages 3 onward
    console.log("\nAnalyzing pages 3 onward with content range '3-'...");
    const range3Poller = client.analyzeBinary(
      "prebuilt-documentSearch",
      pdfBytes,
      "application/pdf",
      { ...testPollingOptions, contentRange: "3-" },
    );
    const range3Result = await range3Poller.pollUntilDone();
    assert.ok(range3Result.contents);
    assert.ok(range3Result.contents.length > 0);
    const range3Doc = range3Result.contents[0] as DocumentContent;
    const range3PageCount = range3Doc.pages ? range3Doc.pages.length : 0;
    assert.equal(
      range3PageCount,
      fullPageCount - 2,
      `'3-' should return exactly ${fullPageCount - 2} pages, got ${range3PageCount}`,
    );
    assert.equal(range3Doc.startPageNumber, 3, "'3-' should start at page 3");
    assert.equal(
      range3Doc.endPageNumber,
      fullDoc.endPageNumber,
      `'3-' should end at page ${fullDoc.endPageNumber}`,
    );
    const expectedRange3Pages = Array.from(
      { length: fullDoc.endPageNumber - 3 + 1 },
      (_, i) => i + 3,
    );
    const actualRange3Pages = range3Doc.pages!.map((p) => p.pageNumber).sort((a, b) => a - b);
    assert.deepEqual(actualRange3Pages, expectedRange3Pages);
    console.log(
      `'3-': ${range3PageCount} pages (pages ${range3Doc.startPageNumber}-${range3Doc.endPageNumber})`,
    );

    // "1-3,5,9-" — combined ranges
    console.log("\nAnalyzing combined pages (1-3, 5, 9-) with content range '1-3,5,9-'...");
    const combinePoller = client.analyzeBinary(
      "prebuilt-documentSearch",
      pdfBytes,
      "application/pdf",
      { ...testPollingOptions, contentRange: "1-3,5,9-" },
    );
    const combineResult = await combinePoller.pollUntilDone();
    assert.ok(combineResult.contents);
    assert.ok(combineResult.contents.length > 0);
    const combineDoc = combineResult.contents[0] as DocumentContent;
    const combinePageCount = combineDoc.pages ? combineDoc.pages.length : 0;
    // Expected pages: 1,2,3,5,9,10,...,N => count = N - 4
    assert.equal(
      combinePageCount,
      fullPageCount - 4,
      `'1-3,5,9-' should return exactly ${fullPageCount - 4} pages, got ${combinePageCount}`,
    );
    const expectedCombinePages = [1, 2, 3, 5].concat(
      Array.from({ length: fullDoc.endPageNumber - 9 + 1 }, (_, i) => i + 9),
    );
    const actualCombinePages = combineDoc.pages!.map((p) => p.pageNumber).sort((a, b) => a - b);
    assert.deepEqual(actualCombinePages, expectedCombinePages);
    assert.equal(combineDoc.startPageNumber, 1, "'1-3,5,9-' should start at page 1");
    assert.equal(
      combineDoc.endPageNumber,
      fullDoc.endPageNumber,
      `'1-3,5,9-' should end at page ${fullDoc.endPageNumber}`,
    );
    console.log(`'1-3,5,9-': ${combinePageCount} pages, page numbers: ${actualCombinePages}`);

    console.log("\n[SUCCESS] All content range binary test assertions passed");
  });
});

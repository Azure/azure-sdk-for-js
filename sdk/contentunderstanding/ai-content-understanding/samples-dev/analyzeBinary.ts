// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Analyze a PDF file from disk using the prebuilt-documentSearch analyzer.
 *
 * This sample demonstrates how to analyze a PDF file from disk using the prebuilt-documentSearch
 * analyzer. The prebuilt-documentSearch analyzer transforms unstructured documents into structured,
 * machine-readable data optimized for RAG scenarios.
 *
 * Content Understanding provides prebuilt RAG analyzers (the prebuilt-*Search analyzers) that return
 * markdown and a one-paragraph Summary for each content item:
 * - prebuilt-documentSearch: Extracts content from documents with layout preservation
 * - prebuilt-audioSearch: Transcribes audio content with speaker diarization
 * - prebuilt-videoSearch: Analyzes video content with visual frame extraction
 * - prebuilt-imageSearch: Analyzes standalone images and returns a summary
 *
 * @azsdk-weight 90
 */

import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import {
  ContentUnderstandingClient,
  ContentRange,
  type DocumentContent,
} from "@azure/ai-content-understanding";

function getCredential(): DefaultAzureCredential | AzureKeyCredential {
  const key = process.env["CONTENTUNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

export async function main(): Promise<void> {
  console.log("== Analyze Binary Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  // Read PDF bytes from disk
  // Assets folder is at ../assets relative to samples/v1/javascript or samples/v1/typescript
  const filePath = path.join("..", "..", "assets", "sample_invoice.pdf");
  const pdfBytes = fs.readFileSync(filePath);
  console.log(`Analyzing ${filePath} with prebuilt-documentSearch...`);
  console.log(`  File size: ${pdfBytes.length.toLocaleString()} bytes`);

  // Analyze the document using analyzeBinary
  const poller = client.analyzeBinary("prebuilt-documentSearch", pdfBytes);
  const result = await poller.pollUntilDone();

  // Display markdown content
  console.log("\nMarkdown Content:");
  console.log("=".repeat(50));

  if (result.contents && result.contents.length > 0) {
    const content = result.contents[0];
    if (content.markdown) {
      console.log(content.markdown);
    } else {
      console.log("No markdown content available.");
    }
  } else {
    console.log("No content found in the analysis result.");
  }

  console.log("=".repeat(50));

  // Extract document properties
  if (result.contents && result.contents.length > 0) {
    const content = result.contents[0];

    // Check if this is document content to access document-specific properties
    if (content.kind === "document") {
      const documentContent = content as DocumentContent;
      console.log("\nDocument Information:");
      console.log(`  Start page: ${documentContent.startPageNumber}`);
      console.log(`  End page: ${documentContent.endPageNumber}`);
      const totalPages = documentContent.endPageNumber - documentContent.startPageNumber + 1;
      console.log(`  Total pages: ${totalPages}`);
    }
  }

  // ======================================================================
  // ContentRange examples: analyze specific pages of a multi-page document
  // ======================================================================
  const multiPagePath = path.join("..", "..", "assets", "mixed_financial_invoices.pdf");
  const multiPageBytes = fs.readFileSync(multiPagePath);
  console.log(`\nAnalyzing ${multiPagePath} with ContentRange...`);
  console.log(`  File size: ${multiPageBytes.length.toLocaleString()} bytes`);

  // ---- ContentRange.pagesFrom(3) — from page 3 to end ----
  console.log("\n--- pagesFrom(3): Page 3 to end ---");
  const pagesFromPoller = client.analyzeBinary(
    "prebuilt-documentSearch",
    multiPageBytes,
    undefined,
    {
      contentRange: ContentRange.pagesFrom(3),
    },
  );
  const pagesFromResult = await pagesFromPoller.pollUntilDone();
  if (pagesFromResult.contents && pagesFromResult.contents.length > 0) {
    const doc = pagesFromResult.contents[0] as DocumentContent;
    console.log(`  Pages: ${doc.startPageNumber} - ${doc.endPageNumber}`);
    console.log(`  Markdown length: ${doc.markdown?.length ?? 0} chars`);
  }

  // ---- ContentRange.page(2) — single page ----
  console.log("\n--- page(2): Page 2 only ---");
  const pagePoller = client.analyzeBinary("prebuilt-documentSearch", multiPageBytes, undefined, {
    contentRange: ContentRange.page(2),
  });
  const pageResult = await pagePoller.pollUntilDone();
  if (pageResult.contents && pageResult.contents.length > 0) {
    const doc = pageResult.contents[0] as DocumentContent;
    console.log(`  Pages: ${doc.startPageNumber} - ${doc.endPageNumber}`);
    console.log(`  Markdown length: ${doc.markdown?.length ?? 0} chars`);
  }

  // ---- ContentRange.pages(1, 3) — pages 1 through 3 ----
  console.log("\n--- pages(1, 3): Pages 1-3 ---");
  const pagesPoller = client.analyzeBinary("prebuilt-documentSearch", multiPageBytes, undefined, {
    contentRange: ContentRange.pages(1, 3),
  });
  const pagesResult = await pagesPoller.pollUntilDone();
  if (pagesResult.contents && pagesResult.contents.length > 0) {
    const doc = pagesResult.contents[0] as DocumentContent;
    console.log(`  Pages: ${doc.startPageNumber} - ${doc.endPageNumber}`);
    console.log(`  Markdown length: ${doc.markdown?.length ?? 0} chars`);
  }

  // ---- ContentRange.combine — combine page(1), pages(3, 4) ----
  console.log("\n--- combine(page(1), pages(3, 4)): Pages 1 and 3-4 ---");
  const combinePoller = client.analyzeBinary("prebuilt-documentSearch", multiPageBytes, undefined, {
    contentRange: ContentRange.combine(ContentRange.page(1), ContentRange.pages(3, 4)),
  });
  const combineResult = await combinePoller.pollUntilDone();
  if (combineResult.contents && combineResult.contents.length > 0) {
    const doc = combineResult.contents[0] as DocumentContent;
    console.log(`  Pages: ${doc.startPageNumber} - ${doc.endPageNumber}`);
    console.log(`  Markdown length: ${doc.markdown?.length ?? 0} chars`);
  }

  // ---- ContentRange.combine — complex: pages(1, 3), page(5), pagesFrom(9) ----
  console.log("\n--- combine(pages(1, 3), page(5), pagesFrom(9)): Pages 1-3, 5, 9+ ---");
  const multiCombinePoller = client.analyzeBinary(
    "prebuilt-documentSearch",
    multiPageBytes,
    undefined,
    {
      contentRange: ContentRange.combine(
        ContentRange.pages(1, 3),
        ContentRange.page(5),
        ContentRange.pagesFrom(9),
      ),
    },
  );
  const multiCombineResult = await multiCombinePoller.pollUntilDone();
  if (multiCombineResult.contents && multiCombineResult.contents.length > 0) {
    const doc = multiCombineResult.contents[0] as DocumentContent;
    console.log(`  Pages: ${doc.startPageNumber} - ${doc.endPageNumber}`);
    console.log(`  Markdown length: ${doc.markdown?.length ?? 0} chars`);
  }

  // ======================================================================
  // Raw string content ranges — pass strings directly without helpers
  // ======================================================================

  // ---- Raw string "1-3" — document page range ----
  console.log('\n--- Raw string "1-3": Pages 1 through 3 ---');
  const rawPageRangePoller = client.analyzeBinary(
    "prebuilt-documentSearch",
    multiPageBytes,
    undefined,
    {
      contentRange: "1-3",
    },
  );
  const rawPageRangeResult = await rawPageRangePoller.pollUntilDone();
  if (rawPageRangeResult.contents && rawPageRangeResult.contents.length > 0) {
    const doc = rawPageRangeResult.contents[0] as DocumentContent;
    console.log(`  Pages: ${doc.startPageNumber} - ${doc.endPageNumber}`);
    console.log(`  Markdown length: ${doc.markdown?.length ?? 0} chars`);
  }

  // ---- Raw string "9-" — all pages from page 9 onward ----
  console.log('\n--- Raw string "9-": Page 9 onward ---');
  const rawPagesFromPoller = client.analyzeBinary(
    "prebuilt-documentSearch",
    multiPageBytes,
    undefined,
    {
      contentRange: "9-",
    },
  );
  const rawPagesFromResult = await rawPagesFromPoller.pollUntilDone();
  if (rawPagesFromResult.contents && rawPagesFromResult.contents.length > 0) {
    const doc = rawPagesFromResult.contents[0] as DocumentContent;
    console.log(`  Pages: ${doc.startPageNumber} - ${doc.endPageNumber}`);
    console.log(`  Markdown length: ${doc.markdown?.length ?? 0} chars`);
  }

  // ---- Raw string "1-3,5,9-" — combined ranges ----
  console.log('\n--- Raw string "1-3,5,9-": Combined ranges ---');
  const rawCombinedPoller = client.analyzeBinary(
    "prebuilt-documentSearch",
    multiPageBytes,
    undefined,
    {
      contentRange: "1-3,5,9-",
    },
  );
  const rawCombinedResult = await rawCombinedPoller.pollUntilDone();
  if (rawCombinedResult.contents && rawCombinedResult.contents.length > 0) {
    const doc = rawCombinedResult.contents[0] as DocumentContent;
    console.log(`  Pages: ${doc.startPageNumber} - ${doc.endPageNumber}`);
    console.log(`  Markdown length: ${doc.markdown?.length ?? 0} chars`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Analyze a document from binary data.
 *
 * This sample demonstrates how to analyze a PDF file from disk using the `prebuilt-documentSearch`
 * analyzer and convert the result to LLM-friendly text.
 *
 * ## About analyzing documents from binary data
 *
 * One of the key values of Content Understanding is taking a content file and extracting the
 * content for you in one call. The service returns an `AnalysisResult` that contains an array
 * of `AnalysisContent` items in `AnalysisResult.contents`. This sample starts with a document
 * file, so each item is a `DocumentContent` (a subtype of `AnalysisContent`) that exposes
 * markdown plus detailed structure such as pages, tables, figures, and paragraphs.
 *
 * ## Using results with LLMs
 *
 * The markdown returned by Content Understanding can be directly consumed by large language
 * models (LLMs) for summarization, question answering, and other generative AI tasks. To make
 * this even easier, the SDK provides a convenient `toLlmInput()` helper that converts an
 * `AnalysisResult` into a single text block with YAML front matter (content type, page numbers,
 * extracted fields) followed by the markdown body — ready for injection into LLM prompts, vector
 * databases, or agentic tool outputs. For advanced usage (output options, content ranges,
 * video/audio, metadata), see toLlmInput.ts.
 *
 * This sample focuses on **document analysis**. For prebuilt RAG analyzers covering images,
 * audio, and video, see analyzeUrl.ts.
 *
 * ## Prebuilt analyzers
 *
 * Content Understanding provides prebuilt RAG analyzers (the `prebuilt-*Search` analyzers,
 * such as `prebuilt-documentSearch`) that return markdown and a one-paragraph summary for each
 * content item, making them useful for retrieval-augmented generation (RAG) and other
 * downstream applications:
 *
 * - **`prebuilt-documentSearch`** — Extracts content from documents (PDF, images, Office
 *   documents) with layout preservation, table detection, figure analysis, and structured
 *   markdown output. Optimized for RAG scenarios.
 * - **`prebuilt-audioSearch`** — Transcribes audio content with speaker diarization, timing
 *   information, and conversation summaries. Supports multilingual transcription.
 * - **`prebuilt-videoSearch`** — Analyzes video content with visual frame extraction, audio
 *   transcription, and structured summaries. Provides temporal alignment of visual and audio
 *   content.
 * - **`prebuilt-imageSearch`** — Analyzes standalone images and returns a one-paragraph
 *   summary of the image content. For images that contain text (including hand-written text),
 *   use `prebuilt-documentSearch`.
 *
 * This sample uses **`prebuilt-documentSearch`** to extract structured content from PDF documents.
 *
 * It also demonstrates content range filtering to target specific pages:
 * - `"3-"`: Pages 3 onward.
 * - `"1-3,5,9-"`: Pages 1-3, page 5, and pages 9 onward.
 *
 * ## Choose the right analyze method
 *
 * By default, analysis is a **long-running operation (LRO)**: the client starts the
 * request and polls until the result is ready. In `2026-06-01-preview`, you can also
 * use **inline** analyze APIs (`analyzeInline` / `analyzeBinaryInline`) that return
 * `AnalysisResult` in a single call without polling. For when to use each path, limits,
 * and billing differences, see analyzeInline.ts, analyzeBinaryInline.ts, and
 * [document limits](https://aka.ms/cu-doc-limits).
 */

require("dotenv/config");
const fs = require("fs");
const path = require("path");
const { DefaultAzureCredential } = require("@azure/identity");
const { AzureKeyCredential } = require("@azure/core-auth");
const { ContentUnderstandingClient, toLlmInput } = require("@azure/ai-content-understanding");

function getCredential() {
  const key = process.env["CONTENTUNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

async function main() {
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

  // ======================================================================
  // Content range examples: analyze specific pages of a multi-page document
  // ======================================================================
  const multiPagePath = path.join("..", "..", "assets", "mixed_financial_invoices.pdf");
  const multiPageBytes = fs.readFileSync(multiPagePath);
  console.log(`\nAnalyzing ${multiPagePath} with content ranges...`);
  console.log(`  File size: ${multiPageBytes.length.toLocaleString()} bytes`);

  // Analyze only pages 3 onward.
  console.log('\nAnalyzing pages 3 onward with content range "3-"...');
  const rangePoller = client.analyzeBinary("prebuilt-documentSearch", multiPageBytes, {
    contentRange: "3-",
  });
  const rangeResult = await rangePoller.pollUntilDone();
  if (rangeResult.contents && rangeResult.contents.length > 0) {
    const doc = rangeResult.contents[0];
    const pageNums = doc.pages?.map((p) => p.pageNumber) ?? [];
    console.log(`  Content range analysis returned pages ${JSON.stringify(pageNums)}`);
  }

  // Analyze pages 1-3, page 5, and pages 9 onward.
  console.log('\nAnalyzing combined pages (1-3, 5, 9-) with content range "1-3,5,9-"...');
  const combinePoller = client.analyzeBinary("prebuilt-documentSearch", multiPageBytes, {
    contentRange: "1-3,5,9-",
  });
  const combineResult = await combinePoller.pollUntilDone();
  if (combineResult.contents && combineResult.contents.length > 0) {
    const doc = combineResult.contents[0];
    const pageNums = doc.pages?.map((p) => p.pageNumber) ?? [];
    console.log(`  Combined content range analysis returned pages ${JSON.stringify(pageNums)}`);
  }

  // Display markdown content
  console.log("\nMarkdown Content:");
  console.log("=".repeat(50));

  // A PDF file has only one content element even if it contains multiple pages
  if (result.contents && result.contents.length > 0) {
    const content = result.contents[0];
    if (content.markdown) {
      console.log(content.markdown);
    } else {
      console.log("No markdown content was returned for this document.");
    }
  } else {
    console.log("No content items were returned for this analysis.");
  }

  console.log("=".repeat(50));

  // ======================================================================
  // Convert the result to LLM-ready text using toLlmInput.
  // ======================================================================
  // The markdown above can be consumed directly by LLMs. For convenience, the SDK
  // provides toLlmInput() which packages the result into a single text block with
  // YAML front matter (content type, pages, fields, optional metadata) followed by
  // the markdown body — ready for LLM prompts, vector stores, or agentic tools.
  console.log("\nLLM-ready output:");
  console.log("=".repeat(50));
  console.log(toLlmInput(result));
  console.log("=".repeat(50));

  // Extract document properties
  if (result.contents && result.contents.length > 0) {
    const content = result.contents[0];

    // Check if this is document content to access document-specific properties
    if (content.kind === "document") {
      const documentContent = content;
      console.log(`\nDocument type: ${documentContent.mimeType ?? "(unknown)"}`);
      console.log(`Start page: ${documentContent.startPageNumber}`);
      console.log(`End page: ${documentContent.endPageNumber}`);

      // Check for pages
      if (documentContent.pages && documentContent.pages.length > 0) {
        console.log(`\nNumber of pages: ${documentContent.pages.length}`);
        for (const page of documentContent.pages) {
          const unit = documentContent.unit ?? "units";
          console.log(`  Page ${page.pageNumber}: ${page.width} x ${page.height} ${unit}`);
        }
      }

      // Check for tables
      if (documentContent.tables && documentContent.tables.length > 0) {
        console.log(`\nNumber of tables: ${documentContent.tables.length}`);
        let tableCounter = 1;
        for (const table of documentContent.tables) {
          console.log(
            `  Table ${tableCounter}: ${table.rowCount} rows x ${table.columnCount} columns`,
          );
          tableCounter++;
        }
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };

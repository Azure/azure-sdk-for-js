// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Advanced usage of the `toLlmInput` helper.
 *
 * This sample demonstrates advanced usage of the `toLlmInput` helper. For a basic introduction
 * to `toLlmInput`, see analyzeBinary.ts (document analysis), analyzeInvoice.ts (field extraction),
 * and createClassifier.ts (classification).
 *
 * About `toLlmInput`:
 *
 * When using Content Understanding with large language models, you typically need to convert the
 * structured `AnalysisResult` into a text format that an LLM can consume. The `toLlmInput`
 * helper handles this conversion automatically:
 *
 * - **YAML front matter** with content type, extracted fields, page numbers, and optional metadata
 * - **Markdown body** with the document content and page markers
 *
 * The helper supports all content types (documents, images, audio, video) and handles
 * multi-segment results (e.g., video with multiple scenes) by rendering each segment with its
 * time range. For classification results, it automatically skips the parent document and renders
 * each categorized child with its category label.
 *
 * Scenarios demonstrated:
 *
 * 1. **Output options** — Fields-only, markdown-only, and custom metadata
 * 2. **Multi-page PDF with content range** — Analyze specific pages and verify page markers
 * 3. **Multi-segment video** — Analyze a video with multiple segments and time ranges
 * 4. **Audio with content range** — Analyze a specific time range of an audio file
 *
 * For classification results, see createClassifier.ts.
 */

require("dotenv/config");
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
  console.log("== toLlmInput Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  // ================================================================
  // 1. OUTPUT OPTIONS — Fields-only, markdown-only, metadata
  // ================================================================

  // First, analyze an invoice to get a result we can demonstrate options with.
  const invoiceUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/document/invoice.pdf";

  console.log("=".repeat(60));
  console.log("OUTPUT OPTIONS");
  console.log("=".repeat(60));
  console.log("Analyzing invoice for output option demos...");
  console.log(`  URL: ${invoiceUrl}\n`);

  let poller = client.analyze("prebuilt-invoice", [{ url: invoiceUrl }]);
  let result = await poller.pollUntilDone();

  // Convert to LLM-ready text (YAML front matter + markdown).
  // For basic usage, see analyzeBinary.ts and analyzeInvoice.ts.
  let text = toLlmInput(result);
  console.log("Default output (fields + markdown):");
  console.log(text);

  // Fields-only mode — smaller token footprint when you only need structured data.
  // Useful for agentic workflows where the LLM only needs extracted values.
  const fieldsOnly = toLlmInput(result, { includeMarkdown: false });
  console.log("\n--- Fields only (includeMarkdown: false) ---");
  console.log(fieldsOnly);

  // Markdown-only mode — when you only need the document text.
  // Useful for summarization or when fields are not relevant.
  const markdownOnly = toLlmInput(result, { includeFields: false });
  console.log("\n--- Markdown only (includeFields: false) ---");
  console.log(markdownOnly);

  // Custom metadata — add your own key-value pairs to the YAML front matter.
  // Useful for RAG pipelines to track document source, department, batch, etc.
  const withMetadata = toLlmInput(result, {
    metadata: { source: "invoice.pdf", department: "finance" },
  });
  console.log("\n--- With metadata ---");
  console.log(withMetadata);

  // ================================================================
  // 2. MULTI-PAGE PDF WITH CONTENT RANGE
  // ================================================================

  const multiPageUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/document/mixed_financial_invoices.pdf";

  console.log("\n" + "=".repeat(60));
  console.log("MULTI-PAGE PDF WITH CONTENT RANGE");
  console.log("=".repeat(60));

  // Analyze specific pages using contentRange.
  // Page markers in the output will use the original document page numbers,
  // so even though we only requested pages 2-3 and 5, the markers will say
  // <!-- page 2 -->, <!-- page 3 -->, <!-- page 5 --> (not 1, 2, 3).
  console.log("Analyzing pages 2-3 and 5 of a multi-page PDF...");
  console.log(`  URL: ${multiPageUrl}`);
  console.log("  contentRange: '2-3,5'\n");

  poller = client.analyze("prebuilt-documentSearch", [
    { url: multiPageUrl, contentRange: "2-3,5" },
  ]);
  result = await poller.pollUntilDone();

  text = toLlmInput(result);
  console.log("Output:");
  console.log(text);

  // ================================================================
  // 3. MULTI-SEGMENT VIDEO
  // ================================================================

  const videoUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/videos/sdk_samples/FlightSimulator.mp4";

  console.log("\n" + "=".repeat(60));
  console.log("MULTI-SEGMENT VIDEO");
  console.log("=".repeat(60));

  // Analyze a video — the result may contain multiple segments.
  // toLlmInput renders each segment with its time range in the front matter
  // (e.g., timeRange: 00:00 – 00:15) and separates segments with ***** dividers.
  console.log("Analyzing video...");
  console.log(`  URL: ${videoUrl}\n`);

  poller = client.analyze("prebuilt-videoSearch", [{ url: videoUrl }]);
  result = await poller.pollUntilDone();

  text = toLlmInput(result);
  console.log(`Video produced ${result.contents?.length ?? 0} segment(s)`);
  console.log("\nOutput:");
  console.log(text);

  // ================================================================
  // 4. AUDIO WITH CONTENT RANGE
  // ================================================================

  const audioUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/audio/callCenterRecording.mp3";

  console.log("\n" + "=".repeat(60));
  console.log("AUDIO WITH CONTENT RANGE");
  console.log("=".repeat(60));

  // Analyze a specific time range of an audio file (first 10 seconds).
  // For audio, contentRange uses milliseconds: "0-10000" means 0s to 10s.
  console.log("Analyzing first 10 seconds of audio...");
  console.log(`  URL: ${audioUrl}`);
  console.log("  contentRange: '0-10000'\n");

  poller = client.analyze("prebuilt-audioSearch", [{ url: audioUrl, contentRange: "0-10000" }]);
  result = await poller.pollUntilDone();

  // Include metadata to track the source file in RAG pipelines.
  text = toLlmInput(result, {
    metadata: { source: "callCenterRecording.mp3" },
  });
  console.log("Output:");
  console.log(text);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});

module.exports = { main };

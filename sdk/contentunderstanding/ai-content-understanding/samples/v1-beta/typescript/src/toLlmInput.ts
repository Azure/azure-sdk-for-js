// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Advanced usage of the `toLlmInput` helper.
 *
 * This sample demonstrates advanced usage of `toLlmInput`. For a basic introduction to
 * `toLlmInput`, see analyzeBinary.ts (document analysis), analyzeInvoice.ts (field extraction),
 * and createClassifier.ts (classification).
 *
 * ## About `toLlmInput`
 *
 * The `toLlmInput` method converts a Content Understanding `AnalysisResult` into a formatted
 * text string (YAML front matter + markdown body) suitable for injecting into LLM prompts,
 * storing in vector databases, or returning as tool output in agentic workflows.
 *
 * When using Content Understanding with large language models, you typically need to convert
 * the structured `AnalysisResult` into a text format that an LLM can consume. The `toLlmInput`
 * helper handles this conversion automatically:
 *
 * - **YAML front matter** with content type, extracted fields, page numbers, and optional metadata
 * - **Markdown body** with the document content and page markers (e.g., `<!-- InputPageNumber: 1 -->`)
 *
 * The helper supports all content types (documents, images, audio, video) and handles
 * multi-segment results (for example, video with multiple scenes) by rendering each segment
 * with its time range. For classification results, it automatically skips the parent document
 * and renders each categorized child with its category label.
 *
 * ### Scenarios demonstrated
 *
 * 1. **Output options** — Fields-only, markdown-only, and caller `customMetadata`.
 * 2. **Preview metadata from analysis result** — Analyze a document with embedded metadata
 *    and include it in `toLlmInput` output (requires API version `2026-06-01-preview`).
 * 3. **Multi-page PDF with content range** — Analyze specific pages and verify page markers.
 * 4. **Multi-segment video** — Analyze a video with multiple segments and time ranges
 * 5. **Audio with content range** — Analyze a specific time range of an audio file
 *
 * For classification results, see createClassifier.ts.
 */

import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { ContentUnderstandingClient, toLlmInput } from "@azure/ai-content-understanding";

function getCredential(): DefaultAzureCredential | AzureKeyCredential {
  const key = process.env["CONTENTUNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

export async function main(): Promise<void> {
  console.log("== toLlmInput Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  // ================================================================
  // 1. OUTPUT OPTIONS — Fields-only, markdown-only, customMetadata
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

  // Custom metadata — nested under `customMetadata:` so it never collides with helper-owned
  // keys (`mimeType`, `fields`, `metadata`, ...). Useful for RAG pipelines to track document
  // source, department, batch, etc.
  const withCustomMetadata = toLlmInput(result, {
    customMetadata: { source: "invoice.pdf", department: "finance" },
  });
  console.log("\n--- With customMetadata ---");
  console.log(withCustomMetadata);

  // Example front matter showing the nested `customMetadata` block (fields/markdown omitted
  // for brevity):
  //
  //     ---
  //     mimeType: application/pdf
  //     customMetadata:
  //       source: invoice.pdf
  //       department: finance
  //     pages: 1
  //     ---

  // ================================================================
  // 2. PREVIEW METADATA FROM ANALYSIS RESULT (2026-06-01-preview)
  // ================================================================
  //
  // Analyze a document that has embedded metadata (author, title, creation date, etc.).
  // `toLlmInput` surfaces `AnalysisContent.metadata` under a top-level `metadata:` block in
  // the YAML front matter. Values that look like JSON containers are parsed so the YAML emits
  // structured data instead of a quoted string. Caller-supplied entries live under a separate
  // `customMetadata:` block (see previous section) so caller keys can never collide with the
  // top-level `metadata:` block.
  //
  // sample_metadata.pdf is a synthetic PDF authored by the fictional "Contoso Metadata Team"
  // that carries a rich set of embedded metadata fields (author, contentType, language,
  // title, etc.), so the YAML output below contains a populated `metadata:` block.

  const metadataPath = path.join("..", "..", "assets", "sample_metadata.pdf");
  const metadataBytes = fs.readFileSync(metadataPath);

  console.log("\n" + "=".repeat(60));
  console.log("PREVIEW METADATA FROM ANALYSIS RESULT");
  console.log("=".repeat(60));
  console.log("Analyzing a document with embedded metadata using prebuilt-layout...");
  console.log(`  file: ${metadataPath}\n`);

  const metadataPoller = client.analyzeBinary("prebuilt-layout", metadataBytes);
  const metadataResult = await metadataPoller.pollUntilDone();

  // toLlmInput includes AnalysisContent.metadata under the "metadata" block when the
  // service returns any embedded metadata for this content.
  const metadataText = toLlmInput(metadataResult);
  console.log("--- Preview metadata from analysis result ---");
  console.log(metadataText);

  // ================================================================
  // 3. MULTI-PAGE PDF WITH CONTENT RANGE
  // ================================================================

  const multiPageUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/document/mixed_financial_invoices.pdf";

  console.log("\n" + "=".repeat(60));
  console.log("MULTI-PAGE PDF WITH CONTENT RANGE");
  console.log("=".repeat(60));

  // Analyze specific pages using contentRange.
  // Page markers in the output will use the original document page numbers,
  // so even though we only requested pages 2-3 and 5, the markers will say
  // <!-- InputPageNumber: 2 -->, <!-- InputPageNumber: 3 -->, <!-- InputPageNumber: 5 --> (not 1, 2, 3).
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
  // 4. MULTI-SEGMENT VIDEO
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
  // 5. AUDIO WITH CONTENT RANGE
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

  // Include customMetadata to track the source file in RAG pipelines.
  text = toLlmInput(result, {
    customMetadata: { source: "callCenterRecording.mp3" },
  });
  console.log("Output:");
  console.log(text);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});

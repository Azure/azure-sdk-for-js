// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Convert an analysis result into LLM-friendly text using `toLlmInput`.
 *
 * This sample demonstrates how to convert a Content Understanding `AnalysisResult`
 * into a single string suitable for injecting into an LLM prompt, storing in a
 * vector database, or returning as tool output.
 *
 * The output combines:
 * - YAML front matter with `contentType`, optional user-supplied metadata,
 *   `pages` (or `timeRange` for audio/video), extracted `fields`, and
 *   `rai_warnings` when present.
 * - Markdown body with `<!-- page N -->` markers for documents (or
 *   transcript text for audio/video).
 *
 * Multi-segment audio/video and document classification results are split
 * into one front matter block per segment, separated by `*****`.
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

  const invoiceUrl =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/document/invoice.pdf";

  console.log(`Analyzing ${invoiceUrl} with prebuilt-invoice...`);
  const poller = client.analyze("prebuilt-invoice", [{ url: invoiceUrl }]);
  const result = await poller.pollUntilDone();

  // Default: front matter (fields) + page-numbered markdown body.
  const text = toLlmInput(result, { metadata: { source: "invoice.pdf" } });
  console.log("\n-- Default (fields + markdown) --");
  console.log(text);

  // Markdown only: skip the structured fields block.
  const markdownOnly = toLlmInput(result, {
    includeFields: false,
    metadata: { source: "invoice.pdf" },
  });
  console.log("\n-- includeFields: false --");
  console.log(markdownOnly);

  // Fields only: smaller token footprint, no markdown body.
  const fieldsOnly = toLlmInput(result, {
    includeMarkdown: false,
    metadata: { source: "invoice.pdf" },
  });
  console.log("\n-- includeMarkdown: false --");
  console.log(fieldsOnly);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});

module.exports = { main };

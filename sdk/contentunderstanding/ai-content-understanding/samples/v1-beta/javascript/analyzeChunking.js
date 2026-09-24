// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Configure semantic chunking on a custom analyzer and read chunks from results.
 *
 * This sample shows how to configure `SemanticChunkingStrategy` on a custom analyzer and
 * read the resulting chunks from `DocumentContent.chunks`. Semantic chunking splits the
 * analyzed document into semantically meaningful, size-controlled chunks optimized for
 * RAG (retrieval-augmented generation) scenarios.
 *
 * The walkthrough uses the SDK sample file `sample_invoice.pdf` (under `assets/`). Chunk
 * boundaries can vary slightly by model and `maxTokens`, but with this invoice the service
 * typically separates header/party details, line items, and totals into distinct chunks
 * (typically 3 chunks at `maxTokens = 300`).
 *
 * ## Key ideas
 *
 * - `chunkingStrategy` is set on `ContentAnalyzerConfig`. When omitted, chunking is disabled.
 * - `SemanticChunkingStrategy.maxTokens` is a soft target — the service may slightly exceed
 *   it to respect semantic or structural boundaries.
 * - Each returned `DocumentChunk` carries a list of `spans` into the parent document's
 *   markdown, plus a `source` expression describing bounding polygons on the page.
 *
 * ## Prerequisites
 *
 * You need a Microsoft Foundry resource with at least one completion model deployment
 * (e.g. `gpt-5.2`). Configure the SDK's default model deployment first using
 * `updateDefaults.ts`, or set `analyzer.models["completion"]` explicitly as shown below.
 *
 * This sample requires service API version `2026-06-01-preview`.
 */

require("dotenv/config");
const fs = require("fs");
const path = require("path");
const { DefaultAzureCredential } = require("@azure/identity");
const { AzureKeyCredential } = require("@azure/core-auth");
const { ContentUnderstandingClient } = require("@azure/ai-content-understanding");
function getCredential() {
  const key = process.env["CONTENTUNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

async function main() {
  console.log("== Analyze Chunking Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());
  const analyzerId = `semantic_chunking_${Math.floor(Date.now() / 1000)}`;

  try {
    // Create analyzer with semantic chunking enabled
    console.log(`Creating analyzer '${analyzerId}' with semantic chunking...`);
    const chunkingStrategy = {
      kind: "semantic",
      maxTokens: 300,
    };
    const analyzer = {
      baseAnalyzerId: "prebuilt-document",
      description: "Analyzer with semantic chunking",
      config: {
        returnDetails: true,
        enableLayout: true,
        chunkingStrategy,
      },
      models: {
        completion: process.env["CONTENTUNDERSTANDING_COMPLETION_MODEL"] ?? "gpt-5.2",
      },
    };

    const createPoller = client.createAnalyzer(analyzerId, analyzer);
    await createPoller.pollUntilDone();
    console.log(`Analyzer '${analyzerId}' created.`);

    // Analyze a document with the chunking-enabled analyzer
    const filePath = path.join("..", "..", "assets", "sample_invoice.pdf");
    const bytes = fs.readFileSync(filePath);
    console.log(`\nAnalyzing ${filePath}...`);
    const analyzePoller = client.analyzeBinary(analyzerId, bytes);
    const result = await analyzePoller.pollUntilDone();

    const doc = result.contents.find((c) => c.kind === "document");
    if (!doc) {
      console.log("(no document content returned)");
      return;
    }

    const chunks = doc.chunks ?? [];
    console.log(`\nChunk count: ${chunks.length}`);

    // Print each chunk by slicing the parent markdown at the chunk's span offsets
    const markdown = doc.markdown ?? "";
    chunks.forEach((chunk, i) => {
      const chunkText = chunk.spans
        .map((span) => markdown.substring(span.offset, span.offset + span.length))
        .join("\n");
      console.log(`\n--- Chunk ${i + 1} ---`);
      console.log(chunkText);
    });
  } finally {
    console.log(`\nCleaning up: deleting analyzer '${analyzerId}'...`);
    await client.deleteAnalyzer(analyzerId);
    console.log(`Analyzer '${analyzerId}' deleted.`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };

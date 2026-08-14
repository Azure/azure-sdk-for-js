// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Analyze a URL input inline (no LRO polling).
 *
 * This sample shows `analyzeInline` for URL-based inputs. This API is **available only** in
 * service API version `2026-06-01-preview`.
 *
 * `analyzeInline` differs from `analyze` in one important way: it returns `AnalysisResult`
 * directly in the HTTP 200 response body instead of returning a long-running operation
 * handle. The inline result is not persisted on the service. When the inline envelope
 * status is not `"Succeeded"`, the convenience API throws a `RestError` with code
 * `"InlineAnalyzeOperationFailed"` (same behavior as a failed completed analyze LRO).
 *
 * ## How to choose
 *
 * Use `analyze` / `analyzeBinary` (LRO) when:
 * - You need larger files or more pages (see
 *   [document limits](https://aka.ms/cu-doc-limits)).
 * - You need broader analyzer coverage.
 * - You want results retained for up to **24 hours** (or until you delete them) and
 *   operation lifecycle APIs (`getResultFile`, `deleteResult`).
 *
 * Use `analyzeInline` (available only in `2026-06-01-preview`) when:
 * - You want a single request/response call with no polling.
 * - You want faster results for smaller inputs — with no polling and no wait tied to a
 *   polling interval, the inline path is faster than the corresponding `analyze*` LRO APIs
 *   under the inline size/analyzer limits.
 * - Your analyzer is in the supported inline set below (no field schema / field extraction).
 *
 * For current limits, see https://aka.ms/cu-doc-limits.
 *
 * ## Supported inline analyzers (2026-06-01-preview)
 *
 * Inline analysis supports only document analyzers without a field schema:
 * - `prebuilt-digitalParse`
 * - `prebuilt-read`
 * - `prebuilt-layout`
 * - Custom document analyzers without fields
 *
 * For binary input, see
 * [analyzeBinaryInline.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1-beta/typescript/src/analyzeBinaryInline.ts).
 *
 * This sample requires service API version `2026-06-01-preview`.
 */

import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { ContentUnderstandingClient } from "@azure/ai-content-understanding";
import type { DocumentContent } from "@azure/ai-content-understanding";

function getCredential(): DefaultAzureCredential | AzureKeyCredential {
  const key = process.env["CONTENTUNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

export async function main(): Promise<void> {
  console.log("== Analyze Inline (URL) Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  // `analyzeInline` is available in service API version `2026-06-01-preview` and later.
  // This beta package defaults to a preview version, so no explicit `apiVersion` is needed.
  const client = new ContentUnderstandingClient(endpoint, getCredential());

  const url =
    "https://raw.githubusercontent.com/Azure-Samples/azure-ai-content-understanding-assets/main/document/invoice.pdf";
  console.log(`Analyzing ${url} with prebuilt-layout inline...`);

  // Inline analysis returns AnalysisResult directly (HTTP 200) with no polling.
  const result = await client.analyzeInline("prebuilt-layout", [{ url }]);

  console.log(`Analyzer: ${result.analyzerId}`);
  console.log(`API version: ${result.apiVersion}`);

  if (result.contents.length > 0 && result.contents[0].kind === "document") {
    const doc = result.contents[0] as DocumentContent;
    console.log(`Pages: ${doc.startPageNumber}-${doc.endPageNumber}`);
    if (doc.markdown) {
      console.log("\nMarkdown Content (first 500 chars):");
      console.log("=".repeat(50));
      console.log(doc.markdown.substring(0, 500));
      if (doc.markdown.length > 500) {
        console.log(`\n... (${doc.markdown.length - 500} more chars)`);
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

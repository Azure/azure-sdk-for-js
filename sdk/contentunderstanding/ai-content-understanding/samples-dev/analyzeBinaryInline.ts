// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Analyze binary input inline (no LRO polling).
 *
 * This sample shows `analyzeBinaryInline` for local binary input. This API is
 * **available only** in service API version `2026-06-01-preview`.
 *
 * `analyzeBinaryInline` differs from `analyzeBinary` in one important way: it returns
 * `AnalysisResult` directly in the HTTP 200 response body instead of returning a
 * long-running operation handle. The inline result is not persisted on the service.
 * When the inline envelope status is not `"Succeeded"`, the convenience API throws a
 * `RestError` with code `"InlineAnalyzeOperationFailed"` (same behavior as a failed
 * completed analyze LRO).
 *
 * ## How to choose
 *
 * Use `analyzeBinary` (LRO) when:
 * - You need larger files or more pages (see
 *   [document limits](https://aka.ms/cu-doc-limits)).
 * - You need broader analyzer coverage.
 * - You want results retained for up to **24 hours** (or until you delete them) and
 *   operation lifecycle APIs.
 *
 * Use `analyzeBinaryInline` (available only in `2026-06-01-preview`) when:
 * - You want a single call with no polling.
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
 * For URL input, see [analyzeInline.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1-beta/typescript/src/analyzeInline.ts).
 *
 * This sample requires service API version `2026-06-01-preview`.
 *
 * @azsdk-weight 73
 */

import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
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
  console.log("== Analyze Binary Inline Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  const filePath = path.join("..", "..", "assets", "sample_invoice.pdf");
  const pdfBytes = fs.readFileSync(filePath);
  console.log(`Analyzing ${filePath} with prebuilt-layout inline...`);
  console.log(`  File size: ${pdfBytes.length.toLocaleString()} bytes`);

  // Inline binary analysis returns AnalysisResult directly (HTTP 200) with no polling.
  // Pass `contentRange` in the options bag to scope analysis to specific pages
  // (for example, `{ contentRange: "2-3" }`); omit it to analyze the full input.
  const result = await client.analyzeBinaryInline("prebuilt-layout", pdfBytes);

  console.log(`Analyzer: ${result.analyzerId}`);
  console.log(`API version: ${result.apiVersion}`);

  if (result.contents.length > 0 && result.contents[0].kind === "document") {
    const doc = result.contents[0] as DocumentContent;
    const pageNums = doc.pages?.map((p) => p.pageNumber) ?? [];
    console.log(`Pages returned: ${JSON.stringify(pageNums)}`);
    if (doc.markdown) {
      console.log("\nMarkdown Content (first 500 chars):");
      console.log("=".repeat(50));
      console.log(doc.markdown.substring(0, 500));
      if (doc.markdown.length > 500) {
        console.log(`\n... (${doc.markdown.length - 500} more chars)`);
      }
    }
  }

  // ======================================================================
  // Inline page-limit rejection
  // ======================================================================
  //
  // Inline analysis has a 5-page input limit. A `contentRange` that selects more
  // than 5 pages must be rejected with HTTP 400 InvalidRequest, even when
  // `allowInputTruncation` is set to true (truncation applies only to the

  const multiPagePath = path.join("..", "..", "assets", "mixed_financial_invoices.pdf");
  const multiPageBytes = fs.readFileSync(multiPagePath);
  console.log(`\nAttempting inline analysis with an over-limit contentRange on ${multiPagePath}...`);
  console.log(`  contentRange: "3-" (pages 3 through end — exceeds the 5-page inline limit)`);

  try {
    await client.analyzeBinaryInline("prebuilt-layout", multiPageBytes, {
      contentRange: "3-",
      allowInputTruncation: true,
    });
    console.log(
      "Unexpected: over-limit inline analysis succeeded; expected an HTTP 400 InvalidRequest rejection.",
    );
  } catch (err: unknown) {
    const restError = err as { statusCode?: number; code?: string; message?: string };
    if (restError.statusCode === 400 && restError.code === "InvalidRequest") {
      console.log(
        "Correctly rejected over-limit inline analysis with HTTP 400 InvalidRequest.",
      );
    } else {
      throw err;
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

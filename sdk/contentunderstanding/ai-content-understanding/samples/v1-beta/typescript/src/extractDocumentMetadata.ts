// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Extract embedded document metadata (author, title, timestamps, etc.).
 *
 * Content Understanding can return metadata embedded in source documents through
 * `AnalysisContent.metadata`. The metadata is a string-to-string dictionary, and only
 * properties with extracted values are included.
 *
 * The preview service enables metadata extraction for document analyzers such as
 * `prebuilt-layout`. Applications should enumerate the dictionary and tolerate additional
 * keys as support evolves.
 *
 * ## PDF metadata
 *
 * This sample analyzes `sample_metadata.pdf`, a synthetic PDF that contains an author,
 * creation timestamp, language, title, and one page. The service also returns its detected
 * content type and page count. Common PDF metadata keys are `author`, `contentType`,
 * `createdAt`, `language`, `pageCount`, and `title`. Each property is optional because the
 * service only returns values embedded in or derivable from the source document.
 *
 * ## DOCX metadata
 *
 * `sample_metadata.docx` exposes additional Office document properties, including
 * `characterCount`, `lastModifiedAt`, `lastModifiedBy`, and `wordCount`, in addition to
 * the base PDF-style keys.
 *
 * Provide your own file paths via `CONTENTUNDERSTANDING_SAMPLE_PDF` /
 * `CONTENTUNDERSTANDING_SAMPLE_DOCX` to inspect the metadata of any local file.
 *
 * This sample requires service API version `2026-06-01-preview`.
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

async function extractMetadata(
  client: ContentUnderstandingClient,
  filePath: string,
): Promise<void> {
  const bytes = fs.readFileSync(filePath);
  console.log(`\nAnalyzing ${filePath} with prebuilt-layout...`);
  console.log(`  File size: ${bytes.length.toLocaleString()} bytes`);

  const poller = client.analyzeBinary("prebuilt-layout", bytes);
  const result = await poller.pollUntilDone();

  const doc = result.contents.find((c) => c.kind === "document") as DocumentContent | undefined;
  if (!doc) {
    console.log("  (no document content returned)");
    return;
  }

  const metadata = doc.metadata ?? {};
  const keys = Object.keys(metadata).sort();
  if (keys.length === 0) {
    console.log("  (no metadata returned for this file)");
    return;
  }

  console.log("  Extracted metadata:");
  for (const key of keys) {
    console.log(`    ${key}: ${metadata[key]}`);
  }
}

export async function main(): Promise<void> {
  console.log("== Extract Document Metadata Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  // Analyze a PDF that includes embedded metadata (author, title, creation time, etc.).
  // Substitute your own file path via `CONTENTUNDERSTANDING_SAMPLE_PDF` if you want to
  // inspect a different file.
  const pdfPath =
    process.env["CONTENTUNDERSTANDING_SAMPLE_PDF"] ??
    path.join("..", "..", "assets", "sample_metadata.pdf");
  await extractMetadata(client, pdfPath);

  // DOCX files can expose additional Office metadata properties such as `characterCount`,
  // `lastModifiedBy`, and `wordCount`. Substitute your own file path via
  // `CONTENTUNDERSTANDING_SAMPLE_DOCX`.
  const docxPath =
    process.env["CONTENTUNDERSTANDING_SAMPLE_DOCX"] ??
    path.join("..", "..", "assets", "sample_metadata.docx");
  await extractMetadata(client, docxPath);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

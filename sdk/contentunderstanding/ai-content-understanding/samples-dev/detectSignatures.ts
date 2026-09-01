// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Detect signatures in a document.
 *
 * Signature detection is available when layout extraction is enabled (`enableLayout` in the
 * analyzer config), including with `prebuilt-layout`. Detected regions are returned as
 * `DocumentSignature` values in `DocumentContent.signatures`.
 *
 * This sample uses a synthetic training acknowledgment (`sample_signature.png`) that contains
 * participant and approver signatures. The names and other details are fake data. You can
 * provide your own image or PDF via the `CONTENTUNDERSTANDING_SIGNATURE_FILE` environment
 * variable.
 *
 * Each `DocumentSignature` includes:
 * - `id`: unique identifier for the signature within the document.
 * - `source`: encoded position that locates the signature in the content.
 * - `span`: offset + length locating the signature reference inside `DocumentContent.markdown`.
 * - `elements`: child elements (for example, paragraphs) within the signature region.
 * - `role`: semantic role of the signature (when the service can determine one).
 *
 * ## How signatures appear in markdown
 *
 * In `DocumentContent.markdown`, each detected signature appears as a Markdown image
 * reference:
 *
 * ```markdown
 * ![John Smith](signatures/1.1)
 * ![MB-](signatures/1.2)
 * ```
 *
 * The image alt text contains text recognized from the signature region. The link
 * target uses `signatures/{id}`, where `{id}` matches the corresponding
 * `DocumentSignature.id`. The signature's `span` identifies the exact offset and
 * length of this image reference in `DocumentContent.markdown`.
 *
 * This sample requires service API version `2026-06-01-preview`.
 *
 * @azsdk-weight 70
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
  console.log("== Detect Signatures Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const filePath =
    process.env["CONTENTUNDERSTANDING_SIGNATURE_FILE"] ??
    path.join("..", "..", "assets", "sample_signature.png");

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  const bytes = fs.readFileSync(filePath);
  console.log(`Analyzing ${filePath} with prebuilt-layout...`);
  console.log(`  File size: ${bytes.length.toLocaleString()} bytes`);

  const poller = client.analyzeBinary("prebuilt-layout", bytes);
  const result = await poller.pollUntilDone();

  const doc = result.contents.find((c) => c.kind === "document") as DocumentContent | undefined;
  if (!doc) {
    console.log("\n(no document content returned)");
    return;
  }

  const signatures = doc.signatures ?? [];
  console.log(`\nFound ${signatures.length} signature(s).`);

  for (const signature of signatures) {
    console.log(`\nSignature ID: ${signature.id}`);
    console.log(`  Role: ${signature.role ?? "(not available)"}`);
    console.log(`  Source: ${signature.source ?? "(not available)"}`);
    if (signature.span) {
      console.log(`  Span: offset=${signature.span.offset}, length=${signature.span.length}`);
      if (doc.markdown) {
        const fragment = doc.markdown.substring(
          signature.span.offset,
          signature.span.offset + signature.span.length,
        );
        console.log(`  Markdown: ${fragment}`);
      }
    }
    if (signature.elements && signature.elements.length > 0) {
      console.log(`  Elements: ${signature.elements.length}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

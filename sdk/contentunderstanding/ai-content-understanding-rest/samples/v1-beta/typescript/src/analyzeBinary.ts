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
 */

import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import {
  ContentUnderstandingClient,
  type DocumentContent,
} from "@azure-rest/ai-content-understanding";

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
  // Helper to get the directory of the current file (works in both ESM and CommonJS)
  const sampleDir = ((): string => {
    if (typeof __dirname !== "undefined") return __dirname;
    if (typeof process !== "undefined" && process.argv && process.argv[1]) {
      return path.dirname(process.argv[1]);
    }
    return path.resolve(process.cwd(), "samples-dev");
  })();
  const filePath = path.resolve(sampleDir, "./example-data", "sample_invoice.pdf");

  if (!fs.existsSync(filePath)) {
    console.error("Error: Sample file not found. Expected file:");
    console.error(`  - ${filePath}`);
    console.error(
      "\nPlease ensure sample_invoice.pdf exists in the sample's example-data directory.",
    );
    process.exit(1);
  }

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
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

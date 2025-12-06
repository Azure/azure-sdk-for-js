// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Analyze a document from a URL using the prebuilt-documentSearch analyzer.
 *
 * This sample demonstrates how to analyze a document from a publicly accessible URL
 * instead of a local file using the prebuilt-documentSearch analyzer.
 *
 * For understanding basic analysis concepts, authentication, and result processing,
 * see analyzeBinary.ts first.
 */

import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import {
  ContentUnderstandingClient,
  type DocumentContent,
} from "@azure-rest/ai-content-understanding";

function getCredential(): DefaultAzureCredential | AzureKeyCredential {
  const key = process.env["AZURE_CONTENT_UNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

export async function main(): Promise<void> {
  console.log("== Analyze URL Sample ==");

  const endpoint = process.env["AZURE_CONTENT_UNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("AZURE_CONTENT_UNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  const documentUrl =
    "https://github.com/Azure-Samples/azure-ai-content-understanding-python/raw/refs/heads/main/data/invoice.pdf";

  console.log("Analyzing document from URL with prebuilt-documentSearch...");
  console.log(`  URL: ${documentUrl}`);

  // Use the analyze method with inputs containing the URL
  const poller = client.analyze("prebuilt-documentSearch", {
    inputs: [{ url: documentUrl }],
  });
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

  // Display document properties
  if (result.contents && result.contents.length > 0) {
    const content = result.contents[0];
    if (content.kind === "document") {
      const documentContent = content as DocumentContent;
      console.log("\nDocument Information:");
      console.log(`  Start page: ${documentContent.startPageNumber}`);
      console.log(`  End page: ${documentContent.endPageNumber}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Delete a custom analyzer.
 *
 * This sample demonstrates how to delete a custom analyzer.
 *
 * The deleteAnalyzer method permanently removes a custom analyzer from your resource.
 * This operation cannot be undone.
 *
 * Important notes:
 * - Only custom analyzers can be deleted. Prebuilt analyzers cannot be deleted.
 * - Deleting an analyzer does not delete analysis results that were created using that analyzer.
 * - Once deleted, the analyzer ID cannot be reused immediately.
 */

import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { ContentUnderstandingClient } from "@azure/ai-content-understanding";
import type { ContentAnalyzer, ContentAnalyzerConfig } from "@azure/ai-content-understanding";

function getCredential(): DefaultAzureCredential | AzureKeyCredential {
  const key = process.env["CONTENTUNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

export async function main(): Promise<void> {
  console.log("== Delete Analyzer Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  // Generate a unique analyzer ID
  const analyzerId = `my_analyzer_${Math.floor(Date.now() / 1000)}`;
  console.log(`Creating analyzer '${analyzerId}'...`);

  // Create a simple analyzer
  const analyzer: ContentAnalyzer = {
    baseAnalyzerId: "prebuilt-document",
    description: "Simple analyzer for deletion example",
    config: { returnDetails: true } as ContentAnalyzerConfig,
    models: { completion: "gpt-4.1" },
  } as unknown as ContentAnalyzer;

  const poller = client.createAnalyzer(analyzerId, analyzer);
  await poller.pollUntilDone();
  console.log(`Analyzer '${analyzerId}' created successfully.`);

  // Delete the analyzer
  console.log(`Deleting analyzer '${analyzerId}'...`);
  await client.deleteAnalyzer(analyzerId);
  console.log(`Analyzer '${analyzerId}' deleted successfully.`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

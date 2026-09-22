// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Copy an analyzer from source to target within the same resource.
 *
 * This sample demonstrates how to copy an analyzer from source to target within the same
 * resource using the copyAnalyzer API. This is useful for creating copies of analyzers
 * for testing, staging, or production deployment.
 *
 * The copyAnalyzer API allows you to copy an analyzer within the same Azure resource:
 * - Same-resource copy: Copies an analyzer from one ID to another within the same resource
 * - Exact copy: The target analyzer is an exact copy of the source analyzer
 * - Use cases: Testing, staging, production deployment, versioning
 *
 * Note: For cross-resource copying (copying between different Azure resources or subscriptions),
 * use the grantCopyAuth sample instead.
 */

import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { ContentUnderstandingClient } from "@azure/ai-content-understanding";
import type {
  ContentAnalyzer,
  ContentAnalyzerConfig,
  ContentFieldSchema,
} from "@azure/ai-content-understanding";

function getCredential(): DefaultAzureCredential | AzureKeyCredential {
  const key = process.env["CONTENTUNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

export async function main(): Promise<void> {
  console.log("== Copy Analyzer Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  const baseId = `my_analyzer_${Math.floor(Date.now() / 1000)}`;
  const sourceAnalyzerId = `${baseId}_source`;
  const targetAnalyzerId = `${baseId}_target`;

  // Step 1: Create the source analyzer
  console.log(`Creating source analyzer '${sourceAnalyzerId}'...`);

  const fieldSchema: ContentFieldSchema = {
    name: "company_schema",
    description: "Schema for extracting company information",
    fields: {
      company_name: {
        type: "string",
        method: "extract",
        description: "Name of the company",
      },
      total_amount: {
        type: "number",
        method: "extract",
        description: "Total amount on the document",
      },
    },
  };

  const config: ContentAnalyzerConfig = {
    enableFormula: false,
    enableLayout: true,
    enableOcr: true,
    estimateFieldSourceAndConfidence: true,
    returnDetails: true,
  };

  const analyzer: ContentAnalyzer = {
    baseAnalyzerId: "prebuilt-document",
    description: "Source analyzer for copying",
    config,
    fieldSchema,
    models: { completion: "gpt-4.1" },
    tags: { modelType: "in_development" },
  } as unknown as ContentAnalyzer;

  const createPoller = client.createAnalyzer(sourceAnalyzerId, analyzer);
  await createPoller.pollUntilDone();
  console.log(`Source analyzer '${sourceAnalyzerId}' created successfully!`);

  // Get the source analyzer to see its description and tags before copying
  const sourceAnalyzerInfo = await client.getAnalyzer(sourceAnalyzerId);
  console.log(`Source analyzer description: ${sourceAnalyzerInfo.description}`);
  if (sourceAnalyzerInfo.tags && Object.keys(sourceAnalyzerInfo.tags).length > 0) {
    const tagsStr = Object.entries(sourceAnalyzerInfo.tags)
      .map(([k, v]) => `${k}=${v}`)
      .join(", ");
    console.log(`Source analyzer tags: ${tagsStr}`);
  }

  // Step 2: Copy the analyzer
  console.log(`\nCopying analyzer from '${sourceAnalyzerId}' to '${targetAnalyzerId}'...`);

  const copyPoller = client.copyAnalyzer(targetAnalyzerId, sourceAnalyzerId);
  await copyPoller.pollUntilDone();

  console.log("Analyzer copied successfully!");

  // Step 3: Get and update the target analyzer
  console.log(`\nGetting target analyzer '${targetAnalyzerId}'...`);
  const targetAnalyzer = await client.getAnalyzer(targetAnalyzerId);

  // Update the target analyzer with a production tag
  const updatedAnalyzer: ContentAnalyzer = {
    baseAnalyzerId: targetAnalyzer.baseAnalyzerId,
    tags: { modelType: "model_in_production" },
  } as unknown as ContentAnalyzer;

  console.log("Updating target analyzer with production tag...");
  await client.updateAnalyzer(targetAnalyzerId, updatedAnalyzer);

  // Verify both analyzers
  console.log("\nVerifying analyzers:");
  const sourceInfo = await client.getAnalyzer(sourceAnalyzerId);
  const targetInfo = await client.getAnalyzer(targetAnalyzerId);

  console.log(`\nSource analyzer: ${sourceAnalyzerId}`);
  console.log(`  Description: ${sourceInfo.description}`);
  if (sourceInfo.tags && Object.keys(sourceInfo.tags).length > 0) {
    const tagsStr = Object.entries(sourceInfo.tags)
      .map(([k, v]) => `${k}=${v}`)
      .join(", ");
    console.log(`  Tags: ${tagsStr}`);
  }

  console.log(`\nTarget analyzer: ${targetAnalyzerId}`);
  console.log(`  Description: ${targetInfo.description}`);
  if (targetInfo.tags && Object.keys(targetInfo.tags).length > 0) {
    const tagsStr = Object.entries(targetInfo.tags)
      .map(([k, v]) => `${k}=${v}`)
      .join(", ");
    console.log(`  Tags: ${tagsStr}`);
  }

  // Clean up - delete both analyzers
  console.log("\nCleaning up...");
  await client.deleteAnalyzer(sourceAnalyzerId);
  console.log(`  Deleted source analyzer: ${sourceAnalyzerId}`);
  await client.deleteAnalyzer(targetAnalyzerId);
  console.log(`  Deleted target analyzer: ${targetAnalyzerId}`);
  console.log("Cleanup complete!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

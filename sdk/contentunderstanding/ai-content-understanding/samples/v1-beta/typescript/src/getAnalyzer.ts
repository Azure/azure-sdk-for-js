// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Retrieve information about analyzers, including prebuilt and custom analyzers.
 *
 * This sample demonstrates how to retrieve information about analyzers, including prebuilt
 * analyzers and custom analyzers.
 *
 * The getAnalyzer method allows you to retrieve detailed information about any analyzer:
 * - Prebuilt analyzers: System-provided analyzers like prebuilt-documentSearch, prebuilt-invoice
 * - Custom analyzers: Analyzers you've created with custom field schemas or classifiers
 *
 * This is useful for:
 * - Verifying analyzer configuration
 * - Inspecting prebuilt analyzers to learn about their capabilities
 * - Debugging analyzer behavior
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
  console.log("== Get Analyzer Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  // Get a prebuilt analyzer
  console.log("Retrieving prebuilt-documentSearch analyzer...");
  const prebuiltAnalyzer = await client.getAnalyzer("prebuilt-documentSearch");

  // Print a few properties from ContentAnalyzer
  console.log(`Analyzer ID: ${prebuiltAnalyzer.analyzerId}`);
  console.log(`Base Analyzer ID: ${prebuiltAnalyzer.baseAnalyzerId}`);
  console.log(`Description: ${prebuiltAnalyzer.description}`);
  console.log(`Enable OCR: ${prebuiltAnalyzer.config?.enableOcr}`);
  console.log(`Enable Layout: ${prebuiltAnalyzer.config?.enableLayout}`);
  console.log(
    `Models: ${Object.entries(prebuiltAnalyzer.models || {})
      .map(([k, v]) => `${k}=${v}`)
      .join(", ")}`,
  );

  // Display full analyzer JSON
  console.log("\n" + "=".repeat(80));
  console.log("Prebuilt-documentSearch Analyzer (Raw JSON):");
  console.log("=".repeat(80));
  console.log(JSON.stringify(prebuiltAnalyzer, null, 2));
  console.log("=".repeat(80));

  // Get information about prebuilt-invoice analyzer
  console.log("\nRetrieving prebuilt-invoice analyzer...");
  const invoiceAnalyzer = await client.getAnalyzer("prebuilt-invoice");

  // Display full analyzer JSON
  console.log("\n" + "=".repeat(80));
  console.log("Prebuilt-invoice Analyzer (Raw JSON):");
  console.log("=".repeat(80));
  console.log(JSON.stringify(invoiceAnalyzer, null, 2));
  console.log("=".repeat(80));

  // First, create a custom analyzer
  const analyzerId = `my_custom_analyzer_${Math.floor(Date.now() / 1000)}`;
  console.log(`\nCreating custom analyzer '${analyzerId}'...`);

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

  const customAnalyzer: ContentAnalyzer = {
    baseAnalyzerId: "prebuilt-document",
    description: "Custom analyzer for extracting company information",
    config: { returnDetails: true } as ContentAnalyzerConfig,
    fieldSchema,
    models: { completion: "gpt-4.1" },
  } as unknown as ContentAnalyzer;

  const poller = client.createAnalyzer(analyzerId, customAnalyzer);
  await poller.pollUntilDone();
  console.log(`Custom analyzer '${analyzerId}' created successfully!`);

  // Now retrieve the custom analyzer
  console.log(`\nRetrieving custom analyzer '${analyzerId}'...`);
  const retrievedAnalyzer = await client.getAnalyzer(analyzerId);

  // Display full analyzer JSON
  console.log("\n" + "=".repeat(80));
  console.log(`Custom Analyzer '${analyzerId}' (Raw JSON):`);
  console.log("=".repeat(80));
  console.log(JSON.stringify(retrievedAnalyzer, null, 2));
  console.log("=".repeat(80));

  // Clean up - delete the analyzer
  console.log(`\nCleaning up: deleting analyzer '${analyzerId}'...`);
  await client.deleteAnalyzer(analyzerId);
  console.log(`Analyzer '${analyzerId}' deleted successfully.`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

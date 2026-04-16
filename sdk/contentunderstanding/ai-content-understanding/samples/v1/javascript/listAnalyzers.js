// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary List all available analyzers in your Microsoft Foundry resource.
 *
 * This sample demonstrates how to list all available analyzers in your Microsoft Foundry
 * resource, including both prebuilt and custom analyzers.
 *
 * The listAnalyzers method returns all analyzers in your resource, including:
 * - Prebuilt analyzers: System-provided analyzers like prebuilt-documentSearch, prebuilt-invoice
 * - Custom analyzers: Analyzers you've created
 *
 * This is useful for:
 * - Discovery: See what analyzers are available in your resource
 * - Management: Get an overview of all your custom analyzers
 * - Debugging: Verify that analyzers were created successfully
 */

require("dotenv/config");
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
  console.log("== List Analyzers Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  console.log("Listing all available analyzers...");

  // List all analyzers
  const analyzers = [];
  for await (const analyzer of client.listAnalyzers()) {
    analyzers.push(analyzer);
  }

  console.log(`\nFound ${analyzers.length} analyzer(s)`);

  // Display summary
  const prebuiltCount = analyzers.filter(
    (a) => a.analyzerId && a.analyzerId.startsWith("prebuilt-"),
  ).length;
  const customCount = analyzers.length - prebuiltCount;
  console.log(`  Prebuilt analyzers: ${prebuiltCount}`);
  console.log(`  Custom analyzers: ${customCount}`);

  // Display details for each analyzer
  console.log("\n" + "=".repeat(60));
  for (const analyzer of analyzers) {
    console.log(`ID: ${analyzer.analyzerId}`);
    console.log(`  Description: ${analyzer.description ?? "(none)"}`);
    console.log(`  Status: ${analyzer.status}`);

    if (analyzer.analyzerId && analyzer.analyzerId.startsWith("prebuilt-")) {
      console.log("  Type: Prebuilt analyzer");
    } else {
      console.log("  Type: Custom analyzer");
    }

    // Show tags if available
    if (analyzer.tags && Object.keys(analyzer.tags).length > 0) {
      const tagsStr = Object.entries(analyzer.tags)
        .map(([k, v]) => `${k}=${v}`)
        .join(", ");
      console.log(`  Tags: ${tagsStr}`);
    }

    console.log();
  }
  console.log("=".repeat(60));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };

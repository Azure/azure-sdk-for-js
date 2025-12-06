// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Grant copy authorization and copy an analyzer between resources.
 *
 * This sample demonstrates how to grant copy authorization and copy an analyzer from a source
 * resource to a target resource (cross-resource copying). This is useful for copying analyzers
 * between different Azure resources or subscriptions.
 *
 * The grantCopyAuthorization and copyAnalyzer APIs allow you to copy an analyzer between
 * different Azure resources:
 * - Cross-resource copy: Copies an analyzer from one Azure resource to another
 * - Authorization required: You must grant copy authorization before copying
 * - Use cases: Cross-subscription copying, resource migration, multi-region deployment
 *
 * Note: For same-resource copying (copying within the same Azure resource), use the
 * copyAnalyzer sample instead.
 */

require("dotenv/config");
const { DefaultAzureCredential } = require("@azure/identity");
const { AzureKeyCredential } = require("@azure/core-auth");
const { ContentUnderstandingClient } = require("@azure-rest/ai-content-understanding");
function getCredential(key) {
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

async function main() {
  console.log("== Grant Copy Auth Sample ==");

  // Check for required environment variables
  const requiredVars = [
    "AZURE_CONTENT_UNDERSTANDING_ENDPOINT",
    "AZURE_CONTENT_UNDERSTANDING_SOURCE_RESOURCE_ID",
    "AZURE_CONTENT_UNDERSTANDING_SOURCE_REGION",
    "AZURE_CONTENT_UNDERSTANDING_TARGET_ENDPOINT",
    "AZURE_CONTENT_UNDERSTANDING_TARGET_RESOURCE_ID",
    "AZURE_CONTENT_UNDERSTANDING_TARGET_REGION",
  ];

  const missingVars = requiredVars.filter((v) => !process.env[v]);
  if (missingVars.length > 0) {
    console.log("Missing required environment variables:");
    for (const v of missingVars) {
      console.log(`  - ${v}`);
    }
    console.log("\nPlease set these environment variables and try again.");
    console.log("\nExample resource ID format:");
    console.log(
      "  /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{name}",
    );
    return;
  }

  // Get source configuration
  const sourceEndpoint = process.env["AZURE_CONTENT_UNDERSTANDING_ENDPOINT"];
  const sourceKey = process.env["AZURE_CONTENT_UNDERSTANDING_KEY"];
  const sourceCredential = getCredential(sourceKey);

  const sourceResourceId = process.env["AZURE_CONTENT_UNDERSTANDING_SOURCE_RESOURCE_ID"];
  const sourceRegion = process.env["AZURE_CONTENT_UNDERSTANDING_SOURCE_REGION"];

  // Get target configuration
  const targetEndpoint = process.env["AZURE_CONTENT_UNDERSTANDING_TARGET_ENDPOINT"];
  const targetKey = process.env["AZURE_CONTENT_UNDERSTANDING_TARGET_KEY"];
  const targetCredential = getCredential(targetKey);

  const targetResourceId = process.env["AZURE_CONTENT_UNDERSTANDING_TARGET_RESOURCE_ID"];
  const targetRegion = process.env["AZURE_CONTENT_UNDERSTANDING_TARGET_REGION"];

  console.log("Configuration:");
  console.log(`  Source endpoint: ${sourceEndpoint}`);
  console.log(`  Source region: ${sourceRegion}`);
  console.log(`  Target endpoint: ${targetEndpoint}`);
  console.log(`  Target region: ${targetRegion}`);

  // Create clients for source and target resources
  const sourceClient = new ContentUnderstandingClient(sourceEndpoint, sourceCredential);
  const targetClient = new ContentUnderstandingClient(targetEndpoint, targetCredential);

  // Generate unique analyzer IDs
  const baseId = `my_analyzer_${Math.floor(Date.now() / 1000)}`;
  const sourceAnalyzerId = `${baseId}_source`;
  const targetAnalyzerId = `${baseId}_target`;

  // Step 1: Create the source analyzer on the source resource
  console.log(`\nStep 1: Creating source analyzer '${sourceAnalyzerId}'...`);

  const fieldSchema = {
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

  const config = {
    enableFormula: false,
    enableLayout: true,
    enableOcr: true,
    estimateFieldSourceAndConfidence: true,
    returnDetails: true,
  };

  const analyzer = {
    baseAnalyzerId: "prebuilt-document",
    description: "Analyzer for cross-resource copying demo",
    config,
    fieldSchema,
    models: { completion: "gpt-4.1" },
    tags: { source: "true" },
  };

  const createPoller = sourceClient.createAnalyzer(sourceAnalyzerId, analyzer);
  await createPoller.pollUntilDone();
  console.log(`Source analyzer '${sourceAnalyzerId}' created successfully!`);

  // Step 2: Grant copy authorization on the source resource
  // The source client grants authorization to copy the source analyzer TO the target resource
  console.log(`\nStep 2: Granting copy authorization from source resource...`);

  const copyAuth = await sourceClient.grantCopyAuthorization(sourceAnalyzerId, targetResourceId, {
    targetRegion: targetRegion,
  });

  console.log("Copy authorization granted!");
  console.log(`  Analyzer ID: ${copyAuth.analyzerId}`);
  console.log(`  Target resource: ${copyAuth.targetAzureResourceId}`);
  console.log(`  Target region: ${targetRegion}`);
  console.log(`  Expires at: ${copyAuth.expiresAt}`);

  // Step 3: Copy the analyzer from source to target
  console.log(`\nStep 3: Copying analyzer from source to target...`);

  const copyPoller = targetClient.copyAnalyzer(targetAnalyzerId, sourceAnalyzerId, {
    sourceAzureResourceId: sourceResourceId,
    sourceRegion: sourceRegion,
  });
  await copyPoller.pollUntilDone();

  console.log("Analyzer copied successfully!");

  // Verify the copy
  const targetInfo = await targetClient.getAnalyzer(targetAnalyzerId);
  console.log(`\nTarget analyzer '${targetAnalyzerId}':`);
  console.log(`  Description: ${targetInfo.description}`);
  console.log(`  Status: ${targetInfo.status}`);
  if (targetInfo.tags && Object.keys(targetInfo.tags).length > 0) {
    const tagsStr = Object.entries(targetInfo.tags)
      .map(([k, v]) => `${k}=${v}`)
      .join(", ");
    console.log(`  Tags: ${tagsStr}`);
  }

  // Clean up - delete both analyzers
  console.log("\nCleaning up...");
  await sourceClient.deleteAnalyzer(sourceAnalyzerId);
  console.log(`  Deleted source analyzer: ${sourceAnalyzerId}`);
  await targetClient.deleteAnalyzer(targetAnalyzerId);
  console.log(`  Deleted target analyzer: ${targetAnalyzerId}`);
  console.log("Cleanup complete!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Grant copy authorization and copy an analyzer between resources.
 *
 * This sample demonstrates how to grant copy authorization and copy an analyzer from a source
 * Microsoft Foundry resource to a target Microsoft Foundry resource (cross-resource copying).
 * This is useful for copying analyzers between different Azure resources or subscriptions.
 *
 * The grantCopyAuthorization and copyAnalyzer APIs allow you to copy an analyzer between
 * different Azure resources:
 * - Cross-resource copy: Copies an analyzer from one Azure resource to another
 * - Authorization required: You must grant copy authorization before copying
 *
 * When to use cross-resource copying:
 * - Copy between subscriptions: Move analyzers between different Azure subscriptions
 * - Multi-region deployment: Deploy the same analyzer to multiple regions
 * - Resource migration: Migrate analyzers from one resource to another
 * - Environment promotion: Promote analyzers from development to production across resources
 *
 * Note: For same-resource copying (copying within the same Microsoft Foundry resource), use the
 * copyAnalyzer sample instead.
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

function getCredential(key: string | undefined): DefaultAzureCredential | AzureKeyCredential {
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

export async function main(): Promise<void> {
  console.log("== Grant Copy Auth Sample ==");

  // Check for required environment variables
  const requiredVars = [
    "CONTENTUNDERSTANDING_ENDPOINT",
    "CONTENTUNDERSTANDING_SOURCE_RESOURCE_ID",
    "CONTENTUNDERSTANDING_SOURCE_REGION",
    "CONTENTUNDERSTANDING_TARGET_ENDPOINT",
    "CONTENTUNDERSTANDING_TARGET_RESOURCE_ID",
    "CONTENTUNDERSTANDING_TARGET_REGION",
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
  const sourceEndpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"]!;
  const sourceKey = process.env["CONTENTUNDERSTANDING_KEY"];
  const sourceCredential = getCredential(sourceKey);

  const sourceResourceId = process.env["CONTENTUNDERSTANDING_SOURCE_RESOURCE_ID"]!;
  const sourceRegion = process.env["CONTENTUNDERSTANDING_SOURCE_REGION"]!;

  // Get target configuration
  const targetEndpoint = process.env["CONTENTUNDERSTANDING_TARGET_ENDPOINT"]!;
  const targetKey = process.env["CONTENTUNDERSTANDING_TARGET_KEY"];
  const targetCredential = getCredential(targetKey);

  const targetResourceId = process.env["CONTENTUNDERSTANDING_TARGET_RESOURCE_ID"]!;
  const targetRegion = process.env["CONTENTUNDERSTANDING_TARGET_REGION"]!;

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
    description: "Analyzer for cross-resource copying demo",
    config,
    fieldSchema,
    models: { completion: "gpt-4.1" },
    tags: { source: "true" },
  } as unknown as ContentAnalyzer;

  const createPoller = sourceClient.createAnalyzer(sourceAnalyzerId, analyzer);
  await createPoller.pollUntilDone();
  console.log(`Source analyzer '${sourceAnalyzerId}' created successfully!`);

  // Step 2: Grant copy authorization on the source resource
  // The grantCopyAuthorization method must be called on the source resource (where the analyzer currently exists).
  // This is because the source resource needs to explicitly grant permission for its analyzer to be copied.
  // The method creates a time-limited authorization record that grants permission to a specific target resource.
  console.log(`\nStep 2: Granting copy authorization from source resource...`);

  const copyAuth = await sourceClient.grantCopyAuthorization(sourceAnalyzerId, targetResourceId, {
    targetRegion: targetRegion,
  });

  console.log("Copy authorization granted!");
  console.log(`  Target resource: ${copyAuth.targetAzureResourceId}`);
  console.log(`  Target region: ${targetRegion}`);
  console.log(`  Expires at: ${copyAuth.expiresAt}`);

  // Step 3: Copy the analyzer from source to target
  // The copyAnalyzer method must be called on the target resource (where the analyzer will be copied to).
  // This is because the target resource is the one receiving and creating the copy.
  // When the target resource calls copyAnalyzer, the service validates that authorization was previously granted by the source resource.
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

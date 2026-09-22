// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Update an existing custom analyzer, including its description and tags.
 *
 * This sample demonstrates how to update an existing custom analyzer, including updating
 * its description and tags.
 *
 * The updateAnalyzer method allows you to modify certain properties of an existing analyzer:
 * - Description: Update the analyzer's description
 * - Tags: Add or update tags
 *
 * Note: Not all analyzer properties can be updated. Field schemas, models, and configuration
 * typically cannot be changed after creation. To change these, you may need to delete and
 * recreate the analyzer.
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
  console.log("== Update Analyzer Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  // Create initial analyzer
  const analyzerId = `my_analyzer_for_update_${Math.floor(Date.now() / 1000)}`;
  console.log(`Creating initial analyzer '${analyzerId}'...`);

  const analyzer = {
    baseAnalyzerId: "prebuilt-document",
    description: "Initial description",
    config: { returnDetails: true },
    fieldSchema: {
      name: "demo_schema",
      description: "Schema for update demo",
      fields: {
        company_name: {
          type: "string",
          method: "extract",
          description: "Name of the company",
        },
      },
    },
    models: { completion: "gpt-4.1" },
    tags: { tag1: "tag1_initial_value" },
  };

  const poller = client.createAnalyzer(analyzerId, analyzer);
  await poller.pollUntilDone();
  console.log(`Analyzer '${analyzerId}' created successfully!`);

  // First, get the current analyzer to preserve base analyzer ID
  const currentAnalyzer = await client.getAnalyzer(analyzerId);

  // Display current analyzer information
  console.log("\nCurrent analyzer information:");
  console.log(`  Description: ${currentAnalyzer.description}`);
  if (currentAnalyzer.tags && Object.keys(currentAnalyzer.tags).length > 0) {
    const tagsStr = Object.entries(currentAnalyzer.tags)
      .map(([k, v]) => `${k}=${v}`)
      .join(", ");
    console.log(`  Tags: ${tagsStr}`);
  }

  // Create an updated analyzer with new description and tags
  const updatedAnalyzer = {
    baseAnalyzerId: currentAnalyzer.baseAnalyzerId,
    description: "Updated description",
    tags: {
      tag1: "tag1_updated_value", // Update existing tag
      tag3: "tag3_value", // Add new tag
    },
  };

  // Update the analyzer
  console.log(`\nUpdating analyzer '${analyzerId}'...`);
  await client.updateAnalyzer(analyzerId, updatedAnalyzer);

  // Verify the update
  const updated = await client.getAnalyzer(analyzerId);
  console.log("\nUpdated analyzer information:");
  console.log(`  Description: ${updated.description}`);
  if (updated.tags && Object.keys(updated.tags).length > 0) {
    const tagsStr = Object.entries(updated.tags)
      .map(([k, v]) => `${k}=${v}`)
      .join(", ");
    console.log(`  Tags: ${tagsStr}`);
  }

  // Clean up - delete the analyzer
  console.log(`\nCleaning up: deleting analyzer '${analyzerId}'...`);
  await client.deleteAnalyzer(analyzerId);
  console.log(`Analyzer '${analyzerId}' deleted successfully.`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };

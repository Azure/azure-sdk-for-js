// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Configure and retrieve default model deployment settings.
 *
 * This sample demonstrates how to configure and retrieve default model deployment settings
 * for your Microsoft Foundry resource. This is a required one-time setup per Microsoft Foundry
 * resource before using prebuilt or custom analyzers.
 *
 * Content Understanding prebuilt analyzers and custom analyzers require specific large language
 * model deployments to function. Currently, Content Understanding uses OpenAI GPT models:
 * - gpt-4.1: Used by most prebuilt analyzers (e.g., prebuilt-invoice, prebuilt-receipt)
 * - gpt-4.1-mini: Used by RAG analyzers (e.g., prebuilt-documentSearch, prebuilt-audioSearch)
 * - text-embedding-3-large: Used for semantic search and embeddings
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
  console.log("== Configure Defaults Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  // Get deployment names from environment variables
  const gpt41Deployment = process.env["GPT_4_1_DEPLOYMENT"];
  const gpt41MiniDeployment = process.env["GPT_4_1_MINI_DEPLOYMENT"];
  const textEmbedding3LargeDeployment = process.env["TEXT_EMBEDDING_3_LARGE_DEPLOYMENT"];

  // Check if required deployments are configured
  const missingDeployments = [];
  if (!gpt41Deployment) {
    missingDeployments.push("GPT_4_1_DEPLOYMENT");
  }
  if (!gpt41MiniDeployment) {
    missingDeployments.push("GPT_4_1_MINI_DEPLOYMENT");
  }
  if (!textEmbedding3LargeDeployment) {
    missingDeployments.push("TEXT_EMBEDDING_3_LARGE_DEPLOYMENT");
  }

  if (missingDeployments.length > 0) {
    console.log("⚠️  Missing required environment variables:");
    for (const deployment of missingDeployments) {
      console.log(`   - ${deployment}`);
    }
    console.log("\nPlease set these environment variables and try again.");
    return;
  }

  // Map your deployed models to the models required by prebuilt analyzers
  const modelDeployments = {
    "gpt-4.1": gpt41Deployment,
    "gpt-4.1-mini": gpt41MiniDeployment,
    "text-embedding-3-large": textEmbedding3LargeDeployment,
  };

  console.log("Configuring model deployments...");
  const updatedDefaults = await client.updateDefaults({
    modelDeployments: { additionalProperties: modelDeployments },
  });

  console.log("Model deployments configured successfully!");
  if (updatedDefaults.modelDeployments) {
    for (const [modelName, deploymentName] of Object.entries(updatedDefaults.modelDeployments)) {
      console.log(`  ${modelName}: ${deploymentName}`);
    }
  }

  // Retrieve current model deployment settings
  console.log("\nRetrieving current model deployment settings...");
  const defaults = await client.getDefaults();

  console.log("\nCurrent model deployment mappings:");
  if (defaults.modelDeployments && Object.keys(defaults.modelDeployments).length > 0) {
    for (const [modelName, deploymentName] of Object.entries(defaults.modelDeployments)) {
      console.log(`  ${modelName}: ${deploymentName}`);
    }
  } else {
    console.log("  No model deployments configured yet.");
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };

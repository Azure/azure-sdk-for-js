// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Configure model deployment defaults.
 *
 * This sample demonstrates how to configure and retrieve default model deployment settings
 * for your Microsoft Foundry resource. This is a **required one-time setup per Microsoft
 * Foundry resource** before using prebuilt or custom analyzers.
 *
 * ## About model deployment configuration
 *
 * Content Understanding prebuilt analyzers and custom analyzers require generative model
 * deployments to function. The recommended models are:
 *
 * - A completion model (e.g. `gpt-5.2`) used by most prebuilt analyzers.
 * - A "mini" completion model (e.g. `gpt-5.2-mini`) used by RAG-style analyzers
 *   (`prebuilt-documentSearch`, `prebuilt-imageSearch`, `prebuilt-audioSearch`,
 *   `prebuilt-videoSearch`). May be the same as the primary completion model.
 * - An embedding model (e.g. `text-embedding-3-large`) used for semantic search and
 *   analyzers with embeddings.
 *
 * Prebuilt analyzers also reference aliases. Configure these even when they map to the
 * same deployments as the concrete model names:
 *
 * - `prebuilt-analyzer-completion` (most prebuilt analyzers)
 * - `prebuilt-analyzer-completion-mini` (`prebuilt-*Search` analyzers)
 * - `prebuilt-analyzer-embedding` (analyzers that require embeddings)
 *
 * This configuration is **per Microsoft Foundry resource** and persists across sessions. You
 * only need to configure it once per Microsoft Foundry resource (or when you change deployment
 * names).
 *
 * The service periodically adds support for more models, including the latest gpt-5.x models
 * such as gpt-5.2, gpt-5.4-mini, gpt-5.5, and others. See the Content Understanding
 * supported generative models documentation
 * (https://learn.microsoft.com/azure/ai-services/content-understanding/service-limits#supported-generative-models)
 * and the Foundry model retirement schedule
 * (https://learn.microsoft.com/azure/foundry/openai/concepts/model-retirement-schedule)
 * for current support and retirement details.
 *
 * Mirrors the Python `sample_update_defaults.py` in `azure-sdk-for-python` (main), so
 * the same env-var names and model dictionary shape work across languages.
 *
 * ## Environment variables
 *
 * - `CONTENTUNDERSTANDING_ENDPOINT` (required) — Content Understanding endpoint.
 * - `CONTENTUNDERSTANDING_KEY` (optional) — API key. When unset, `DefaultAzureCredential`
 *   is used.
 * - `CU_COMPLETION_MODEL` (optional) — completion model name. Defaults to `gpt-5.2`.
 * - `CU_COMPLETION_MODEL_MINI` (optional) — mini completion model name. Defaults to
 *   `CU_COMPLETION_MODEL`.
 * - `CU_COMPLETION_MODEL_DEPLOYMENT` (required) — deployment name for the completion
 *   model in Microsoft Foundry.
 * - `CU_COMPLETION_MINI_DEPLOYMENT` (optional) — deployment name for the mini completion
 *   model. Defaults to `CU_COMPLETION_MODEL_DEPLOYMENT`.
 * - `CU_EMBEDDING_MODEL` (optional) — embedding model name. Defaults to
 *   `text-embedding-3-large`.
 * - `CU_EMBEDDING_DEPLOYMENT` (required) — deployment name for the embedding model
 *   in Microsoft Foundry.
 *
 * @azsdk-weight 100
 */

import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { ContentUnderstandingClient } from "@azure/ai-content-understanding";

function getCredential(): DefaultAzureCredential | AzureKeyCredential {
  const key = process.env["CONTENTUNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

export async function main(): Promise<void> {
  console.log("== Configure Defaults Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  // Get the model name and deployment names from environment variables.
  // The model NAMES have sensible defaults (gpt-5.2, text-embedding-3-large) so a
  // caller only needs to set the DEPLOYMENT names in the common case. The mini
  // completion falls back to the primary completion model / deployment when unset,
  // which lets a caller who deploys only one chat model still run every prebuilt
  // analyzer including the *Search family.
  const completionModel = process.env["CU_COMPLETION_MODEL"] || "gpt-5.2";
  const miniCompletionModel = process.env["CU_COMPLETION_MODEL_MINI"] || completionModel;
  const embeddingModel = process.env["CU_EMBEDDING_MODEL"] || "text-embedding-3-large";
  const completionDeployment = process.env["CU_COMPLETION_MODEL_DEPLOYMENT"];
  const miniCompletionDeployment =
    process.env["CU_COMPLETION_MINI_DEPLOYMENT"] || completionDeployment;
  const embeddingDeployment = process.env["CU_EMBEDDING_DEPLOYMENT"];

  // Check if required deployments are configured
  const missingDeployments: string[] = [];
  if (!completionDeployment) {
    missingDeployments.push("CU_COMPLETION_MODEL_DEPLOYMENT");
  }
  if (!embeddingDeployment) {
    missingDeployments.push("CU_EMBEDDING_DEPLOYMENT");
  }

  if (missingDeployments.length > 0) {
    console.log("⚠️  Missing required environment variables:");
    for (const deployment of missingDeployments) {
      console.log(`   - ${deployment}`);
    }
    console.log("\nPlease set these environment variables and try again.");
    return;
  }

  // Map your deployed models to the models required by prebuilt analyzers.
  // - `completionModel` / `embeddingModel` are the concrete model names the caller
  //   deployed in Foundry (defaulting to gpt-5.2 / text-embedding-3-large).
  // - The three `prebuilt-analyzer-*` aliases are additional keys the service uses
  //   internally when a prebuilt analyzer requests a completion / mini-completion /
  //   embedding model without naming a specific one. Set all three so every
  //   prebuilt analyzer resolves without needing per-resource overrides.
  // - If the user configured a different mini completion model
  //   (`CU_COMPLETION_MODEL_MINI`), add its concrete name too.
  const modelDeployments: Record<string, string> = {
    [completionModel]: completionDeployment!,
    [embeddingModel]: embeddingDeployment!,
    "prebuilt-analyzer-completion": completionDeployment!,
    "prebuilt-analyzer-completion-mini": miniCompletionDeployment!,
    "prebuilt-analyzer-embedding": embeddingDeployment!,
  };
  if (miniCompletionModel !== completionModel) {
    modelDeployments[miniCompletionModel] = miniCompletionDeployment!;
  }

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

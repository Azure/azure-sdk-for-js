// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to <!-- TODO: one-sentence description of what the sample shows -->
 * using the AIProjectClient.
 *
 * @summary <!-- TODO: short summary, one sentence, mirrors the description -->
 * @azsdk-weight 50
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
// Uncomment if the sample exercises a model deployment:
// const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  // TODO: Replace the body below with the feature being demonstrated.
  console.log("Calling <feature>...");
  const result = await project /* TODO: .namespace.operation(...) */;
  console.log("Result:", result);
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});

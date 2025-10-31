// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run a basic responses operation
 * using the OpenAI client.
 *
 * @summary This sample demonstrates how to create responses with
 * and without conversation context.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  // Create OpenAI client with Azure credentials
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = await project.getOpenAIClient();

  console.log("Creating first response...");
  const response = await openAIClient.responses.create({
    model: modelDeploymentName,
    input: "What is the size of France in square miles?",
  });
  console.log(`Response output: ${response.output_text}`);

  console.log("\nCreating second response with context from previous response...");
  const response2 = await openAIClient.responses.create({
    model: modelDeploymentName,
    input: "And what is the capital city?",
    previous_response_id: response.id,
  });
  console.log(`Response output: ${response2.output_text}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

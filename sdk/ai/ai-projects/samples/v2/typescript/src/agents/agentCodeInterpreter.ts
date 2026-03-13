// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the code interpreter tool
 * using the AIProjectClient.
 *
 * @summary This sample demonstrates how to create a response with code interpreter tool
 * to solve mathematical equations.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Create response with code interpreter tool
  console.log("Creating response with code interpreter tool...");
  const response = await openAIClient.responses.create({
    model: deploymentName,
    input: "I need to solve the equation 3x + 11 = 14. Can you help me?",
    tools: [{ type: "code_interpreter", container: { type: "auto" } }],
  });

  console.log(`Response output: ${response.output_text}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a chat completion using the Azure OpenAI client.
 * @summary Given an AIProjectClient, this sample demonstrates how to get an Azure OpenAI client and create a chat completion.
 */

import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const deploymentName = process.env["DEPLOYMENT_GPT_MODEL"] || "<deployment name>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());
  project.enableTelemetry("stdout");
  const client = await project.inference.azureOpenAI({
    // The API version should match the version of the Azure OpenAI resource.
    apiVersion: "2025-01-01-preview",
  });
  const response = await client.chat.completions.create({
    model: deploymentName,
    messages: [
      { role: "system", content: "You are a helpful assistant. You will talk like a pirate." }, // System role not supported for some models
      { role: "user", content: "Tell me a joke?" },
    ],
  });

  console.log("response = ", JSON.stringify(response, null, 2));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run a basic responses operation
 * using the OpenAI client directly, without using AIProjectClient.
 * Instead, we construct the OpenAI client manually with Azure credentials.
 *
 * @summary This sample demonstrates how to create an OpenAI client directly
 * with Azure credentials and use it for a basic responses operation.
 *
 * See also https://platform.openai.com/docs/api-reference/responses/create
 *
 * @azsdk-weight 100
 */

import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import OpenAI from "openai";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  // Create OpenAI client directly using Azure credentials
  const credential = new DefaultAzureCredential();
  const scope = "https://ai.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(credential, scope);

  const openai = new OpenAI({
    apiKey: await azureADTokenProvider(),
    baseURL: `${projectEndpoint.replace(/\/+$/, "")}/openai/v1`,
  });

  // Create a basic response
  console.log("Creating response without AIProjectClient...");
  const response = await openai.responses.create({
    model: deploymentName,
    input: "How many feet are in a mile?",
  });

  console.log(`Response output: ${response.output_text}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

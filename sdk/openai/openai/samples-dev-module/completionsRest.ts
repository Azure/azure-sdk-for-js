// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get completions for the provided prompt.
 *
 * @summary get completions.
 * @azsdk-weight 100
 */

import { AzureKeyCredential } from "@azure/core-auth";
import OpenAIClient, { isUnexpected } from "@azure/openai/rest";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";

const prompt = ["What is Azure OpenAI?"];

export async function main() {
  console.log("== Get completions Sample ==");

  const client = OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = "text-davinci-003";
  const result = await client.path("/deployments/{deploymentId}/completions", deploymentId).post({
    body: { prompt, max_tokens: 128 },
  });

  if (isUnexpected(result)) {
    throw result;
  }

  for (const choice of result.body.choices) {
    console.log(choice.text);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

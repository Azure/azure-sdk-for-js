// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get completions for the provided prompt.
 *
 * @summary get completions.
 * @azsdk-weight 100
 */

import createClient, { AzureKeyCredential, isUnexpected } from "@azure-rest/openai";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";

const prompt = ["What is Azure OpenAI?"];

export async function main() {
  console.log("== Get completions Sample ==");

  const client = createClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentName = "gpt-35-turbo-instruct";
  const response = await client
    .path("/deployments/{deploymentId}/completions", deploymentName)
    .post({
      body: {
        prompt,
        max_tokens: 150,
      },
    });

  if (isUnexpected(response)) {
    throw new Error(`Failed to get completions: ${JSON.stringify(response.body)}`);
  }

  for (const choice of response.body.choices) {
    console.log(choice.text);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

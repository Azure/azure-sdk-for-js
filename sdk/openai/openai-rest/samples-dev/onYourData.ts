// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use Azure's Bring Your Own Data with Azure OpenAI Chat Completions.
 *
 * @summary chat completions with your own data.
 * @azsdk-weight 100
 */

import createClient, { AzureKeyCredential, isUnexpected } from "@azure-rest/openai";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
// The endpoint you will use to access your Azure OpenAI instance
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
// Your Azure OpenAI API key
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";
// Your Azure Cognitive Search endpoint, admin key, and index name
const azureSearchEndpoint = process.env["AZURE_SEARCH_ENDPOINT"] || "<search endpoint>";
const azureSearchAdminKey = process.env["AZURE_SEARCH_KEY"] || "<search key>";
const azureSearchIndexName = process.env["AZURE_SEARCH_INDEX"] || "<search index>";

const messages = [
  {
    role: "user",
    content: "What's the most common feedback we received from our customers about the product?",
  } as const,
];

export async function main() {
  console.log("== Bring Your Own Data Sample ==");

  const client = createClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentName = "gpt-35-turbo";
  const response = await client
    .path("/deployments/{deploymentId}/chat/completions", deploymentName)
    .post({
      body: {
        messages,
        data_sources: [
          {
            type: "azure_search",
            parameters: {
              endpoint: azureSearchEndpoint,
              authentication: { key: azureSearchAdminKey, type: "api_key" },
              index_name: azureSearchIndexName,
            },
          },
        ],
      },
    });
  if (isUnexpected(response)) {
    throw new Error(`Failed to get chat completions: ${JSON.stringify(response.body)}`);
  }

  for (const choice of response.body.choices) {
    console.log(choice.message);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

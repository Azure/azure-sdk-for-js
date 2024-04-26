// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use Azure's Bring Your Own Data with Azure OpenAI Chat Completions.
 *
 * @summary chat completions with your own data.
 * @azsdk-weight 100
 */

import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

// Load the .env file if it exists
import * as dotenv from "dotenv";
import { parseOpenAIError } from "./parseOpenAIError.js";
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

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = "gpt-35-turbo";
  const events = await client.streamChatCompletions(deploymentId, messages, {
    maxTokens: 128,
    /**
     * The `azureExtensionOptions` property is used to configure the
     * Azure-specific extensions. In this case, we are using the
     * Azure Cognitive Search extension with a vector index to provide
     * the model with additional context.
     */
    azureExtensionOptions: {
      extensions: [
        {
          type: "azure_search",
          endpoint: azureSearchEndpoint,
          indexName: azureSearchIndexName,
          authentication: {
            type: "api_key",
            key: azureSearchAdminKey,
          },
        },
      ],
    },
  });

  for await (const event of events) {
    for (const choice of event.choices) {
      console.log(choice.delta?.content);
    }
  }
}

main().catch((err) => {
  parseOpenAIError(err);
});

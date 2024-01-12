// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use Azure's Bring Your Own Data with Azure OpenAI Chat Completions.
 *
 * @summary chat completions with your own data.
 */

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

// Load the .env file if it exists
require("dotenv").config();

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
  },
];

async function main() {
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
          type: "AzureCognitiveSearch",
          endpoint: azureSearchEndpoint,
          key: azureSearchAdminKey,
          indexName: azureSearchIndexName,
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
  console.error("The sample encountered an error:", err);
});

module.exports = { main };

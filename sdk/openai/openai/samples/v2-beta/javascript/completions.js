// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get completions for the provided prompt.
 *
 * @summary get completions.
 */

const { AzureOpenAI } = require("openai");
const { DefaultAzureCredential, getBearerTokenProvider } = require("@azure/identity");

// Set AZURE_OPENAI_ENDPOINT to the endpoint of your
// OpenAI resource. You can find this in the Azure portal.
// Load the .env file if it exists
require("dotenv/config");

const prompt = ["What is Azure OpenAI?"];

async function main() {
  console.log("== Get completions Sample ==");

  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "text-davinci-003";
  const apiVersion = "2024-09-01-preview";
  const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });
  const result = await client.completions.create({ prompt, model: "", max_tokens: 128 });

  for (const choice of result.choices) {
    console.log(choice.text);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };

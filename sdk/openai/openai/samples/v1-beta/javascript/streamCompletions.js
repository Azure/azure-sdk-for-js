// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to list completions for the provided prompt.
 *
 * @summary list completions.
 */

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

// Load the .env file if it exists
const dotenv = require("dotenv");
const { parseOpenAIError } = require("./parseOpenAIError.js");
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";

const prompt = ["What is Azure OpenAI?"];

async function main() {
  console.log("== Stream Completions Sample ==");

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = "text-davinci-003";
  const events = await client.streamCompletions(deploymentId, prompt, { maxTokens: 128 });

  for await (const event of events) {
    for (const choice of event.choices) {
      console.log(choice.text);
    }
  }
}

main().catch((err) => {
  parseOpenAIError(err);
});

module.exports = { main };

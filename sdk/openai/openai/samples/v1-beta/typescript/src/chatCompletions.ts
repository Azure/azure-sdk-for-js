// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get chat completions for a chat context.
 *
 * @summary get chat completions.
 */

import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

// Load the .env file if it exists
import * as dotenv from "dotenv";
import { parseOpenAIError } from "./parseOpenAIError.js";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";

export async function main() {
  console.log("== Chat Completions Sample ==");

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = "gpt-35-turbo";
  const result = await client.getChatCompletions(deploymentId, [
    { role: "system", content: "You are a helpful assistant. You will talk like a pirate." },
    { role: "user", content: "Can you help me?" },
    { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
    { role: "user", content: "What's the best way to train a parrot?" },
  ]);

  for (const choice of result.choices) {
    console.log(choice.message);
  }
}

main().catch((err) => {
  parseOpenAIError(err)
});


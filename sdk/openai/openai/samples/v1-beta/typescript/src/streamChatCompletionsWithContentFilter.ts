// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get completions for the provided prompt and parse output for content filter
 *
 * @summary get completions.
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
  console.log("== Get completions Sample ==");

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = "gpt-35-turbo";
  const events = await client.streamChatCompletions(
    deploymentId,
    [
      { role: "system", content: "You are a helpful assistant. You will talk like a pirate." },
      { role: "user", content: "Can you help me?" },
      { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
      { role: "user", content: "What's the best way to train a parrot?" },
    ],
    { maxTokens: 128 },
  );

  for await (const event of events) {
    for (const choice of event.choices) {
      console.log(choice.message);
      if (!choice.contentFilterResults) {
        console.log("No content filter is found");
        return;
      }
      if (choice.contentFilterResults.error) {
        console.log(
          `Content filter ran into the error ${choice.contentFilterResults.error.code}: ${choice.contentFilterResults.error.message}`,
        );
      } else {
        const { hate, sexual, selfHarm, violence } = choice.contentFilterResults;
        console.log(`Hate category is filtered: ${hate?.filtered} with ${hate?.severity} severity`);
        console.log(
          `Sexual category is filtered: ${sexual?.filtered} with ${sexual?.severity} severity`,
        );
        console.log(
          `Self-harm category is filtered: ${selfHarm?.filtered} with ${selfHarm?.severity} severity`,
        );
        console.log(
          `Violence category is filtered: ${violence?.filtered} with ${violence?.severity} severity`,
        );
      }
    }
  }
}

main().catch((err) => {
  parseOpenAIError(err)
});

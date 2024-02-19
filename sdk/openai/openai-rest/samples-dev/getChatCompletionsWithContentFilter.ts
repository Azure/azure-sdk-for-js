// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get completions for the provided prompt and parse output for content filter
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

export async function main() {
  console.log("== Get completions Sample ==");

  const client = createClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = "gpt-35-turbo";
  const response = await client
    .path("/deployments/{deploymentId}/chat/completions", deploymentId)
    .post({
      body: {
        messages: [
          { role: "system", content: "You are a helpful assistant. You will talk like a pirate." },
          { role: "user", content: "Can you help me?" },
          { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
          { role: "user", content: "What's the best way to train a parrot?" },
        ],
        max_tokens: 128,
      },
    });

  if (isUnexpected(response)) {
    throw new Error(`Failed to get chat completions: ${JSON.stringify(response.body)}`);
  }

  for (const choice of response.body.choices) {
    console.log(choice.message);
    if (!choice.content_filter_results) {
      console.log("No content filter is found");
      return;
    }
    if (choice.content_filter_results.error) {
      console.log(
        `Content filter ran into the error ${choice.content_filter_results.error.code}: ${choice.content_filter_results.error.message}`,
      );
    } else {
      const { hate, sexual, self_harm, violence, profanity } = choice.content_filter_results;
      console.log(`Hate category is filtered: ${hate?.filtered} with ${hate?.severity} severity`);
      console.log(
        `Sexual category is filtered: ${sexual?.filtered} with ${sexual?.severity} severity`,
      );
      console.log(
        `Self-harm category is filtered: ${self_harm?.filtered} with ${self_harm?.severity} severity`,
      );
      console.log(
        `Violence category is filtered: ${violence?.filtered} with ${violence?.severity} severity`,
      );
      console.log(
        `Profanity category is detected:  ${profanity?.detected} and filtered: ${profanity?.filtered}`,
      );
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to define and call functions with chat completions.
 *
 * @summary get chat completions with functions.
 * @azsdk-weight 100
 */

import createClient, { AzureKeyCredential, isUnexpected } from "@azure-rest/openai";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";

const getCurrentWeather = {
  name: "get_current_weather",
  description: "Get the current weather in a given location",
  parameters: {
    type: "object",
    properties: {
      location: {
        type: "string",
        description: "The city and state, e.g. San Francisco, CA",
      },
      unit: {
        type: "string",
        enum: ["celsius", "fahrenheit"],
      },
    },
    required: ["location"],
  },
};

export async function main() {
  console.log("== Chat Completions Sample With Functions ==");

  const client = createClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentName = "gpt-4-0613";
  const response = await client
    .path("/deployments/{deploymentId}/chat/completions", deploymentName)
    .post({
      body: {
        messages: [{ role: "user", content: "What's the weather like in Boston?" }],
        functions: [getCurrentWeather],
      },
    });

  if (isUnexpected(response)) {
    throw new Error(`Failed to get chat completions: ${JSON.stringify(response.body)}`);
  }

  for (const choice of response.body.choices) {
    console.log(choice.message?.function_call);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to define and call functions with chat completions.
 *
 * @summary get chat completions with functions.
 */

import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

// Load the .env file if it exists
import * as dotenv from "dotenv";
import { parseOpenAIError } from "./parseOpenAIError.js";
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

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = "gpt-4";
  const result = await client.getChatCompletions(
    deploymentId,
    [{ role: "user", content: "What's the weather like in Boston?" }],
    {
      tools: [
        {
          type: "function",
          function: getCurrentWeather,
        },
      ],
    },
  );

  for (const choice of result.choices) {
    console.log(choice.message?.toolCalls);
  }
}

main().catch((err) => {
  parseOpenAIError(err)
});

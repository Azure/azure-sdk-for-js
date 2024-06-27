// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to define and call functions with chat completions.
 *
 * @summary get chat completions with functions.
 */

const ModelClient = require("@azure-rest/ai-inference").default,
  { isUnexpected } = require("@azure-rest/ai-inference");
const { AzureKeyCredential } = require("@azure/core-auth");

// Load the .env file if it exists
require("dotenv").config();

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

async function main() {
  console.log("== Chat Completions Sample With Functions ==");

  const client = new ModelClient(endpoint, new AzureKeyCredential(azureApiKey));
  const response = await client.path("/chat/completions").post({
    body: {
      messages: [{ role: "user", content: "What's the weather like in Boston?" }],
      tools: [
        {
          type: "function",
          function: getCurrentWeather,
        },
      ],
    },
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  for (const choice of response.body.choices) {
    console.log(choice.message.tool_calls);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };

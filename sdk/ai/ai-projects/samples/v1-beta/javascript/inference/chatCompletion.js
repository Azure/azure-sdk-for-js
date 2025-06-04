// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the chat completions API to get a response from a chat model.
 * @summary Given an AIProjectClient, this sample demonstrates how to get a response from a chat model.
 * Get the chat completions for the provided chat messages.
 */

const { AIProjectClient } = require("@azure/ai-projects");
const { isUnexpected } = require("@azure/ai-projects/inference");
const { DefaultAzureCredential } = require("@azure/identity");
const { createRestError } = require("@azure-rest/core-client");
require("dotenv/config");

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const deploymentName = process.env["DEPLOYMENT_NAME"] || "<deployment name>";

async function main() {
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential({}));
  const client = project.inference.chatCompletions({
    apiVersion: "2024-05-01-preview",
  });
  const response = await client.post({
    body: {
      model: deploymentName,
      messages: [
        { role: "system", content: "You are a helpful assistant. You will talk like a pirate." }, // System role not supported for some models
        { role: "user", content: "How many feet are in a mile?" },
      ],
    },
  });

  console.log("response = ", JSON.stringify(response, null, 2));
  if (isUnexpected(response)) {
    throw createRestError(
      `chatCompletions failed with unexpected statusCode ${response.status}`,
      response,
    );
  }
  console.log(response.body.choices[0].message.content);
}
main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };

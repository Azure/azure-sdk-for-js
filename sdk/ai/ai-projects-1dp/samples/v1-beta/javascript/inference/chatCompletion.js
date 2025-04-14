// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the chat completions API to get a response from a chat model.
 * @summary Given an AIProjectClient, this sample demonstrates how to get a response from a chat model.
 * Get the chat completions for the provided chat messages.
 */

const { AIProjectClient } = require("@azure/ai-projects-1dp");
const { isUnexpected } = require("@azure-rest/ai-inference");
const { AzureKeyCredential } = require("@azure/core-auth");

require("dotenv").config();

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const apiKey = process.env["AZURE_AI_PROJECT_API_KEY"] || "<project key>";
const deploymentName = process.env["DEPLOYMENT_NAME"] || "<deployment name>";

async function main() {
  const project = new AIProjectClient(endpoint, new AzureKeyCredential(apiKey));
  const client = project.inference.chatCompletions();
  const response = await client.post({
    body: {
      model: deploymentName,
      messages: [
        { role: "system", content: "You are a helpful assistant. You will talk like a pirate." }, // System role not supported for some models
        { role: "user", content: "How many feet are in a mile?" },
      ],
    },
  });

  console.log("response = ", response);
  if (isUnexpected(response)) {
    throw response.body.error;
  }
  console.log(response.body.choices[0].message.content);
}
main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };

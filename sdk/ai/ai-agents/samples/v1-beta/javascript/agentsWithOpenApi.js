// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with an OpenApi tool.
 *
 * @summary demonstrates how to use agent operations with an OpenApi tool.
 */

const { AgentsClient, isOutputOfType, ToolUtility } = require("@azure/ai-agents");
const { DefaultAzureCredential } = require("@azure/identity");
const fs = require("fs");
require("dotenv/config");

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

async function main() {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  // Read in OpenApi spec
  const filePath = "./data/weatherOpenApi.json";
  const openApiSpec = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Define OpenApi function
  const openApiFunction = {
    name: "getWeather",
    spec: openApiSpec,
    description: "Retrieve weather information for a location",
    auth: {
      type: "anonymous",
    },
    default_params: ["format"], // optional
  };

  // Create OpenApi tool
  const openApiTool = ToolUtility.createOpenApiTool(openApiFunction);

  // Create agent with OpenApi tool
  const agent = await client.createAgent(modelDeploymentName, {
    name: "myAgent",
    instructions: "You are a helpful agent",
    tools: [openApiTool.definition],
  });
  console.log(`Created agent, agent ID: ${agent.id}`);

  // Create a thread
  const thread = await client.threads.create();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create a message
  const message = await client.messages.create(thread.id, "user", "What's the weather in Seattle?");
  console.log(`Created message, message ID: ${message.id}`);

  // Create and poll a run
  console.log("Creating run...");
  const run = await client.runs.createAndPoll(thread.id, agent.id, {
    pollingOptions: {
      intervalInMs: 2000,
    },
    onResponse: (response) => {
      console.log(`Received response with status: ${response.parsedBody.status}`);
    },
  });
  console.log(`Run finished with status: ${run.status}`);
  // Get most recent message from the assistant
  const messagesIterator = client.messages.list(thread.id);
  for await (const m of messagesIterator) {
    if (m.role === "assistant") {
      const textContent = m.content?.find((content) => isOutputOfType(content, "text"));
      if (textContent) {
        console.log(`Last message: ${textContent.text.value}`);
      }
      break;
    }
  }
  // Delete the agent once done
  await client.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };

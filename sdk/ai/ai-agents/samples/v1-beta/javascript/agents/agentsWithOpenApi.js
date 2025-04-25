// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with an OpenApi tool.
 *
 * @summary demonstrates how to use agent operations with an OpenApi tool.
 */

const { AgentsClient, isOutputOfType, ToolUtility } = require("@azure/ai-agents");
const { delay } = require("@azure/core-util");
const { DefaultAzureCredential } = require("@azure/identity");
const fs = require("fs");
require("dotenv/config");

const connectionString = process.env["PROJECT_ENDPOINT"] || "<project connection string>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

async function main() {
  // Create an Azure AI Client
  const client = new AgentsClient(connectionString, new DefaultAzureCredential());

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
  const thread = await client.createThread();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create a message
  const message = await client.createMessage(thread.id, "user", "What's the weather in Seattle?");
  console.log(`Created message, message ID: ${message.id}`);

  // Create and execute a run
  let run = await client.createRun(thread.id, agent.id);
  while (run.status === "queued" || run.status === "in_progress") {
    await delay(1000);
    run = await client.getRun(thread.id, run.id);
  }
  if (run.status === "failed") {
    // Check if you got "Rate limit is exceeded.", then you want to get more quota
    console.log(`Run failed: ${run.lastError}`);
  }
  console.log(`Run finished with status: ${run.status}`);

  // Get most recent message from the assistant
  const messages = await client.listMessages(thread.id);
  const assistantMessage = messages.data.find((msg) => msg.role === "assistant");
  if (assistantMessage) {
    const textContent = assistantMessage.content.find((content) => isOutputOfType(content, "text"));
    if (textContent) {
      console.log(`Last message: ${textContent.text.value}`);
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

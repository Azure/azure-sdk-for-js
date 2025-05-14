// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 *  This sample demonstrates how to use agent operations with the Sharepoint tool from the Azure Agents service.
 *
 * @summary demonstrates how to use agent operations with the Sharepoint tool.
 */

const {
  AgentsClient,
  ToolUtility,
  connectionToolType,
  isOutputOfType,
} = require("@azure/ai-agents");
const { delay } = require("@azure/core-util");
const { DefaultAzureCredential } = require("@azure/identity");

require("dotenv").config();

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project connection string>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

async function main() {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  // Initialize agent Sharepoint tool with the connection id
  const sharepointTool = ToolUtility.createSharepointGroundingTool(
    connectionToolType.SharepointGrounding,
  );

  // Create agent with the Sharepoint tool and process assistant run
  const agent = await client.createAgent(modelDeploymentName, {
    name: "my-agent",
    instructions: "You are a helpful agent",
    tools: [sharepointTool.definition],
  });
  console.log(`Created agent, agent ID : ${agent.id}`);

  // Create thread for communication
  const thread = await client.threads.create();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create message to thread
  const message = await client.messages.create(
    thread.id,
    "user",
    "Hello, tell me about my health insurance options",
  );
  console.log(`Created message, message ID: ${message.id}`);

  // Create and process agent run in thread with tools
  let run = await client.runs.create(thread.id, agent.id);
  while (run.status === "queued" || run.status === "in_progress") {
    await delay(1000);
    run = await client.runs.get(thread.id, run.id);
  }
  if (run.status === "failed") {
    console.log(`Run failed: ${run.lastError}`);
  }
  console.log(`Run finished with status: ${run.status}`);

  // Delete the assistant when done
  client.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);

  // Fetch and log all messages
  const messagesIterator = await client.messages.list(thread.id);
  console.log(`Messages:`);
  // Get the first message
  for await (const m of messagesIterator) {
    const agentMessage = message.content[0];
    if (isOutputOfType(agentMessage, "text")) {
      const textContent = agentMessage;
      console.log(`Text Message Content - ${textContent.text.value}`);
    }
    break; // Only process the first message
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };

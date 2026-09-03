// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run basic Prompt Agent operations
 * using an existing configured agent endpoint in the default project.
 *
 * @summary This sample demonstrates how to reuse an existing agent endpoint
 * from the default project, create a conversation, and generate responses.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_DEFAULT_ENDPOINT"] || "<project endpoint>";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "MyAgent";

async function main() {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const agent = await project.agents.get(agentName);
  if (!agent.agent_endpoint) {
    throw new Error(
      `Agent "${agentName}" does not have an agent endpoint configured. ` +
        "Configure the existing agent endpoint before running this sample; " +
        "use agent_reference instead when creating a new agent.",
    );
  }
  console.log(`Using existing agent endpoint (name: ${agent.name})`);

  const openAIClient = project.getOpenAIClient({
    azureConfig: { allowPreview: true, agentName },
  });

  // Create conversation with initial user message
  console.log("\nCreating conversation with initial user message...");
  const conversation = await openAIClient.conversations.create({
    items: [
      { type: "message", role: "user", content: "What is the size of France in square miles?" },
    ],
  });
  console.log(`Created conversation with initial user message (id: ${conversation.id})`);

  // Generate response using the agent
  console.log("\nGenerating response...");
  const franceResponse = await openAIClient.responses.create({
    conversation: conversation.id,
  });
  console.log(`Response output: ${franceResponse.output_text}`);

  // Add a second user message to the conversation
  console.log("\nAdding a second user message to the conversation...");
  await openAIClient.conversations.items.create(conversation.id, {
    items: [{ type: "message", role: "user", content: "And what is the capital city?" }],
  });
  console.log("Added a second user message to the conversation");

  // Generate second response
  console.log("\nGenerating second response...");
  const capitalResponse = await openAIClient.responses.create({
    conversation: conversation.id,
  });
  console.log(`Response output: ${capitalResponse.output_text}`);

  // Clean up
  console.log("\nCleaning up resources...");
  await openAIClient.conversations.delete(conversation.id);
  console.log("Conversation deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };

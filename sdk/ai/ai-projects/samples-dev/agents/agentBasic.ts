// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run basic Prompt Agent operations
 * using the AIProjectClient.
 *
 * @summary This sample demonstrates how to create an agent, create a conversation,
 * generate responses using the agent, and clean up resources.
 *
 * @azsdk-weight 100
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = await project.getOpenAIClient();

  // Create agent
  console.log("Creating agent...");
  const agent = await project.agents.createVersion("MyAgent", {
    kind: "prompt",
    model: modelDeploymentName,
    instructions: "You are a helpful assistant that answers general questions",
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Create conversation with initial user message
  console.log("\nCreating conversation with initial user message...");
  const conversation = await openAIClient.conversations.create({
    items: [{ type: "message", role: "user", content: "What is the size of France in square miles?" }],
  });
  console.log(`Created conversation with initial user message (id: ${conversation.id})`);

  // Generate response using the agent
  console.log("\nGenerating response...");
  const response = await openAIClient.responses.create({
    conversation: conversation.id,
    input: [{ role: "user", content: "", type: "message"}], // TODO: Remove 'input' once service is fixed
  }, {
    body: { agent: { name: agent.name, type: "agent_reference" } },
  });
  console.log(`Response output: ${response.output_text}`);

  // Add a second user message to the conversation
  console.log("\nAdding a second user message to the conversation...");
  await openAIClient.conversations.items.create(conversation.id, {
    items: [{ type: "message", role: "user", content: "And what is the capital city?" }],
  });
  console.log("Added a second user message to the conversation");

  // Generate second response
  console.log("\nGenerating second response...");
  const response2 = await openAIClient.responses.create({
    conversation: conversation.id,
    input: [{ role: "user", content: "", type: "message" }], // TODO: Remove 'input' once service is fixed
  }, {
    body: { agent: { name: agent.name, type: "agent_reference" } },
  });
  console.log(`Response output: ${response2.output_text}`);

  // Clean up
  console.log("\nCleaning up resources...");
  await openAIClient.conversations.delete(conversation.id);
  console.log("Conversation deleted");

  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

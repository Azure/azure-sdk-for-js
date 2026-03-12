// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run basic Prompt Agent operations
 * using the AIProjectClient with streaming responses.
 *
 * @summary This sample demonstrates how to create an agent, create a conversation,
 * and stream responses using the agent with event handling.
 *
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Create agent
  console.log("Creating agent...");
  const agent = await project.agents.createVersion("MyAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions: "You are a helpful assistant that answers general questions",
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Create conversation with initial user message
  console.log("\nCreating conversation with initial user message...");
  const conversation = await openAIClient.conversations.create({
    items: [{ type: "message", role: "user", content: "Tell me about the capital city of France" }],
  });
  console.log(`Created conversation with initial user message (id: ${conversation.id})`);

  // Generate streaming response using the agent
  console.log("\nGenerating streaming response...");
  const stream = openAIClient.responses.stream(
    {
      conversation: conversation.id,
    },
    {
      body: { agent: { name: agent.name, type: "agent_reference" } },
    },
  );

  // Process streaming events as they arrive
  for await (const event of stream) {
    if (event.type === "response.created") {
      console.log(`Stream response created with ID: ${event.response.id}\n`);
    } else if (event.type === "response.output_text.delta") {
      process.stdout.write(event.delta);
    } else if (event.type === "response.output_text.done") {
      console.log(`\n\nResponse text done. Access final text in 'event.text'`);
    } else if (event.type === "response.completed") {
      console.log(`\nResponse completed. Access final text in 'event.response.output_text'`);
    }
  }

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

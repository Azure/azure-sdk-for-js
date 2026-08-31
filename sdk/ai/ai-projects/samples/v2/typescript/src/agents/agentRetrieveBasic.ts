// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run basic Prompt Agent retrieve operations.
 * It first creates an Agent version and a conversation as prerequisites, then
 * demonstrates retrieve/get operations against those created resources.
 *
 * @summary This sample demonstrates how to create an agent and conversation,
 * then retrieve them and generate a response.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "MyAgent";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  // Create the prerequisite agent version.
  console.log("Creating agent...");
  const created = await project.agents.createVersion(agentName, {
    kind: "prompt",
    model: deploymentName,
    instructions: "You are a helpful assistant.",
  });
  console.log(
    `Agent created (id: ${created.id}, name: ${created.name}, version: ${created.version})`,
  );

  const openAIClient = project.getOpenAIClient();

  try {
    // Retrieve the agent.
    const agent = await project.agents.get(agentName);
    console.log(`Agent retrieved (id: ${agent.id}, name: ${agent.name})`);

    // Create the prerequisite conversation.
    let conversation = await openAIClient.conversations.create();
    console.log(`Conversation created (id: ${conversation.id})`);

    try {
      // Retrieve the prerequisite conversation.
      conversation = await openAIClient.conversations.retrieve(conversation.id);
      console.log(`Retrieved conversation (id: ${conversation.id})`);

      // Add a new user text message to the conversation.
      await openAIClient.conversations.items.create(conversation.id, {
        items: [{ type: "message", role: "user", content: "How many feet are in a mile?" }],
      });
      console.log("Added a user message to the conversation");

      const response = await openAIClient.responses.create(
        {
          conversation: conversation.id,
        },
        {
          body: { agent_reference: { name: created.name, type: "agent_reference" } },
        },
      );
      console.log(`Response output: ${response.output_text}`);
    } finally {
      // Clean up conversation.
      await openAIClient.conversations.delete(conversation.id);
      console.log("Conversation deleted");
    }
  } finally {
    await project.agents.deleteVersion(created.name, created.version);
    console.log("Agent deleted");
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

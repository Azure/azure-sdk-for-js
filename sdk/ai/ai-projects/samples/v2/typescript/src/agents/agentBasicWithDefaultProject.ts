// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run basic Prompt Agent operations
 * using the AIProjectClient.
 *
 * @summary This sample demonstrates how to create an agent, create a conversation,
 * generate responses using the agent, and clean up resources.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";
import { withAgentVersionEndpoint } from "./agentEndpointUtils.js";

const projectEndpoint = process.env["FOUNDRY_PROJECT_DEFAULT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "MyAgent";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  await withAgentVersionEndpoint(
    project,
    agentName,
    {
      kind: "prompt",
      model: deploymentName,
      instructions: "You are a helpful assistant that answers general questions",
    },
    async (agent) => {
      console.log(
        `Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`,
      );
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
    },
  );
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

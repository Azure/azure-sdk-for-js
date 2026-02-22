// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run Prompt Agent operations using the Web Search Tool.
 *
 * @summary This sample demonstrates how to create an agent with web search capabilities,
 * send a query to search the web, and clean up resources.
 * 
 * @warning Web Search tool uses Grounding with Bing, which has additional costs and terms: [terms of use](https://www.microsoft.com/bing/apis/grounding-legal-enterprise) and [privacy statement](https://go.microsoft.com/fwlink/?LinkId=521839&clcid=0x409). Customer data will flow outside the Azure compliance boundary. Learn more [here](https://learn.microsoft.com/en-us/azure/ai-foundry/agents/how-to/tools/web-search?view=foundry&pivots=rest-api).
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = await project.getOpenAIClient();

  console.log("Creating agent with web search tool...");

  // Create Agent with web search tool
  const agent = await project.agents.createVersion("agent-web-search", {
    kind: "prompt",
    model: deploymentName,
    instructions: "You are a helpful assistant that can search the web",
    tools: [
      {
        type: "web_search_preview",
        user_location: {
          type: "approximate",
          country: "GB",
          city: "London",
          region: "London",
        },
      },
    ],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Create a conversation for the agent interaction
  const conversation = await openAIClient.conversations.create();
  console.log(`Created conversation (id: ${conversation.id})`);

  // Send a query to search the web
  console.log("\nSending web search query...");
  const response = await openAIClient.responses.create(
    {
      conversation: conversation.id,
      input: "Show me the latest London Underground service updates",
    },
    {
      body: { agent: { name: agent.name, type: "agent_reference" } },
    },
  );
  console.log(`Response: ${response.output_text}`);

  // Clean up resources
  console.log("\nCleaning up resources...");
  await openAIClient.conversations.delete(conversation.id);
  console.log("Conversation deleted");

  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");

  console.log("\nWeb search sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

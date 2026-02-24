// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the Web Search Tool with streaming responses.
 * It combines web search capabilities with response streaming to provide real-time
 * search results from the web.
 *
 * @summary This sample demonstrates how to create an agent with web search capabilities,
 * send queries to search the web, and stream responses that include web search results.
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

  console.log("Setting up web search with streaming responses...");

  // Create agent with web search tool
  const agent = await project.agents.createVersion("StreamingWebSearchAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions:
      "You are a helpful assistant that can search the web and provide detailed responses. Use the web search tool to find relevant information before answering.",
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

  console.log("\n" + "=".repeat(60));
  console.log("Starting web search with streaming response...");
  console.log("=".repeat(60));

  // Create a streaming response with web search capabilities
  const stream = openAIClient.responses.stream(
    {
      conversation: conversation.id,
      input: [
        {
          role: "user",
          content:
            "Show me the latest London Underground service updates and any planned engineering works.",
          type: "message",
        },
      ],
    },
    {
      body: { agent: { name: agent.name, type: "agent_reference" } },
    },
  );

  console.log("Processing streaming web search results...\n");

  // Process streaming events as they arrive
  for await (const event of stream) {
    if (event.type === "response.created") {
      console.log(`Stream response created with ID: ${event.response.id}`);
    } else if (event.type === "response.output_text.delta") {
      process.stdout.write(event.delta);
    } else if (event.type === "response.output_text.done") {
      console.log(`\n\nResponse done with full message: ${event.text}`);
    } else if (event.type === "response.completed") {
      console.log(`\nResponse completed!`);
      console.log(`Full response: ${event.response.output_text}`);
    }
  }

  // Clean up resources
  console.log("\n" + "=".repeat(60));
  console.log("Cleaning up resources...");
  console.log("=".repeat(60));

  // Delete the conversation
  await openAIClient.conversations.delete(conversation.id);
  console.log("Conversation deleted");

  // Delete the agent
  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");

  console.log("\nWeb search streaming sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

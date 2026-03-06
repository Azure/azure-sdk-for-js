// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an AI agent with Azure AI Search capabilities
 * using the AzureAISearchTool and synchronous Azure AI Projects client. The agent can search
 * indexed content and provide responses with citations from search results.
 *
 * @summary This sample demonstrates how to create an agent with Azure AI Search tool capabilities,
 * send queries to search indexed content, and process streaming responses with citations.
 *
 * @azsdk-weight 100
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import * as readline from "readline";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";
const aiSearchConnectionId =
  process.env["AZURE_AI_SEARCH_CONNECTION_ID"] || "<ai search project connection id>";
const aiSearchIndexName = process.env["AI_SEARCH_INDEX_NAME"] || "<ai search index name>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  console.log("Creating agent with Azure AI Search tool...");

  // Define Azure AI Search tool that searches indexed content
  const agent = await project.agents.createVersion("MyAISearchAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions:
      "You are a helpful assistant. You must always provide citations for answers using the tool and render them as: `[message_idx:search_idx†source]`.",
    tools: [
      {
        type: "azure_ai_search",
        azure_ai_search: {
          indexes: [
            {
              project_connection_id: aiSearchConnectionId,
              index_name: aiSearchIndexName,
              query_type: "simple",
            },
          ],
        },
      },
    ],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Prompt user for input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const userInput = await new Promise<string>((resolve) => {
    rl.question(
      "Enter your question for the AI Search agent available in the index (Default: 'Tell me about the mental health services available from Premera'): \n",
      (answer) => {
        rl.close();
        resolve(answer);
      },
    );
  });

  console.log("\nSending request to AI Search agent with streaming...");
  const streamResponse = await openAIClient.responses.create(
    {
      input: userInput || "Tell me about the mental health services available from Premera",
      stream: true,
    },
    {
      body: {
        agent: { name: agent.name, type: "agent_reference" },
        tool_choice: "required",
      },
    },
  );

  // Process the streaming response
  for await (const event of streamResponse) {
    if (event.type === "response.created") {
      console.log(`Follow-up response created with ID: ${event.response.id}`);
    } else if (event.type === "response.output_text.delta") {
      process.stdout.write(event.delta);
    } else if (event.type === "response.output_text.done") {
      console.log("\n\nFollow-up response done!");
    } else if (event.type === "response.output_item.done") {
      if (event.item.type === "message") {
        const item = event.item;
        if (item.content && item.content.length > 0) {
          const lastContent = item.content[item.content.length - 1];
          if (lastContent.type === "output_text" && lastContent.annotations) {
            for (const annotation of lastContent.annotations) {
              if (annotation.type === "url_citation") {
                console.log(
                  `URL Citation: ${annotation.url}, Start index: ${annotation.start_index}, End index: ${annotation.end_index}`,
                );
              }
            }
          }
        }
      }
    } else if (event.type === "response.completed") {
      console.log("\nFollow-up completed!");
    }
  }

  // Clean up resources by deleting the agent version
  // This prevents accumulation of unused resources in your project
  console.log("\nCleaning up resources...");
  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");

  console.log("\nAzure AI Search agent sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

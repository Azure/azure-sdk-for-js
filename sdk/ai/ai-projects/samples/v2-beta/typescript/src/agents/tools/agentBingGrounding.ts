// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an AI agent with Bing grounding capabilities
 * using the "bing_grounding" tool type and synchronous Azure AI Projects client. The agent can search
 * the web for current information and provide grounded responses with URL citations.
 *
 * @summary This sample demonstrates how to create an agent with Bing grounding tool capabilities,
 * search the web for current information, and process streaming responses with source citations.
 * 
 * @warning Grounding with Bing Search tool uses Grounding with Bing, which has additional costs and terms: [terms of use](https://www.microsoft.com/bing/apis/grounding-legal-enterprise) and [privacy statement](https://go.microsoft.com/fwlink/?LinkId=521839&clcid=0x409). Customer data will flow outside the Azure compliance boundary. Learn more [here](https://learn.microsoft.com/en-us/azure/ai-foundry/agents/how-to/tools/bing-tools?view=foundry&pivots=rest-api).
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";
const bingProjectConnectionId =
  process.env["BING_PROJECT_CONNECTION_ID"] || "<bing project connection id>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = await project.getOpenAIClient();

  console.log("Creating agent with Bing grounding tool...");

  const agent = await project.agents.createVersion("MyBingGroundingAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions: "You are a helpful assistant.",
    tools: [
      {
        type: "bing_grounding",
        bing_grounding: {
          search_configurations: [
            {
              project_connection_id: bingProjectConnectionId,
            },
          ],
        },
      },
    ],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Send request that requires current information from the web
  console.log("\nSending request to Bing grounding agent with streaming...");
  const streamResponse = await openAIClient.responses.create(
    {
      input: "What is today's date and weather in Seattle?",
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

  console.log("\nBing grounding agent sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

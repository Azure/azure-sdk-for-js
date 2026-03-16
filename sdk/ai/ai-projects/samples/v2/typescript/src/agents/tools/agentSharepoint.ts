// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an AI agent with SharePoint capabilities
 * using the SharepointPreviewTool and synchronous Azure AI Projects client. The agent can search
 * SharePoint content and provide responses with relevant information from SharePoint sites.
 *
 * @summary This sample demonstrates how to create an agent with SharePoint tool capabilities,
 * search SharePoint content, and process streaming responses with citations.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";
const sharepointProjectConnectionId =
  process.env["SHAREPOINT_PROJECT_CONNECTION_ID"] || "<sharepoint project connection id>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  console.log("Creating agent with SharePoint tool...");

  const agent = await project.agents.createVersion("MyAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions:
      "You are a helpful agent that can use SharePoint tools to assist users. Use the available SharePoint tools to answer questions and perform tasks.",
    // Define SharePoint tool that searches SharePoint content
    tools: [
      {
        type: "sharepoint_grounding_preview",
        sharepoint_grounding_preview: {
          project_connections: [
            {
              project_connection_id: sharepointProjectConnectionId,
            },
          ],
        },
      },
    ],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Send initial request that will trigger the SharePoint tool
  console.log("\nSending request to SharePoint agent with streaming...");
  const streamResponse = await openAIClient.responses.create(
    {
      input: "Please summarize the last meeting notes stored in SharePoint.",
      stream: true,
    },
    {
      body: {
        agent: { name: agent.name, type: "agent_reference" },
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

  console.log("\nSharePoint agent sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

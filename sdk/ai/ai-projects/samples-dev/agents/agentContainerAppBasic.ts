// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run a basic container app agent operations
 * using the agents openAIClient.
 *
 * @summary demonstrates how to use basic container app agent operations.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";

import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const containerAppResourceId =
  process.env["CONTAINER_APP_RESOURCE_ID"] || "<container app resource id>";
const ingressSubdomainSuffix =
  process.env["CONTAINER_INGRESS_SUBDOMAIN_SUFFIX"] || "<ingress subdomain suffix>";
async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();
  const agentsClient = project.agents;

  const agent = await agentsClient.createVersion(
    "container-app-agent",
    {
      kind: "container_app",
      container_protocol_versions: [
        {
          protocol: "responses",
          version: "1",
        },
      ],
      container_app_resource_id: containerAppResourceId,
      ingress_subdomain_suffix: ingressSubdomainSuffix,
    },
    {
      foundryFeatures: "ContainerAgents=V1Preview",
    },
  );

  console.log("Created agent id:", agent.id, "version:", agent.version, "name:", agent.name);
  // Create a conversation with an initial user message
  const conversation = await openAIClient.conversations.create({
    items: [
      {
        type: "message",
        role: "user",
        content: "What is the size of France in square miles?",
      },
    ],
  });

  console.log("Created conversation id:", conversation.id);
  // Create a response from the agent for the conversation
  const response = await openAIClient.responses.create(
    {
      conversation: conversation.id,
    },
    {
      body: {
        agent: {
          type: "agent_reference",
          name: agent.name,
        },
      },
    },
  );

  response.output.forEach((out) => {
    if ("role" in out && out.role === "assistant" && out?.type === "message") {
      if ("content" in out) {
        console.log("Created response id:", response.id, "output:", out.content);
      }
    }
  });

  // Add a follow-up user message to the conversation
  await openAIClient.conversations.items.create(conversation.id, {
    items: [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "And what is the capital city?" }],
      },
    ],
  });

  console.log("Added follow-up user message to conversation.");

  const response2 = await openAIClient.responses.create(
    {
      conversation: conversation.id,
    },
    {
      body: {
        agent: {
          type: "agent_reference",
          name: agent.name,
        },
      },
    },
  );

  if ("output" in response2 && Array.isArray(response2.output)) {
    response2.output.forEach((out) => {
      if ("role" in out && out.role === "assistant" && out?.type === "message") {
        if ("content" in out) {
          console.log("Created follow-up response id:", response2.id, "output:", out.content);
        }
      }
    });
  }

  // delete the conversation
  await openAIClient.conversations.delete(conversation.id);
  console.log("Deleted conversation:", conversation.id);
  // delete the agent version
  await agentsClient.deleteVersion(agent.name, agent.version);
  console.log("Deleted agent version:", agent.name, agent.version);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});

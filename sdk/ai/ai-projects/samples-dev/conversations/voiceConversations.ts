// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Read persisted voice conversations for an existing voice agent.
 * Set FOUNDRY_AGENT_NAME to an agent with completed voice sessions and store=true.
 * This sample reads metadata and item identifiers without logging transcripts or audio.
 *
 * @summary List persisted voice conversations and inspect their response and item metadata.
 * @azsdk-weight 50
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

export async function main(): Promise<void> {
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"];
  const agentName = process.env["FOUNDRY_AGENT_NAME"];
  if (!projectEndpoint || !agentName) {
    throw new Error(
      "Set FOUNDRY_PROJECT_ENDPOINT and FOUNDRY_AGENT_NAME to an existing voice agent.",
    );
  }
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  console.log("Listing persisted voice conversations...");
  for await (const conversation of project.agentEndpointConversations.listAgentConversations(
    agentName,
  )) {
    console.log(`Conversation ${conversation.id}: ${conversation.status}`);
    for await (const response of project.agentEndpointConversations.listAgentConversationResponses(
      agentName,
      conversation.id,
    )) {
      console.log(`Response: ${response.id}`);
    }
    let itemCount = 0;
    for await (const _item of project.agentEndpointConversations.listAgentConversationItems(
      agentName,
      conversation.id,
    )) {
      itemCount++;
    }
    console.log(`Stored conversation items: ${itemCount}`);
  }
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});

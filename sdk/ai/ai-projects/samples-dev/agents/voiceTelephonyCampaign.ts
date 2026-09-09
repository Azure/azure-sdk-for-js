// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Create, inspect, and cancel a draft outbound voice campaign.
 * Requires an existing voice agent and active telephony binding. The sample never
 * imports recipients or publishes the campaign, so it does not dispatch phone calls.
 * The canceled campaign remains available as a durable service record.
 *
 * @summary Inspect voice-agent bindings and manage a draft outbound telephony campaign.
 * @azsdk-weight 50
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

export async function main(): Promise<void> {
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"];
  const agentName = process.env["FOUNDRY_AGENT_NAME"];
  const bindingId = process.env["FOUNDRY_TELEPHONY_BINDING_ID"];
  if (!projectEndpoint || !agentName || !bindingId) {
    throw new Error(
      "Set FOUNDRY_PROJECT_ENDPOINT, FOUNDRY_AGENT_NAME, and FOUNDRY_TELEPHONY_BINDING_ID.",
    );
  }
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const options = { foundryFeatures: "VoiceAgents=V1Preview" as const };
  console.log("Listing the voice agent's telephony bindings...");
  for await (const binding of project.agents.listTelephonyBindings(agentName, options)) {
    console.log(`Binding: ${binding.id}`);
  }

  console.log("Creating a draft campaign without recipients...");
  const campaign = await project.agentTelephony.createTelephonyCampaign(
    agentName,
    {
      display_name: "SDK draft campaign sample",
      telephony_binding_id: bindingId,
    },
    options,
  );
  try {
    const retrieved = await project.agentTelephony.getTelephonyCampaign(
      agentName,
      campaign.id,
      options,
    );
    console.log(`Campaign ${retrieved.id}: ${retrieved.configuration_status}`);
  } finally {
    console.log("Canceling the draft campaign; no phone calls were dispatched...");
    await project.agentTelephony.cancelTelephonyCampaign(agentName, campaign.id, options);
  }
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});

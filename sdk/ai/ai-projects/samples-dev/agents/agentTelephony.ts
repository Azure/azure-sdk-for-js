// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to inspect a voice agent's telephony configuration and call history.
 *
 * @summary List telephony bindings, read transfer target names, and inspect call lifecycle status.
 * @azsdk-weight 50
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

export async function main(): Promise<void> {
  // Set these values in .env for an existing voice agent with telephony configured.
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"];
  const agentName = process.env["FOUNDRY_AGENT_NAME"];
  if (!projectEndpoint || !agentName) {
    throw new Error(
      "Set FOUNDRY_PROJECT_ENDPOINT and FOUNDRY_AGENT_NAME before running this sample.",
    );
  }
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const options = { foundryFeatures: "VoiceAgents=V1Preview" } as const;

  console.log("Listing telephony bindings...");
  for await (const binding of project.beta.agents.listTelephonyBindings(agentName, options)) {
    const details = await project.beta.agents.getTelephonyBinding(agentName, binding.id, options);
    // Avoid logging phone numbers, webhook URLs, or caller information.
    console.log(`Binding provider: ${details.provider}, status: ${details.status}`);
  }

  console.log("Reading configured transfer targets...");
  const targets = await project.beta.agents.getTelephonyTransferTargets(agentName, options);
  console.log(
    "Transfer target names:",
    targets.transfer_targets.map((target) => target.name),
  );

  console.log("Reading the most recent page of call history...");
  const pages = project.beta.agents
    .listTelephonyCalls(agentName, { ...options, order: "desc", limit: 5 })
    .byPage();
  const firstPage = await pages.next();
  for (const call of firstPage.value ?? []) {
    const details = await project.beta.agents.getTelephonyCall(agentName, call.id, options);
    console.log(`Call status: ${details.status}, phase: ${details.phase}`);
    console.log(`Lifecycle events: ${details.events.length}`);
  }
  // Read-only: this sample does not place, transfer, end, or record calls.
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});

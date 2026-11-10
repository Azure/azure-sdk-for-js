// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Inspect a voice agent's telephony bindings, transfer targets, and recent calls.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

async function main() {
  // Use an existing voice agent with telephony configured.
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"]?.trim();
  const agentName = process.env["FOUNDRY_AGENT_NAME"]?.trim();
  if (!projectEndpoint || !agentName) {
    throw new Error(
      "Set FOUNDRY_PROJECT_ENDPOINT and FOUNDRY_AGENT_NAME before running this sample.",
    );
  }
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  // This sample only reads configuration and history; it does not place or change calls.
  console.log("Listing telephony bindings...");
  for await (const binding of project.voiceAgents.telephony.listBindings(agentName)) {
    const details = await project.voiceAgents.telephony.getBinding(agentName, binding.id);
    // Avoid logging phone numbers, webhook URLs, or caller information.
    console.log(`Binding provider: ${details.provider}`);
  }

  console.log("Reading configured transfer targets...");
  const targets = await project.voiceAgents.telephony.getTransferTargets(agentName);
  console.log(
    "Transfer target names:",
    targets.transfer_targets.map((target) => target.name),
  );

  console.log("Reading up to five recent calls...");
  const pages = project.voiceAgents.telephony
    .listCalls(agentName, { order: "desc", limit: 5 })
    .byPage();
  const firstPage = await pages.next();
  for (const call of firstPage.value ?? []) {
    const details = await project.voiceAgents.telephony.getCall(agentName, call.id);
    console.log(`Call status: ${details.status}, phase: ${details.phase}`);
    console.log(`Lifecycle events: ${details.events.length}`);
  }
}

main().catch((error) => {
  console.error("Sample failed:", error);
  process.exitCode = 1;
});

module.exports = { main };

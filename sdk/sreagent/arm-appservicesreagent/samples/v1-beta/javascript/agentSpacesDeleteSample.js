// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppClient } = require("@azure/arm-appservicesreagent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an Agent Space
 *
 * @summary delete an Agent Space
 * x-ms-original-file: 2026-01-01/AgentSpaces_Delete.json
 */
async function agentSpacesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  await client.agentSpaces.delete("examplerg", "testAgentSpace");
}

async function main() {
  await agentSpacesDelete();
}

main().catch(console.error);

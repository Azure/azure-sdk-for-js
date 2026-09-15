// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppClient } = require("@azure/arm-appservicesreagent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the properties of an Agent Space
 *
 * @summary get the properties of an Agent Space
 * x-ms-original-file: 2026-01-01/AgentSpaces_Get.json
 */
async function agentSpacesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  const result = await client.agentSpaces.get("examplerg", "testAgentSpace");
  console.log(result);
}

async function main() {
  await agentSpacesGet();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppClient } = require("@azure/arm-appservicesreagent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update Agent's properties
 *
 * @summary update Agent's properties
 * x-ms-original-file: 2026-01-01/Agents_Update.json
 */
async function agentsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  const result = await client.agents.update("examplerg", "testAgent", {
    tags: { environment: "production", version: "v3.0" },
    properties: { upgradeChannel: "Stable" },
  });
  console.log(result);
}

async function main() {
  await agentsUpdate();
}

main().catch(console.error);

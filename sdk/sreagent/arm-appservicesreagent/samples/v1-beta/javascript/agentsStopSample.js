// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppClient } = require("@azure/arm-appservicesreagent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stop an Agent
 *
 * @summary stop an Agent
 * x-ms-original-file: 2026-01-01/Agents_Stop.json
 */
async function agentsStop() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  const result = await client.agents.stop("examplerg", "testAgent");
  console.log(result);
}

async function main() {
  await agentsStop();
}

main().catch(console.error);

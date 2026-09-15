// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppClient } = require("@azure/arm-appservicesreagent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the properties of an Agent Connector
 *
 * @summary get the properties of an Agent Connector
 * x-ms-original-file: 2026-01-01/AgentsConnectors_Get.json
 */
async function agentsConnectorsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  const result = await client.agentsConnectors.get("examplerg", "testAgent", "kusto-connector");
  console.log(result);
}

async function main() {
  await agentsConnectorsGet();
}

main().catch(console.error);

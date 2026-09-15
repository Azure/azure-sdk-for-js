// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppClient } = require("@azure/arm-appservicesreagent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an Agent Connector
 *
 * @summary delete an Agent Connector
 * x-ms-original-file: 2026-01-01/AgentsConnectors_Delete.json
 */
async function agentsConnectorsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  await client.agentsConnectors.delete("examplerg", "testAgent", "sql-connector");
}

async function main() {
  await agentsConnectorsDelete();
}

main().catch(console.error);

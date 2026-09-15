// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppClient } = require("@azure/arm-appservicesreagent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all Data Connectors with secrets from an Agent
 *
 * @summary list all Data Connectors with secrets from an Agent
 * x-ms-original-file: 2026-01-01/AgentsConnectors_ListWithSecretsByAgent.json
 */
async function agentsConnectorsListWithSecretsByAgent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  const result = await client.agentsConnectors.listWithSecretsByAgent("examplerg", "testAgent");
  console.log(result);
}

async function main() {
  await agentsConnectorsListWithSecretsByAgent();
}

main().catch(console.error);

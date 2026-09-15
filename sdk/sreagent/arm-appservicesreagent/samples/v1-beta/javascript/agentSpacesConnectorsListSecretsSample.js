// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppClient } = require("@azure/arm-appservicesreagent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list secrets for an Agent Space Connector
 *
 * @summary list secrets for an Agent Space Connector
 * x-ms-original-file: 2026-01-01/AgentSpacesConnectors_ListSecrets.json
 */
async function agentSpacesConnectorsListSecrets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  const result = await client.agentSpacesConnectors.listSecrets(
    "examplerg",
    "testAgentSpace",
    "shared-sql-connector",
  );
  console.log(result);
}

async function main() {
  await agentSpacesConnectorsListSecrets();
}

main().catch(console.error);

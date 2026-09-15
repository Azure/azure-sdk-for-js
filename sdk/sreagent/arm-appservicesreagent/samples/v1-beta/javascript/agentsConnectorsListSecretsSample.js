// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppClient } = require("@azure/arm-appservicesreagent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Data Connector with secrets from an Agent
 *
 * @summary get a Data Connector with secrets from an Agent
 * x-ms-original-file: 2026-01-01/AgentsConnectors_ListSecrets.json
 */
async function agentsConnectorsListSecrets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  const result = await client.agentsConnectors.listSecrets(
    "examplerg",
    "testAgent",
    "kusto-connector",
  );
  console.log(result);
}

async function main() {
  await agentsConnectorsListSecrets();
}

main().catch(console.error);

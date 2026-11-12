// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of connections.
 *
 * @summary get a list of connections.
 * x-ms-original-file: 2026-11-01/Connections_ListAll.json
 */
async function getAListOfConnections() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connections.listAll("exampleRG", "exampleWorkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAListOfConnections();
}

main().catch(console.error);

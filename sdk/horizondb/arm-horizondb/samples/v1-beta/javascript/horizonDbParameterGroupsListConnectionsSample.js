// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all connections to a parameter group.
 *
 * @summary gets all connections to a parameter group.
 * x-ms-original-file: 2026-01-20-preview/ParameterGroups_ListConnections.json
 */
async function listConnectionsForAHorizonDbParameterGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.horizonDbParameterGroups.listConnections(
    "exampleresourcegroup",
    "exampleparametergroup",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listConnectionsForAHorizonDbParameterGroup();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all HorizonDb pools in a cluster.
 *
 * @summary lists all HorizonDb pools in a cluster.
 * x-ms-original-file: 2026-01-20-preview/Pools_List.json
 */
async function listHorizonDbPoolsInACluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.horizonDbPools.list("exampleresourcegroup", "examplecluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listHorizonDbPoolsInACluster();
}

main().catch(console.error);

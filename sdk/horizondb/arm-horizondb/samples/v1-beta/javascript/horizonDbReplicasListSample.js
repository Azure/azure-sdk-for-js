// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all HorizonDb replicas in a pool.
 *
 * @summary lists all HorizonDb replicas in a pool.
 * x-ms-original-file: 2026-01-20-preview/Replicas_List.json
 */
async function listHorizonDbReplicasInAPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.horizonDbReplicas.list(
    "exampleresourcegroup",
    "examplecluster",
    "examplepool",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listHorizonDbReplicasInAPool();
}

main().catch(console.error);

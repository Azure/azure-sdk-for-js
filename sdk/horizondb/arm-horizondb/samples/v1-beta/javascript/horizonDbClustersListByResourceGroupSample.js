// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all HorizonDB clusters in a resource group.
 *
 * @summary lists all HorizonDB clusters in a resource group.
 * x-ms-original-file: 2026-05-01-preview/Clusters_ListByResourceGroup.json
 */
async function listHorizonDBClustersInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.horizonDbClusters.listByResourceGroup("exampleresourcegroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listHorizonDBClustersInAResourceGroup();
}

main().catch(console.error);

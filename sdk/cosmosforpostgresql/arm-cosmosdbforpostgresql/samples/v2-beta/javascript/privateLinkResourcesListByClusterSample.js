// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBForPostgreSQL } = require("@azure/arm-cosmosdbforpostgresql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private link resources for cluster.
 *
 * @summary gets the private link resources for cluster.
 * x-ms-original-file: 2023-03-02-preview/PrivateLinkResourceListByCluster.json
 */
async function getsThePrivateLinkResourcesForCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResources.listByCluster(
    "TestResourceGroup",
    "testcluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsThePrivateLinkResourcesForCluster();
}

main().catch(console.error);

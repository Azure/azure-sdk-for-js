// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBForPostgreSQL } = require("@azure/arm-cosmosdbforpostgresql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a cluster together with servers in it.
 *
 * @summary deletes a cluster together with servers in it.
 * x-ms-original-file: 2023-03-02-preview/ClusterDelete.json
 */
async function deleteTheCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  await client.clusters.delete("TestGroup", "testcluster");
}

async function main() {
  await deleteTheCluster();
}

main().catch(console.error);

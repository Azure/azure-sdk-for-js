// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MongoClusterManagementClient } = require("@azure/arm-mongocluster");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list DocumentDB cluster connection strings. This includes the default connection string using SCRAM-SHA-256, as well as other connection strings supported by the cluster.
 *
 * @summary list DocumentDB cluster connection strings. This includes the default connection string using SCRAM-SHA-256, as well as other connection strings supported by the cluster.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_ListConnectionStrings.json
 */
async function listTheAvailableConnectionStringsForTheDocumentDBClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.listConnectionStrings("TestGroup", "myMongoCluster");
  console.log(result);
}

async function main() {
  await listTheAvailableConnectionStringsForTheDocumentDBClusterResource();
}

main().catch(console.error);

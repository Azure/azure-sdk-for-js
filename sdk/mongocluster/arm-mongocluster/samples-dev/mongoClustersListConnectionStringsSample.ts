// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list mongo cluster connection strings. This includes the default connection string using SCRAM-SHA-256, as well as other connection strings supported by the cluster.
 *
 * @summary list mongo cluster connection strings. This includes the default connection string using SCRAM-SHA-256, as well as other connection strings supported by the cluster.
 * x-ms-original-file: 2025-07-01-preview/MongoClusters_ListConnectionStrings.json
 */

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

async function listTheAvailableConnectionStringsForTheMongoClusterResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.listConnectionStrings("TestGroup", "myMongoCluster");
  console.log(result);
}

async function main(): Promise<void> {
  await listTheAvailableConnectionStringsForTheMongoClusterResource();
}

main().catch(console.error);

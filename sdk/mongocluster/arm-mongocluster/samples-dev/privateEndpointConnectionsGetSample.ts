// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a specific private connection
 *
 * @summary get a specific private connection
 * x-ms-original-file: 2024-10-01-preview/MongoClusters_PrivateEndpointConnectionGet.json
 */
async function getAPrivateEndpointConnectionOnAMongoClusterResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "TestGroup",
    "myMongoCluster",
    "pecTest.5d393f64-ef64-46d0-9959-308321c44ac0",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAPrivateEndpointConnectionOnAMongoClusterResource();
}

main().catch(console.error);

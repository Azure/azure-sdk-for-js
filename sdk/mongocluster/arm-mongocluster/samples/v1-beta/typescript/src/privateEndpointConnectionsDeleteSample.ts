// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the private endpoint connection
 *
 * @summary delete the private endpoint connection
 * x-ms-original-file: 2024-07-01/MongoClusters_PrivateEndpointConnectionDelete.json
 */
async function deleteAPrivateEndpointConnectionOnAMongoClusterResource(): void {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.delete(
    "TestGroup",
    "myMongoCluster",
    "pecTest.5d393f64-ef64-46d0-9959-308321c44ac0",
  );
  console.log(result);
}

async function main() {
  deleteAPrivateEndpointConnectionOnAMongoClusterResource();
}

main().catch(console.error);

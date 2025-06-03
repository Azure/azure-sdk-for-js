// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Private endpoint connection
 *
 * @summary create a Private endpoint connection
 * x-ms-original-file: 2024-10-01-preview/MongoClusters_PrivateEndpointConnectionPut.json
 */
async function approvesAPrivateEndpointConnectionOnAMongoClusterResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.create(
    "TestGroup",
    "myMongoCluster",
    "pecTest",
    {
      properties: {
        privateLinkServiceConnectionState: {
          status: "Approved",
          description: "Auto-Approved",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await approvesAPrivateEndpointConnectionOnAMongoClusterResource();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list existing private connections
 *
 * @summary list existing private connections
 * x-ms-original-file: 2025-07-01-preview/MongoClusters_PrivateEndpointConnectionList.json
 */

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

async function listsThePrivateEndpointConnectionResourcesOnAMongoClusterResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.listByMongoCluster(
    "TestGroup",
    "myMongoCluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsThePrivateEndpointConnectionResourcesOnAMongoClusterResource();
}

main().catch(console.error);

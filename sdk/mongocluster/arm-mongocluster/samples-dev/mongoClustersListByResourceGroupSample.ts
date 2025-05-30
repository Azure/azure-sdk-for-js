// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all the mongo clusters in a given resource group.
 *
 * @summary list all the mongo clusters in a given resource group.
 * x-ms-original-file: 2024-10-01-preview/MongoClusters_ListByResourceGroup.json
 */
async function listsTheMongoClusterResourcesInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.mongoClusters.listByResourceGroup("TestResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsTheMongoClusterResourcesInAResourceGroup();
}

main().catch(console.error);

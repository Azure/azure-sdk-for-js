// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all the mongo clusters in a given resource group.
 *
 * @summary list all the mongo clusters in a given resource group.
 * x-ms-original-file: 2024-07-01/MongoClusters_ListByResourceGroup.json
 */
async function listsTheMongoClusterResourcesInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.mongoClusters.listByResourceGroup("TestResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  listsTheMongoClusterResourcesInAResourceGroup();
}

main().catch(console.error);

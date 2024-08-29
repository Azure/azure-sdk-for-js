// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list private links on the given resource
 *
 * @summary list private links on the given resource
 * x-ms-original-file: 2024-07-01/MongoClusters_PrivateLinkResourceList.json
 */
async function listsThePrivateLinkResourcesAvailableOnAMongoClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.privateLinks.listByMongoCluster("TestGroup", "myMongoCluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  listsThePrivateLinkResourcesAvailableOnAMongoClusterResource();
}

main().catch(console.error);

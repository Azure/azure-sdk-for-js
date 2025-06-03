// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MongoClusterManagementClient } = require("@azure/arm-mongocluster");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list private links on the given resource
 *
 * @summary list private links on the given resource
 * x-ms-original-file: 2024-10-01-preview/MongoClusters_PrivateLinkResourceList.json
 */
async function listsThePrivateLinkResourcesAvailableOnAMongoClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinks.listByMongoCluster("TestGroup", "myMongoCluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsThePrivateLinkResourcesAvailableOnAMongoClusterResource();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MongoClusterManagementClient } = require("@azure/arm-mongocluster");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the mongo clusters in a given subscription.
 *
 * @summary list all the mongo clusters in a given subscription.
 * x-ms-original-file: 2024-10-01-preview/MongoClusters_List.json
 */
async function listsTheMongoClusterResourcesInASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.mongoClusters.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsTheMongoClusterResourcesInASubscription();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of restore point collections in the subscription. Use nextLink property in the response to get the next page of restore point collections. Do this till nextLink is not null to fetch all the restore point collections.
 *
 * @summary gets the list of restore point collections in the subscription. Use nextLink property in the response to get the next page of restore point collections. Do this till nextLink is not null to fetch all the restore point collections.
 * x-ms-original-file: 2025-04-01/restorePointExamples/RestorePointCollection_ListBySubscription.json
 */
async function getsTheListOfRestorePointCollectionsInASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.restorePointCollections.listAll()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheListOfRestorePointCollectionsInASubscription();
}

main().catch(console.error);

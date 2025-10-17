// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of restore point collections in a resource group.
 *
 * @summary gets the list of restore point collections in a resource group.
 * x-ms-original-file: 2025-04-01/restorePointExamples/RestorePointCollection_ListByResourceGroup.json
 */
async function getsTheListOfRestorePointCollectionsInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.restorePointCollections.list("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheListOfRestorePointCollectionsInAResourceGroup();
}

main().catch(console.error);

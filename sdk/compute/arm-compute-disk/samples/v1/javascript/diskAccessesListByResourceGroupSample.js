// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-disk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the disk access resources under a resource group.
 *
 * @summary lists all the disk access resources under a resource group.
 * x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_ListByResourceGroup.json
 */
async function listAllDiskAccessResourcesInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diskAccesses.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllDiskAccessResourcesInAResourceGroup();
}

main().catch(console.error);

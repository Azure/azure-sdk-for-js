// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-disk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the disks under a resource group.
 *
 * @summary lists all the disks under a resource group.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_ListByResourceGroup.json
 */
async function listAllManagedDisksInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.disks.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllManagedDisksInAResourceGroup();
}

main().catch(console.error);

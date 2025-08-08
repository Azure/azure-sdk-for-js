// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the virtual hard disks in the specified subscription. Use the nextLink property in the response to get the next page of virtual hard disks.
 *
 * @summary lists all of the virtual hard disks in the specified subscription. Use the nextLink property in the response to get the next page of virtual hard disks.
 * x-ms-original-file: 2025-06-01-preview/VirtualHardDisks_ListAll.json
 */
async function listVirtualHardDiskBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualHardDisks.listAll()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listVirtualHardDiskBySubscription();
}

main().catch(console.error);

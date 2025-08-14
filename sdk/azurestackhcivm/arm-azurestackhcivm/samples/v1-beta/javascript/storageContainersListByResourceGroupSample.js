// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the storage containers in the specified resource group. Use the nextLink property in the response to get the next page of storage containers.
 *
 * @summary lists all of the storage containers in the specified resource group. Use the nextLink property in the response to get the next page of storage containers.
 * x-ms-original-file: 2025-06-01-preview/StorageContainers_ListByResourceGroup.json
 */
async function listStorageContainerByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storageContainers.listByResourceGroup("test-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listStorageContainerByResourceGroup();
}

main().catch(console.error);

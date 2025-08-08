// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a storage container
 *
 * @summary gets a storage container
 * x-ms-original-file: 2025-06-01-preview/StorageContainers_Get.json
 */
async function getStorageContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.storageContainers.get("test-rg", "Default_Container");
  console.log(result);
}

async function main() {
  await getStorageContainer();
}

main().catch(console.error);

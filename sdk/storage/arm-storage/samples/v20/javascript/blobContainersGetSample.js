// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets properties of a specified container.
 *
 * @summary gets properties of a specified container.
 * x-ms-original-file: 2025-08-01/BlobContainersGet.json
 */
async function getContainers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.get("res9871", "sto6217", "container1634");
  console.log(result);
}

/**
 * This sample demonstrates how to gets properties of a specified container.
 *
 * @summary gets properties of a specified container.
 * x-ms-original-file: 2025-08-01/BlobContainersGetWithAllowProtectedAppendWritesAll.json
 */
async function getBlobContainersGetWithAllowProtectedAppendWritesAll() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.get("res9871", "sto6217", "container1634");
  console.log(result);
}

async function main() {
  await getContainers();
  await getBlobContainersGetWithAllowProtectedAppendWritesAll();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets properties of a specified container.
 *
 * @summary Gets properties of a specified container.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/BlobContainersGetWithAllowProtectedAppendWritesAll.json
 */
async function getBlobContainersGetWithAllowProtectedAppendWritesAll() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9871";
  const accountName = "sto6217";
  const containerName = "container1634";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.get(resourceGroupName, accountName, containerName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets properties of a specified container.
 *
 * @summary Gets properties of a specified container.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/BlobContainersGet.json
 */
async function getContainers() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9871";
  const accountName = "sto6217";
  const containerName = "container1634";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.get(resourceGroupName, accountName, containerName);
  console.log(result);
}

async function main() {
  await getBlobContainersGetWithAllowProtectedAppendWritesAll();
  await getContainers();
}

main().catch(console.error);

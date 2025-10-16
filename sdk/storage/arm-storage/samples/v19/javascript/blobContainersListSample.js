// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all containers and does not support a prefix like data plane. Also SRP today does not return continuation token.
 *
 * @summary Lists all containers and does not support a prefix like data plane. Also SRP today does not return continuation token.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/BlobContainersList.json
 */
async function listContainers() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9290";
  const accountName = "sto1590";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.blobContainers.list(resourceGroupName, accountName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists all containers and does not support a prefix like data plane. Also SRP today does not return continuation token.
 *
 * @summary Lists all containers and does not support a prefix like data plane. Also SRP today does not return continuation token.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/DeletedBlobContainersList.json
 */
async function listDeletedContainers() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res9290";
  const accountName = "sto1590";
  const include = "deleted";
  const options = { include };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.blobContainers.list(resourceGroupName, accountName, options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listContainers();
  await listDeletedContainers();
}

main().catch(console.error);

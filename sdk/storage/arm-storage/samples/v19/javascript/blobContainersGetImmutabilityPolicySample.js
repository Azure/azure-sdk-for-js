// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the existing immutability policy along with the corresponding ETag in response headers and body.
 *
 * @summary Gets the existing immutability policy along with the corresponding ETag in response headers and body.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/BlobContainersGetImmutabilityPolicy.json
 */
async function getImmutabilityPolicy() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res5221";
  const accountName = "sto9177";
  const containerName = "container3489";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.getImmutabilityPolicy(
    resourceGroupName,
    accountName,
    containerName,
  );
  console.log(result);
}

async function main() {
  await getImmutabilityPolicy();
}

main().catch(console.error);

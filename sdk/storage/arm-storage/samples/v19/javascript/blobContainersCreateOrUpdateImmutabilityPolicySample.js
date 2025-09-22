// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates an unlocked immutability policy. ETag in If-Match is honored if given but not required for this operation.
 *
 * @summary Creates or updates an unlocked immutability policy. ETag in If-Match is honored if given but not required for this operation.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/BlobContainersPutImmutabilityPolicy.json
 */
async function createOrUpdateImmutabilityPolicy() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res1782";
  const accountName = "sto7069";
  const containerName = "container6397";
  const parameters = {
    allowProtectedAppendWrites: true,
    immutabilityPeriodSinceCreationInDays: 3,
  };
  const options = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.createOrUpdateImmutabilityPolicy(
    resourceGroupName,
    accountName,
    containerName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates an unlocked immutability policy. ETag in If-Match is honored if given but not required for this operation.
 *
 * @summary Creates or updates an unlocked immutability policy. ETag in If-Match is honored if given but not required for this operation.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/BlobContainersPutImmutabilityPolicyAllowProtectedAppendWritesAll.json
 */
async function createOrUpdateImmutabilityPolicyWithAllowProtectedAppendWritesAll() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res1782";
  const accountName = "sto7069";
  const containerName = "container6397";
  const parameters = {
    allowProtectedAppendWritesAll: true,
    immutabilityPeriodSinceCreationInDays: 3,
  };
  const options = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.createOrUpdateImmutabilityPolicy(
    resourceGroupName,
    accountName,
    containerName,
    options,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateImmutabilityPolicy();
  await createOrUpdateImmutabilityPolicyWithAllowProtectedAppendWritesAll();
}

main().catch(console.error);

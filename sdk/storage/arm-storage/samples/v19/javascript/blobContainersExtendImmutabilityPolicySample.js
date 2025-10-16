// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Extends the immutabilityPeriodSinceCreationInDays of a locked immutabilityPolicy. The only action allowed on a Locked policy will be this action. ETag in If-Match is required for this operation.
 *
 * @summary Extends the immutabilityPeriodSinceCreationInDays of a locked immutabilityPolicy. The only action allowed on a Locked policy will be this action. ETag in If-Match is required for this operation.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/BlobContainersExtendImmutabilityPolicy.json
 */
async function extendImmutabilityPolicy() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res6238";
  const accountName = "sto232";
  const containerName = "container5023";
  const ifMatch = "8d59f830d0c3bf9";
  const parameters = {
    immutabilityPeriodSinceCreationInDays: 100,
  };
  const options = {
    parameters,
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.extendImmutabilityPolicy(
    resourceGroupName,
    accountName,
    containerName,
    ifMatch,
    options,
  );
  console.log(result);
}

async function main() {
  await extendImmutabilityPolicy();
}

main().catch(console.error);

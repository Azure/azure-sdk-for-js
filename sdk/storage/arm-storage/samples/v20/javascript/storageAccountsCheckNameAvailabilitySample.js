// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks that the storage account name is valid and is not already in use.
 *
 * @summary checks that the storage account name is valid and is not already in use.
 * x-ms-original-file: 2025-08-01/StorageAccountCheckNameAvailability.json
 */
async function storageAccountCheckNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.checkNameAvailability({
    name: "sto3363",
    type: "Microsoft.Storage/storageAccounts",
  });
  console.log(result);
}

async function main() {
  await storageAccountCheckNameAvailability();
}

main().catch(console.error);

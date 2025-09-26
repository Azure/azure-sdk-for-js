// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Revoke user delegation keys.
 *
 * @summary Revoke user delegation keys.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountRevokeUserDelegationKeys.json
 */
async function storageAccountRevokeUserDelegationKeys() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res4167";
  const accountName = "sto3539";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.revokeUserDelegationKeys(
    resourceGroupName,
    accountName,
  );
  console.log(result);
}

async function main() {
  await storageAccountRevokeUserDelegationKeys();
}

main().catch(console.error);

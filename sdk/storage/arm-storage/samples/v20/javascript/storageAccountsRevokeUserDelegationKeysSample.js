// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to revoke user delegation keys.
 *
 * @summary revoke user delegation keys.
 * x-ms-original-file: 2025-08-01/StorageAccountRevokeUserDelegationKeys.json
 */
async function storageAccountRevokeUserDelegationKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.storageAccounts.revokeUserDelegationKeys("res4167", "sto3539");
}

async function main() {
  await storageAccountRevokeUserDelegationKeys();
}

main().catch(console.error);

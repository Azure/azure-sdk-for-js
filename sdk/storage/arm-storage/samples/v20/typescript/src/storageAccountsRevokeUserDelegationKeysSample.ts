// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to revoke user delegation keys.
 *
 * @summary revoke user delegation keys.
 * x-ms-original-file: 2025-08-01/StorageAccountRevokeUserDelegationKeys.json
 */
async function storageAccountRevokeUserDelegationKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.storageAccounts.revokeUserDelegationKeys("res4167", "sto3539");
}

async function main(): Promise<void> {
  await storageAccountRevokeUserDelegationKeys();
}

main().catch(console.error);

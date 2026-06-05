// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the managementpolicy associated with the specified storage account.
 *
 * @summary deletes the managementpolicy associated with the specified storage account.
 * x-ms-original-file: 2026-04-01/StorageAccountDeleteManagementPolicy.json
 */
async function storageAccountDeleteManagementPolicies(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.managementPolicies.delete("res6977", "sto2527", "default");
}

async function main(): Promise<void> {
  await storageAccountDeleteManagementPolicies();
}

main().catch(console.error);

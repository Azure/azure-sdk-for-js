// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to resumes client access to a previously suspended storage target.
 *
 * @summary resumes client access to a previously suspended storage target.
 * x-ms-original-file: 2026-01-01/StorageTargets_Resume.json
 */
async function storageTargetsResume(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.storageTargetOperations.resume("scgroup", "sc", "st1");
}

async function main(): Promise<void> {
  await storageTargetsResume();
}

main().catch(console.error);

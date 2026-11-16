// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all Blob Access Point configurations in a Storage Account.
 *
 * @summary list all Blob Access Point configurations in a Storage Account.
 * x-ms-original-file: 2026-09-01/BlobAccessPointConfigurations_ListByStorageAccount.json
 */
async function listBlobAccessPointConfigurationsByStorageAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.blobAccessPointConfigurations.listByStorageAccount(
    "testrg",
    "teststorageaccount",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listBlobAccessPointConfigurationsByStorageAccount();
}

main().catch(console.error);

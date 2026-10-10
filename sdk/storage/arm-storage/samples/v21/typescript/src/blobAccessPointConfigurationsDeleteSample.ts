// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Blob Access Point configuration.
 *
 * @summary delete a Blob Access Point configuration.
 * x-ms-original-file: 2026-09-01/BlobAccessPointConfigurations_Delete.json
 */
async function deleteBlobAccessPointConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.blobAccessPointConfigurations.delete(
    "testrg",
    "teststorageaccount",
    "testaccesspointconfig",
  );
}

async function main(): Promise<void> {
  await deleteBlobAccessPointConfiguration();
}

main().catch(console.error);

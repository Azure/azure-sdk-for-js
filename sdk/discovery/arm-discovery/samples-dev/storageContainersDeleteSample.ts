// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a StorageContainer
 *
 * @summary delete a StorageContainer
 * x-ms-original-file: 2026-06-01/StorageContainers_Delete_MaximumSet_Gen.json
 */
async function storageContainersDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.storageContainers.delete("rgdiscovery", "349ff9e95865f956f6");
}

async function main(): Promise<void> {
  await storageContainersDeleteMaximumSet();
}

main().catch(console.error);

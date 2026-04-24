// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a StorageContainer
 *
 * @summary delete a StorageContainer
 * x-ms-original-file: 2026-02-01-preview/StorageContainers_Delete_MaximumSet_Gen.json
 */
async function storageContainersDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.storageContainers.delete("rgdiscovery", "861edbda8228e6d8c9");
}

async function main(): Promise<void> {
  await storageContainersDeleteMaximumSet();
}

main().catch(console.error);

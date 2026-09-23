// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a StorageContainer
 *
 * @summary update a StorageContainer
 * x-ms-original-file: 2026-06-01/StorageContainers_Update_MaximumSet_Gen.json
 */
async function storageContainersUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.storageContainers.update("rgdiscovery", "75bd98e50f6a2edc55", {
    tags: { key7594: "mpcdmayekmfvvgxevqnpybjoiwnkt" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await storageContainersUpdateMaximumSet();
}

main().catch(console.error);

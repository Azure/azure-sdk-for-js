// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a StorageContainer
 *
 * @summary get a StorageContainer
 * x-ms-original-file: 2026-02-01-preview/StorageContainers_Get_MaximumSet_Gen.json
 */
async function storageContainersGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.storageContainers.get("rgdiscovery", "8f3eba3d81d78de900");
  console.log(result);
}

async function main(): Promise<void> {
  await storageContainersGetMaximumSet();
}

main().catch(console.error);

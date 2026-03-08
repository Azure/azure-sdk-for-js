// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a StorageContainer
 *
 * @summary update a StorageContainer
 * x-ms-original-file: 2026-02-01-preview/StorageContainers_Update_MaximumSet_Gen.json
 */
async function storageContainersUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.storageContainers.update("rgdiscovery", "5c26ac8738c893ec11", {
    properties: {},
    tags: { key5909: "hdhfnp" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await storageContainersUpdateMaximumSet();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a ResourceGuard resource belonging to a resource group.
 *
 * @summary creates or updates a ResourceGuard resource belonging to a resource group.
 * x-ms-original-file: 2025-07-01/ResourceGuardCRUD/PutResourceGuard.json
 */
async function createResourceGuard(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.resourceGuards.put("SampleResourceGroup", "swaggerExample", {
    location: "WestUS",
    tags: { key1: "val1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createResourceGuard();
}

main().catch(console.error);

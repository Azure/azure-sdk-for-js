// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a ResourceGuard resource belonging to a resource group. For example, updating tags for a resource.
 *
 * @summary updates a ResourceGuard resource belonging to a resource group. For example, updating tags for a resource.
 * x-ms-original-file: 2025-07-01/ResourceGuardCRUD/PatchResourceGuard.json
 */
async function patchResourceGuard(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.resourceGuards.patch("SampleResourceGroup", "swaggerExample", {
    tags: { newKey: "newVal" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await patchResourceGuard();
}

main().catch(console.error);

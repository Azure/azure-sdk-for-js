// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a ResourceGuard resource from the resource group.
 *
 * @summary deletes a ResourceGuard resource from the resource group.
 * x-ms-original-file: 2025-07-01/ResourceGuardCRUD/DeleteResourceGuard.json
 */
async function deleteResourceGuard(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new DataProtectionClient(credential, subscriptionId);
  await client.resourceGuards.delete("SampleResourceGroup", "swaggerExample");
}

async function main(): Promise<void> {
  await deleteResourceGuard();
}

main().catch(console.error);

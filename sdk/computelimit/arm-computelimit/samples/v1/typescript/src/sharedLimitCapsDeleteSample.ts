// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeLimitClient } from "@azure/arm-computelimit";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the shared limit cap configuration for a VM family. The caller's subscription is treated as the host subscription.
 *
 * @summary deletes the shared limit cap configuration for a VM family. The caller's subscription is treated as the host subscription.
 * x-ms-original-file: 2026-07-01/SharedLimitCaps_Delete.json
 */
async function deleteTheSharedLimitCapForAVMFamily(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new ComputeLimitClient(credential, subscriptionId);
  await client.sharedLimitCaps.delete("eastus", "StandardDSv3Family");
}

async function main(): Promise<void> {
  await deleteTheSharedLimitCapForAVMFamily();
}

main().catch(console.error);

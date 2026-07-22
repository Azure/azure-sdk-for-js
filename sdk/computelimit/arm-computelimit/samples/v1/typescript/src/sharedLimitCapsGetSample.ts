// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeLimitClient } from "@azure/arm-computelimit";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the shared limit cap configuration for a VM family, as visible to the caller's subscription.
 *
 * @summary gets the shared limit cap configuration for a VM family, as visible to the caller's subscription.
 * x-ms-original-file: 2026-07-01/SharedLimitCaps_Get.json
 */
async function getASharedLimitCapForAVMFamily(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const result = await client.sharedLimitCaps.get("eastus", "StandardDSv3Family");
  console.log(result);
}

async function main(): Promise<void> {
  await getASharedLimitCapForAVMFamily();
}

main().catch(console.error);

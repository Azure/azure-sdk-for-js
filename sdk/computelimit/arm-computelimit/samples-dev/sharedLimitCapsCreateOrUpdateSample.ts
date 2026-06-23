// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeLimitClient } from "@azure/arm-computelimit";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or replaces the shared limit cap configuration for a VM family.
 *
 * @summary creates or replaces the shared limit cap configuration for a VM family.
 * x-ms-original-file: 2026-07-01/SharedLimitCaps_CreateOrUpdate.json
 */
async function createOrUpdateASharedLimitCapForAVMFamily(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const result = await client.sharedLimitCaps.createOrUpdate("eastus", "StandardDSv3Family", {
    properties: { defaultMemberCap: 100, isBoundedCap: true },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateASharedLimitCapForAVMFamily();
}

main().catch(console.error);

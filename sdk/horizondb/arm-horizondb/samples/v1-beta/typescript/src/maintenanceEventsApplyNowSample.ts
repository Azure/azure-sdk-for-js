// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to applies the maintenance event immediately.
 *
 * @summary applies the maintenance event immediately.
 * x-ms-original-file: 2026-10-01-preview/MaintenanceEvents_ApplyNow.json
 */
async function applyAMaintenanceEventImmediatelyForAHorizonDBPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.maintenanceEvents.applyNow(
    "example-resource-group",
    "example-cluster",
    "example-pool-01",
    "ABCD-123",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await applyAMaintenanceEventImmediatelyForAHorizonDBPool();
}

main().catch(console.error);

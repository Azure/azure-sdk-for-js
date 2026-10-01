// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a machine pool.
 *
 * @summary deletes a machine pool.
 * x-ms-original-file: 2026-01-01-preview/Pools_Delete.json
 */
async function poolsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.pools.delete("rg1", "DevProject", "poolName");
}

async function main(): Promise<void> {
  await poolsDelete();
}

main().catch(console.error);

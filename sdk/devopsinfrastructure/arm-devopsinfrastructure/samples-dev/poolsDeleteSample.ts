// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a Pool
 *
 * @summary delete a Pool
 * x-ms-original-file: 2024-10-19/DeletePool.json
 */

import { DevOpsInfrastructureClient } from "@azure/arm-devopsinfrastructure";
import { DefaultAzureCredential } from "@azure/identity";

async function poolsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a2e95d27-c161-4b61-bda4-11512c14c2c2";
  const client = new DevOpsInfrastructureClient(credential, subscriptionId);
  await client.pools.delete("rg", "pool");
}

async function main(): Promise<void> {
  await poolsDelete();
}

main().catch(console.error);

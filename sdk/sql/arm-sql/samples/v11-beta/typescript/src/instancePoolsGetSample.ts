// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an instance pool.
 *
 * @summary gets an instance pool.
 * x-ms-original-file: 2025-02-01-preview/GetInstancePool.json
 */
async function getAnInstancePool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.instancePools.get("group1", "testIP");
  console.log(result);
}

async function main(): Promise<void> {
  await getAnInstancePool();
}

main().catch(console.error);

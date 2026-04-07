// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an instance pool
 *
 * @summary deletes an instance pool
 * x-ms-original-file: 2025-02-01-preview/DeleteInstancePool.json
 */
async function deleteAnInstancePool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.instancePools.delete("group1", "testIP");
}

async function main(): Promise<void> {
  await deleteAnInstancePool();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a management operation on a instance pool.
 *
 * @summary gets a management operation on a instance pool.
 * x-ms-original-file: 2025-02-01-preview/GetInstancePoolOperation.json
 */
async function getsTheInstancePoolManagementOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.instancePoolOperations.get(
    "resource-group",
    "test-instance-pool",
    "c218773b-203f-4c7a-b174-6bd71fe20f72",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheInstancePoolManagementOperation();
}

main().catch(console.error);

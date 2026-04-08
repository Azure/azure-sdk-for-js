// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a workload group
 *
 * @summary gets a workload group
 * x-ms-original-file: 2025-02-01-preview/GetWorkloadGroup.json
 */
async function getsAWorkloadGroupForADataWarehouse(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.workloadGroups.get(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    "smallrc",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsAWorkloadGroupForADataWarehouse();
}

main().catch(console.error);

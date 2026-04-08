// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a workload group.
 *
 * @summary deletes a workload group.
 * x-ms-original-file: 2025-02-01-preview/DeleteWorkloadGroup.json
 */
async function deleteAWorkloadGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.workloadGroups.delete(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    "wlm_workloadgroup",
  );
}

async function main(): Promise<void> {
  await deleteAWorkloadGroup();
}

main().catch(console.error);

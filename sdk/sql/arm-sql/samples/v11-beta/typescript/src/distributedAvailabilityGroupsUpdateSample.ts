// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a distributed availability group replication mode.
 *
 * @summary updates a distributed availability group replication mode.
 * x-ms-original-file: 2025-02-01-preview/DistributedAvailabilityGroupsUpdate.json
 */
async function updateTheDistributedAvailabilityGroupReplicationModeBeforeDeletingIt(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.distributedAvailabilityGroups.update("testrg", "testcl", "dag", {
    replicationMode: "Sync",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateTheDistributedAvailabilityGroupReplicationModeBeforeDeletingIt();
}

main().catch(console.error);

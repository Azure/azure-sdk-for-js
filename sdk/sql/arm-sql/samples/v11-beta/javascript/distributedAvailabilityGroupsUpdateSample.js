// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a distributed availability group replication mode.
 *
 * @summary updates a distributed availability group replication mode.
 * x-ms-original-file: 2025-02-01-preview/DistributedAvailabilityGroupsUpdate.json
 */
async function updateTheDistributedAvailabilityGroupReplicationModeBeforeDeletingIt() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.distributedAvailabilityGroups.update("testrg", "testcl", "dag", {
    replicationMode: "Sync",
  });
  console.log(result);
}

async function main() {
  await updateTheDistributedAvailabilityGroupReplicationModeBeforeDeletingIt();
}

main().catch(console.error);

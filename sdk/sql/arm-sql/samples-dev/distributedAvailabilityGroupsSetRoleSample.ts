// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to sets the role for managed instance in a distributed availability group.
 *
 * @summary sets the role for managed instance in a distributed availability group.
 * x-ms-original-file: 2025-02-01-preview/DistributedAvailabilityGroupsSetRole.json
 */
async function setDistributedAvailabilityGroupPrimaryReplicaToManagedInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.distributedAvailabilityGroups.setRole("testrg", "testcl", "dag", {
    instanceRole: "Primary",
    roleChangeType: "Forced",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await setDistributedAvailabilityGroupPrimaryReplicaToManagedInstance();
}

main().catch(console.error);

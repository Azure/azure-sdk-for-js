// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to drops a distributed availability group between Sql On-Prem and Sql Managed Instance.
 *
 * @summary drops a distributed availability group between Sql On-Prem and Sql Managed Instance.
 * x-ms-original-file: 2025-02-01-preview/DistributedAvailabilityGroupsDelete.json
 */
async function initiateADistributedAvailabilityGroupDrop(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.distributedAvailabilityGroups.delete("testrg", "testcl", "dag");
}

async function main(): Promise<void> {
  await initiateADistributedAvailabilityGroupDrop();
}

main().catch(console.error);

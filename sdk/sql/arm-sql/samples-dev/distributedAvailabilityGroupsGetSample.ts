// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a distributed availability group info.
 *
 * @summary gets a distributed availability group info.
 * x-ms-original-file: 2025-02-01-preview/DistributedAvailabilityGroupsGet.json
 */
async function getsTheDistributedAvailabilityGroupInfo(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.distributedAvailabilityGroups.get("testrg", "testcl", "dag");
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheDistributedAvailabilityGroupInfo();
}

main().catch(console.error);

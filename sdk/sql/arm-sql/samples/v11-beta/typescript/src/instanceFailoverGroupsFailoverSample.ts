// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fails over from the current primary managed instance to this managed instance.
 *
 * @summary fails over from the current primary managed instance to this managed instance.
 * x-ms-original-file: 2025-02-01-preview/InstanceFailoverGroupFailover.json
 */
async function plannedFailoverOfAFailoverGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.instanceFailoverGroups.failover(
    "Default",
    "Japan West",
    "failover-group-test-3",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await plannedFailoverOfAFailoverGroup();
}

main().catch(console.error);

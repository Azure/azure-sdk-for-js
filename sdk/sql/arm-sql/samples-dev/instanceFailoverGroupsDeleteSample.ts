// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a failover group.
 *
 * @summary deletes a failover group.
 * x-ms-original-file: 2025-02-01-preview/InstanceFailoverGroupDelete.json
 */
async function deleteFailoverGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.instanceFailoverGroups.delete("Default", "Japan East", "failover-group-test-1");
}

async function main(): Promise<void> {
  await deleteFailoverGroup();
}

main().catch(console.error);

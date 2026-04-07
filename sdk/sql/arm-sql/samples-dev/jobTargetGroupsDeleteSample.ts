// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a target group.
 *
 * @summary deletes a target group.
 * x-ms-original-file: 2025-02-01-preview/DeleteJobTargetGroup.json
 */
async function deleteATargetGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.jobTargetGroups.delete("group1", "server1", "agent1", "targetGroup1");
}

async function main(): Promise<void> {
  await deleteATargetGroup();
}

main().catch(console.error);

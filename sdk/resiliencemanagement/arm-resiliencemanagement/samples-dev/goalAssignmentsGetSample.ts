// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a goal assignment.
 *
 * @summary gets a goal assignment.
 * x-ms-original-file: 2026-10-01/GoalAssignments_Get_MaximumSet_Gen.json
 */
async function goalAssignmentsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.goalAssignments.get("production-sg", "zonal-resiliency-goal");
  console.log(result);
}

async function main(): Promise<void> {
  await goalAssignmentsGetMaximumSet();
}

main().catch(console.error);

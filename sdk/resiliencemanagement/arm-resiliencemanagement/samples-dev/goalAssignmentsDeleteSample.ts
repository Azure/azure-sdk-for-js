// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a goal assignment.
 *
 * @summary deletes a goal assignment.
 * x-ms-original-file: 2026-10-01/GoalAssignments_Delete_MaximumSet_Gen.json
 */
async function goalAssignmentsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.goalAssignments.delete("production-sg", "zonal-resiliency-goal");
}

async function main(): Promise<void> {
  await goalAssignmentsDeleteMaximumSet();
}

main().catch(console.error);

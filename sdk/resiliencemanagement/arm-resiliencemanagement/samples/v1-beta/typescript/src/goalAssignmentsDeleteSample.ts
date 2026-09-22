// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a GoalAssignment
 *
 * @summary delete a GoalAssignment
 * x-ms-original-file: 2026-04-01-preview/GoalAssignments_Delete_MaximumSet_Gen.json
 */
async function goalAssignmentsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.goalAssignments.delete("sg1", "ga1");
}

async function main(): Promise<void> {
  await goalAssignmentsDeleteMaximumSet();
}

main().catch(console.error);

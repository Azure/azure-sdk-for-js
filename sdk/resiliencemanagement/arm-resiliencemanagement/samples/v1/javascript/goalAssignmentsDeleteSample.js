// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a goal assignment.
 *
 * @summary deletes a goal assignment.
 * x-ms-original-file: 2026-10-01/GoalAssignments_Delete_MaximumSet_Gen.json
 */
async function goalAssignmentsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.goalAssignments.delete("production-sg", "zonal-resiliency-goal");
}

async function main() {
  await goalAssignmentsDeleteMaximumSet();
}

main().catch(console.error);

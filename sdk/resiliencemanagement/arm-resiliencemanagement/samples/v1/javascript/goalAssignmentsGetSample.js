// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a goal assignment.
 *
 * @summary gets a goal assignment.
 * x-ms-original-file: 2026-10-01/GoalAssignments_Get_MaximumSet_Gen.json
 */
async function goalAssignmentsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.goalAssignments.get("production-sg", "zonal-resiliency-goal");
  console.log(result);
}

async function main() {
  await goalAssignmentsGetMaximumSet();
}

main().catch(console.error);

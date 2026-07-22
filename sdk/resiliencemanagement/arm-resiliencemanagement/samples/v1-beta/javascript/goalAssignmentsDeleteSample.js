// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a GoalAssignment
 *
 * @summary delete a GoalAssignment
 * x-ms-original-file: 2026-04-01-preview/GoalAssignments_Delete_MaximumSet_Gen.json
 */
async function goalAssignmentsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.goalAssignments.delete("sg1", "ga1");
}

async function main() {
  await goalAssignmentsDeleteMaximumSet();
}

main().catch(console.error);

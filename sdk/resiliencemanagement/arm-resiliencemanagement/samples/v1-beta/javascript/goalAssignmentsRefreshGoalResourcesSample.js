// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to refreshes the goal resources under a goal assignment. This operation scans for new resources under the scope of the assignment.
 *
 * @summary refreshes the goal resources under a goal assignment. This operation scans for new resources under the scope of the assignment.
 * x-ms-original-file: 2026-04-01-preview/GoalAssignments_RefreshGoalResources_MaximumSet_Gen.json
 */
async function goalAssignmentsRefreshGoalResourcesMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.goalAssignments.refreshGoalResources("sg1", "ga1");
}

async function main() {
  await goalAssignmentsRefreshGoalResourcesMaximumSet();
}

main().catch(console.error);

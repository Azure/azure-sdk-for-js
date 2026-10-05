// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a goal assignment.
 *
 * @summary gets a goal assignment.
 * x-ms-original-file: 2026-10-31-preview/GoalAssignments_Get_MaximumSet_Gen.json
 */
async function goalAssignmentsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.goalAssignments.get("sg1", "ga1");
  console.log(result);
}

async function main() {
  await goalAssignmentsGetMaximumSet();
}

main().catch(console.error);

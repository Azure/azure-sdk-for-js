// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all jobs for the specified workspace manager assignment
 *
 * @summary get all jobs for the specified workspace manager assignment
 * x-ms-original-file: 2025-07-01-preview/workspaceManagerAssignments/GetAllJobs.json
 */
async function getAllJobsForTheSpecifiedSentinelWorkspaceManagerAssignment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaceManagerAssignmentJobs.list(
    "myRg",
    "myWorkspace",
    "47cdc5f5-37c4-47b5-bd5f-83c84b8bdd58",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllJobsForTheSpecifiedSentinelWorkspaceManagerAssignment();
}

main().catch(console.error);

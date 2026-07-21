// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a job for the specified workspace manager assignment
 *
 * @summary create a job for the specified workspace manager assignment
 * x-ms-original-file: 2025-07-01-preview/workspaceManagerAssignments/CreateJob.json
 */
async function createsAJobForTheSpecifiedWorkspaceManagerAssignment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.workspaceManagerAssignmentJobs.create(
    "myRg",
    "myWorkspace",
    "47cdc5f5-37c4-47b5-bd5f-83c84b8bdd58",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsAJobForTheSpecifiedWorkspaceManagerAssignment();
}

main().catch(console.error);

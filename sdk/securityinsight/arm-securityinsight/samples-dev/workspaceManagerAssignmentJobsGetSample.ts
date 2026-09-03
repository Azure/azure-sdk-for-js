// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a job
 *
 * @summary gets a job
 * x-ms-original-file: 2025-07-01-preview/workspaceManagerAssignments/GetJob.json
 */
async function getAWorkspaceManagerJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.workspaceManagerAssignmentJobs.get(
    "myRg",
    "myWorkspace",
    "47cdc5f5-37c4-47b5-bd5f-83c84b8bdd58",
    "cfbe1338-8276-4d5d-8b96-931117f9fa0e",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAWorkspaceManagerJob();
}

main().catch(console.error);

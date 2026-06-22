// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified job from the specified workspace manager assignment
 *
 * @summary deletes the specified job from the specified workspace manager assignment
 * x-ms-original-file: 2025-07-01-preview/workspaceManagerAssignments/DeleteJob.json
 */
async function deleteAWorkspaceManagerJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.workspaceManagerAssignmentJobs.delete(
    "myRg",
    "myWorkspace",
    "47cdc5f5-37c4-47b5-bd5f-83c84b8bdd58",
    "cfbe1338-8276-4d5d-8b96-931117f9fa0e",
  );
}

async function main() {
  await deleteAWorkspaceManagerJob();
}

main().catch(console.error);

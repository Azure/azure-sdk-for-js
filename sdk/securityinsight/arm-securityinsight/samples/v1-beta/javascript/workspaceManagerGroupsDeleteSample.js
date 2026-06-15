// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a workspace manager group
 *
 * @summary deletes a workspace manager group
 * x-ms-original-file: 2025-07-01-preview/workspaceManagerGroups/DeleteWorkspaceManagerGroup.json
 */
async function deleteAWorkspaceManagerGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.workspaceManagerGroups.delete(
    "myRg",
    "myWorkspace",
    "37207a7a-3b8a-438f-a559-c7df400e1b96",
  );
}

async function main() {
  await deleteAWorkspaceManagerGroup();
}

main().catch(console.error);

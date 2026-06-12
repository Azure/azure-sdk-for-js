// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a workspace manager group
 *
 * @summary gets a workspace manager group
 * x-ms-original-file: 2025-07-01-preview/workspaceManagerGroups/GetWorkspaceManagerGroup.json
 */
async function getAWorkspaceManagerGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.workspaceManagerGroups.get(
    "myRg",
    "myWorkspace",
    "37207a7a-3b8a-438f-a559-c7df400e1b96",
  );
  console.log(result);
}

async function main() {
  await getAWorkspaceManagerGroup();
}

main().catch(console.error);

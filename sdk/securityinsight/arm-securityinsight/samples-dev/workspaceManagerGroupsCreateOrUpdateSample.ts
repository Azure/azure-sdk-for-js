// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a workspace manager group.
 *
 * @summary creates or updates a workspace manager group.
 * x-ms-original-file: 2025-07-01-preview/workspaceManagerGroups/CreateOrUpdateWorkspaceManagerGroup.json
 */
async function createsOrUpdatesAWorkspaceManagerGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.workspaceManagerGroups.createOrUpdate(
    "myRg",
    "myWorkspace",
    "37207a7a-3b8a-438f-a559-c7df400e1b96",
    {
      description: "Group of all financial and banking institutions",
      displayName: "Banks",
      memberResourceNames: [
        "afbd324f-6c48-459c-8710-8d1e1cd03812",
        "f5fa104e-c0e3-4747-9182-d342dc048a9e",
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsOrUpdatesAWorkspaceManagerGroup();
}

main().catch(console.error);

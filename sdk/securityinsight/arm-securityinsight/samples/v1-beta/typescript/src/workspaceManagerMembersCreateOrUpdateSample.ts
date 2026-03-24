// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a workspace manager member
 *
 * @summary creates or updates a workspace manager member
 * x-ms-original-file: 2025-07-01-preview/workspaceManagerMembers/CreateOrUpdateWorkspaceManagerMember.json
 */
async function createOrUpdateAWorkspaceManagerMember(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.workspaceManagerMembers.createOrUpdate(
    "myRg",
    "myWorkspace",
    "afbd324f-6c48-459c-8710-8d1e1cd03812",
    {
      targetWorkspaceResourceId:
        "/subscriptions/7aef9d48-814f-45ad-b644-b0343316e174/resourceGroups/otherRg/providers/Microsoft.OperationalInsights/workspaces/Example_Workspace",
      targetWorkspaceTenantId: "f676d436-8d16-42db-81b7-ab578e110ccd",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAWorkspaceManagerMember();
}

main().catch(console.error);

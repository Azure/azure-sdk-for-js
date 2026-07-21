// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a workspace manager assignment.
 *
 * @summary creates or updates a workspace manager assignment.
 * x-ms-original-file: 2025-07-01-preview/workspaceManagerAssignments/CreateOrUpdateWorkspaceManagerAssignment.json
 */
async function createsOrUpdatesAWorkspaceManagerAssignment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.workspaceManagerAssignments.createOrUpdate(
    "myRg",
    "myWorkspace",
    "47cdc5f5-37c4-47b5-bd5f-83c84b8bdd58",
    {
      items: [
        {
          resourceId:
            "/subscriptions/d0cfe6b2-9ac0-4464-9919-dccaee2e48c0/resourceGroups/myRg/providers/Microsoft.OperationalInsights/workspac-es/myWorkspace/providers/Microsoft.SecurityInsights/alertRules/microsoftSecurityIncidentCreationRuleExampleOne",
        },
        {
          resourceId:
            "/subscriptions/d0cfe6b2-9ac0-4464-9919-dccaee2e48c0/resourceGroups/myRg/providers/Microsoft.OperationalInsights/workspac-es/myWorkspace/providers/Microsoft.SecurityInsights/alertRules/microsoftSecurityIncidentCreationRuleExampleTwo",
        },
      ],
      targetResourceName: "37207a7a-3b8a-438f-a559-c7df400e1b96",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsOrUpdatesAWorkspaceManagerAssignment();
}

main().catch(console.error);

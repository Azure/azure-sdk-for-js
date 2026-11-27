// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedOpsClient } from "@azure/arm-managedops";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the ManagedOps instance.
 *
 * @summary creates or updates the ManagedOps instance.
 * x-ms-original-file: 2026-01-06-preview/ManagedOps_CreateOrUpdate.json
 */
async function managedOpsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new ManagedOpsClient(credential, subscriptionId);
  const result = await client.managedOps.createOrUpdate("default", {
    properties: {
      sku: { name: "ManagedOps", tier: "Essential" },
      desiredConfiguration: {
        changeTrackingAndInventory: {
          logAnalyticsWorkspaceId:
            "/subscriptions/11809CA1-E126-4017-945E-AA795CD5C5A9/resourceGroups/myResourceGroup/providers/Microsoft.OperationalInsights/workspaces/myLogAnalyticsWorkspace",
        },
        azureMonitorInsights: {
          azureMonitorWorkspaceId:
            "/subscriptions/11809CA1-E126-4017-945E-AA795CD5C5A9/resourceGroups/myResourceGroup/providers/Microsoft.Monitor/accounts/myAzureMonitorWorkspace",
        },
        userAssignedManagedIdentityId:
          "/subscriptions/11809CA1-E126-4017-945E-AA795CD5C5A9/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myManagedIdentity",
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await managedOpsCreateOrUpdate();
}

main().catch(console.error);

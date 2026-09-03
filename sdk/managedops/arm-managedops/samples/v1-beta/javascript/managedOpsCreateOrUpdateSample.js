// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedOpsClient } = require("@azure/arm-managedops");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the ManagedOps instance.
 *
 * @summary creates or updates the ManagedOps instance.
 * x-ms-original-file: 2025-07-28-preview/ManagedOps_CreateOrUpdate.json
 */
async function managedOpsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new ManagedOpsClient(credential, subscriptionId);
  const result = await client.managedOps.createOrUpdate("default", {
    properties: {
      desiredConfiguration: {
        changeTrackingAndInventory: {
          logAnalyticsWorkspaceId:
            "/subscriptions/11809CA1-E126-4017-945E-AA795CD5C5A9/resourceGroups/myResourceGroup/providers/Microsoft.OperationalInsights/workspaces/00000000-0000-0000-0000-000000000000-Default",
        },
        azureMonitorInsights: {
          azureMonitorWorkspaceId:
            "/subscriptions/11809CA1-E126-4017-945E-AA795CD5C5A9/resourceGroups/myResourceGroup/providers/Microsoft.Monitor/accounts/example",
        },
        userAssignedManagedIdentityId:
          "/subscriptions/11809CA1-E126-4017-945E-AA795CD5C5A9/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myManagedIdentity",
      },
    },
  });
  console.log(result);
}

async function main() {
  await managedOpsCreateOrUpdate();
}

main().catch(console.error);

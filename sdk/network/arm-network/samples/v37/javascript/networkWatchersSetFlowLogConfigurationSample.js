// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to configures flow log and traffic analytics (optional) on a specified resource.
 *
 * @summary configures flow log and traffic analytics (optional) on a specified resource.
 * x-ms-original-file: 2025-05-01/NetworkWatcherFlowLogConfigure.json
 */
async function configureFlowLog() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.setFlowLogConfiguration("rg1", "nw1", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1":
          {},
      },
    },
    enabled: true,
    storageId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Storage/storageAccounts/st1",
    targetResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/networkSecurityGroups/nsg1",
  });
  console.log(result);
}

async function main() {
  await configureFlowLog();
}

main().catch(console.error);

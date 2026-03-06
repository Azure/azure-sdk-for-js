// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Configures flow log and traffic analytics (optional) on a specified resource.
 *
 * @summary Configures flow log and traffic analytics (optional) on a specified resource.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkWatcherFlowLogConfigure.json
 */
async function configureFlowLog() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkWatcherName = "nw1";
  const parameters = {
    enabled: true,
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/subid/resourceGroups/rg1/providers/MicrosoftManagedIdentity/userAssignedIdentities/id1":
          {},
      },
    },
    storageId:
      "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Storage/storageAccounts/st1",
    targetResourceId:
      "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/networkSecurityGroups/nsg1",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.beginSetFlowLogConfigurationAndWait(
    resourceGroupName,
    networkWatcherName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await configureFlowLog();
}

main().catch(console.error);

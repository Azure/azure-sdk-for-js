// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new cluster manager or update properties of the cluster manager if it exists.
 *
 * @summary create a new cluster manager or update properties of the cluster manager if it exists.
 * x-ms-original-file: 2026-05-01-preview/ClusterManagers_Create.json
 */
async function createOrUpdateClusterManager() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusterManagers.createOrUpdate(
    "resourceGroupName",
    "clusterManagerName",
    {
      identity: { type: "SystemAssigned" },
      kind: "AzureLocal",
      location: "location",
      analyticsWorkspaceId:
        "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.OperationalInsights/workspaces/logAnalyticsWorkspaceName",
      fabricControllerId:
        "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedNetworkFabric/networkFabricControllers/fabricControllerName",
      managedResourceGroupConfiguration: { location: "East US", name: "my-managed-rg" },
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a new cluster manager or update properties of the cluster manager if it exists.
 *
 * @summary create a new cluster manager or update properties of the cluster manager if it exists.
 * x-ms-original-file: 2026-05-01-preview/ClusterManagers_Create_Uami.json
 */
async function createOrUpdateClusterManagerWithUserAssignedIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusterManagers.createOrUpdate(
    "resourceGroupName",
    "clusterManagerName",
    {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/userIdentity1":
            {},
        },
      },
      kind: "AzureLocal",
      location: "location",
      analyticsWorkspaceId:
        "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.OperationalInsights/workspaces/logAnalyticsWorkspaceName",
      fabricControllerId:
        "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedNetworkFabric/networkFabricControllers/fabricControllerName",
      managedResourceGroupConfiguration: { location: "East US", name: "my-managed-rg" },
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateClusterManager();
  await createOrUpdateClusterManagerWithUserAssignedIdentity();
}

main().catch(console.error);

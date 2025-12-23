// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create a new cluster or update the properties of the cluster if it exists.
 *
 * @summary Create a new cluster or update the properties of the cluster if it exists.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/preview/2025-07-01-preview/examples/Clusters_Create.json
 */
async function createOrUpdateCluster() {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] || "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName = process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const clusterName = "clusterName";
  const clusterParameters = {
    aggregatorOrSingleRackDefinition: {
      bareMetalMachineConfigurationData: [
        {
          bmcCredentials: {
            password: "https://keyvaultname.vault.azure.net/secrets/secretName",
            username: "username",
          },
          bmcMacAddress: "AA:BB:CC:DD:EE:FF",
          bootMacAddress: "00:BB:CC:DD:EE:FF",
          machineDetails: "extraDetails",
          machineName: "bmmName1",
          rackSlot: 1,
          serialNumber: "BM1219XXX",
        },
        {
          bmcCredentials: {
            password: "https://keyvaultname.vault.azure.net/secrets/secretName",
            username: "username",
          },
          bmcMacAddress: "AA:BB:CC:DD:EE:00",
          bootMacAddress: "00:BB:CC:DD:EE:00",
          machineDetails: "extraDetails",
          machineName: "bmmName2",
          rackSlot: 2,
          serialNumber: "BM1219YYY",
        },
      ],
      networkRackId:
        "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedNetworkFabric/networkRacks/networkRackName",
      rackLocation: "Foo Datacenter, Floor 3, Aisle 9, Rack 2",
      rackSerialNumber: "AA1234",
      rackSkuId:
        "/subscriptions/123e4567-e89b-12d3-a456-426655440000/providers/Microsoft.NetworkCloud/rackSkus/rackSkuName",
      storageApplianceConfigurationData: [
        {
          adminCredentials: {
            password: "https://keyvaultname.vault.azure.net/secrets/secretName",
            username: "username",
          },
          rackSlot: 1,
          serialNumber: "BM1219XXX",
          storageApplianceName: "vmName",
        },
      ],
    },
    analyticsOutputSettings: {
      analyticsWorkspaceId:
        "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/microsoft.operationalInsights/workspaces/logAnalyticsWorkspaceName",
      associatedIdentity: {
        identityType: "UserAssignedIdentity",
        userAssignedIdentityResourceId:
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/userIdentity1",
      },
    },
    clusterLocation: "Foo Street, 3rd Floor, row 9",
    clusterType: "SingleRack",
    clusterVersion: "1.0.0",
    commandOutputSettings: {
      associatedIdentity: {
        identityType: "UserAssignedIdentity",
        userAssignedIdentityResourceId:
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/userIdentity1",
      },
      containerUrl: "https://myaccount.blob.core.windows.net/mycontainer?restype=container",
      overrides: [
        {
          associatedIdentity: {
            identityType: "UserAssignedIdentity",
            userAssignedIdentityResourceId:
              "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/userIdentity2",
          },
          commandOutputType: "StorageRunReadCommands",
          containerUrl: "https://myaccount.blob.core.windows.net/myContainer2?restype=container",
        },
      ],
    },
    computeDeploymentThreshold: {
      type: "PercentSuccess",
      grouping: "PerCluster",
      value: 90,
    },
    computeRackDefinitions: [
      {
        bareMetalMachineConfigurationData: [
          {
            bmcCredentials: {
              password: "https://keyvaultname.vault.azure.net/secrets/secretName",
              username: "username",
            },
            bmcMacAddress: "AA:BB:CC:DD:EE:FF",
            bootMacAddress: "00:BB:CC:DD:EE:FF",
            machineDetails: "extraDetails",
            machineName: "bmmName1",
            rackSlot: 1,
            serialNumber: "BM1219XXX",
          },
          {
            bmcCredentials: {
              password: "https://keyvaultname.vault.azure.net/secrets/secretName",
              username: "username",
            },
            bmcMacAddress: "AA:BB:CC:DD:EE:00",
            bootMacAddress: "00:BB:CC:DD:EE:00",
            machineDetails: "extraDetails",
            machineName: "bmmName2",
            rackSlot: 2,
            serialNumber: "BM1219YYY",
          },
        ],
        networkRackId:
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedNetworkFabric/networkRacks/networkRackName",
        rackLocation: "Foo Datacenter, Floor 3, Aisle 9, Rack 2",
        rackSerialNumber: "AA1234",
        rackSkuId:
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/providers/Microsoft.NetworkCloud/rackSkus/rackSkuName",
        storageApplianceConfigurationData: [
          {
            adminCredentials: {
              password: "https://keyvaultname.vault.azure.net/secrets/secretName",
              username: "username",
            },
            rackSlot: 1,
            serialNumber: "BM1219XXX",
            storageApplianceName: "vmName",
          },
        ],
      },
    ],
    extendedLocation: {
      name: "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ExtendedLocation/customLocations/clusterManagerExtendedLocationName",
      type: "CustomLocation",
    },
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/123e4567E89b12d3A456426655440000/resourceGroups/resourceGroupName/providers/MicrosoftManagedIdentity/userAssignedIdentities/userIdentity1":
          {},
      },
    },
    location: "location",
    managedResourceGroupConfiguration: {
      name: "my-managed-rg",
      location: "East US",
    },
    networkFabricId:
      "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedNetworkFabric/networkFabrics/fabricName",
    runtimeProtectionConfiguration: { enforcementLevel: "OnDemand" },
    secretArchiveSettings: {
      associatedIdentity: {
        identityType: "UserAssignedIdentity",
        userAssignedIdentityResourceId:
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/userIdentity1",
      },
      vaultUri: "https://keyvaultname.vault.azure.net/",
    },
    tags: { key1: "myvalue1", key2: "myvalue2" },
    updateStrategy: {
      maxUnavailable: 4,
      strategyType: "Rack",
      thresholdType: "CountSuccess",
      thresholdValue: 4,
      waitTimeMinutes: 10,
    },
    vulnerabilityScanningSettings: { containerScan: "Enabled" },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusters.beginCreateOrUpdateAndWait(
    resourceGroupName,
    clusterName,
    clusterParameters,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateCluster();
}

main().catch(console.error);

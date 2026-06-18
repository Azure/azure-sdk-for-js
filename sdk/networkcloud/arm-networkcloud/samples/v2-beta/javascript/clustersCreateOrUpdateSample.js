// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new cluster or update the properties of the cluster if it exists.
 *
 * @summary create a new cluster or update the properties of the cluster if it exists.
 * x-ms-original-file: 2026-05-01-preview/Clusters_Create.json
 */
async function createOrUpdateCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusters.createOrUpdate("resourceGroupName", "clusterName", {
    extendedLocation: {
      name: "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ExtendedLocation/customLocations/clusterManagerExtendedLocationName",
      type: "CustomLocation",
    },
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/userIdentity1":
          {},
      },
    },
    kind: "AzureLocal",
    location: "location",
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
        "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.OperationalInsights/workspaces/logAnalyticsWorkspaceName",
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
    computeDeploymentThreshold: { grouping: "PerCluster", type: "PercentSuccess", value: 90 },
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
    managedResourceGroupConfiguration: { location: "East US", name: "my-managed-rg" },
    networkFabricId:
      "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedNetworkFabric/networkFabrics/fabricName",
    runtimeProtectionConfiguration: { definitionUpdateMode: "None", enforcementLevel: "OnDemand" },
    secretArchiveSettings: {
      associatedIdentity: {
        identityType: "UserAssignedIdentity",
        userAssignedIdentityResourceId:
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/userIdentity1",
      },
      vaultUri: "https://keyvaultname.vault.azure.net/",
    },
    updateStrategy: {
      maxUnavailable: 4,
      strategyType: "Rack",
      thresholdType: "CountSuccess",
      thresholdValue: 4,
      waitTimeMinutes: 10,
    },
    vulnerabilityScanningSettings: { containerScan: "Enabled" },
    tags: { key1: "myvalue1", key2: "myvalue2" },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateCluster();
}

main().catch(console.error);

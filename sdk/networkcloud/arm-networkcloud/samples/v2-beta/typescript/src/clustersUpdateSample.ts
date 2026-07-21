// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patch the properties of the provided cluster, or update the tags associated with the cluster. Properties and tag updates can be done independently.
 *
 * @summary patch the properties of the provided cluster, or update the tags associated with the cluster. Properties and tag updates can be done independently.
 * x-ms-original-file: 2026-05-01-preview/Clusters_Patch_AggregatorOrSingleRackDefinition.json
 */
async function patchClusterAggregatorOrSingleRackDefinition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusters.update("resourceGroupName", "clusterName", {
    clusterUpdateParameters: {
      aggregatorOrSingleRackDefinition: {
        bareMetalMachineConfigurationData: [
          {
            bmcCredentials: { password: "{password}", username: "username" },
            bmcMacAddress: "AA:BB:CC:DD:EE:FF",
            bootMacAddress: "00:BB:CC:DD:EE:FF",
            machineDetails: "extraDetails",
            machineName: "bmmName1",
            rackSlot: 1,
            serialNumber: "BM1219XXX",
          },
          {
            bmcCredentials: { password: "{password}", username: "username" },
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
        rackSerialNumber: "newSerialNumber",
        rackSkuId:
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/providers/Microsoft.NetworkCloud/rackSkus/rackSkuName",
        storageApplianceConfigurationData: [
          {
            adminCredentials: { password: "{password}", username: "username" },
            rackSlot: 1,
            serialNumber: "BM1219XXX",
            storageApplianceName: "vmName",
          },
        ],
      },
      computeDeploymentThreshold: { grouping: "PerCluster", type: "PercentSuccess", value: 90 },
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to patch the properties of the provided cluster, or update the tags associated with the cluster. Properties and tag updates can be done independently.
 *
 * @summary patch the properties of the provided cluster, or update the tags associated with the cluster. Properties and tag updates can be done independently.
 * x-ms-original-file: 2026-05-01-preview/Clusters_Patch_AnalyticsOutput.json
 */
async function patchClusterAnalyticsOutput(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusters.update("resourceGroupName", "clusterName", {
    clusterUpdateParameters: {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/userIdentity1":
            {},
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/userIdentity2":
            {},
        },
      },
      analyticsOutputSettings: {
        analyticsWorkspaceId:
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.OperationalInsights/workspaces/logAnalyticsWorkspaceName",
        associatedIdentity: {
          identityType: "UserAssignedIdentity",
          userAssignedIdentityResourceId:
            "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/userIdentity2",
        },
      },
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to patch the properties of the provided cluster, or update the tags associated with the cluster. Properties and tag updates can be done independently.
 *
 * @summary patch the properties of the provided cluster, or update the tags associated with the cluster. Properties and tag updates can be done independently.
 * x-ms-original-file: 2026-05-01-preview/Clusters_Patch_CommandOutput.json
 */
async function patchClusterCommandOutput(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusters.update("resourceGroupName", "clusterName", {
    clusterUpdateParameters: {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/userIdentity1":
            {},
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/userIdentity2":
            {},
        },
      },
      commandOutputSettings: {
        associatedIdentity: {
          identityType: "UserAssignedIdentity",
          userAssignedIdentityResourceId:
            "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/userIdentity2",
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
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to patch the properties of the provided cluster, or update the tags associated with the cluster. Properties and tag updates can be done independently.
 *
 * @summary patch the properties of the provided cluster, or update the tags associated with the cluster. Properties and tag updates can be done independently.
 * x-ms-original-file: 2026-05-01-preview/Clusters_Patch_Location.json
 */
async function patchClusterLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusters.update("resourceGroupName", "clusterName", {
    clusterUpdateParameters: {
      clusterLocation: "Foo Street, 3rd Floor, row 9",
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to patch the properties of the provided cluster, or update the tags associated with the cluster. Properties and tag updates can be done independently.
 *
 * @summary patch the properties of the provided cluster, or update the tags associated with the cluster. Properties and tag updates can be done independently.
 * x-ms-original-file: 2026-05-01-preview/Clusters_Patch_RuntimeProtectionConfiguration.json
 */
async function patchRuntimeProtectionConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusters.update("resourceGroupName", "clusterName", {
    clusterUpdateParameters: {
      runtimeProtectionConfiguration: {
        definitionUpdateMode: "Automatic",
        enforcementLevel: "OnDemand",
      },
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to patch the properties of the provided cluster, or update the tags associated with the cluster. Properties and tag updates can be done independently.
 *
 * @summary patch the properties of the provided cluster, or update the tags associated with the cluster. Properties and tag updates can be done independently.
 * x-ms-original-file: 2026-05-01-preview/Clusters_Patch_SecretArchive.json
 */
async function patchSecretArchive(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusters.update("resourceGroupName", "clusterName", {
    clusterUpdateParameters: {
      secretArchiveSettings: {
        associatedIdentity: {
          identityType: "UserAssignedIdentity",
          userAssignedIdentityResourceId:
            "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/userIdentity1",
        },
        vaultUri: "https://keyvaultname.vault.azure.net/",
      },
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to patch the properties of the provided cluster, or update the tags associated with the cluster. Properties and tag updates can be done independently.
 *
 * @summary patch the properties of the provided cluster, or update the tags associated with the cluster. Properties and tag updates can be done independently.
 * x-ms-original-file: 2026-05-01-preview/Clusters_Patch_UpdateStrategy.json
 */
async function patchUpdateStrategy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusters.update("resourceGroupName", "clusterName", {
    clusterUpdateParameters: {
      updateStrategy: {
        maxUnavailable: 4,
        strategyType: "Rack",
        thresholdType: "CountSuccess",
        thresholdValue: 4,
        waitTimeMinutes: 10,
      },
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to patch the properties of the provided cluster, or update the tags associated with the cluster. Properties and tag updates can be done independently.
 *
 * @summary patch the properties of the provided cluster, or update the tags associated with the cluster. Properties and tag updates can be done independently.
 * x-ms-original-file: 2026-05-01-preview/Clusters_Patch_VulnerabilityScanning.json
 */
async function patchVulnerabilityScanning(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusters.update("resourceGroupName", "clusterName", {
    clusterUpdateParameters: {
      vulnerabilityScanningSettings: { containerScan: "Enabled" },
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await patchClusterAggregatorOrSingleRackDefinition();
  await patchClusterAnalyticsOutput();
  await patchClusterCommandOutput();
  await patchClusterLocation();
  await patchRuntimeProtectionConfiguration();
  await patchSecretArchive();
  await patchUpdateStrategy();
  await patchVulnerabilityScanning();
}

main().catch(console.error);

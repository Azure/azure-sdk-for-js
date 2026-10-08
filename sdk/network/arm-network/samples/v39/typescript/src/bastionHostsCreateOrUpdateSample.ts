// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the specified Bastion Host.
 *
 * @summary creates or updates the specified Bastion Host.
 * x-ms-original-file: 2026-01-01/BastionHostDeveloperPut.json
 */
async function createDeveloperBastionHost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.bastionHosts.createOrUpdate("rg2", "bastionhostdeveloper", {
    ipConfigurations: [],
    networkAcls: { ipRules: [{ addressPrefix: "1.1.1.1/16" }] },
    virtualNetwork: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/vnet2",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the specified Bastion Host.
 *
 * @summary creates or updates the specified Bastion Host.
 * x-ms-original-file: 2026-01-01/BastionHostPut.json
 */
async function createBastionHost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.bastionHosts.createOrUpdate("rg1", "bastionhosttenant", {
    ipConfigurations: [
      {
        name: "bastionHostIpConfiguration",
        publicIPAddress: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/pipName",
        },
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet2/subnets/BastionHostSubnet",
        },
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the specified Bastion Host.
 *
 * @summary creates or updates the specified Bastion Host.
 * x-ms-original-file: 2026-01-01/BastionHostPutWithPrivateOnly.json
 */
async function createBastionHostWithPrivateOnly(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.bastionHosts.createOrUpdate("rg1", "bastionhosttenant", {
    enablePrivateOnlyBastion: true,
    ipConfigurations: [
      {
        name: "bastionHostIpConfiguration",
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet2/subnets/BastionHostSubnet",
        },
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the specified Bastion Host.
 *
 * @summary creates or updates the specified Bastion Host.
 * x-ms-original-file: 2026-01-01/BastionHostPutWithSystemAssignedIdentityForSRConfig.json
 */
async function createOrUpdateBastionHostWithSystemAssignedIdentityForSessionRecordingConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.bastionHosts.createOrUpdate("rg1", "bastionhosttenant", {
    enableSessionRecording: true,
    sessionRecordingConfiguration: {
      identity: { type: "SystemAssigned" },
      blobContainerUri: "https://mystorageaccount.blob.core.windows.net/mycontainer",
    },
    ipConfigurations: [
      {
        name: "bastionHostIpConfiguration",
        subnet: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet2/subnets/BastionHostSubnet",
        },
        publicIPAddress: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/pipName",
        },
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the specified Bastion Host.
 *
 * @summary creates or updates the specified Bastion Host.
 * x-ms-original-file: 2026-01-01/BastionHostPutWithUserAssignedIdentityForSRConfig.json
 */
async function createOrUpdateBastionHostWithUserAssignedIdentityForSessionRecordingConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.bastionHosts.createOrUpdate("rg1", "bastionhosttenant", {
    enableSessionRecording: true,
    sessionRecordingConfiguration: {
      identity: {
        type: "UserAssigned",
        userAssignedIdentityId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/userassignedmsi",
      },
      blobContainerUri: "https://contosostorage.blob.core.windows.net/contosocontainer",
    },
    ipConfigurations: [
      {
        name: "bastionHostIpConfiguration",
        subnet: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet2/subnets/BastionHostSubnet",
        },
        publicIPAddress: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/pipName",
        },
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the specified Bastion Host.
 *
 * @summary creates or updates the specified Bastion Host.
 * x-ms-original-file: 2026-01-01/BastionHostPutWithZones.json
 */
async function createBastionHostWithZones(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.bastionHosts.createOrUpdate("rg1", "bastionhosttenant", {
    ipConfigurations: [
      {
        name: "bastionHostIpConfiguration",
        publicIPAddress: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/pipName",
        },
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet2/subnets/BastionHostSubnet",
        },
      },
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createDeveloperBastionHost();
  await createBastionHost();
  await createBastionHostWithPrivateOnly();
  await createOrUpdateBastionHostWithSystemAssignedIdentityForSessionRecordingConfiguration();
  await createOrUpdateBastionHostWithUserAssignedIdentityForSessionRecordingConfiguration();
  await createBastionHostWithZones();
}

main().catch(console.error);

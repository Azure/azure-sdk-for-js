// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the specified Network Virtual Appliance.
 *
 * @summary creates or updates the specified Network Virtual Appliance.
 * x-ms-original-file: 2025-05-01/NetworkVirtualAppliancePut.json
 */
async function createNetworkVirtualAppliance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.createOrUpdate("rg1", "nva", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity1":
          {},
      },
    },
    location: "West US",
    additionalNics: [{ name: "exrsdwan", hasPublicIp: true }],
    bootStrapConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrbootstrapconfig",
    ],
    cloudInitConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrcloudinitconfig",
    ],
    internetIngressPublicIps: [
      {
        id: "/subscriptions/{{subscriptionId}}/resourceGroups/{{rg}}/providers/Microsoft.Network/publicIPAddresses/slbip",
      },
    ],
    networkProfile: {
      networkInterfaceConfigurations: [
        {
          nicType: "PublicNic",
          properties: {
            ipConfigurations: [
              { name: "publicnicipconfig", properties: { primary: true } },
              { name: "publicnicipconfig-2", properties: { primary: false } },
            ],
          },
        },
        {
          nicType: "PrivateNic",
          properties: {
            ipConfigurations: [
              { name: "privatenicipconfig", properties: { primary: true } },
              { name: "privatenicipconfig-2", properties: { primary: false } },
            ],
          },
        },
      ],
    },
    nvaSku: { bundledScaleUnit: "1", marketPlaceVersion: "12.1", vendor: "Cisco SDWAN" },
    virtualApplianceAsn: 10000,
    virtualHub: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/hub1",
    },
    tags: { key1: "value1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the specified Network Virtual Appliance.
 *
 * @summary creates or updates the specified Network Virtual Appliance.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceSaaSPut.json
 */
async function createSaaSNetworkVirtualAppliance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.createOrUpdate("rg1", "nva", {
    location: "West US",
    delegation: { serviceName: "PaloAltoNetworks.Cloudngfw/firewalls" },
    virtualHub: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/hub1",
    },
    tags: { key1: "value1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the specified Network Virtual Appliance.
 *
 * @summary creates or updates the specified Network Virtual Appliance.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceVnetAdditionalPrivatePut.json
 */
async function createNVAInVNetWithPrivateNicPublicNicAdditionalPrivateNic() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.createOrUpdate("rg1", "nva", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity1":
          {},
      },
    },
    location: "West US",
    bootStrapConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrbootstrapconfig",
    ],
    cloudInitConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrcloudinitconfig",
    ],
    nvaInterfaceConfigurations: [
      {
        name: "dataInterface",
        type: ["PrivateNic"],
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
        },
      },
      {
        name: "managementInterface",
        type: ["PublicNic"],
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet2",
        },
      },
      {
        name: "myAdditionalInterface",
        type: ["AdditionalPrivateNic"],
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet3",
        },
      },
    ],
    nvaSku: { bundledScaleUnit: "1", marketPlaceVersion: "latest", vendor: "Cisco SDWAN" },
    virtualApplianceAsn: 10000,
    tags: { key1: "value1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the specified Network Virtual Appliance.
 *
 * @summary creates or updates the specified Network Virtual Appliance.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceVnetAdditionalPublicPut.json
 */
async function createNVAInVNetWithPrivateNicPublicNicAdditionalPublicNic() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.createOrUpdate("rg1", "nva", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity1":
          {},
      },
    },
    location: "West US",
    bootStrapConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrbootstrapconfig",
    ],
    cloudInitConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrcloudinitconfig",
    ],
    nvaInterfaceConfigurations: [
      {
        name: "dataInterface",
        type: ["PrivateNic"],
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
        },
      },
      {
        name: "managementInterface",
        type: ["PublicNic"],
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet2",
        },
      },
      {
        name: "myAdditionalPublicInterface",
        type: ["AdditionalPublicNic"],
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet3",
        },
      },
    ],
    nvaSku: { bundledScaleUnit: "1", marketPlaceVersion: "latest", vendor: "Cisco SDWAN" },
    virtualApplianceAsn: 10000,
    tags: { key1: "value1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the specified Network Virtual Appliance.
 *
 * @summary creates or updates the specified Network Virtual Appliance.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceVnetBasicPut.json
 */
async function createNVAInVNetWithPrivateNicPublicNic() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.createOrUpdate("rg1", "nva", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity1":
          {},
      },
    },
    location: "West US",
    bootStrapConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrbootstrapconfig",
    ],
    cloudInitConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrcloudinitconfig",
    ],
    nvaInterfaceConfigurations: [
      {
        name: "dataInterface",
        type: ["PrivateNic"],
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
        },
      },
      {
        name: "managementInterface",
        type: ["PublicNic"],
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet2",
        },
      },
    ],
    nvaSku: { bundledScaleUnit: "1", marketPlaceVersion: "latest", vendor: "Cisco SDWAN" },
    virtualApplianceAsn: 10000,
    tags: { key1: "value1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the specified Network Virtual Appliance.
 *
 * @summary creates or updates the specified Network Virtual Appliance.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceVnetIngressPut.json
 */
async function createNVAInVNetWithPrivateNicPublicNicIncludingInternetIngress() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.createOrUpdate("rg1", "nva", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity1":
          {},
      },
    },
    location: "West US",
    bootStrapConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrbootstrapconfig",
    ],
    cloudInitConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrcloudinitconfig",
    ],
    internetIngressPublicIps: [
      {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/slbip",
      },
    ],
    nvaInterfaceConfigurations: [
      {
        name: "dataInterface",
        type: ["PrivateNic"],
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
        },
      },
      {
        name: "managementInterface",
        type: ["PublicNic"],
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet2",
        },
      },
    ],
    nvaSku: { bundledScaleUnit: "1", marketPlaceVersion: "latest", vendor: "Cisco SDWAN" },
    virtualApplianceAsn: 10000,
    tags: { key1: "value1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the specified Network Virtual Appliance.
 *
 * @summary creates or updates the specified Network Virtual Appliance.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceVnetNetworkProfilePut.json
 */
async function createNVAInVNetWithPrivateNicPublicNicIncludingNetworkProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.createOrUpdate("rg1", "nva", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity1":
          {},
      },
    },
    location: "West US",
    bootStrapConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrbootstrapconfig",
    ],
    cloudInitConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrcloudinitconfig",
    ],
    networkProfile: {
      networkInterfaceConfigurations: [
        {
          nicType: "PublicNic",
          properties: {
            ipConfigurations: [
              { name: "myPrimaryPublicIpConfig", properties: { primary: true } },
              { name: "myNonPrimaryPublicIpConfig", properties: { primary: false } },
            ],
          },
        },
        {
          nicType: "PrivateNic",
          properties: {
            ipConfigurations: [
              { name: "myPrimaryPrivateIpConfig", properties: { primary: true } },
              { name: "myNonPrimaryPrivateIpConfig", properties: { primary: false } },
            ],
          },
        },
      ],
    },
    nvaInterfaceConfigurations: [
      {
        name: "dataInterface",
        type: ["PrivateNic"],
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
        },
      },
      {
        name: "managementInterface",
        type: ["PublicNic"],
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet2",
        },
      },
    ],
    nvaSku: { bundledScaleUnit: "1", marketPlaceVersion: "latest", vendor: "Cisco SDWAN" },
    virtualApplianceAsn: 10000,
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main() {
  await createNetworkVirtualAppliance();
  await createSaaSNetworkVirtualAppliance();
  await createNVAInVNetWithPrivateNicPublicNicAdditionalPrivateNic();
  await createNVAInVNetWithPrivateNicPublicNicAdditionalPublicNic();
  await createNVAInVNetWithPrivateNicPublicNic();
  await createNVAInVNetWithPrivateNicPublicNicIncludingInternetIngress();
  await createNVAInVNetWithPrivateNicPublicNicIncludingNetworkProfile();
}

main().catch(console.error);

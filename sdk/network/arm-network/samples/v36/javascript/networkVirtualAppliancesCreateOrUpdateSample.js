// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates the specified Network Virtual Appliance.
 *
 * @summary Creates or updates the specified Network Virtual Appliance.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkVirtualApplianceVnetBasicPut.json
 */
async function createNvaInVNetWithPrivateNicPublicNic() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkVirtualApplianceName = "nva";
  const parameters = {
    bootStrapConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrbootstrapconfig",
    ],
    cloudInitConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrcloudinitconfig",
    ],
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/subid/resourcegroups/rg1/providers/MicrosoftManagedIdentity/userAssignedIdentities/identity1":
          {},
      },
    },
    location: "West US",
    nvaInterfaceConfigurations: [
      {
        name: "dataInterface",
        type: ["PrivateNic"],
        subnet: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
        },
      },
      {
        name: "managementInterface",
        type: ["PublicNic"],
        subnet: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet2",
        },
      },
    ],
    nvaSku: {
      bundledScaleUnit: "1",
      marketPlaceVersion: "latest",
      vendor: "Cisco SDWAN",
    },
    tags: { key1: "value1" },
    virtualApplianceAsn: 10000,
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.beginCreateOrUpdateAndWait(
    resourceGroupName,
    networkVirtualApplianceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates the specified Network Virtual Appliance.
 *
 * @summary Creates or updates the specified Network Virtual Appliance.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkVirtualApplianceVnetIngressPut.json
 */
async function createNvaInVNetWithPrivateNicPublicNicIncludingInternetIngress() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkVirtualApplianceName = "nva";
  const parameters = {
    bootStrapConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrbootstrapconfig",
    ],
    cloudInitConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrcloudinitconfig",
    ],
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/subid/resourcegroups/rg1/providers/MicrosoftManagedIdentity/userAssignedIdentities/identity1":
          {},
      },
    },
    internetIngressPublicIps: [
      {
        id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/slbip",
      },
    ],
    location: "West US",
    nvaInterfaceConfigurations: [
      {
        name: "dataInterface",
        type: ["PrivateNic"],
        subnet: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
        },
      },
      {
        name: "managementInterface",
        type: ["PublicNic"],
        subnet: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet2",
        },
      },
    ],
    nvaSku: {
      bundledScaleUnit: "1",
      marketPlaceVersion: "latest",
      vendor: "Cisco SDWAN",
    },
    tags: { key1: "value1" },
    virtualApplianceAsn: 10000,
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.beginCreateOrUpdateAndWait(
    resourceGroupName,
    networkVirtualApplianceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates the specified Network Virtual Appliance.
 *
 * @summary Creates or updates the specified Network Virtual Appliance.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkVirtualApplianceVnetNetworkProfilePut.json
 */
async function createNvaInVNetWithPrivateNicPublicNicIncludingNetworkProfile() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkVirtualApplianceName = "nva";
  const parameters = {
    bootStrapConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrbootstrapconfig",
    ],
    cloudInitConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrcloudinitconfig",
    ],
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/subid/resourcegroups/rg1/providers/MicrosoftManagedIdentity/userAssignedIdentities/identity1":
          {},
      },
    },
    location: "West US",
    networkProfile: {
      networkInterfaceConfigurations: [
        {
          nicType: "PublicNic",
          properties: {
            ipConfigurations: [
              {
                name: "myPrimaryPublicIpConfig",
                properties: { primary: true },
              },
              {
                name: "myNonPrimaryPublicIpConfig",
                properties: { primary: false },
              },
            ],
          },
        },
        {
          nicType: "PrivateNic",
          properties: {
            ipConfigurations: [
              {
                name: "myPrimaryPrivateIpConfig",
                properties: { primary: true },
              },
              {
                name: "myNonPrimaryPrivateIpConfig",
                properties: { primary: false },
              },
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
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
        },
      },
      {
        name: "managementInterface",
        type: ["PublicNic"],
        subnet: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet2",
        },
      },
    ],
    nvaSku: {
      bundledScaleUnit: "1",
      marketPlaceVersion: "latest",
      vendor: "Cisco SDWAN",
    },
    tags: { key1: "value1" },
    virtualApplianceAsn: 10000,
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.beginCreateOrUpdateAndWait(
    resourceGroupName,
    networkVirtualApplianceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates the specified Network Virtual Appliance.
 *
 * @summary Creates or updates the specified Network Virtual Appliance.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkVirtualApplianceVnetAdditionalPrivatePut.json
 */
async function createNvaInVNetWithPrivateNicPublicNicAdditionalPrivateNic() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkVirtualApplianceName = "nva";
  const parameters = {
    bootStrapConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrbootstrapconfig",
    ],
    cloudInitConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrcloudinitconfig",
    ],
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/subid/resourcegroups/rg1/providers/MicrosoftManagedIdentity/userAssignedIdentities/identity1":
          {},
      },
    },
    location: "West US",
    nvaInterfaceConfigurations: [
      {
        name: "dataInterface",
        type: ["PrivateNic"],
        subnet: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
        },
      },
      {
        name: "managementInterface",
        type: ["PublicNic"],
        subnet: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet2",
        },
      },
      {
        name: "myAdditionalInterface",
        type: ["AdditionalPrivateNic"],
        subnet: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet3",
        },
      },
    ],
    nvaSku: {
      bundledScaleUnit: "1",
      marketPlaceVersion: "latest",
      vendor: "Cisco SDWAN",
    },
    tags: { key1: "value1" },
    virtualApplianceAsn: 10000,
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.beginCreateOrUpdateAndWait(
    resourceGroupName,
    networkVirtualApplianceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates the specified Network Virtual Appliance.
 *
 * @summary Creates or updates the specified Network Virtual Appliance.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkVirtualApplianceVnetAdditionalPublicPut.json
 */
async function createNvaInVNetWithPrivateNicPublicNicAdditionalPublicNic() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkVirtualApplianceName = "nva";
  const parameters = {
    bootStrapConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrbootstrapconfig",
    ],
    cloudInitConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrcloudinitconfig",
    ],
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/subid/resourcegroups/rg1/providers/MicrosoftManagedIdentity/userAssignedIdentities/identity1":
          {},
      },
    },
    location: "West US",
    nvaInterfaceConfigurations: [
      {
        name: "dataInterface",
        type: ["PrivateNic"],
        subnet: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
        },
      },
      {
        name: "managementInterface",
        type: ["PublicNic"],
        subnet: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet2",
        },
      },
      {
        name: "myAdditionalPublicInterface",
        type: ["AdditionalPublicNic"],
        subnet: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet3",
        },
      },
    ],
    nvaSku: {
      bundledScaleUnit: "1",
      marketPlaceVersion: "latest",
      vendor: "Cisco SDWAN",
    },
    tags: { key1: "value1" },
    virtualApplianceAsn: 10000,
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.beginCreateOrUpdateAndWait(
    resourceGroupName,
    networkVirtualApplianceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates the specified Network Virtual Appliance.
 *
 * @summary Creates or updates the specified Network Virtual Appliance.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkVirtualAppliancePut.json
 */
async function createNetworkVirtualAppliance() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkVirtualApplianceName = "nva";
  const parameters = {
    additionalNics: [{ name: "exrsdwan", hasPublicIp: true }],
    bootStrapConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrbootstrapconfig",
    ],
    cloudInitConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrcloudinitconfig",
    ],
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/subid/resourcegroups/rg1/providers/MicrosoftManagedIdentity/userAssignedIdentities/identity1":
          {},
      },
    },
    internetIngressPublicIps: [
      {
        id: "/subscriptions/{{subscriptionId}}/resourceGroups/{{rg}}/providers/Microsoft.Network/publicIPAddresses/slbip",
      },
    ],
    location: "West US",
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
    nvaSku: {
      bundledScaleUnit: "1",
      marketPlaceVersion: "12.1",
      vendor: "Cisco SDWAN",
    },
    tags: { key1: "value1" },
    virtualApplianceAsn: 10000,
    virtualHub: {
      id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/hub1",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.beginCreateOrUpdateAndWait(
    resourceGroupName,
    networkVirtualApplianceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates the specified Network Virtual Appliance.
 *
 * @summary Creates or updates the specified Network Virtual Appliance.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkVirtualApplianceSaaSPut.json
 */
async function createSaaSNetworkVirtualAppliance() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkVirtualApplianceName = "nva";
  const parameters = {
    delegation: { serviceName: "PaloAltoNetworks.Cloudngfw/firewalls" },
    location: "West US",
    tags: { key1: "value1" },
    virtualHub: {
      id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/hub1",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.beginCreateOrUpdateAndWait(
    resourceGroupName,
    networkVirtualApplianceName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createNvaInVNetWithPrivateNicPublicNic();
  await createNvaInVNetWithPrivateNicPublicNicIncludingInternetIngress();
  await createNvaInVNetWithPrivateNicPublicNicIncludingNetworkProfile();
  await createNvaInVNetWithPrivateNicPublicNicAdditionalPrivateNic();
  await createNvaInVNetWithPrivateNicPublicNicAdditionalPublicNic();
  await createNetworkVirtualAppliance();
  await createSaaSNetworkVirtualAppliance();
}

main().catch(console.error);

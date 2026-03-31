// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the specified Azure Firewall.
 *
 * @summary creates or updates the specified Azure Firewall.
 * x-ms-original-file: 2025-05-01/AzureFirewallPut.json
 */
async function createAzureFirewall() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.azureFirewalls.createOrUpdate("rg1", "azurefirewall", {
    location: "West US",
    applicationRuleCollections: [
      {
        name: "apprulecoll",
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/azureFirewalls/azurefirewall/applicationRuleCollections/apprulecoll",
        action: { type: "Deny" },
        priority: 110,
        rules: [
          {
            name: "rule1",
            description: "Deny inbound rule",
            protocols: [{ port: 443, protocolType: "Https" }],
            sourceAddresses: ["216.58.216.164", "10.0.0.0/24"],
            targetFqdns: ["www.test.com"],
          },
        ],
      },
    ],
    ipConfigurations: [
      {
        name: "azureFirewallIpConfiguration",
        publicIPAddress: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/pipName",
        },
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet2/subnets/AzureFirewallSubnet",
        },
      },
    ],
    natRuleCollections: [
      {
        name: "natrulecoll",
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/azureFirewalls/azurefirewall/natRuleCollections/natrulecoll",
        action: { type: "Dnat" },
        priority: 112,
        rules: [
          {
            name: "DNAT-HTTPS-traffic",
            description: "D-NAT all outbound web traffic for inspection",
            destinationAddresses: ["1.2.3.4"],
            destinationPorts: ["443"],
            protocols: ["TCP"],
            sourceAddresses: ["*"],
            translatedAddress: "1.2.3.5",
            translatedPort: "8443",
          },
          {
            name: "DNAT-HTTP-traffic-With-FQDN",
            description: "D-NAT all inbound web traffic for inspection",
            destinationAddresses: ["1.2.3.4"],
            destinationPorts: ["80"],
            protocols: ["TCP"],
            sourceAddresses: ["*"],
            translatedFqdn: "internalhttpserver",
            translatedPort: "880",
          },
        ],
      },
    ],
    networkRuleCollections: [
      {
        name: "netrulecoll",
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/azureFirewalls/azurefirewall/networkRuleCollections/netrulecoll",
        action: { type: "Deny" },
        priority: 112,
        rules: [
          {
            name: "L4-traffic",
            description: "Block traffic based on source IPs and ports",
            destinationAddresses: ["*"],
            destinationPorts: ["443-444", "8443"],
            protocols: ["TCP"],
            sourceAddresses: ["192.168.1.1-192.168.1.12", "10.1.4.12-10.1.4.255"],
          },
          {
            name: "L4-traffic-with-FQDN",
            description: "Block traffic based on source IPs and ports to amazon",
            destinationFqdns: ["www.amazon.com"],
            destinationPorts: ["443-444", "8443"],
            protocols: ["TCP"],
            sourceAddresses: ["10.2.4.12-10.2.4.255"],
          },
        ],
      },
    ],
    sku: { name: "AZFW_VNet", tier: "Standard" },
    threatIntelMode: "Alert",
    tags: { key1: "value1" },
    zones: [],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the specified Azure Firewall.
 *
 * @summary creates or updates the specified Azure Firewall.
 * x-ms-original-file: 2025-05-01/AzureFirewallPutInHub.json
 */
async function createAzureFirewallInVirtualHub() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.azureFirewalls.createOrUpdate("rg1", "azurefirewall", {
    location: "West US",
    firewallPolicy: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/firewallPolicies/policy1",
    },
    hubIPAddresses: { publicIPs: { addresses: [], count: 1 } },
    sku: { name: "AZFW_Hub", tier: "Standard" },
    threatIntelMode: "Alert",
    virtualHub: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/hub1",
    },
    tags: { key1: "value1" },
    zones: [],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the specified Azure Firewall.
 *
 * @summary creates or updates the specified Azure Firewall.
 * x-ms-original-file: 2025-05-01/AzureFirewallPutWithAdditionalProperties.json
 */
async function createAzureFirewallWithAdditionalProperties() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.azureFirewalls.createOrUpdate("rg1", "azurefirewall", {
    location: "West US",
    additionalProperties: { key1: "value1", key2: "value2" },
    applicationRuleCollections: [
      {
        name: "apprulecoll",
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/azureFirewalls/azurefirewall/applicationRuleCollections/apprulecoll",
        action: { type: "Deny" },
        priority: 110,
        rules: [
          {
            name: "rule1",
            description: "Deny inbound rule",
            protocols: [{ port: 443, protocolType: "Https" }],
            sourceAddresses: ["216.58.216.164", "10.0.0.0/24"],
            targetFqdns: ["www.test.com"],
          },
        ],
      },
    ],
    ipConfigurations: [
      {
        name: "azureFirewallIpConfiguration",
        publicIPAddress: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/pipName",
        },
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet2/subnets/AzureFirewallSubnet",
        },
      },
    ],
    natRuleCollections: [
      {
        name: "natrulecoll",
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/azureFirewalls/azurefirewall/natRuleCollections/natrulecoll",
        action: { type: "Dnat" },
        priority: 112,
        rules: [
          {
            name: "DNAT-HTTPS-traffic",
            description: "D-NAT all outbound web traffic for inspection",
            destinationAddresses: ["1.2.3.4"],
            destinationPorts: ["443"],
            protocols: ["TCP"],
            sourceAddresses: ["*"],
            translatedAddress: "1.2.3.5",
            translatedPort: "8443",
          },
          {
            name: "DNAT-HTTP-traffic-With-FQDN",
            description: "D-NAT all inbound web traffic for inspection",
            destinationAddresses: ["1.2.3.4"],
            destinationPorts: ["80"],
            protocols: ["TCP"],
            sourceAddresses: ["*"],
            translatedFqdn: "internalhttpserver",
            translatedPort: "880",
          },
        ],
      },
    ],
    networkRuleCollections: [
      {
        name: "netrulecoll",
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/azureFirewalls/azurefirewall/networkRuleCollections/netrulecoll",
        action: { type: "Deny" },
        priority: 112,
        rules: [
          {
            name: "L4-traffic",
            description: "Block traffic based on source IPs and ports",
            destinationAddresses: ["*"],
            destinationPorts: ["443-444", "8443"],
            protocols: ["TCP"],
            sourceAddresses: ["192.168.1.1-192.168.1.12", "10.1.4.12-10.1.4.255"],
          },
          {
            name: "L4-traffic-with-FQDN",
            description: "Block traffic based on source IPs and ports to amazon",
            destinationFqdns: ["www.amazon.com"],
            destinationPorts: ["443-444", "8443"],
            protocols: ["TCP"],
            sourceAddresses: ["10.2.4.12-10.2.4.255"],
          },
        ],
      },
    ],
    sku: { name: "AZFW_VNet", tier: "Standard" },
    threatIntelMode: "Alert",
    tags: { key1: "value1" },
    zones: [],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the specified Azure Firewall.
 *
 * @summary creates or updates the specified Azure Firewall.
 * x-ms-original-file: 2025-05-01/AzureFirewallPutWithIpGroups.json
 */
async function createAzureFirewallWithIpGroups() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.azureFirewalls.createOrUpdate("rg1", "azurefirewall", {
    location: "West US",
    applicationRuleCollections: [
      {
        name: "apprulecoll",
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/azureFirewalls/azurefirewall/applicationRuleCollections/apprulecoll",
        action: { type: "Deny" },
        priority: 110,
        rules: [
          {
            name: "rule1",
            description: "Deny inbound rule",
            protocols: [{ port: 443, protocolType: "Https" }],
            sourceAddresses: ["216.58.216.164", "10.0.0.0/24"],
            targetFqdns: ["www.test.com"],
          },
        ],
      },
    ],
    ipConfigurations: [
      {
        name: "azureFirewallIpConfiguration",
        publicIPAddress: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/pipName",
        },
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet2/subnets/AzureFirewallSubnet",
        },
      },
    ],
    natRuleCollections: [
      {
        name: "natrulecoll",
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/azureFirewalls/azurefirewall/natRuleCollections/natrulecoll",
        action: { type: "Dnat" },
        priority: 112,
        rules: [
          {
            name: "DNAT-HTTPS-traffic",
            description: "D-NAT all outbound web traffic for inspection",
            destinationAddresses: ["1.2.3.4"],
            destinationPorts: ["443"],
            protocols: ["TCP"],
            sourceAddresses: ["*"],
            translatedAddress: "1.2.3.5",
            translatedPort: "8443",
          },
          {
            name: "DNAT-HTTP-traffic-With-FQDN",
            description: "D-NAT all inbound web traffic for inspection",
            destinationAddresses: ["1.2.3.4"],
            destinationPorts: ["80"],
            protocols: ["TCP"],
            sourceAddresses: ["*"],
            translatedFqdn: "internalhttpserver",
            translatedPort: "880",
          },
        ],
      },
    ],
    networkRuleCollections: [
      {
        name: "netrulecoll",
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/azureFirewalls/azurefirewall/networkRuleCollections/netrulecoll",
        action: { type: "Deny" },
        priority: 112,
        rules: [
          {
            name: "L4-traffic",
            description: "Block traffic based on source IPs and ports",
            destinationAddresses: ["*"],
            destinationPorts: ["443-444", "8443"],
            protocols: ["TCP"],
            sourceAddresses: ["192.168.1.1-192.168.1.12", "10.1.4.12-10.1.4.255"],
          },
          {
            name: "L4-traffic-with-FQDN",
            description: "Block traffic based on source IPs and ports to amazon",
            destinationFqdns: ["www.amazon.com"],
            destinationPorts: ["443-444", "8443"],
            protocols: ["TCP"],
            sourceAddresses: ["10.2.4.12-10.2.4.255"],
          },
        ],
      },
    ],
    sku: { name: "AZFW_VNet", tier: "Standard" },
    threatIntelMode: "Alert",
    tags: { key1: "value1" },
    zones: [],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the specified Azure Firewall.
 *
 * @summary creates or updates the specified Azure Firewall.
 * x-ms-original-file: 2025-05-01/AzureFirewallPutWithMgmtSubnet.json
 */
async function createAzureFirewallWithManagementSubnet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.azureFirewalls.createOrUpdate("rg1", "azurefirewall", {
    location: "West US",
    applicationRuleCollections: [
      {
        name: "apprulecoll",
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/azureFirewalls/azurefirewall/applicationRuleCollections/apprulecoll",
        action: { type: "Deny" },
        priority: 110,
        rules: [
          {
            name: "rule1",
            description: "Deny inbound rule",
            protocols: [{ port: 443, protocolType: "Https" }],
            sourceAddresses: ["216.58.216.164", "10.0.0.0/24"],
            targetFqdns: ["www.test.com"],
          },
        ],
      },
    ],
    ipConfigurations: [
      {
        name: "azureFirewallIpConfiguration",
        publicIPAddress: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/pipName",
        },
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet2/subnets/AzureFirewallSubnet",
        },
      },
    ],
    managementIpConfiguration: {
      name: "azureFirewallMgmtIpConfiguration",
      publicIPAddress: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/managementPipName",
      },
      subnet: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet2/subnets/AzureFirewallManagementSubnet",
      },
    },
    natRuleCollections: [
      {
        name: "natrulecoll",
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/azureFirewalls/azurefirewall/natRuleCollections/natrulecoll",
        action: { type: "Dnat" },
        priority: 112,
        rules: [
          {
            name: "DNAT-HTTPS-traffic",
            description: "D-NAT all outbound web traffic for inspection",
            destinationAddresses: ["1.2.3.4"],
            destinationPorts: ["443"],
            protocols: ["TCP"],
            sourceAddresses: ["*"],
            translatedAddress: "1.2.3.5",
            translatedPort: "8443",
          },
          {
            name: "DNAT-HTTP-traffic-With-FQDN",
            description: "D-NAT all inbound web traffic for inspection",
            destinationAddresses: ["1.2.3.4"],
            destinationPorts: ["80"],
            protocols: ["TCP"],
            sourceAddresses: ["*"],
            translatedFqdn: "internalhttpserver",
            translatedPort: "880",
          },
        ],
      },
    ],
    networkRuleCollections: [
      {
        name: "netrulecoll",
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/azureFirewalls/azurefirewall/networkRuleCollections/netrulecoll",
        action: { type: "Deny" },
        priority: 112,
        rules: [
          {
            name: "L4-traffic",
            description: "Block traffic based on source IPs and ports",
            destinationAddresses: ["*"],
            destinationPorts: ["443-444", "8443"],
            protocols: ["TCP"],
            sourceAddresses: ["192.168.1.1-192.168.1.12", "10.1.4.12-10.1.4.255"],
          },
          {
            name: "L4-traffic-with-FQDN",
            description: "Block traffic based on source IPs and ports to amazon",
            destinationFqdns: ["www.amazon.com"],
            destinationPorts: ["443-444", "8443"],
            protocols: ["TCP"],
            sourceAddresses: ["10.2.4.12-10.2.4.255"],
          },
        ],
      },
    ],
    sku: { name: "AZFW_VNet", tier: "Standard" },
    threatIntelMode: "Alert",
    tags: { key1: "value1" },
    zones: [],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the specified Azure Firewall.
 *
 * @summary creates or updates the specified Azure Firewall.
 * x-ms-original-file: 2025-05-01/AzureFirewallPutWithZones.json
 */
async function createAzureFirewallWithZones() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.azureFirewalls.createOrUpdate("rg1", "azurefirewall", {
    location: "West US 2",
    applicationRuleCollections: [
      {
        name: "apprulecoll",
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/azureFirewalls/azurefirewall/applicationRuleCollections/apprulecoll",
        action: { type: "Deny" },
        priority: 110,
        rules: [
          {
            name: "rule1",
            description: "Deny inbound rule",
            protocols: [{ port: 443, protocolType: "Https" }],
            sourceAddresses: ["216.58.216.164", "10.0.0.0/24"],
            targetFqdns: ["www.test.com"],
          },
        ],
      },
    ],
    ipConfigurations: [
      {
        name: "azureFirewallIpConfiguration",
        publicIPAddress: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/pipName",
        },
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet2/subnets/AzureFirewallSubnet",
        },
      },
    ],
    natRuleCollections: [
      {
        name: "natrulecoll",
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/azureFirewalls/azurefirewall/natRuleCollections/natrulecoll",
        action: { type: "Dnat" },
        priority: 112,
        rules: [
          {
            name: "DNAT-HTTPS-traffic",
            description: "D-NAT all outbound web traffic for inspection",
            destinationAddresses: ["1.2.3.4"],
            destinationPorts: ["443"],
            protocols: ["TCP"],
            sourceAddresses: ["*"],
            translatedAddress: "1.2.3.5",
            translatedPort: "8443",
          },
          {
            name: "DNAT-HTTP-traffic-With-FQDN",
            description: "D-NAT all inbound web traffic for inspection",
            destinationAddresses: ["1.2.3.4"],
            destinationPorts: ["80"],
            protocols: ["TCP"],
            sourceAddresses: ["*"],
            translatedFqdn: "internalhttpserver",
            translatedPort: "880",
          },
        ],
      },
    ],
    networkRuleCollections: [
      {
        name: "netrulecoll",
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/azureFirewalls/azurefirewall/networkRuleCollections/netrulecoll",
        action: { type: "Deny" },
        priority: 112,
        rules: [
          {
            name: "L4-traffic",
            description: "Block traffic based on source IPs and ports",
            destinationAddresses: ["*"],
            destinationPorts: ["443-444", "8443"],
            protocols: ["TCP"],
            sourceAddresses: ["192.168.1.1-192.168.1.12", "10.1.4.12-10.1.4.255"],
          },
          {
            name: "L4-traffic-with-FQDN",
            description: "Block traffic based on source IPs and ports to amazon",
            destinationFqdns: ["www.amazon.com"],
            destinationPorts: ["443-444", "8443"],
            protocols: ["TCP"],
            sourceAddresses: ["10.2.4.12-10.2.4.255"],
          },
        ],
      },
    ],
    sku: { name: "AZFW_VNet", tier: "Standard" },
    threatIntelMode: "Alert",
    tags: { key1: "value1" },
    zones: ["1", "2", "3"],
  });
  console.log(result);
}

async function main() {
  await createAzureFirewall();
  await createAzureFirewallInVirtualHub();
  await createAzureFirewallWithAdditionalProperties();
  await createAzureFirewallWithIpGroups();
  await createAzureFirewallWithManagementSubnet();
  await createAzureFirewallWithZones();
}

main().catch(console.error);

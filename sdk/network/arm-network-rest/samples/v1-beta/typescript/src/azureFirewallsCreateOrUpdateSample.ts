// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  AzureFirewallsCreateOrUpdateParameters,
  getLongRunningPoller
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates the specified Azure Firewall.
 *
 * @summary Creates or updates the specified Azure Firewall.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/AzureFirewallPut.json
 */
async function createAzureFirewall() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const azureFirewallName = "azurefirewall";
  const options: AzureFirewallsCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        applicationRuleCollections: [
          {
            name: "apprulecoll",
            properties: {
              action: { type: "Deny" },
              priority: 110,
              rules: [
                {
                  name: "rule1",
                  description: "Deny inbound rule",
                  protocols: [{ port: 443, protocolType: "Https" }],
                  sourceAddresses: ["216.58.216.164", "10.0.0.0/24"],
                  targetFqdns: ["www.test.com"]
                }
              ]
            }
          }
        ],
        ipConfigurations: [
          {
            name: "azureFirewallIpConfiguration",
            properties: {
              publicIPAddress: {
                id:
                  "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/pipName"
              },
              subnet: {
                id:
                  "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet2/subnets/AzureFirewallSubnet"
              }
            }
          }
        ],
        natRuleCollections: [
          {
            name: "natrulecoll",
            properties: {
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
                  translatedPort: "8443"
                },
                {
                  name: "DNAT-HTTP-traffic-With-FQDN",
                  description: "D-NAT all inbound web traffic for inspection",
                  destinationAddresses: ["1.2.3.4"],
                  destinationPorts: ["80"],
                  protocols: ["TCP"],
                  sourceAddresses: ["*"],
                  translatedFqdn: "internalhttpserver",
                  translatedPort: "880"
                }
              ]
            }
          }
        ],
        networkRuleCollections: [
          {
            name: "netrulecoll",
            properties: {
              action: { type: "Deny" },
              priority: 112,
              rules: [
                {
                  name: "L4-traffic",
                  description: "Block traffic based on source IPs and ports",
                  destinationAddresses: ["*"],
                  destinationPorts: ["443-444", "8443"],
                  protocols: ["TCP"],
                  sourceAddresses: [
                    "192.168.1.1-192.168.1.12",
                    "10.1.4.12-10.1.4.255"
                  ]
                },
                {
                  name: "L4-traffic-with-FQDN",
                  description:
                    "Block traffic based on source IPs and ports to amazon",
                  destinationFqdns: ["www.amazon.com"],
                  destinationPorts: ["443-444", "8443"],
                  protocols: ["TCP"],
                  sourceAddresses: ["10.2.4.12-10.2.4.255"]
                }
              ]
            }
          }
        ],
        sku: { name: "AZFW_VNet", tier: "Standard" },
        threatIntelMode: "Alert"
      },
      tags: { key1: "value1" },
      zones: []
    },
    queryParameters: { "api-version": "2022-05-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}",
      subscriptionId,
      resourceGroupName,
      azureFirewallName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAzureFirewall().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates the specified Azure Firewall.
 *
 * @summary Creates or updates the specified Azure Firewall.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/AzureFirewallPutWithAdditionalProperties.json
 */
async function createAzureFirewallWithAdditionalProperties() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const azureFirewallName = "azurefirewall";
  const options: AzureFirewallsCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        additionalProperties: { key1: "value1", key2: "value2" },
        applicationRuleCollections: [
          {
            name: "apprulecoll",
            properties: {
              action: { type: "Deny" },
              priority: 110,
              rules: [
                {
                  name: "rule1",
                  description: "Deny inbound rule",
                  protocols: [{ port: 443, protocolType: "Https" }],
                  sourceAddresses: ["216.58.216.164", "10.0.0.0/24"],
                  targetFqdns: ["www.test.com"]
                }
              ]
            }
          }
        ],
        ipConfigurations: [
          {
            name: "azureFirewallIpConfiguration",
            properties: {
              publicIPAddress: {
                id:
                  "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/pipName"
              },
              subnet: {
                id:
                  "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet2/subnets/AzureFirewallSubnet"
              }
            }
          }
        ],
        ipGroups: [],
        natRuleCollections: [
          {
            name: "natrulecoll",
            properties: {
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
                  translatedPort: "8443"
                },
                {
                  name: "DNAT-HTTP-traffic-With-FQDN",
                  description: "D-NAT all inbound web traffic for inspection",
                  destinationAddresses: ["1.2.3.4"],
                  destinationPorts: ["80"],
                  protocols: ["TCP"],
                  sourceAddresses: ["*"],
                  translatedFqdn: "internalhttpserver",
                  translatedPort: "880"
                }
              ]
            }
          }
        ],
        networkRuleCollections: [
          {
            name: "netrulecoll",
            properties: {
              action: { type: "Deny" },
              priority: 112,
              rules: [
                {
                  name: "L4-traffic",
                  description: "Block traffic based on source IPs and ports",
                  destinationAddresses: ["*"],
                  destinationPorts: ["443-444", "8443"],
                  protocols: ["TCP"],
                  sourceAddresses: [
                    "192.168.1.1-192.168.1.12",
                    "10.1.4.12-10.1.4.255"
                  ]
                },
                {
                  name: "L4-traffic-with-FQDN",
                  description:
                    "Block traffic based on source IPs and ports to amazon",
                  destinationFqdns: ["www.amazon.com"],
                  destinationPorts: ["443-444", "8443"],
                  protocols: ["TCP"],
                  sourceAddresses: ["10.2.4.12-10.2.4.255"]
                }
              ]
            }
          }
        ],
        sku: { name: "AZFW_VNet", tier: "Standard" },
        threatIntelMode: "Alert"
      },
      tags: { key1: "value1" },
      zones: []
    },
    queryParameters: { "api-version": "2022-05-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}",
      subscriptionId,
      resourceGroupName,
      azureFirewallName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAzureFirewallWithAdditionalProperties().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates the specified Azure Firewall.
 *
 * @summary Creates or updates the specified Azure Firewall.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/AzureFirewallPutWithIpGroups.json
 */
async function createAzureFirewallWithIPGroups() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const azureFirewallName = "azurefirewall";
  const options: AzureFirewallsCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        applicationRuleCollections: [
          {
            name: "apprulecoll",
            properties: {
              action: { type: "Deny" },
              priority: 110,
              rules: [
                {
                  name: "rule1",
                  description: "Deny inbound rule",
                  protocols: [{ port: 443, protocolType: "Https" }],
                  sourceAddresses: ["216.58.216.164", "10.0.0.0/24"],
                  targetFqdns: ["www.test.com"]
                }
              ]
            }
          }
        ],
        ipConfigurations: [
          {
            name: "azureFirewallIpConfiguration",
            properties: {
              publicIPAddress: {
                id:
                  "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/pipName"
              },
              subnet: {
                id:
                  "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet2/subnets/AzureFirewallSubnet"
              }
            }
          }
        ],
        natRuleCollections: [
          {
            name: "natrulecoll",
            properties: {
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
                  translatedPort: "8443"
                },
                {
                  name: "DNAT-HTTP-traffic-With-FQDN",
                  description: "D-NAT all inbound web traffic for inspection",
                  destinationAddresses: ["1.2.3.4"],
                  destinationPorts: ["80"],
                  protocols: ["TCP"],
                  sourceAddresses: ["*"],
                  translatedFqdn: "internalhttpserver",
                  translatedPort: "880"
                }
              ]
            }
          }
        ],
        networkRuleCollections: [
          {
            name: "netrulecoll",
            properties: {
              action: { type: "Deny" },
              priority: 112,
              rules: [
                {
                  name: "L4-traffic",
                  description: "Block traffic based on source IPs and ports",
                  destinationAddresses: ["*"],
                  destinationPorts: ["443-444", "8443"],
                  protocols: ["TCP"],
                  sourceAddresses: [
                    "192.168.1.1-192.168.1.12",
                    "10.1.4.12-10.1.4.255"
                  ]
                },
                {
                  name: "L4-traffic-with-FQDN",
                  description:
                    "Block traffic based on source IPs and ports to amazon",
                  destinationFqdns: ["www.amazon.com"],
                  destinationPorts: ["443-444", "8443"],
                  protocols: ["TCP"],
                  sourceAddresses: ["10.2.4.12-10.2.4.255"]
                }
              ]
            }
          }
        ],
        sku: { name: "AZFW_VNet", tier: "Standard" },
        threatIntelMode: "Alert"
      },
      tags: { key1: "value1" },
      zones: []
    },
    queryParameters: { "api-version": "2022-05-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}",
      subscriptionId,
      resourceGroupName,
      azureFirewallName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAzureFirewallWithIPGroups().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates the specified Azure Firewall.
 *
 * @summary Creates or updates the specified Azure Firewall.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/AzureFirewallPutWithZones.json
 */
async function createAzureFirewallWithZones() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const azureFirewallName = "azurefirewall";
  const options: AzureFirewallsCreateOrUpdateParameters = {
    body: {
      location: "West US 2",
      properties: {
        applicationRuleCollections: [
          {
            name: "apprulecoll",
            properties: {
              action: { type: "Deny" },
              priority: 110,
              rules: [
                {
                  name: "rule1",
                  description: "Deny inbound rule",
                  protocols: [{ port: 443, protocolType: "Https" }],
                  sourceAddresses: ["216.58.216.164", "10.0.0.0/24"],
                  targetFqdns: ["www.test.com"]
                }
              ]
            }
          }
        ],
        ipConfigurations: [
          {
            name: "azureFirewallIpConfiguration",
            properties: {
              publicIPAddress: {
                id:
                  "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/pipName"
              },
              subnet: {
                id:
                  "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet2/subnets/AzureFirewallSubnet"
              }
            }
          }
        ],
        natRuleCollections: [
          {
            name: "natrulecoll",
            properties: {
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
                  translatedPort: "8443"
                },
                {
                  name: "DNAT-HTTP-traffic-With-FQDN",
                  description: "D-NAT all inbound web traffic for inspection",
                  destinationAddresses: ["1.2.3.4"],
                  destinationPorts: ["80"],
                  protocols: ["TCP"],
                  sourceAddresses: ["*"],
                  translatedFqdn: "internalhttpserver",
                  translatedPort: "880"
                }
              ]
            }
          }
        ],
        networkRuleCollections: [
          {
            name: "netrulecoll",
            properties: {
              action: { type: "Deny" },
              priority: 112,
              rules: [
                {
                  name: "L4-traffic",
                  description: "Block traffic based on source IPs and ports",
                  destinationAddresses: ["*"],
                  destinationPorts: ["443-444", "8443"],
                  protocols: ["TCP"],
                  sourceAddresses: [
                    "192.168.1.1-192.168.1.12",
                    "10.1.4.12-10.1.4.255"
                  ]
                },
                {
                  name: "L4-traffic-with-FQDN",
                  description:
                    "Block traffic based on source IPs and ports to amazon",
                  destinationFqdns: ["www.amazon.com"],
                  destinationPorts: ["443-444", "8443"],
                  protocols: ["TCP"],
                  sourceAddresses: ["10.2.4.12-10.2.4.255"]
                }
              ]
            }
          }
        ],
        sku: { name: "AZFW_VNet", tier: "Standard" },
        threatIntelMode: "Alert"
      },
      tags: { key1: "value1" },
      zones: ["1", "2", "3"]
    },
    queryParameters: { "api-version": "2022-05-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}",
      subscriptionId,
      resourceGroupName,
      azureFirewallName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAzureFirewallWithZones().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates the specified Azure Firewall.
 *
 * @summary Creates or updates the specified Azure Firewall.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/AzureFirewallPutWithMgmtSubnet.json
 */
async function createAzureFirewallWithManagementSubnet() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const azureFirewallName = "azurefirewall";
  const options: AzureFirewallsCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        applicationRuleCollections: [
          {
            name: "apprulecoll",
            properties: {
              action: { type: "Deny" },
              priority: 110,
              rules: [
                {
                  name: "rule1",
                  description: "Deny inbound rule",
                  protocols: [{ port: 443, protocolType: "Https" }],
                  sourceAddresses: ["216.58.216.164", "10.0.0.0/24"],
                  targetFqdns: ["www.test.com"]
                }
              ]
            }
          }
        ],
        ipConfigurations: [
          {
            name: "azureFirewallIpConfiguration",
            properties: {
              publicIPAddress: {
                id:
                  "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/pipName"
              },
              subnet: {
                id:
                  "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet2/subnets/AzureFirewallSubnet"
              }
            }
          }
        ],
        managementIpConfiguration: {
          name: "azureFirewallMgmtIpConfiguration",
          properties: {
            publicIPAddress: {
              id:
                "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/managementPipName"
            },
            subnet: {
              id:
                "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet2/subnets/AzureFirewallManagementSubnet"
            }
          }
        },
        natRuleCollections: [
          {
            name: "natrulecoll",
            properties: {
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
                  translatedPort: "8443"
                },
                {
                  name: "DNAT-HTTP-traffic-With-FQDN",
                  description: "D-NAT all inbound web traffic for inspection",
                  destinationAddresses: ["1.2.3.4"],
                  destinationPorts: ["80"],
                  protocols: ["TCP"],
                  sourceAddresses: ["*"],
                  translatedFqdn: "internalhttpserver",
                  translatedPort: "880"
                }
              ]
            }
          }
        ],
        networkRuleCollections: [
          {
            name: "netrulecoll",
            properties: {
              action: { type: "Deny" },
              priority: 112,
              rules: [
                {
                  name: "L4-traffic",
                  description: "Block traffic based on source IPs and ports",
                  destinationAddresses: ["*"],
                  destinationPorts: ["443-444", "8443"],
                  protocols: ["TCP"],
                  sourceAddresses: [
                    "192.168.1.1-192.168.1.12",
                    "10.1.4.12-10.1.4.255"
                  ]
                },
                {
                  name: "L4-traffic-with-FQDN",
                  description:
                    "Block traffic based on source IPs and ports to amazon",
                  destinationFqdns: ["www.amazon.com"],
                  destinationPorts: ["443-444", "8443"],
                  protocols: ["TCP"],
                  sourceAddresses: ["10.2.4.12-10.2.4.255"]
                }
              ]
            }
          }
        ],
        sku: { name: "AZFW_VNet", tier: "Standard" },
        threatIntelMode: "Alert"
      },
      tags: { key1: "value1" },
      zones: []
    },
    queryParameters: { "api-version": "2022-05-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}",
      subscriptionId,
      resourceGroupName,
      azureFirewallName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAzureFirewallWithManagementSubnet().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates the specified Azure Firewall.
 *
 * @summary Creates or updates the specified Azure Firewall.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/AzureFirewallPutInHub.json
 */
async function createAzureFirewallInVirtualHub() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const azureFirewallName = "azurefirewall";
  const options: AzureFirewallsCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        firewallPolicy: {
          id:
            "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/firewallPolicies/policy1"
        },
        hubIPAddresses: { publicIPs: { addresses: [], count: 1 } },
        sku: { name: "AZFW_Hub", tier: "Standard" },
        threatIntelMode: "Alert",
        virtualHub: {
          id:
            "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/hub1"
        }
      },
      tags: { key1: "value1" },
      zones: []
    },
    queryParameters: { "api-version": "2022-05-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}",
      subscriptionId,
      resourceGroupName,
      azureFirewallName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAzureFirewallInVirtualHub().catch(console.error);

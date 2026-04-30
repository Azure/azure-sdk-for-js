// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary Creates or updates the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/FirewallPolicyNatRuleCollectionGroupPut.json
 */
async function createFirewallPolicyNatRuleCollectionGroup() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const firewallPolicyName = "firewallPolicy";
  const ruleCollectionGroupName = "ruleCollectionGroup1";
  const parameters = {
    priority: 100,
    ruleCollections: [
      {
        name: "Example-Nat-Rule-Collection",
        action: { type: "DNAT" },
        priority: 100,
        ruleCollectionType: "FirewallPolicyNatRuleCollection",
        rules: [
          {
            name: "nat-rule1",
            destinationAddresses: ["152.23.32.23"],
            destinationPorts: ["8080"],
            ipProtocols: ["TCP", "UDP"],
            ruleType: "NatRule",
            sourceAddresses: ["2.2.2.2"],
            sourceIpGroups: [],
            translatedFqdn: "internalhttp.server.net",
            translatedPort: "8080",
          },
        ],
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyRuleCollectionGroups.beginCreateOrUpdateAndWait(
    resourceGroupName,
    firewallPolicyName,
    ruleCollectionGroupName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary Creates or updates the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/FirewallPolicyRuleCollectionGroupPut.json
 */
async function createFirewallPolicyRuleCollectionGroup() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const firewallPolicyName = "firewallPolicy";
  const ruleCollectionGroupName = "ruleCollectionGroup1";
  const parameters = {
    priority: 100,
    ruleCollections: [
      {
        name: "Example-Filter-Rule-Collection",
        action: { type: "Deny" },
        priority: 100,
        ruleCollectionType: "FirewallPolicyFilterRuleCollection",
        rules: [
          {
            name: "network-rule1",
            destinationAddresses: ["*"],
            destinationPorts: ["*"],
            ipProtocols: ["TCP"],
            ruleType: "NetworkRule",
            sourceAddresses: ["10.1.25.0/24"],
          },
        ],
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyRuleCollectionGroups.beginCreateOrUpdateAndWait(
    resourceGroupName,
    firewallPolicyName,
    ruleCollectionGroupName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary Creates or updates the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/FirewallPolicyRuleCollectionGroupWithIpGroupsPut.json
 */
async function createFirewallPolicyRuleCollectionGroupWithIPGroups() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const firewallPolicyName = "firewallPolicy";
  const ruleCollectionGroupName = "ruleCollectionGroup1";
  const parameters = {
    priority: 110,
    ruleCollections: [
      {
        name: "Example-Filter-Rule-Collection",
        action: { type: "Deny" },
        ruleCollectionType: "FirewallPolicyFilterRuleCollection",
        rules: [
          {
            name: "network-1",
            destinationIpGroups: [
              "/subscriptions/subid/providers/Microsoft.Network/resourceGroup/rg1/ipGroups/ipGroups2",
            ],
            destinationPorts: ["*"],
            ipProtocols: ["TCP"],
            ruleType: "NetworkRule",
            sourceIpGroups: [
              "/subscriptions/subid/providers/Microsoft.Network/resourceGroup/rg1/ipGroups/ipGroups1",
            ],
          },
        ],
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyRuleCollectionGroups.beginCreateOrUpdateAndWait(
    resourceGroupName,
    firewallPolicyName,
    ruleCollectionGroupName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary Creates or updates the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/FirewallPolicyRuleCollectionGroupWithWebCategoriesPut.json
 */
async function createFirewallPolicyRuleCollectionGroupWithWebCategories() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "e747cc13-97d4-4a79-b463-42d7f4e558f2";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const firewallPolicyName = "firewallPolicy";
  const ruleCollectionGroupName = "ruleCollectionGroup1";
  const parameters = {
    priority: 110,
    ruleCollections: [
      {
        name: "Example-Filter-Rule-Collection",
        action: { type: "Deny" },
        ruleCollectionType: "FirewallPolicyFilterRuleCollection",
        rules: [
          {
            name: "rule1",
            description: "Deny inbound rule",
            protocols: [{ port: 443, protocolType: "Https" }],
            ruleType: "ApplicationRule",
            sourceAddresses: ["216.58.216.164", "10.0.0.0/24"],
            webCategories: ["Hacking"],
          },
        ],
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyRuleCollectionGroups.beginCreateOrUpdateAndWait(
    resourceGroupName,
    firewallPolicyName,
    ruleCollectionGroupName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary Creates or updates the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/FirewallPolicyRuleCollectionGroupWithHttpHeadersToInsert.json
 */
async function createFirewallPolicyRuleCollectionGroupWithHttpHeaderToInsert() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "e747cc13-97d4-4a79-b463-42d7f4e558f2";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const firewallPolicyName = "firewallPolicy";
  const ruleCollectionGroupName = "ruleCollectionGroup1";
  const parameters = {
    priority: 110,
    ruleCollections: [
      {
        name: "Example-Filter-Rule-Collection",
        action: { type: "Allow" },
        ruleCollectionType: "FirewallPolicyFilterRuleCollection",
        rules: [
          {
            name: "rule1",
            description: "Insert trusted tenants header",
            fqdnTags: ["WindowsVirtualDesktop"],
            httpHeadersToInsert: [
              {
                headerName: "Restrict-Access-To-Tenants",
                headerValue: "contoso.com,fabrikam.onmicrosoft.com",
              },
            ],
            protocols: [{ port: 80, protocolType: "Http" }],
            ruleType: "ApplicationRule",
            sourceAddresses: ["216.58.216.164", "10.0.0.0/24"],
          },
        ],
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyRuleCollectionGroups.beginCreateOrUpdateAndWait(
    resourceGroupName,
    firewallPolicyName,
    ruleCollectionGroupName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createFirewallPolicyNatRuleCollectionGroup();
  await createFirewallPolicyRuleCollectionGroup();
  await createFirewallPolicyRuleCollectionGroupWithIPGroups();
  await createFirewallPolicyRuleCollectionGroupWithWebCategories();
  await createFirewallPolicyRuleCollectionGroupWithHttpHeaderToInsert();
}

main().catch(console.error);

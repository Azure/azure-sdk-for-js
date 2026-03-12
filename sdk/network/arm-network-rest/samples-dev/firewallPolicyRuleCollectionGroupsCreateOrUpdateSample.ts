// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary Creates or updates the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/FirewallPolicyNatRuleCollectionGroupPut.json
 */

import type { FirewallPolicyRuleCollectionGroupsCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createFirewallPolicyNatRuleCollectionGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const firewallPolicyName = "firewallPolicy";
  const ruleCollectionGroupName = "ruleCollectionGroup1";
  const options: FirewallPolicyRuleCollectionGroupsCreateOrUpdateParameters = {
    body: {
      properties: {
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
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/ruleCollectionGroups/{ruleCollectionGroupName}",
      subscriptionId,
      resourceGroupName,
      firewallPolicyName,
      ruleCollectionGroupName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createFirewallPolicyNatRuleCollectionGroup().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary Creates or updates the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/FirewallPolicyRuleCollectionGroupPut.json
 */
async function createFirewallPolicyRuleCollectionGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const firewallPolicyName = "firewallPolicy";
  const ruleCollectionGroupName = "ruleCollectionGroup1";
  const options: FirewallPolicyRuleCollectionGroupsCreateOrUpdateParameters = {
    body: {
      properties: {
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
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/ruleCollectionGroups/{ruleCollectionGroupName}",
      subscriptionId,
      resourceGroupName,
      firewallPolicyName,
      ruleCollectionGroupName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createFirewallPolicyRuleCollectionGroup().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary Creates or updates the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/FirewallPolicyRuleCollectionGroupWithIpGroupsPut.json
 */
async function createFirewallPolicyRuleCollectionGroupWithIPGroups(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const firewallPolicyName = "firewallPolicy";
  const ruleCollectionGroupName = "ruleCollectionGroup1";
  const options: FirewallPolicyRuleCollectionGroupsCreateOrUpdateParameters = {
    body: {
      properties: {
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
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/ruleCollectionGroups/{ruleCollectionGroupName}",
      subscriptionId,
      resourceGroupName,
      firewallPolicyName,
      ruleCollectionGroupName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createFirewallPolicyRuleCollectionGroupWithIPGroups().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary Creates or updates the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/FirewallPolicyRuleCollectionGroupWithWebCategoriesPut.json
 */
async function createFirewallPolicyRuleCollectionGroupWithWebCategories(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const firewallPolicyName = "firewallPolicy";
  const ruleCollectionGroupName = "ruleCollectionGroup1";
  const options: FirewallPolicyRuleCollectionGroupsCreateOrUpdateParameters = {
    body: {
      properties: {
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
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/ruleCollectionGroups/{ruleCollectionGroupName}",
      subscriptionId,
      resourceGroupName,
      firewallPolicyName,
      ruleCollectionGroupName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createFirewallPolicyRuleCollectionGroupWithWebCategories().catch(console.error);

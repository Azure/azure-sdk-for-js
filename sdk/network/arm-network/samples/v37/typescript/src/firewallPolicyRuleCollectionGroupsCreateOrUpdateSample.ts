// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary creates or updates the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: 2025-05-01/FirewallPolicyNatRuleCollectionGroupPut.json
 */
async function createFirewallPolicyNatRuleCollectionGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyRuleCollectionGroups.createOrUpdate(
    "rg1",
    "firewallPolicy",
    "ruleCollectionGroup1",
    {
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
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary creates or updates the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: 2025-05-01/FirewallPolicyRuleCollectionGroupPut.json
 */
async function createFirewallPolicyRuleCollectionGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyRuleCollectionGroups.createOrUpdate(
    "rg1",
    "firewallPolicy",
    "ruleCollectionGroup1",
    {
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
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary creates or updates the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: 2025-05-01/FirewallPolicyRuleCollectionGroupWithHttpHeadersToInsert.json
 */
async function createFirewallPolicyRuleCollectionGroupWithHttpHeaderToInsert(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e747cc13-97d4-4a79-b463-42d7f4e558f2";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyRuleCollectionGroups.createOrUpdate(
    "rg1",
    "firewallPolicy",
    "ruleCollectionGroup1",
    {
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
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary creates or updates the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: 2025-05-01/FirewallPolicyRuleCollectionGroupWithIpGroupsPut.json
 */
async function createFirewallPolicyRuleCollectionGroupWithIPGroups(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyRuleCollectionGroups.createOrUpdate(
    "rg1",
    "firewallPolicy",
    "ruleCollectionGroup1",
    {
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
                "/subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.Network/resourceGroups/rg1/ipGroups/ipGroups2",
              ],
              destinationPorts: ["*"],
              ipProtocols: ["TCP"],
              ruleType: "NetworkRule",
              sourceIpGroups: [
                "/subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.Network/resourceGroups/rg1/ipGroups/ipGroups1",
              ],
            },
          ],
        },
      ],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary creates or updates the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: 2025-05-01/FirewallPolicyRuleCollectionGroupWithWebCategoriesPut.json
 */
async function createFirewallPolicyRuleCollectionGroupWithWebCategories(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e747cc13-97d4-4a79-b463-42d7f4e558f2";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyRuleCollectionGroups.createOrUpdate(
    "rg1",
    "firewallPolicy",
    "ruleCollectionGroup1",
    {
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
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createFirewallPolicyNatRuleCollectionGroup();
  await createFirewallPolicyRuleCollectionGroup();
  await createFirewallPolicyRuleCollectionGroupWithHttpHeaderToInsert();
  await createFirewallPolicyRuleCollectionGroupWithIPGroups();
  await createFirewallPolicyRuleCollectionGroupWithWebCategories();
}

main().catch(console.error);

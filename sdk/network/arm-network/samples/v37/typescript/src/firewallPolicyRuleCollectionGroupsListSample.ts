// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all FirewallPolicyRuleCollectionGroups in a FirewallPolicy resource.
 *
 * @summary lists all FirewallPolicyRuleCollectionGroups in a FirewallPolicy resource.
 * x-ms-original-file: 2025-05-01/FirewallPolicyRuleCollectionGroupList.json
 */
async function listAllFirewallPolicyRuleCollectionGroupsForAGivenFirewallPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.firewallPolicyRuleCollectionGroups.list(
    "rg1",
    "firewallPolicy",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all FirewallPolicyRuleCollectionGroups in a FirewallPolicy resource.
 *
 * @summary lists all FirewallPolicyRuleCollectionGroups in a FirewallPolicy resource.
 * x-ms-original-file: 2025-05-01/FirewallPolicyRuleCollectionGroupWithIpGroupsList.json
 */
async function listAllFirewallPolicyRuleCollectionGroupsWithIpGroupsForAGivenFirewallPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.firewallPolicyRuleCollectionGroups.list(
    "rg1",
    "firewallPolicy",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all FirewallPolicyRuleCollectionGroups in a FirewallPolicy resource.
 *
 * @summary lists all FirewallPolicyRuleCollectionGroups in a FirewallPolicy resource.
 * x-ms-original-file: 2025-05-01/FirewallPolicyRuleCollectionGroupWithWebCategoriesList.json
 */
async function listAllFirewallPolicyRuleCollectionGroupWithWebCategories(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e747cc13-97d4-4a79-b463-42d7f4e558f2";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.firewallPolicyRuleCollectionGroups.list(
    "rg1",
    "firewallPolicy",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllFirewallPolicyRuleCollectionGroupsForAGivenFirewallPolicy();
  await listAllFirewallPolicyRuleCollectionGroupsWithIpGroupsForAGivenFirewallPolicy();
  await listAllFirewallPolicyRuleCollectionGroupWithWebCategories();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary gets the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: 2025-05-01/FirewallPolicyNatRuleCollectionGroupGet.json
 */
async function getFirewallPolicyNatRuleCollectionGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyRuleCollectionGroups.get(
    "rg1",
    "firewallPolicy",
    "ruleCollectionGroup1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary gets the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: 2025-05-01/FirewallPolicyRuleCollectionGroupGet.json
 */
async function getFirewallPolicyRuleCollectionGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyRuleCollectionGroups.get(
    "rg1",
    "firewallPolicy",
    "ruleCollectionGroup1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary gets the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: 2025-05-01/FirewallPolicyRuleCollectionGroupWithIpGroupsGet.json
 */
async function getFirewallPolicyRuleCollectionGroupWithIpGroups() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyRuleCollectionGroups.get(
    "rg1",
    "firewallPolicy",
    "ruleGroup1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary gets the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: 2025-05-01/FirewallPolicyRuleCollectionGroupWithWebCategoriesGet.json
 */
async function getFirewallPolicyRuleCollectionGroupWithWebCategories() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e747cc13-97d4-4a79-b463-42d7f4e558f2";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyRuleCollectionGroups.get(
    "rg1",
    "firewallPolicy",
    "ruleCollectionGroup1",
  );
  console.log(result);
}

async function main() {
  await getFirewallPolicyNatRuleCollectionGroup();
  await getFirewallPolicyRuleCollectionGroup();
  await getFirewallPolicyRuleCollectionGroupWithIpGroups();
  await getFirewallPolicyRuleCollectionGroupWithWebCategories();
}

main().catch(console.error);

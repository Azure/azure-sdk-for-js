// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Gets the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary Gets the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/FirewallPolicyNatRuleCollectionGroupGet.json
 */
async function getFirewallPolicyNatRuleCollectionGroup() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const firewallPolicyName = "firewallPolicy";
  const ruleCollectionGroupName = "ruleCollectionGroup1";
  const options = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/ruleCollectionGroups/{ruleCollectionGroupName}",
      subscriptionId,
      resourceGroupName,
      firewallPolicyName,
      ruleCollectionGroupName
    )
    .get(options);
  console.log(result);
}

getFirewallPolicyNatRuleCollectionGroup().catch(console.error);
/**
 * This sample demonstrates how to Gets the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary Gets the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/FirewallPolicyRuleCollectionGroupGet.json
 */
async function getFirewallPolicyRuleCollectionGroup() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const firewallPolicyName = "firewallPolicy";
  const ruleCollectionGroupName = "ruleCollectionGroup1";
  const options = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/ruleCollectionGroups/{ruleCollectionGroupName}",
      subscriptionId,
      resourceGroupName,
      firewallPolicyName,
      ruleCollectionGroupName
    )
    .get(options);
  console.log(result);
}

getFirewallPolicyRuleCollectionGroup().catch(console.error);
/**
 * This sample demonstrates how to Gets the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary Gets the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/FirewallPolicyRuleCollectionGroupWithIpGroupsGet.json
 */
async function getFirewallPolicyRuleCollectionGroupWithIPGroups() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const firewallPolicyName = "firewallPolicy";
  const ruleCollectionGroupName = "ruleGroup1";
  const options = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/ruleCollectionGroups/{ruleCollectionGroupName}",
      subscriptionId,
      resourceGroupName,
      firewallPolicyName,
      ruleCollectionGroupName
    )
    .get(options);
  console.log(result);
}

getFirewallPolicyRuleCollectionGroupWithIPGroups().catch(console.error);
/**
 * This sample demonstrates how to Gets the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary Gets the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/FirewallPolicyRuleCollectionGroupWithWebCategoriesGet.json
 */
async function getFirewallPolicyRuleCollectionGroupWithWebCategories() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const firewallPolicyName = "firewallPolicy";
  const ruleCollectionGroupName = "ruleCollectionGroup1";
  const options = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/ruleCollectionGroups/{ruleCollectionGroupName}",
      subscriptionId,
      resourceGroupName,
      firewallPolicyName,
      ruleCollectionGroupName
    )
    .get(options);
  console.log(result);
}

getFirewallPolicyRuleCollectionGroupWithWebCategories().catch(console.error);

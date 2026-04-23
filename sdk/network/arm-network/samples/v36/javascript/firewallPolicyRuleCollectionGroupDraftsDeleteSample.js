// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Delete Rule Collection Group Draft.
 *
 * @summary Delete Rule Collection Group Draft.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/FirewallPolicyRuleCollectionGroupDraftDelete.json
 */
async function deleteFirewallRuleCollectionGroupDraft() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const firewallPolicyName = "firewallPolicy";
  const ruleCollectionGroupName = "ruleCollectionGroup1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyRuleCollectionGroupDrafts.delete(
    resourceGroupName,
    firewallPolicyName,
    ruleCollectionGroupName,
  );
  console.log(result);
}

async function main() {
  await deleteFirewallRuleCollectionGroupDraft();
}

main().catch(console.error);

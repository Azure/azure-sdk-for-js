// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get Rule Collection Group Draft.
 *
 * @summary Get Rule Collection Group Draft.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/FirewallPolicyRuleCollectionGroupDraftGet.json
 */
async function getRuleCollectionGroupDraft() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const firewallPolicyName = "firewallPolicy";
  const ruleCollectionGroupName = "ruleCollectionGroup1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyRuleCollectionGroupDrafts.get(
    resourceGroupName,
    firewallPolicyName,
    ruleCollectionGroupName,
  );
  console.log(result);
}

async function main() {
  await getRuleCollectionGroupDraft();
}

main().catch(console.error);

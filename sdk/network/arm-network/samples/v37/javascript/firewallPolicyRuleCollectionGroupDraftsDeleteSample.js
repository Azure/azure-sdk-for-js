// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete Rule Collection Group Draft.
 *
 * @summary delete Rule Collection Group Draft.
 * x-ms-original-file: 2025-05-01/FirewallPolicyRuleCollectionGroupDraftDelete.json
 */
async function deleteFirewallRuleCollectionGroupDraft() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.firewallPolicyRuleCollectionGroupDrafts.delete(
    "rg1",
    "firewallPolicy",
    "ruleCollectionGroup1",
  );
}

async function main() {
  await deleteFirewallRuleCollectionGroupDraft();
}

main().catch(console.error);

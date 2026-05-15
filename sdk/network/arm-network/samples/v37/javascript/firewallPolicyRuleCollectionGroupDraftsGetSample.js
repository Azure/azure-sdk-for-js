// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Rule Collection Group Draft.
 *
 * @summary get Rule Collection Group Draft.
 * x-ms-original-file: 2025-05-01/FirewallPolicyRuleCollectionGroupDraftGet.json
 */
async function getRuleCollectionGroupDraft() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyRuleCollectionGroupDrafts.get(
    "rg1",
    "firewallPolicy",
    "ruleCollectionGroup1",
  );
  console.log(result);
}

async function main() {
  await getRuleCollectionGroupDraft();
}

main().catch(console.error);

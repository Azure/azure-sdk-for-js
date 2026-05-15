// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a draft Firewall Policy.
 *
 * @summary get a draft Firewall Policy.
 * x-ms-original-file: 2025-05-01/FirewallPolicyDraftGet.json
 */
async function getFirewallPolicyDraft() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyDrafts.get("rg1", "firewallPolicy");
  console.log(result);
}

async function main() {
  await getFirewallPolicyDraft();
}

main().catch(console.error);

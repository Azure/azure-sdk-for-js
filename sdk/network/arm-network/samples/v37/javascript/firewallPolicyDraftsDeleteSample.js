// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a draft policy.
 *
 * @summary delete a draft policy.
 * x-ms-original-file: 2025-05-01/FirewallPolicyDraftDelete.json
 */
async function deleteFirewallPolicyDraft() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.firewallPolicyDrafts.delete("rg1", "firewallPolicy");
}

async function main() {
  await deleteFirewallPolicyDraft();
}

main().catch(console.error);

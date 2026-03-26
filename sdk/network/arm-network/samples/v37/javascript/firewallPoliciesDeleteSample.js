// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified Firewall Policy.
 *
 * @summary deletes the specified Firewall Policy.
 * x-ms-original-file: 2025-05-01/FirewallPolicyDelete.json
 */
async function deleteFirewallPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.firewallPolicies.delete("rg1", "firewallPolicy");
}

async function main() {
  await deleteFirewallPolicy();
}

main().catch(console.error);

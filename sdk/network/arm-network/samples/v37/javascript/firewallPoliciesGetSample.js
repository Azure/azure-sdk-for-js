// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified Firewall Policy.
 *
 * @summary gets the specified Firewall Policy.
 * x-ms-original-file: 2025-05-01/FirewallPolicyGet.json
 */
async function getFirewallPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicies.get("rg1", "firewallPolicy");
  console.log(result);
}

async function main() {
  await getFirewallPolicy();
}

main().catch(console.error);

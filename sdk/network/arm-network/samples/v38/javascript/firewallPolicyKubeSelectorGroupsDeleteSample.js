// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified FirewallPolicyKubeSelectorGroup.
 *
 * @summary deletes the specified FirewallPolicyKubeSelectorGroup.
 * x-ms-original-file: 2025-09-01/FirewallPolicyKubeSelectorGroupDelete.json
 */
async function deleteFirewallPolicyKubeSelectorGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.firewallPolicyKubeSelectorGroups.delete(
    "rg1",
    "firewallPolicy",
    "kubeSelectorGroup1",
  );
}

async function main() {
  await deleteFirewallPolicyKubeSelectorGroup();
}

main().catch(console.error);

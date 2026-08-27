// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all FirewallPolicyKubeSelectorGroups in a FirewallPolicy resource.
 *
 * @summary lists all FirewallPolicyKubeSelectorGroups in a FirewallPolicy resource.
 * x-ms-original-file: 2025-09-01/FirewallPolicyKubeSelectorGroupList.json
 */
async function listAllFirewallPolicyKubeSelectorGroupsForAGivenFirewallPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.firewallPolicyKubeSelectorGroups.list("rg1", "firewallPolicy")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllFirewallPolicyKubeSelectorGroupsForAGivenFirewallPolicy();
}

main().catch(console.error);

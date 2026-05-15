// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates tags of a Azure Firewall Policy resource.
 *
 * @summary updates tags of a Azure Firewall Policy resource.
 * x-ms-original-file: 2025-05-01/FirewallPolicyPatch.json
 */
async function updateFirewallPolicyTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicies.updateTags("myResourceGroup", "firewallPolicy", {
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

async function main() {
  await updateFirewallPolicyTags();
}

main().catch(console.error);

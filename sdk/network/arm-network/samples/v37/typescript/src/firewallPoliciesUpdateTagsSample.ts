// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates tags of a Azure Firewall Policy resource.
 *
 * @summary updates tags of a Azure Firewall Policy resource.
 * x-ms-original-file: 2025-05-01/FirewallPolicyPatch.json
 */
async function updateFirewallPolicyTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicies.updateTags("myResourceGroup", "firewallPolicy", {
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateFirewallPolicyTags();
}

main().catch(console.error);

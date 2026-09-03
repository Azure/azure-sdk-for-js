// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified FirewallPolicyKubeSelectorGroup.
 *
 * @summary gets the specified FirewallPolicyKubeSelectorGroup.
 * x-ms-original-file: 2025-09-01/FirewallPolicyKubeSelectorGroupGet.json
 */
async function getFirewallPolicyKubeSelectorGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyKubeSelectorGroups.get(
    "rg1",
    "firewallPolicy",
    "kubeSelectorGroup1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getFirewallPolicyKubeSelectorGroup();
}

main().catch(console.error);

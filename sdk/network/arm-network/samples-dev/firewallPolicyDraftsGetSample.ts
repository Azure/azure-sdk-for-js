// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a draft Firewall Policy.
 *
 * @summary get a draft Firewall Policy.
 * x-ms-original-file: 2025-05-01/FirewallPolicyDraftGet.json
 */
async function getFirewallPolicyDraft(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyDrafts.get("rg1", "firewallPolicy");
  console.log(result);
}

async function main(): Promise<void> {
  await getFirewallPolicyDraft();
}

main().catch(console.error);

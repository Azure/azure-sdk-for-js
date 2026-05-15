// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a draft policy.
 *
 * @summary delete a draft policy.
 * x-ms-original-file: 2025-05-01/FirewallPolicyDraftDelete.json
 */
async function deleteFirewallPolicyDraft(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.firewallPolicyDrafts.delete("rg1", "firewallPolicy");
}

async function main(): Promise<void> {
  await deleteFirewallPolicyDraft();
}

main().catch(console.error);

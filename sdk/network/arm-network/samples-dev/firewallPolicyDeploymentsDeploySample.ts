// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deploys the firewall policy draft and child rule collection group drafts.
 *
 * @summary deploys the firewall policy draft and child rule collection group drafts.
 * x-ms-original-file: 2025-05-01/FirewallPolicyDraftDeploy.json
 */
async function deployFirewallPolicyDraft(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.firewallPolicyDeployments.deploy("rg1", "firewallPolicy");
}

async function main(): Promise<void> {
  await deployFirewallPolicyDraft();
}

main().catch(console.error);

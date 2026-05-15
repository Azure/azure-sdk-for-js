// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary deletes the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: 2025-05-01/FirewallPolicyRuleCollectionGroupDelete.json
 */
async function deleteFirewallPolicyRuleCollectionGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.firewallPolicyRuleCollectionGroups.delete(
    "rg1",
    "firewallPolicy",
    "ruleCollectionGroup1",
  );
}

async function main(): Promise<void> {
  await deleteFirewallPolicyRuleCollectionGroup();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the specified FirewallPolicyRuleCollectionGroup.
 *
 * @summary Deletes the specified FirewallPolicyRuleCollectionGroup.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/FirewallPolicyRuleCollectionGroupDelete.json
 */
async function deleteFirewallPolicyRuleCollectionGroup(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const firewallPolicyName = "firewallPolicy";
  const ruleCollectionGroupName = "ruleCollectionGroup1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.firewallPolicyRuleCollectionGroups.beginDeleteAndWait(
      resourceGroupName,
      firewallPolicyName,
      ruleCollectionGroupName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteFirewallPolicyRuleCollectionGroup();
}

main().catch(console.error);

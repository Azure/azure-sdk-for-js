// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a mongo cluster firewall rule.
 *
 * @summary deletes a mongo cluster firewall rule.
 * x-ms-original-file: 2024-10-01-preview/MongoClusters_FirewallRuleDelete.json
 */
async function deletesAFirewallRuleOnAMongoClusterResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  await client.firewallRules.delete("TestGroup", "myMongoCluster", "rule1");
}

async function main(): Promise<void> {
  await deletesAFirewallRuleOnAMongoClusterResource();
}

main().catch(console.error);

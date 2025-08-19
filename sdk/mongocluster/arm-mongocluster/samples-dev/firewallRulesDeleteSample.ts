// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to deletes a mongo cluster firewall rule.
 *
 * @summary deletes a mongo cluster firewall rule.
 * x-ms-original-file: 2025-07-01-preview/MongoClusters_FirewallRuleDelete.json
 */

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

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

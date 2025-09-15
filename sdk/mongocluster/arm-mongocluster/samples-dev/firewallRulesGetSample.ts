// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to gets information about a mongo cluster firewall rule.
 *
 * @summary gets information about a mongo cluster firewall rule.
 * x-ms-original-file: 2025-07-01-preview/MongoClusters_FirewallRuleGet.json
 */

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

async function getsAFirewallRuleOnAMongoClusterResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.firewallRules.get("TestGroup", "myMongoCluster", "rule1");
  console.log(result);
}

async function main(): Promise<void> {
  await getsAFirewallRuleOnAMongoClusterResource();
}

main().catch(console.error);

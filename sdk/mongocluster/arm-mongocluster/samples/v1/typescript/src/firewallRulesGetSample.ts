// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a mongo cluster firewall rule.
 *
 * @summary gets information about a mongo cluster firewall rule.
 * x-ms-original-file: 2024-07-01/MongoClusters_FirewallRuleGet.json
 */
async function getsAFirewallRuleOnAMongoClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.firewallRules.get("TestGroup", "myMongoCluster", "rule1");
  console.log(result);
}

async function main() {
  getsAFirewallRuleOnAMongoClusterResource();
}

main().catch(console.error);

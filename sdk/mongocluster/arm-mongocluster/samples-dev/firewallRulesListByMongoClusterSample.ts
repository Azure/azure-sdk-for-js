// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all the firewall rules in a given mongo cluster.
 *
 * @summary list all the firewall rules in a given mongo cluster.
 * x-ms-original-file: 2024-10-01-preview/MongoClusters_FirewallRuleList.json
 */
async function listTheFirewallRulesOnAMongoClusterResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.firewallRules.listByMongoCluster("TestGroup", "myMongoCluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listTheFirewallRulesOnAMongoClusterResource();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new firewall rule or updates an existing firewall rule on a mongo cluster.
 *
 * @summary creates a new firewall rule or updates an existing firewall rule on a mongo cluster.
 * x-ms-original-file: 2024-10-01-preview/MongoClusters_FirewallRuleCreate.json
 */
async function createsAFirewallRuleOnAMongoClusterResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.firewallRules.createOrUpdate("TestGroup", "myMongoCluster", "rule1", {
    properties: {
      startIpAddress: "0.0.0.0",
      endIpAddress: "255.255.255.255",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createsAFirewallRuleOnAMongoClusterResource();
}

main().catch(console.error);

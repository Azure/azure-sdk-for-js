// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { MongoClusterManagementClient } = require("@azure/arm-mongocluster");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the firewall rules in a given mongo cluster.
 *
 * @summary list all the firewall rules in a given mongo cluster.
 * x-ms-original-file: 2024-07-01/MongoClusters_FirewallRuleList.json
 */
async function listTheFirewallRulesOnAMongoClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.firewallRules.listByMongoCluster("TestGroup", "myMongoCluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  listTheFirewallRulesOnAMongoClusterResource();
}

main().catch(console.error);

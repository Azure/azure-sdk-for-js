// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MongoClusterManagementClient } = require("@azure/arm-mongocluster");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a mongo cluster firewall rule.
 *
 * @summary gets information about a mongo cluster firewall rule.
 * x-ms-original-file: 2024-10-01-preview/MongoClusters_FirewallRuleGet.json
 */
async function getsAFirewallRuleOnAMongoClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.firewallRules.get("TestGroup", "myMongoCluster", "rule1");
  console.log(result);
}

async function main() {
  await getsAFirewallRuleOnAMongoClusterResource();
}

main().catch(console.error);

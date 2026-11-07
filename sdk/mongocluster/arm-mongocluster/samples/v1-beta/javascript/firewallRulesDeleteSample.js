// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MongoClusterManagementClient } = require("@azure/arm-mongocluster");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a DocumentDB cluster firewall rule.
 *
 * @summary deletes a DocumentDB cluster firewall rule.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_FirewallRuleDelete.json
 */
async function deletesAFirewallRuleOnADocumentDBClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  await client.firewallRules.delete("TestGroup", "myMongoCluster", "rule1");
}

async function main() {
  await deletesAFirewallRuleOnADocumentDBClusterResource();
}

main().catch(console.error);

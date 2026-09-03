// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBForPostgreSQL } = require("@azure/arm-cosmosdbforpostgresql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a cluster firewall rule.
 *
 * @summary deletes a cluster firewall rule.
 * x-ms-original-file: 2023-03-02-preview/FirewallRuleDelete.json
 */
async function deleteTheFirewallRuleOfTheCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  await client.firewallRules.delete("TestGroup", "pgtestsvc4", "rule1");
}

async function main() {
  await deleteTheFirewallRuleOfTheCluster();
}

main().catch(console.error);

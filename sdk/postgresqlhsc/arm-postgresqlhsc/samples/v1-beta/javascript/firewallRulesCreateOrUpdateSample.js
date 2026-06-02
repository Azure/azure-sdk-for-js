// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DBforPostgreSQLClient } = require("@azure/arm-postgresqlhsc");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new cluster firewall rule or updates an existing cluster firewall rule.
 *
 * @summary creates a new cluster firewall rule or updates an existing cluster firewall rule.
 * x-ms-original-file: 2023-03-02-preview/FirewallRuleCreate.json
 */
async function createAFirewallRuleOfTheCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const result = await client.firewallRules.createOrUpdate("TestGroup", "pgtestsvc4", "rule1", {
    endIpAddress: "255.255.255.255",
    startIpAddress: "0.0.0.0",
  });
  console.log(result);
}

async function main() {
  await createAFirewallRuleOfTheCluster();
}

main().catch(console.error);

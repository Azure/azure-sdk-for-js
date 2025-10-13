// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new firewall rule or updates an existing firewall rule.
 *
 * @summary creates a new firewall rule or updates an existing firewall rule.
 * x-ms-original-file: 2024-12-30/FirewallRuleCreate.json
 */
async function createAFirewallRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.firewallRules.createOrUpdate("TestGroup", "testserver", "rule1", {
    properties: {
      endIpAddress: "255.255.255.255",
      startIpAddress: "0.0.0.0",
    },
  });
  console.log(result);
}

async function main() {
  await createAFirewallRule();
}

main().catch(console.error);

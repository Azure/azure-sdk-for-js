// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a new firewall rule or updates an existing firewall rule.
 *
 * @summary Creates a new firewall rule or updates an existing firewall rule.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Firewall/preview/2023-06-01-preview/examples/FirewallRuleCreate.json
 */

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function createAFirewallRule() {
  const subscriptionId =
    process.env["MYSQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["MYSQL_RESOURCE_GROUP"] || "TestGroup";
  const serverName = "testserver";
  const firewallRuleName = "rule1";
  const parameters = {
    endIpAddress: "255.255.255.255",
    startIpAddress: "0.0.0.0",
  };
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.firewallRules.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    firewallRuleName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createAFirewallRule();
}

main().catch(console.error);

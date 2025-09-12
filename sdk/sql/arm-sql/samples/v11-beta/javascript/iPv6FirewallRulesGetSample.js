// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets an IPv6 firewall rule.
 *
 * @summary Gets an IPv6 firewall rule.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-11-01-preview/examples/IPv6FirewallRuleGet.json
 */
async function getIPv6FirewallRule() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "firewallrulecrudtest-12";
  const serverName = "firewallrulecrudtest-6285";
  const firewallRuleName = "firewallrulecrudtest-2304";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.iPv6FirewallRules.get(
    resourceGroupName,
    serverName,
    firewallRuleName,
  );
  console.log(result);
}

async function main() {
  await getIPv6FirewallRule();
}

main().catch(console.error);

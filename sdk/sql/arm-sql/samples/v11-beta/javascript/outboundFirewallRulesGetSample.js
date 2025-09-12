// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets an outbound firewall rule.
 *
 * @summary Gets an outbound firewall rule.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-02-01-preview/examples/OutboundFirewallRuleGet.json
 */
async function getsOutboundFirewallRule() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-7398";
  const serverName = "sqlcrudtest-4645";
  const outboundRuleFqdn = "server.database.windows.net";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.outboundFirewallRules.get(
    resourceGroupName,
    serverName,
    outboundRuleFqdn,
  );
  console.log(result);
}

async function main() {
  await getsOutboundFirewallRule();
}

main().catch(console.error);

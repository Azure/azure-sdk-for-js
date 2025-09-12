// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create a outbound firewall rule with a given name.
 *
 * @summary Create a outbound firewall rule with a given name.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-02-01-preview/examples/OutboundFirewallRuleCreate.json
 */
async function approveOrRejectAOutboundFirewallRuleWithAGivenName() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-7398";
  const serverName = "sqlcrudtest-4645";
  const outboundRuleFqdn = "server.database.windows.net";
  const parameters = {};
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.outboundFirewallRules.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    outboundRuleFqdn,
    parameters,
  );
  console.log(result);
}

async function main() {
  await approveOrRejectAOutboundFirewallRuleWithAGivenName();
}

main().catch(console.error);

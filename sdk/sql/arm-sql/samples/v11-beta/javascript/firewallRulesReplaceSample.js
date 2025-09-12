// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Replaces all firewall rules on the server.
 *
 * @summary Replaces all firewall rules on the server.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/FirewallRuleReplace.json
 */
async function replaceFirewallRules() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "firewallrulecrudtest-12";
  const serverName = "firewallrulecrudtest-6285";
  const parameters = {
    values: [
      {
        name: "firewallrulecrudtest-5370 ",
        endIpAddress: "100.0.0.0",
        startIpAddress: "0.0.0.0",
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.firewallRules.replace(resourceGroupName, serverName, parameters);
  console.log(result);
}

async function main() {
  await replaceFirewallRules();
}

main().catch(console.error);

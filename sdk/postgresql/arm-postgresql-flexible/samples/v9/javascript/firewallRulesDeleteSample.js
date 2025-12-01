// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes an existing firewall rule.
 *
 * @summary Deletes an existing firewall rule.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/FirewallRulesDelete.json
 */
async function deleteAnExistingFirewallRule() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const firewallRuleName = "examplefirewallrule";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.firewallRules.beginDeleteAndWait(
    resourceGroupName,
    serverName,
    firewallRuleName,
  );
  console.log(result);
}

async function main() {
  await deleteAnExistingFirewallRule();
}

main().catch(console.error);

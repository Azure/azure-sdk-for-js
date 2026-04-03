// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists information about all firewall rules in a server.
 *
 * @summary lists information about all firewall rules in a server.
 * x-ms-original-file: 2026-01-01-preview/FirewallRulesListByServer.json
 */
async function listInformationAboutAllFirewallRulesInAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.firewallRules.listByServer(
    "exampleresourcegroup",
    "exampleserver",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listInformationAboutAllFirewallRulesInAServer();
}

main().catch(console.error);

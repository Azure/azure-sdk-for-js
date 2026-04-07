// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of IPv6 firewall rules.
 *
 * @summary gets a list of IPv6 firewall rules.
 * x-ms-original-file: 2025-02-01-preview/IPv6FirewallRuleList.json
 */
async function listIPv6FirewallRules() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.iPv6FirewallRules.listByServer(
    "firewallrulecrudtest-12",
    "firewallrulecrudtest-6285",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listIPv6FirewallRules();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of firewall rules.
 *
 * @summary gets a list of firewall rules.
 * x-ms-original-file: 2025-02-01-preview/FirewallRuleList.json
 */
async function listFirewallRules() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.firewallRules.listByServer(
    "firewallrulecrudtest-12",
    "firewallrulecrudtest-6285",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listFirewallRules();
}

main().catch(console.error);

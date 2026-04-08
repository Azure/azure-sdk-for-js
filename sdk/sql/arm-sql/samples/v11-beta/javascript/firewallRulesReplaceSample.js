// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to replaces all firewall rules on the server.
 *
 * @summary replaces all firewall rules on the server.
 * x-ms-original-file: 2025-02-01-preview/FirewallRuleReplace.json
 */
async function replaceFirewallRules() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.firewallRules.replace(
    "firewallrulecrudtest-12",
    "firewallrulecrudtest-6285",
    {
      values: [
        {
          name: "firewallrulecrudtest-5370 ",
          endIpAddress: "100.0.0.0",
          startIpAddress: "0.0.0.0",
        },
      ],
    },
  );
  console.log(result);
}

async function main() {
  await replaceFirewallRules();
}

main().catch(console.error);

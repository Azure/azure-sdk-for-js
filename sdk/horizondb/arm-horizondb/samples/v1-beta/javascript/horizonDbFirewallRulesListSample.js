// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all HorizonDb firewall rules in a pool.
 *
 * @summary lists all HorizonDb firewall rules in a pool.
 * x-ms-original-file: 2026-01-20-preview/FirewallRules_List.json
 */
async function listHorizonDbFirewallRulesInAPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.horizonDbFirewallRules.list(
    "exampleresourcegroup",
    "examplecluster",
    "examplepool",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listHorizonDbFirewallRulesInAPool();
}

main().catch(console.error);

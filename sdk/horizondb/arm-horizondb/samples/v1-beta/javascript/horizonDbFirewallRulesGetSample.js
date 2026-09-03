// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a HorizonDB firewall rule.
 *
 * @summary gets information about a HorizonDB firewall rule.
 * x-ms-original-file: 2026-05-01-preview/FirewallRules_Get.json
 */
async function getAHorizonDBFirewallRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.horizonDbFirewallRules.get(
    "exampleresourcegroup",
    "examplecluster",
    "examplepool",
    "examplefirewallrule",
  );
  console.log(result);
}

async function main() {
  await getAHorizonDBFirewallRule();
}

main().catch(console.error);

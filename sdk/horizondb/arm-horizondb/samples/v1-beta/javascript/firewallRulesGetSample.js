// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a HorizonDB pool firewall rule.
 *
 * @summary gets information about a HorizonDB pool firewall rule.
 * x-ms-original-file: 2026-10-01-preview/FirewallRules_Get.json
 */
async function getAFirewallRuleOnAHorizonDBPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.firewallRules.get(
    "example-resource-group",
    "example-cluster",
    "example-pool-01",
    "example-firewall-rule-01",
  );
  console.log(result);
}

async function main() {
  await getAFirewallRuleOnAHorizonDBPool();
}

main().catch(console.error);

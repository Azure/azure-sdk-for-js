// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or replaces a HorizonDB pool firewall rule.
 *
 * @summary creates or replaces a HorizonDB pool firewall rule.
 * x-ms-original-file: 2026-10-01-preview/FirewallRules_CreateOrReplace.json
 */
async function createOrReplaceAFirewallRuleOnAHorizonDBPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.firewallRules.createOrReplace(
    "example-resource-group",
    "example-cluster",
    "example-pool-01",
    "example-firewall-rule-01",
    {
      properties: {
        startIpAddress: "10.0.0.1",
        endIpAddress: "10.0.0.254",
        description: "Allow access from the corporate network",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrReplaceAFirewallRuleOnAHorizonDBPool();
}

main().catch(console.error);

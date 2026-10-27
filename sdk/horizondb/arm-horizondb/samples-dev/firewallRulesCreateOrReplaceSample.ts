// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or replaces a HorizonDB pool firewall rule.
 *
 * @summary creates or replaces a HorizonDB pool firewall rule.
 * x-ms-original-file: 2026-10-01-preview/FirewallRules_CreateOrReplace.json
 */
async function createOrReplaceAFirewallRuleOnAHorizonDBPool(): Promise<void> {
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

async function main(): Promise<void> {
  await createOrReplaceAFirewallRuleOnAHorizonDBPool();
}

main().catch(console.error);

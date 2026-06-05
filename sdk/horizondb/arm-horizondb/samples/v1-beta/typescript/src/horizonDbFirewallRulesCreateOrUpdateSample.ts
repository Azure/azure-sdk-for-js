// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new HorizonDb firewall rule or updates an existing rule.
 *
 * @summary creates a new HorizonDb firewall rule or updates an existing rule.
 * x-ms-original-file: 2026-01-20-preview/FirewallRules_CreateOrUpdate.json
 */
async function createOrUpdateAHorizonDbFirewallRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.horizonDbFirewallRules.createOrUpdate(
    "exampleresourcegroup",
    "examplecluster",
    "examplepool",
    "examplefirewallrule",
    {
      properties: {
        startIpAddress: "10.0.0.1",
        endIpAddress: "10.0.0.10",
        description: "Allow access from corporate network",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAHorizonDbFirewallRule();
}

main().catch(console.error);

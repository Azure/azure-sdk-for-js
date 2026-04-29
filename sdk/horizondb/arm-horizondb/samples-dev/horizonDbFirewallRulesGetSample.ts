// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a HorizonDb firewall rule.
 *
 * @summary gets information about a HorizonDb firewall rule.
 * x-ms-original-file: 2026-01-20-preview/FirewallRules_Get.json
 */
async function getAHorizonDbFirewallRule(): Promise<void> {
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

async function main(): Promise<void> {
  await getAHorizonDbFirewallRule();
}

main().catch(console.error);

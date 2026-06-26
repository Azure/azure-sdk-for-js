// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a HorizonDB firewall rule.
 *
 * @summary gets information about a HorizonDB firewall rule.
 * x-ms-original-file: 2026-01-20-preview/FirewallRules_Get.json
 */
async function getAHorizonDBFirewallRule(): Promise<void> {
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
  await getAHorizonDBFirewallRule();
}

main().catch(console.error);

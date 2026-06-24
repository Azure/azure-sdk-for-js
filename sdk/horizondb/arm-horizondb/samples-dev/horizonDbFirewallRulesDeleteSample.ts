// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a HorizonDB firewall rule.
 *
 * @summary deletes a HorizonDB firewall rule.
 * x-ms-original-file: 2026-01-20-preview/FirewallRules_Delete.json
 */
async function deleteAHorizonDBFirewallRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  await client.horizonDbFirewallRules.delete(
    "exampleresourcegroup",
    "examplecluster",
    "examplepool",
    "examplefirewallrule",
  );
}

async function main(): Promise<void> {
  await deleteAHorizonDBFirewallRule();
}

main().catch(console.error);

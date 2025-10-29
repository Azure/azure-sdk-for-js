// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to refresh counters
 *
 * @summary refresh counters
 * x-ms-original-file: 2025-10-08/LocalRules_refreshCounters_MaximumSet_Gen.json
 */
async function localRulesRefreshCountersMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.localRules.refreshCounters("firewall-rg", "lrs1", "1", {
    firewallName: "firewall1",
  });
}

/**
 * This sample demonstrates how to refresh counters
 *
 * @summary refresh counters
 * x-ms-original-file: 2025-10-08/LocalRules_refreshCounters_MinimumSet_Gen.json
 */
async function localRulesRefreshCountersMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.localRules.refreshCounters("firewall-rg", "lrs1", "1");
}

async function main(): Promise<void> {
  await localRulesRefreshCountersMaximumSetGen();
  await localRulesRefreshCountersMinimumSetGen();
}

main().catch(console.error);

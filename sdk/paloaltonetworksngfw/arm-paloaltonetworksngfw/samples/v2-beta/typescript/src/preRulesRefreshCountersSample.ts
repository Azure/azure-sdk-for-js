// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to refresh counters
 *
 * @summary refresh counters
 * x-ms-original-file: 2026-05-11-preview/PreRules_refreshCounters_MaximumSet_Gen.json
 */
async function preRulesRefreshCountersMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  await client.preRules.refreshCounters("lrs1", "1", { firewallName: "firewall1" });
}

/**
 * This sample demonstrates how to refresh counters
 *
 * @summary refresh counters
 * x-ms-original-file: 2026-05-11-preview/PreRules_refreshCounters_MinimumSet_Gen.json
 */
async function preRulesRefreshCountersMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  await client.preRules.refreshCounters("lrs1", "1");
}

async function main(): Promise<void> {
  await preRulesRefreshCountersMaximumSetGen();
  await preRulesRefreshCountersMinimumSetGen();
}

main().catch(console.error);

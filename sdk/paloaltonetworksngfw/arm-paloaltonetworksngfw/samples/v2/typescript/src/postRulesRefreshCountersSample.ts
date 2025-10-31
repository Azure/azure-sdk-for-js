// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to refresh counters
 *
 * @summary refresh counters
 * x-ms-original-file: 2025-10-08/PostRules_refreshCounters_MaximumSet_Gen.json
 */
async function postRulesRefreshCountersMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.postRules.refreshCounters("lrs1", "1", {
    firewallName: "firewall1",
  });
}

/**
 * This sample demonstrates how to refresh counters
 *
 * @summary refresh counters
 * x-ms-original-file: 2025-10-08/PostRules_refreshCounters_MinimumSet_Gen.json
 */
async function postRulesRefreshCountersMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.postRules.refreshCounters("lrs1", "1");
}

async function main(): Promise<void> {
  await postRulesRefreshCountersMaximumSetGen();
  await postRulesRefreshCountersMinimumSetGen();
}

main().catch(console.error);

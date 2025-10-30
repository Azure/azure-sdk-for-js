// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to reset counters
 *
 * @summary reset counters
 * x-ms-original-file: 2025-10-08/PostRules_resetCounters_MaximumSet_Gen.json
 */
async function postRulesResetCountersMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.postRules.resetCounters("lrs1", "1", {
    firewallName: "firewall1",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to reset counters
 *
 * @summary reset counters
 * x-ms-original-file: 2025-10-08/PostRules_resetCounters_MinimumSet_Gen.json
 */
async function postRulesResetCountersMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.postRules.resetCounters("lrs1", "1");
  console.log(result);
}

async function main(): Promise<void> {
  await postRulesResetCountersMaximumSetGen();
  await postRulesResetCountersMinimumSetGen();
}

main().catch(console.error);

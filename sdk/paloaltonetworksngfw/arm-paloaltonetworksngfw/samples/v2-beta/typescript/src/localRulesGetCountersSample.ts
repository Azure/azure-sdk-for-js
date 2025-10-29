// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get counters
 *
 * @summary get counters
 * x-ms-original-file: 2025-10-08/LocalRules_getCounters_MaximumSet_Gen.json
 */
async function localRulesGetCountersMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.localRules.getCounters("firewall-rg", "lrs1", "1", {
    firewallName: "firewall1",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get counters
 *
 * @summary get counters
 * x-ms-original-file: 2025-10-08/LocalRules_getCounters_MinimumSet_Gen.json
 */
async function localRulesGetCountersMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.localRules.getCounters("firewall-rg", "lrs1", "1");
  console.log(result);
}

async function main(): Promise<void> {
  await localRulesGetCountersMaximumSetGen();
  await localRulesGetCountersMinimumSetGen();
}

main().catch(console.error);

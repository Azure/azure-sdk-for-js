// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a MetricsObjectFirewallResource
 *
 * @summary get a MetricsObjectFirewallResource
 * x-ms-original-file: 2025-10-08/MetricsObjectFirewall_Get_MaximumSet_Gen.json
 */
async function metricsObjectFirewallGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaa";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.metricsObjectFirewall.get("rgopenapi", "aaaaaaaaaaaaaaaaaaaaaaaa");
  console.log(result);
}

/**
 * This sample demonstrates how to get a MetricsObjectFirewallResource
 *
 * @summary get a MetricsObjectFirewallResource
 * x-ms-original-file: 2025-10-08/MetricsObjectFirewall_Get_MinimumSet_Gen.json
 */
async function metricsObjectFirewallGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaa";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.metricsObjectFirewall.get("rgopenapi", "aaaaaaaaaaaaaaaaaaaaaaaa");
  console.log(result);
}

async function main(): Promise<void> {
  await metricsObjectFirewallGetMaximumSetGen();
  await metricsObjectFirewallGetMinimumSetGen();
}

main().catch(console.error);

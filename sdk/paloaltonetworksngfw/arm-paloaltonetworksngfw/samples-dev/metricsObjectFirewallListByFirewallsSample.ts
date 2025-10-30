// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list MetricsObjectFirewallResource resources by Firewalls
 *
 * @summary list MetricsObjectFirewallResource resources by Firewalls
 * x-ms-original-file: 2025-10-08/MetricsObjectFirewall_ListByFirewalls_MaximumSet_Gen.json
 */
async function metricsObjectFirewallListByFirewallsMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaaaaaaaaaaaaaaaaaaa";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.metricsObjectFirewall.listByFirewalls("rgopenapi", "IFTDk")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list MetricsObjectFirewallResource resources by Firewalls
 *
 * @summary list MetricsObjectFirewallResource resources by Firewalls
 * x-ms-original-file: 2025-10-08/MetricsObjectFirewall_ListByFirewalls_MinimumSet_Gen.json
 */
async function metricsObjectFirewallListByFirewallsMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaaaaaaaaaaaaaaaaaaa";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.metricsObjectFirewall.listByFirewalls("rgopenapi", "IFTDk")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await metricsObjectFirewallListByFirewallsMaximumSetGen();
  await metricsObjectFirewallListByFirewallsMinimumSetGen();
}

main().catch(console.error);

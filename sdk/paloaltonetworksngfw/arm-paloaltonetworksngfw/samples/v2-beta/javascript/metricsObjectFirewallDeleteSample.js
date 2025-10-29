// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a MetricsObjectFirewallResource
 *
 * @summary delete a MetricsObjectFirewallResource
 * x-ms-original-file: 2025-10-08/MetricsObjectFirewall_Delete_MaximumSet_Gen.json
 */
async function metricsObjectFirewallDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaa";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.metricsObjectFirewall.delete("rgopenapi", "aaaaaaaaaaaaaaaaaaaaaaaa");
}

/**
 * This sample demonstrates how to delete a MetricsObjectFirewallResource
 *
 * @summary delete a MetricsObjectFirewallResource
 * x-ms-original-file: 2025-10-08/MetricsObjectFirewall_Delete_MinimumSet_Gen.json
 */
async function metricsObjectFirewallDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaa";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.metricsObjectFirewall.delete("rgopenapi", "aaaaaaaaaaaaaaaaaaaaaaaa");
}

async function main() {
  await metricsObjectFirewallDeleteMaximumSetGen();
  await metricsObjectFirewallDeleteMinimumSetGen();
}

main().catch(console.error);

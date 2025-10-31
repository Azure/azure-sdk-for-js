// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a MetricsObjectFirewallResource
 *
 * @summary create a MetricsObjectFirewallResource
 * x-ms-original-file: 2025-10-08/MetricsObjectFirewall_CreateOrUpdate_MaximumSet_Gen.json
 */
async function metricsObjectFirewallCreateOrUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaa";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.metricsObjectFirewall.createOrUpdate(
    "rgopenapi",
    "aaaaaaaaaaaaaaaaaaaaaaaa",
    {
      properties: {
        applicationInsightsConnectionString: "aaa",
        applicationInsightsResourceId: "aaaaaaaaaaaaaaa",
        panEtag: "aaaaaaaaaa",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a MetricsObjectFirewallResource
 *
 * @summary create a MetricsObjectFirewallResource
 * x-ms-original-file: 2025-10-08/MetricsObjectFirewall_CreateOrUpdate_MinimumSet_Gen.json
 */
async function metricsObjectFirewallCreateOrUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaa";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.metricsObjectFirewall.createOrUpdate(
    "rgopenapi",
    "aaaaaaaaaaaaaaaaaaaaaaaa",
    {
      properties: {
        applicationInsightsConnectionString: "aaa",
        applicationInsightsResourceId: "aaaaaaaaaaaaaaa",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await metricsObjectFirewallCreateOrUpdateMaximumSetGen();
  await metricsObjectFirewallCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);

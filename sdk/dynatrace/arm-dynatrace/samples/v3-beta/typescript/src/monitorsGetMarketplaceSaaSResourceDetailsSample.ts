// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ObservabilityClient } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Marketplace SaaS resource details
 *
 * @summary get Marketplace SaaS resource details
 * x-ms-original-file: 2024-04-24/Monitors_GetMarketplaceSaaSResourceDetails_MaximumSet_Gen.json
 */
async function monitorsGetMarketplaceSaaSResourceDetailsMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1d701e7e-3150-4d33-9279-d4ea03e9110e";
  const client = new ObservabilityClient(credential, subscriptionId);
  const result = await client.monitors.getMarketplaceSaaSResourceDetails({
    tenantId: "urnmattojzhktcfw",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get Marketplace SaaS resource details
 *
 * @summary get Marketplace SaaS resource details
 * x-ms-original-file: 2024-04-24/Monitors_GetMarketplaceSaaSResourceDetails_MinimumSet_Gen.json
 */
async function monitorsGetMarketplaceSaaSResourceDetailsMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1d701e7e-3150-4d33-9279-d4ea03e9110e";
  const client = new ObservabilityClient(credential, subscriptionId);
  const result = await client.monitors.getMarketplaceSaaSResourceDetails({
    tenantId: "urnmattojzhktcfw",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsGetMarketplaceSaaSResourceDetailsMaximumSetGen();
  await monitorsGetMarketplaceSaaSResourceDetailsMinimumSetGen();
}

main().catch(console.error);

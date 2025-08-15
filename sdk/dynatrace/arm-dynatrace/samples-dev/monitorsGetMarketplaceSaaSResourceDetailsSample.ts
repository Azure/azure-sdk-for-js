// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MarketplaceSaaSResourceDetailsRequest } from "@azure/arm-dynatrace";
import { DynatraceObservability } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get Marketplace SaaS resource details of a tenant under a specific subscription
 *
 * @summary Get Marketplace SaaS resource details of a tenant under a specific subscription
 * x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/stable/2023-04-27/examples/Monitors_GetMarketplaceSaaSResourceDetails_MaximumSet_Gen.json
 */
async function monitorsGetMarketplaceSaaSResourceDetailsMaximumSetGen(): Promise<void> {
  const subscriptionId = process.env["DYNATRACE_SUBSCRIPTION_ID"] || "nqmcgifgaqlf";
  const request: MarketplaceSaaSResourceDetailsRequest = {
    tenantId: "urnmattojzhktcfw",
  };
  const credential = new DefaultAzureCredential();
  const client = new DynatraceObservability(credential, subscriptionId);
  const result = await client.monitors.getMarketplaceSaaSResourceDetails(request);
  console.log(result);
}

/**
 * This sample demonstrates how to Get Marketplace SaaS resource details of a tenant under a specific subscription
 *
 * @summary Get Marketplace SaaS resource details of a tenant under a specific subscription
 * x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/stable/2023-04-27/examples/Monitors_GetMarketplaceSaaSResourceDetails_MinimumSet_Gen.json
 */
async function monitorsGetMarketplaceSaaSResourceDetailsMinimumSetGen(): Promise<void> {
  const subscriptionId = process.env["DYNATRACE_SUBSCRIPTION_ID"] || "nqmcgifgaqlf";
  const request: MarketplaceSaaSResourceDetailsRequest = {
    tenantId: "urnmattojzhktcfw",
  };
  const credential = new DefaultAzureCredential();
  const client = new DynatraceObservability(credential, subscriptionId);
  const result = await client.monitors.getMarketplaceSaaSResourceDetails(request);
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsGetMarketplaceSaaSResourceDetailsMaximumSetGen();
  await monitorsGetMarketplaceSaaSResourceDetailsMinimumSetGen();
}

main().catch(console.error);

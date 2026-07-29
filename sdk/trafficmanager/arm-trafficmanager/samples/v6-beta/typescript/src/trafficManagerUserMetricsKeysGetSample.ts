// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TrafficManagerManagementClient } from "@azure/arm-trafficmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the subscription-level key used for Real User Metrics collection.
 *
 * @summary get the subscription-level key used for Real User Metrics collection.
 * x-ms-original-file: 2024-04-01-preview/TrafficManagerUserMetricsKeys-GET.json
 */
async function trafficManagerUserMetricsKeysGET(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.trafficManagerUserMetricsKeys.get();
  console.log(result);
}

async function main(): Promise<void> {
  await trafficManagerUserMetricsKeysGET();
}

main().catch(console.error);

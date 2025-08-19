// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the subscription-level key used for Real User Metrics collection.
 *
 * @summary Get the subscription-level key used for Real User Metrics collection.
 * x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/TrafficManagerUserMetricsKeys-GET.json
 */

import { TrafficManagerManagementClient } from "@azure/arm-trafficmanager";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function trafficManagerUserMetricsKeysGet(): Promise<void> {
  const subscriptionId = process.env["TRAFFICMANAGER_SUBSCRIPTION_ID"] || "{subscription-id}";
  const credential = new DefaultAzureCredential();
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.trafficManagerUserMetricsKeys.get();
  console.log(result);
}

async function main(): Promise<void> {
  await trafficManagerUserMetricsKeysGet();
}

main().catch(console.error);

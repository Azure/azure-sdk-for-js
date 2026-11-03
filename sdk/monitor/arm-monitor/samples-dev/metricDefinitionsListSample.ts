// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the metric definitions for the resource.
 *
 * @summary lists the metric definitions for the resource.
 * x-ms-original-file: 2024-02-01/GetMetricDefinitions.json
 */
async function getMetricDefinitionsWithoutFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const resArray = new Array();
  for await (const item of client.metricDefinitions.list(
    "subscriptions/07c0b09d-9f69-4e6e-8d05-f59f67299cb2/resourceGroups/Rac46PostSwapRG/providers/Microsoft.Web/sites/alertruleTest/providers/microsoft.insights/metricDefinitions",
    { metricnamespace: "Microsoft.Web/sites" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the metric definitions for the resource.
 *
 * @summary lists the metric definitions for the resource.
 * x-ms-original-file: 2024-02-01/GetMetricDefinitionsApplicationInsights.json
 */
async function getApplicationInsightsMetricDefinitionsWithoutFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const resArray = new Array();
  for await (const item of client.metricDefinitions.list(
    "subscriptions/182c901a-129a-4f5d-86e4-cc6b294590a2/resourceGroups/hyr-log/providers/microsoft.insights/components/f1-bill/providers/microsoft.insights/metricdefinitions",
    { metricnamespace: "microsoft.insights/components" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the metric definitions for the resource.
 *
 * @summary lists the metric definitions for the resource.
 * x-ms-original-file: 2024-02-01/GetMetricDefinitionsMetricClass.json
 */
async function getStorageCacheMetricDefinitionsWithMetricClass(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const resArray = new Array();
  for await (const item of client.metricDefinitions.list(
    "subscriptions/46841c0e-69c8-4b17-af46-6626ecb15fc2/resourceGroups/adgarntptestrg/providers/Microsoft.StorageCache/caches/adgarntptestcache",
    { metricnamespace: "microsoft.storagecache/caches" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getMetricDefinitionsWithoutFilter();
  await getApplicationInsightsMetricDefinitionsWithoutFilter();
  await getStorageCacheMetricDefinitionsWithMetricClass();
}

main().catch(console.error);

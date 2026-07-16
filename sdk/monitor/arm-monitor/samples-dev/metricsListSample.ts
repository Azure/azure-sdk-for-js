// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to **Lists the metric values for a resource**. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling).
 *
 * @summary **Lists the metric values for a resource**. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling).
 * x-ms-original-file: 2024-02-01/GetMetric.json
 */
async function getMetricForData(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.metrics.list(
    "subscriptions/1f3fa6d2-851c-4a91-9087-1a050f3a9c38/resourceGroups/todking/providers/Microsoft.Storage/storageAccounts/tkfileserv/blobServices/default",
    {
      timespan: "2021-04-20T09:00:00.000Z/2021-04-20T14:00:00.000Z",
      interval: "PT6H",
      metricnames: "BlobCount,BlobCapacity",
      aggregation: "average,minimum,maximum",
      top: 5,
      orderby: "average asc",
      filter: "Tier eq '*'",
      metricnamespace: "Microsoft.Storage/storageAccounts/blobServices",
      autoAdjustTimegrain: true,
      validateDimensions: false,
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to **Lists the metric values for a resource**. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling).
 *
 * @summary **Lists the metric values for a resource**. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling).
 * x-ms-original-file: 2024-02-01/GetMetricError.json
 */
async function getMetricWithError(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.metrics.list(
    "subscriptions/ac41e21f-afd6-4a79-8070-f01eba278f97/resourceGroups/todking/providers/Microsoft.DocumentDb/databaseAccounts/tk-cosmos-mongo",
    {
      timespan: "2021-06-07T21:51:00Z/2021-06-08T01:51:00Z",
      interval: "FULL",
      metricnames: "MongoRequestsCount,MongoRequests",
      aggregation: "average",
      metricnamespace: "microsoft.documentdb/databaseaccounts",
      autoAdjustTimegrain: true,
      validateDimensions: false,
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to **Lists the metric values for a resource**. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling).
 *
 * @summary **Lists the metric values for a resource**. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling).
 * x-ms-original-file: 2024-02-01/GetMetricMetadata.json
 */
async function getMetricForMetadata(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.metrics.list(
    "subscriptions/1f3fa6d2-851c-4a91-9087-1a050f3a9c38/resourceGroups/todking/providers/Microsoft.Storage/storageAccounts/tkfileserv/blobServices/default",
    {
      timespan: "2017-04-14T02:20:00Z/2017-04-14T04:20:00Z",
      filter: "Tier eq '*'",
      metricnamespace: "Microsoft.Storage/storageAccounts/blobServices",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getMetricForData();
  await getMetricWithError();
  await getMetricForMetadata();
}

main().catch(console.error);

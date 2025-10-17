// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to export logs that show total throttled Api requests for this subscription in the given time window.
 *
 * @summary export logs that show total throttled Api requests for this subscription in the given time window.
 * x-ms-original-file: 2025-04-01/logAnalyticExamples/LogAnalytics_ThrottledRequests.json
 */
async function exportLogsWhichContainAllThrottledApiRequestsMadeToComputeResourceProviderWithinTheGivenTimePeriod(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.logAnalyticsOperationGroup.exportThrottledRequests("westus", {
    blobContainerSasUri: "https://somesasuri",
    fromTime: new Date("2018-01-21T01:54:06.862601Z"),
    toTime: new Date("2018-01-23T01:54:06.862601Z"),
    groupByOperationName: true,
    groupByResourceName: false,
    groupByClientApplicationId: false,
    groupByUserAgent: false,
  });
}

async function main(): Promise<void> {
  await exportLogsWhichContainAllThrottledApiRequestsMadeToComputeResourceProviderWithinTheGivenTimePeriod();
}

main().catch(console.error);

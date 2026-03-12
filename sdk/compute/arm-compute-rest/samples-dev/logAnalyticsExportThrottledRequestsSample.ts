// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Export logs that show total throttled Api requests for this subscription in the given time window.
 *
 * @summary Export logs that show total throttled Api requests for this subscription in the given time window.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/logAnalyticExamples/LogAnalytics_ThrottledRequests.json
 */

import type { LogAnalyticsExportThrottledRequestsParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { getLongRunningPoller } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function exportLogsWhichContainAllThrottledApiRequestsMadeToComputeResourceProviderWithinTheGivenTimePeriod(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "westus";
  const options: LogAnalyticsExportThrottledRequestsParameters = {
    body: {
      blobContainerSasUri: "https://somesasuri",
      fromTime: new Date("2018-01-21T01:54:06.862601Z"),
      groupByClientApplicationId: false,
      groupByOperationName: true,
      groupByResourceName: false,
      groupByUserAgent: false,
      toTime: new Date("2018-01-23T01:54:06.862601Z"),
    },
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/logAnalytics/apiAccess/getThrottledRequests",
      subscriptionId,
      location,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

exportLogsWhichContainAllThrottledApiRequestsMadeToComputeResourceProviderWithinTheGivenTimePeriod().catch(
  console.error,
);

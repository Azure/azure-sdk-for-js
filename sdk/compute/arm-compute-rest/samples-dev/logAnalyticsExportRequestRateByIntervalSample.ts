// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  LogAnalyticsExportRequestRateByIntervalParameters,
  getLongRunningPoller,
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Export logs that show Api requests made by this subscription in the given time window to show throttling activities.
 *
 * @summary Export logs that show Api requests made by this subscription in the given time window to show throttling activities.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/logAnalyticExamples/LogAnalytics_RequestRateByInterval.json
 */
async function exportLogsWhichContainAllApiRequestsMadeToComputeResourceProviderWithinTheGivenTimePeriodBrokenDownByIntervals() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "westus";
  const options: LogAnalyticsExportRequestRateByIntervalParameters = {
    body: {
      blobContainerSasUri: "https://somesasuri",
      fromTime: new Date("2018-01-21T01:54:06.862601Z"),
      groupByResourceName: true,
      intervalLength: "FiveMins",
      toTime: new Date("2018-01-23T01:54:06.862601Z"),
    },
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/logAnalytics/apiAccess/getRequestRateByInterval",
      subscriptionId,
      location,
    )
    .post(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

exportLogsWhichContainAllApiRequestsMadeToComputeResourceProviderWithinTheGivenTimePeriodBrokenDownByIntervals().catch(
  console.error,
);

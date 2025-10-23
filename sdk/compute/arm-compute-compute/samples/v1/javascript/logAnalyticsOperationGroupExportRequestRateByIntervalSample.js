// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to export logs that show Api requests made by this subscription in the given time window to show throttling activities.
 *
 * @summary export logs that show Api requests made by this subscription in the given time window to show throttling activities.
 * x-ms-original-file: 2025-04-01/logAnalyticExamples/LogAnalytics_RequestRateByInterval.json
 */
async function exportLogsWhichContainAllApiRequestsMadeToComputeResourceProviderWithinTheGivenTimePeriodBrokenDownByIntervals() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.logAnalyticsOperationGroup.exportRequestRateByInterval("westus", {
    intervalLength: "FiveMins",
    blobContainerSasUri: "https://somesasuri",
    fromTime: new Date("2018-01-21T01:54:06.862601Z"),
    toTime: new Date("2018-01-23T01:54:06.862601Z"),
    groupByResourceName: true,
  });
}

async function main() {
  await exportLogsWhichContainAllApiRequestsMadeToComputeResourceProviderWithinTheGivenTimePeriodBrokenDownByIntervals();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to use this method to get the aggregated security analytics recommendation of yours IoT Security solution. This aggregation is performed by recommendation name.
 *
 * @summary use this method to get the aggregated security analytics recommendation of yours IoT Security solution. This aggregation is performed by recommendation name.
 * x-ms-original-file: 2019-08-01/IoTSecuritySolutionsAnalytics/GetIoTSecuritySolutionsSecurityRecommendation.json
 */
async function getTheAggregatedSecurityAnalyticsRecommendationOfYoursIoTSecuritySolution() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "075423e9-7d33-4166-8bdf-3920b04e3735";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.iotSecuritySolutionsAnalyticsRecommendation.get(
    "IoTEdgeResources",
    "default",
    "OpenPortsOnDevice",
  );
  console.log(result);
}

async function main() {
  await getTheAggregatedSecurityAnalyticsRecommendationOfYoursIoTSecuritySolution();
}

main().catch(console.error);

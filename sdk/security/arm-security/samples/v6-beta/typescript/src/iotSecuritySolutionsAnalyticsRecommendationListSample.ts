// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to use this method to get the list of aggregated security analytics recommendations of yours IoT Security solution.
 *
 * @summary use this method to get the list of aggregated security analytics recommendations of yours IoT Security solution.
 * x-ms-original-file: 2019-08-01/IoTSecuritySolutionsAnalytics/GetIoTSecuritySolutionsSecurityRecommendationList.json
 */
async function getTheListOfAggregatedSecurityAnalyticsRecommendationsOfYoursIoTSecuritySolution(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "075423e9-7d33-4166-8bdf-3920b04e3735";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.iotSecuritySolutionsAnalyticsRecommendation.list(
    "IoTEdgeResources",
    "default",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getTheListOfAggregatedSecurityAnalyticsRecommendationsOfYoursIoTSecuritySolution();
}

main().catch(console.error);

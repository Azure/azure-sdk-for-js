// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to use this method to get a single the aggregated alert of yours IoT Security solution. This aggregation is performed by alert name.
 *
 * @summary use this method to get a single the aggregated alert of yours IoT Security solution. This aggregation is performed by alert name.
 * x-ms-original-file: 2019-08-01/IoTSecuritySolutionsAnalytics/GetIoTSecuritySolutionsSecurityAggregatedAlert.json
 */
async function getTheAggregatedSecurityAnalyticsAlertOfYoursIoTSecuritySolutionThisAggregationIsPerformedByAlertName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.iotSecuritySolutionsAnalyticsAggregatedAlert.get(
    "MyGroup",
    "default",
    "IoT_Bruteforce_Fail/2019-02-02",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTheAggregatedSecurityAnalyticsAlertOfYoursIoTSecuritySolutionThisAggregationIsPerformedByAlertName();
}

main().catch(console.error);

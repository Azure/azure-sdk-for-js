// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to use this method to get the aggregated alert list of yours IoT Security solution.
 *
 * @summary use this method to get the aggregated alert list of yours IoT Security solution.
 * x-ms-original-file: 2019-08-01/IoTSecuritySolutionsAnalytics/GetIoTSecuritySolutionsSecurityAggregatedAlertList.json
 */
async function getTheAggregatedAlertListOfYoursIoTSecuritySolution(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.iotSecuritySolutionsAnalyticsAggregatedAlert.list(
    "MyGroup",
    "default",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getTheAggregatedAlertListOfYoursIoTSecuritySolution();
}

main().catch(console.error);

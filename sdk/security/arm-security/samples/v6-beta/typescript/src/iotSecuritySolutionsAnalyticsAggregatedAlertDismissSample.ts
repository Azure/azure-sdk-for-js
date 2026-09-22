// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to use this method to dismiss an aggregated IoT Security Solution Alert.
 *
 * @summary use this method to dismiss an aggregated IoT Security Solution Alert.
 * x-ms-original-file: 2019-08-01/IoTSecuritySolutionsAnalytics/PostIoTSecuritySolutionsSecurityAggregatedAlertDismiss.json
 */
async function dismissAnAggregatedIoTSecuritySolutionAlert(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.iotSecuritySolutionsAnalyticsAggregatedAlert.dismiss(
    "IoTEdgeResources",
    "default",
    "IoT_Bruteforce_Fail/2019-02-02/dismiss",
  );
}

async function main(): Promise<void> {
  await dismissAnAggregatedIoTSecuritySolutionAlert();
}

main().catch(console.error);

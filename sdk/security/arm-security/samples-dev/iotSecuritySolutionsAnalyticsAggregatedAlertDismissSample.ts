// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Use this method to dismiss an aggregated IoT Security Solution Alert.
 *
 * @summary Use this method to dismiss an aggregated IoT Security Solution Alert.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2019-08-01/examples/IoTSecuritySolutionsAnalytics/PostIoTSecuritySolutionsSecurityAggregatedAlertDismiss.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function dismissAnAggregatedIoTSecuritySolutionAlert(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const resourceGroupName = process.env["SECURITY_RESOURCE_GROUP"] || "IoTEdgeResources";
  const solutionName = "default";
  const aggregatedAlertName = "IoT_Bruteforce_Fail/2019-02-02/dismiss";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.iotSecuritySolutionsAnalyticsAggregatedAlert.dismiss(
    resourceGroupName,
    solutionName,
    aggregatedAlertName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dismissAnAggregatedIoTSecuritySolutionAlert();
}

main().catch(console.error);

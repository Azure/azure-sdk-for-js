// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to use this method to get IoT Security Analytics metrics.
 *
 * @summary use this method to get IoT Security Analytics metrics.
 * x-ms-original-file: 2019-08-01/IoTSecuritySolutionsAnalytics/GetIoTSecuritySolutionsSecurityAnalytics.json
 */
async function getSecuritySolutionAnalytics(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.iotSecuritySolutionAnalytics.get("MyGroup", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await getSecuritySolutionAnalytics();
}

main().catch(console.error);

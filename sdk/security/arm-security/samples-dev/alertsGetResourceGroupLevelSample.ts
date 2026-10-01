// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an alert that is associated a resource group or a resource in a resource group
 *
 * @summary get an alert that is associated a resource group or a resource in a resource group
 * x-ms-original-file: 2022-01-01/Alerts/GetAlertResourceGroupLocation_example.json
 */
async function getSecurityAlertOnAResourceGroupFromASecurityDataLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.alerts.getResourceGroupLevel(
    "myRg1",
    "westeurope",
    "2518298467986649999_4d25bfef-2d77-4a08-adc0-3e35715cc92a",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getSecurityAlertOnAResourceGroupFromASecurityDataLocation();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an alert that is associated with a subscription
 *
 * @summary get an alert that is associated with a subscription
 * x-ms-original-file: 2022-01-01/Alerts/GetAlertSubscriptionLocation_example.json
 */
async function getSecurityAlertOnASubscriptionFromASecurityDataLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.alerts.getSubscriptionLevel(
    "westeurope",
    "2518770965529163669_F144EE95-A3E5-42DA-A279-967D115809AA",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getSecurityAlertOnASubscriptionFromASecurityDataLocation();
}

main().catch(console.error);

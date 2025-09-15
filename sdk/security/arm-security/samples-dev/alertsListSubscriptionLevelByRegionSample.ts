// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List all the alerts that are associated with the subscription that are stored in a specific location
 *
 * @summary List all the alerts that are associated with the subscription that are stored in a specific location
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2022-01-01/examples/Alerts/GetAlertsSubscriptionsLocation_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getSecurityAlertsOnASubscriptionFromASecurityDataLocation(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const ascLocation = "westeurope";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.alerts.listSubscriptionLevelByRegion(ascLocation)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getSecurityAlertsOnASubscriptionFromASecurityDataLocation();
}

main().catch(console.error);

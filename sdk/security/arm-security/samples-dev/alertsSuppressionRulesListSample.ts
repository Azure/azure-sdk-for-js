// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List of all the dismiss rules for the given subscription
 *
 * @summary List of all the dismiss rules for the given subscription
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2019-01-01-preview/examples/AlertsSuppressionRules/GetAlertsSuppressionRulesWithAlertType_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getSuppressionAlertRuleForSubscriptionFilteredByAlertType(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.alertsSuppressionRules.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List of all the dismiss rules for the given subscription
 *
 * @summary List of all the dismiss rules for the given subscription
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2019-01-01-preview/examples/AlertsSuppressionRules/GetAlertsSuppressionRules_example.json
 */
async function getSuppressionRulesForSubscription(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.alertsSuppressionRules.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getSuppressionAlertRuleForSubscriptionFilteredByAlertType();
  await getSuppressionRulesForSubscription();
}

main().catch(console.error);

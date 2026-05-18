// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list of all the dismiss rules for the given subscription
 *
 * @summary list of all the dismiss rules for the given subscription
 * x-ms-original-file: 2019-01-01-preview/AlertsSuppressionRules/GetAlertsSuppressionRulesWithAlertType_example.json
 */
async function getSuppressionAlertRuleForSubscriptionFilteredByAlertType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.alertsSuppressionRules.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list of all the dismiss rules for the given subscription
 *
 * @summary list of all the dismiss rules for the given subscription
 * x-ms-original-file: 2019-01-01-preview/AlertsSuppressionRules/GetAlertsSuppressionRules_example.json
 */
async function getSuppressionRulesForSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
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

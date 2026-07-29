// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get dismiss rule, with name: {alertsSuppressionRuleName}, for the given subscription
 *
 * @summary get dismiss rule, with name: {alertsSuppressionRuleName}, for the given subscription
 * x-ms-original-file: 2019-01-01-preview/AlertsSuppressionRules/GetAlertsSuppressionRule_example.json
 */
async function getSuppressionAlertRuleForSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.alertsSuppressionRules.get("dismissIpAnomalyAlerts");
  console.log(result);
}

async function main(): Promise<void> {
  await getSuppressionAlertRuleForSubscription();
}

main().catch(console.error);

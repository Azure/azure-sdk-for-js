// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get dismiss rule, with name: {alertsSuppressionRuleName}, for the given subscription
 *
 * @summary Get dismiss rule, with name: {alertsSuppressionRuleName}, for the given subscription
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2019-01-01-preview/examples/AlertsSuppressionRules/GetAlertsSuppressionRule_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getSuppressionAlertRuleForSubscription(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const alertsSuppressionRuleName = "dismissIpAnomalyAlerts";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.alertsSuppressionRules.get(alertsSuppressionRuleName);
  console.log(result);
}

async function main(): Promise<void> {
  await getSuppressionAlertRuleForSubscription();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete dismiss alert rule for this subscription.
 *
 * @summary delete dismiss alert rule for this subscription.
 * x-ms-original-file: 2019-01-01-preview/AlertsSuppressionRules/DeleteAlertsSuppressionRule_example.json
 */
async function deleteSuppressionRuleDataForASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.alertsSuppressionRules.delete("dismissIpAnomalyAlerts");
}

async function main(): Promise<void> {
  await deleteSuppressionRuleDataForASubscription();
}

main().catch(console.error);

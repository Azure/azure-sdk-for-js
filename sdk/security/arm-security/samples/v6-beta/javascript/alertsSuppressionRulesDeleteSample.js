// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete dismiss alert rule for this subscription.
 *
 * @summary delete dismiss alert rule for this subscription.
 * x-ms-original-file: 2019-01-01-preview/AlertsSuppressionRules/DeleteAlertsSuppressionRule_example.json
 */
async function deleteSuppressionRuleDataForASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.alertsSuppressionRules.delete("dismissIpAnomalyAlerts");
}

async function main() {
  await deleteSuppressionRuleDataForASubscription();
}

main().catch(console.error);

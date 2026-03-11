// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AlertsManagementClient } = require("@azure/arm-alertprocessingrules");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an alert processing rule.
 *
 * @summary delete an alert processing rule.
 * x-ms-original-file: 2021-08-08/AlertProcessingRules_Delete.json
 */
async function deleteAlertProcessingRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1e3ff1c0-771a-4119-a03b-be82a51e232d";
  const client = new AlertsManagementClient(credential, subscriptionId);
  await client.alertProcessingRules.delete("alertscorrelationrg", "DailySuppression");
}

async function main() {
  await deleteAlertProcessingRule();
}

main().catch(console.error);

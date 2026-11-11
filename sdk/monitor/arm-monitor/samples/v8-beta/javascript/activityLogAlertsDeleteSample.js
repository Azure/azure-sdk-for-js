// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an Activity Log Alert rule.
 *
 * @summary delete an Activity Log Alert rule.
 * x-ms-original-file: 2023-01-01-preview/ActivityLogAlertRule_Delete.json
 */
async function deleteAnActivityLogAlertRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "187f412d-1758-44d9-b052-169e2564721d";
  const client = new MonitorClient(credential, subscriptionId);
  await client.activityLogAlerts.delete("MyResourceGroup", "SampleActivityLogAlertRule");
}

async function main() {
  await deleteAnActivityLogAlertRule();
}

main().catch(console.error);

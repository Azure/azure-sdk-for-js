// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get an Activity Log Alert rule.
 *
 * @summary get an Activity Log Alert rule.
 * x-ms-original-file: 2023-01-01-preview/ActivityLogAlertRule_Get.json
 */
async function getAnActivityLogAlertRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "187f412d-1758-44d9-b052-169e2564721d";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.activityLogAlerts.get(
    "MyResourceGroup",
    "SampleActivityLogAlertRule",
  );
  console.log(result);
}

async function main() {
  await getAnActivityLogAlertRule();
}

main().catch(console.error);

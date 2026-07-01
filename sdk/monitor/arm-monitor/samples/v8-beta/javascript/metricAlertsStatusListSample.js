// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve an alert rule status.
 *
 * @summary retrieve an alert rule status.
 * x-ms-original-file: 2024-03-01-preview/getMetricAlertStatus.json
 */
async function getAnAlertRuleStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlertsStatus.list("gigtest", "chiricutin");
  console.log(result);
}

async function main() {
  await getAnAlertRuleStatus();
}

main().catch(console.error);

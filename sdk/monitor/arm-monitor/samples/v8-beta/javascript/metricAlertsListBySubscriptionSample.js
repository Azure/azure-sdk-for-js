// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve alert rule definitions in a subscription.
 *
 * @summary retrieve alert rule definitions in a subscription.
 * x-ms-original-file: 2024-03-01-preview/listMetricAlert.json
 */
async function listMetricAlertRules() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.metricAlerts.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listMetricAlertRules();
}

main().catch(console.error);

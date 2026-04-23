// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve an alert rule status.
 *
 * @summary retrieve an alert rule status.
 * x-ms-original-file: 2024-03-01-preview/getMetricAlertStatus.json
 */
async function getAnAlertRuleStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.metricAlertsStatus.list("gigtest", "chiricutin")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAnAlertRuleStatus();
}

main().catch(console.error);

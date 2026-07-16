// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve alert rule definitions in a resource group.
 *
 * @summary retrieve alert rule definitions in a resource group.
 * x-ms-original-file: 2024-03-01-preview/listByResourceGroupMetricAlert.json
 */
async function listMetricAlertRules(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.metricAlerts.listByResourceGroup("gigtest")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listMetricAlertRules();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a classic metric alert rule
 *
 * @summary Gets a classic metric alert rule
 * x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/stable/2016-03-01/examples/getAlertRule.json
 */

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAnAlertRule(): Promise<void> {
  const subscriptionId =
    process.env["MONITOR_SUBSCRIPTION_ID"] || "b67f7fec-69fc-4974-9099-a26bd6ffeda3";
  const resourceGroupName = process.env["MONITOR_RESOURCE_GROUP"] || "Rac46PostSwapRG";
  const ruleName = "chiricutin";
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.alertRules.get(resourceGroupName, ruleName);
  console.log(result);
}

async function main(): Promise<void> {
  await getAnAlertRule();
}

main().catch(console.error);

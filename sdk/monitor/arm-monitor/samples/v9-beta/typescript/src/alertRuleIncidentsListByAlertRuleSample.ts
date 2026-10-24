// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of incidents associated to an alert rule
 *
 * @summary gets a list of incidents associated to an alert rule
 * x-ms-original-file: 2016-03-01/listAlertRuleIncidents.json
 */
async function listAlertRuleIncidents(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b67f7fec-69fc-4974-9099-a26bd6ffeda3";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.alertRuleIncidents.listByAlertRule(
    "Rac46PostSwapRG",
    "myRuleName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAlertRuleIncidents();
}

main().catch(console.error);

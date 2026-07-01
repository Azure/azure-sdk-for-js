// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an incident associated to an alert rule
 *
 * @summary gets an incident associated to an alert rule
 * x-ms-original-file: 2016-03-01/getAlertRuleIncident.json
 */
async function getASingleAlertRuleIncident(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b67f7fec-69fc-4974-9099-a26bd6ffeda3";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.alertRuleIncidents.get(
    "Rac46PostSwapRG",
    "myRuleName",
    "Website_started",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getASingleAlertRuleIncident();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the rule sets configured for a Confluent monitor.
 *
 * @summary lists the rule sets configured for a Confluent monitor.
 * x-ms-original-file: 2026-10-21-preview/MonitorTagRules_ListByMonitor_MaximumSet_Gen.json
 */
async function monitorTagRulesListByMonitorMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitorTagRules.listByMonitor(
    "rgconfluent",
    "myOrganization",
    "productionLogs",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await monitorTagRulesListByMonitorMaximumSet();
}

main().catch(console.error);

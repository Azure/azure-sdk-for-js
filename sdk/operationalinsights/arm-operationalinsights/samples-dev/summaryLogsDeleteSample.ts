// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes Log Analytics workspace Summary rules.
 *
 * @summary deletes Log Analytics workspace Summary rules.
 * x-ms-original-file: 2025-07-01/SummaryLogsDelete.json
 */
async function summaryLogsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.summaryLogs.delete("oiautorest6685", "oiautorest6685", "summarylogs1");
}

async function main(): Promise<void> {
  await summaryLogsDelete();
}

main().catch(console.error);

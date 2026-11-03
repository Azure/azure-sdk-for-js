// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts an inactive Summary rule.
 *
 * @summary starts an inactive Summary rule.
 * x-ms-original-file: 2025-07-01/SummaryLogsStart.json
 */
async function summaryLogsStart(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.summaryLogs.start("exampleresourcegroup", "exampleworkspace", "summarylogs3");
}

async function main(): Promise<void> {
  await summaryLogsStart();
}

main().catch(console.error);

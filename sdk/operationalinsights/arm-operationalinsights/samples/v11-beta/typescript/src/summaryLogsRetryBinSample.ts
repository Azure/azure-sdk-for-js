// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retries a failed Summary rule bin.
 *
 * @summary retries a failed Summary rule bin.
 * x-ms-original-file: 2025-07-01/SummaryLogsRetryBin.json
 */
async function summaryLogsRetryBin(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.summaryLogs.retryBin("oiautorest6685", "oiautorest6685", "summarylogs1", {
    properties: { retryBinStartTime: new Date("2020-02-03T04:00:00Z") },
  });
}

async function main(): Promise<void> {
  await summaryLogsRetryBin();
}

main().catch(console.error);

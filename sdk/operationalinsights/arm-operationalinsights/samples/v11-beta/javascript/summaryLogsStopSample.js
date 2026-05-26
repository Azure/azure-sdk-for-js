// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops an active Summary rule.
 *
 * @summary stops an active Summary rule.
 * x-ms-original-file: 2025-07-01/SummaryLogsStop.json
 */
async function summaryLogsStop() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.summaryLogs.stop("oiautorest6685", "oiautorest6685", "summarylogs1");
}

async function main() {
  await summaryLogsStop();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts an inactive Summary rule.
 *
 * @summary starts an inactive Summary rule.
 * x-ms-original-file: 2025-07-01/SummaryLogsStart.json
 */
async function summaryLogsStart() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.summaryLogs.start("exampleresourcegroup", "exampleworkspace", "summarylogs3");
}

async function main() {
  await summaryLogsStart();
}

main().catch(console.error);

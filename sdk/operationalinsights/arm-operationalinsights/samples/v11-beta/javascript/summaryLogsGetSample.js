// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets Log Analytics workspace Summary rules.
 *
 * @summary gets Log Analytics workspace Summary rules.
 * x-ms-original-file: 2025-07-01/SummaryLogsGet.json
 */
async function summaryLogsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.summaryLogs.get("oiautorest6685", "oiautorest6685", "summarylogs1");
  console.log(result);
}

async function main() {
  await summaryLogsGet();
}

main().catch(console.error);

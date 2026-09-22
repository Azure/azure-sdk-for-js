// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all summary rules for the specified Log Analytics workspace.
 *
 * @summary gets all summary rules for the specified Log Analytics workspace.
 * x-ms-original-file: 2025-07-01/SummaryLogsList.json
 */
async function summaryLogsListByWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.summaryLogs.listByWorkspace("oiautorest6685", "oiautorest6685")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await summaryLogsListByWorkspace();
}

main().catch(console.error);

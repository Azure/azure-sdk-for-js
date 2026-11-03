// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates Log Analytics workspace Summary rules.
 *
 * @summary creates or updates Log Analytics workspace Summary rules.
 * x-ms-original-file: 2025-07-01/SummaryLogsUpsert.json
 */
async function summaryLogsUpsert() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.summaryLogs.createOrUpdate(
    "oiautorest6685",
    "oiautorest6685",
    "summarylogs1",
    {
      ruleDefinition: {
        binDelay: 10,
        binSize: 180,
        binStartTime: new Date("2020-02-03T04:05:06Z"),
        destinationTable: "MyDestinationTable_CL",
        query: "MyTable_CL",
      },
      ruleType: "User",
    },
  );
  console.log(result);
}

async function main() {
  await summaryLogsUpsert();
}

main().catch(console.error);

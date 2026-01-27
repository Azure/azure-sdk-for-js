// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retries a failed Summary rule bin.
 *
 * @summary Retries a failed Summary rule bin.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/stable/2025-07-01/examples/SummaryLogsRetryBin.json
 */
async function summaryLogsRetryBin() {
  const subscriptionId =
    process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] || "11111111-1111-1111-1111-111111111111";
  const resourceGroupName = process.env["OPERATIONALINSIGHTS_RESOURCE_GROUP"] || "oiautorest6685";
  const workspaceName = "oiautorest6685";
  const summaryLogsName = "summarylogs1";
  const parameters = {
    properties: { retryBinStartTime: new Date("2020-02-03T04:00:00Z") },
  };
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.summaryLogsOperations.beginRetryBinAndWait(
    resourceGroupName,
    workspaceName,
    summaryLogsName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await summaryLogsRetryBin();
}

main().catch(console.error);

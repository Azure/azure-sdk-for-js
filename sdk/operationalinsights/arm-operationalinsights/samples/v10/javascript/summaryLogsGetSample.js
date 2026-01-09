// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets Log Analytics workspace Summary rules.
 *
 * @summary Gets Log Analytics workspace Summary rules.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/stable/2025-07-01/examples/SummaryLogsGet.json
 */
async function summaryLogsGet() {
  const subscriptionId =
    process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] || "11111111-1111-1111-1111-111111111111";
  const resourceGroupName = process.env["OPERATIONALINSIGHTS_RESOURCE_GROUP"] || "oiautorest6685";
  const workspaceName = "oiautorest6685";
  const summaryLogsName = "summarylogs1";
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.summaryLogsOperations.get(
    resourceGroupName,
    workspaceName,
    summaryLogsName,
  );
  console.log(result);
}

async function main() {
  await summaryLogsGet();
}

main().catch(console.error);

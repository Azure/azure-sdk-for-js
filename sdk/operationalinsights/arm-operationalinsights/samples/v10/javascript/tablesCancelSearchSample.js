// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Cancel a log analytics workspace search results table query run.
 *
 * @summary Cancel a log analytics workspace search results table query run.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/stable/2025-07-01/examples/TablesSearchCancel.json
 */
async function tablesSearchCancel() {
  const subscriptionId =
    process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-00000000000";
  const resourceGroupName = process.env["OPERATIONALINSIGHTS_RESOURCE_GROUP"] || "oiautorest6685";
  const workspaceName = "oiautorest6685";
  const tableName = "table1_SRCH";
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.tables.cancelSearch(resourceGroupName, workspaceName, tableName);
  console.log(result);
}

async function main() {
  await tablesSearchCancel();
}

main().catch(console.error);

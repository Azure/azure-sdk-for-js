// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all the tables for the specified Log Analytics workspace.
 *
 * @summary Gets all the tables for the specified Log Analytics workspace.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/stable/2025-07-01/examples/TablesList.json
 */
async function tablesListByWorkspace() {
  const subscriptionId =
    process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-00000000000";
  const resourceGroupName = process.env["OPERATIONALINSIGHTS_RESOURCE_GROUP"] || "oiautorest6685";
  const workspaceName = "oiautorest6685";
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tables.listByWorkspace(resourceGroupName, workspaceName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await tablesListByWorkspace();
}

main().catch(console.error);

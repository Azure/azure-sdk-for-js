// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Log Analytics workspace table.
 *
 * @summary delete a Log Analytics workspace table.
 * x-ms-original-file: 2025-07-01/TablesDelete.json
 */
async function tablesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.tables.delete("oiautorest6685", "oiautorest6685", "table1_CL");
}

async function main() {
  await tablesDelete();
}

main().catch(console.error);

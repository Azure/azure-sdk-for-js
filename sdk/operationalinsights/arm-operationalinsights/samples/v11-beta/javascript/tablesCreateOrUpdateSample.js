// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update or Create a Log Analytics workspace table.
 *
 * @summary update or Create a Log Analytics workspace table.
 * x-ms-original-file: 2025-07-01/TablesUpsertForTable.json
 */
async function tablesUpsert() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.tables.createOrUpdate(
    "oiautorest6685",
    "oiautorest6685",
    "AzureNetworkFlow",
    {
      schema: { name: "AzureNetworkFlow", columns: [{ name: "MyNewColumn", type: "guid" }] },
      retentionInDays: 45,
      totalRetentionInDays: 70,
    },
  );
  console.log(result);
}

async function main() {
  await tablesUpsert();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Log Analytics workspace table.
 *
 * @summary update a Log Analytics workspace table.
 * x-ms-original-file: 2025-07-01/TablesUpsert.json
 */
async function tablesUpsert(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.tables.update(
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

async function main(): Promise<void> {
  await tablesUpsert();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Log Analytics workspace table.
 *
 * @summary delete a Log Analytics workspace table.
 * x-ms-original-file: 2025-07-01/TablesDelete.json
 */
async function tablesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.tables.delete("oiautorest6685", "oiautorest6685", "table1_CL");
}

async function main(): Promise<void> {
  await tablesDelete();
}

main().catch(console.error);

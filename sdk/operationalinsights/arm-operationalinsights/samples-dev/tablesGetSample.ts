// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a Log Analytics workspace table.
 *
 * @summary gets a Log Analytics workspace table.
 * x-ms-original-file: 2025-07-01/TablesGet.json
 */
async function tablesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.tables.get("oiautorest6685", "oiautorest6685", "table1_SRCH");
  console.log(result);
}

async function main(): Promise<void> {
  await tablesGet();
}

main().catch(console.error);

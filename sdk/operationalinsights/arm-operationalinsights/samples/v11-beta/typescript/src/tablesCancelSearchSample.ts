// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancel a log analytics workspace search results table query run.
 *
 * @summary cancel a log analytics workspace search results table query run.
 * x-ms-original-file: 2025-07-01/TablesSearchCancel.json
 */
async function tablesSearchCancel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.tables.cancelSearch("oiautorest6685", "oiautorest6685", "table1_SRCH");
}

async function main(): Promise<void> {
  await tablesSearchCancel();
}

main().catch(console.error);

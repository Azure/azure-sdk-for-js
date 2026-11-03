// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all the tables for the specified Log Analytics workspace.
 *
 * @summary gets all the tables for the specified Log Analytics workspace.
 * x-ms-original-file: 2025-07-01/TablesList.json
 */
async function tablesListByWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tables.listByWorkspace("oiautorest6685", "oiautorest6685")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await tablesListByWorkspace();
}

main().catch(console.error);

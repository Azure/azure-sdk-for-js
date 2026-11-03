// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the data export instances within a workspace.
 *
 * @summary lists the data export instances within a workspace.
 * x-ms-original-file: 2025-07-01/DataExportListByWorkspace.json
 */
async function dataExportGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dataExports.listByWorkspace("RgTest1", "DeWnTest1234")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await dataExportGet();
}

main().catch(console.error);

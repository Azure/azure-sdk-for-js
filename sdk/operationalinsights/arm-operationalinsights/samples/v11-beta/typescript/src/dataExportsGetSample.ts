// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a data export instance.
 *
 * @summary gets a data export instance.
 * x-ms-original-file: 2025-07-01/DataExportGet.json
 */
async function dataExportGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.dataExports.get("RgTest1", "DeWnTest1234", "export1");
  console.log(result);
}

async function main(): Promise<void> {
  await dataExportGet();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the storage insight instances within a workspace
 *
 * @summary lists the storage insight instances within a workspace
 * x-ms-original-file: 2025-07-01/StorageInsightsListByWorkspace.json
 */
async function storageInsightsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storageInsightConfigs.listByWorkspace(
    "OIAutoRest5123",
    "aztest5048",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await storageInsightsList();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a workbook.
 *
 * @summary delete a workbook.
 * x-ms-original-file: 2023-06-01/WorkbookDelete.json
 */
async function workbookDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b643656-33eb-422f-aee8-3ac145d124af";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  await client.workbooks.delete("my-resource-group", "deadb33f-5e0d-4064-8ebb-1a4ed0313eb2");
}

async function main(): Promise<void> {
  await workbookDelete();
}

main().catch(console.error);

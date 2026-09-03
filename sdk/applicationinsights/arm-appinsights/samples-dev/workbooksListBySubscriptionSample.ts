// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get all Workbooks defined within a specified subscription and category.
 *
 * @summary get all Workbooks defined within a specified subscription and category.
 * x-ms-original-file: 2023-06-01/WorkbooksList2.json
 */
async function workbooksList2(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b643656-33eb-422f-aee8-3ac145d124af";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workbooks.listBySubscription("workbook")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get all Workbooks defined within a specified subscription and category.
 *
 * @summary get all Workbooks defined within a specified subscription and category.
 * x-ms-original-file: 2023-06-01/WorkbooksListSub.json
 */
async function workbooksListSub(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b643656-33eb-422f-aee8-3ac145d124af";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workbooks.listBySubscription("workbook")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await workbooksList2();
  await workbooksListSub();
}

main().catch(console.error);

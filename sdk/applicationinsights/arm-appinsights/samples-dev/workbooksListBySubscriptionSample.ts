// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get all Workbooks defined within a specified subscription and category.
 *
 * @summary Get all Workbooks defined within a specified subscription and category.
 * x-ms-original-file: specification/applicationinsights/resource-manager/Microsoft.Insights/stable/2023-06-01/examples/WorkbooksList2.json
 */

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function workbooksList2(): Promise<void> {
  const subscriptionId =
    process.env["APPLICATIONINSIGHTS_SUBSCRIPTION_ID"] ||
    "6b643656-33eb-422f-aee8-3ac145d124af";
  const category = "workbook";
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const resArray = new Array();
  for await (let item of client.workbooks.listBySubscription(category)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Get all Workbooks defined within a specified subscription and category.
 *
 * @summary Get all Workbooks defined within a specified subscription and category.
 * x-ms-original-file: specification/applicationinsights/resource-manager/Microsoft.Insights/stable/2023-06-01/examples/WorkbooksListSub.json
 */
async function workbooksListSub(): Promise<void> {
  const subscriptionId =
    process.env["APPLICATIONINSIGHTS_SUBSCRIPTION_ID"] ||
    "6b643656-33eb-422f-aee8-3ac145d124af";
  const category = "workbook";
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const resArray = new Array();
  for await (let item of client.workbooks.listBySubscription(category)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await workbooksList2();
  await workbooksListSub();
}

main().catch(console.error);

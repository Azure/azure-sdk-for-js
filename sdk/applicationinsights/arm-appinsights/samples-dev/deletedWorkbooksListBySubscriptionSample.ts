// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get all recently deleted Workbooks in a specified subscription.
 *
 * @summary Get all recently deleted Workbooks in a specified subscription.
 * x-ms-original-file: specification/applicationinsights/resource-manager/Microsoft.Insights/preview/2024-02-01-preview/examples/DeletedWorkbooksList.json
 */

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function workbooksListSub(): Promise<void> {
  const subscriptionId =
    process.env["APPLICATIONINSIGHTS_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const resArray = new Array();
  for await (let item of client.deletedWorkbooks.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await workbooksListSub();
}

main().catch(console.error);

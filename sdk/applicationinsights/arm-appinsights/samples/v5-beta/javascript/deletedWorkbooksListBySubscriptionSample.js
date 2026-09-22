// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all recently deleted Workbooks in a specified subscription.
 *
 * @summary get all recently deleted Workbooks in a specified subscription.
 * x-ms-original-file: 2024-02-01-preview/DeletedWorkbooksList.json
 */
async function workbooksListSub() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deletedWorkbooks.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await workbooksListSub();
}

main().catch(console.error);

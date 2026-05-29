// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the revisions for the workbook defined by its resourceName.
 *
 * @summary get the revisions for the workbook defined by its resourceName.
 * x-ms-original-file: 2023-06-01/WorkbookRevisionsList.json
 */
async function workbookRevisionsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b643656-33eb-422f-aee8-3ac145d124af";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workbooks.listRevisionsList(
    "my-resource-group",
    "deadb33f-5e0d-4064-8ebb-1a4ed0313eb2",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await workbookRevisionsList();
}

main().catch(console.error);

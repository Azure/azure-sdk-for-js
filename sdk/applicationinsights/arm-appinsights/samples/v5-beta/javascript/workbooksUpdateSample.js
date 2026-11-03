// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a workbook that has already been added.
 *
 * @summary updates a workbook that has already been added.
 * x-ms-original-file: 2023-06-01/WorkbookManagedUpdate.json
 */
async function workbookManagedUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b643656-33eb-422f-aee8-3ac145d124af";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.workbooks.update(
    "my-resource-group",
    "deadb33f-5e0d-4064-8ebb-1a4ed0313eb2",
    {
      workbookUpdateParameters: {},
      sourceId:
        "/subscriptions/6b643656-33eb-422f-aee8-3ac145d124af/resourcegroups/my-resource-group",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a workbook that has already been added.
 *
 * @summary updates a workbook that has already been added.
 * x-ms-original-file: 2023-06-01/WorkbookUpdate.json
 */
async function workbookUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b643656-33eb-422f-aee8-3ac145d124af";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.workbooks.update(
    "my-resource-group",
    "deadb33f-5e0d-4064-8ebb-1a4ed0313eb2",
    {
      sourceId:
        "/subscriptions/6b643656-33eb-422f-aee8-3ac145d124af/resourceGroups/my-resource-group/providers/Microsoft.Web/sites/MyApp",
    },
  );
  console.log(result);
}

async function main() {
  await workbookManagedUpdate();
  await workbookUpdate();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a single workbook by its resourceName.
 *
 * @summary get a single workbook by its resourceName.
 * x-ms-original-file: 2023-06-01/WorkbookGet.json
 */
async function workbookGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b643656-33eb-422f-aee8-3ac145d124af";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.workbooks.get(
    "my-resource-group",
    "deadb33f-5e0d-4064-8ebb-1a4ed0313eb2",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a single workbook by its resourceName.
 *
 * @summary get a single workbook by its resourceName.
 * x-ms-original-file: 2023-06-01/WorkbookGet1.json
 */
async function workbookGet1() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b643656-33eb-422f-aee8-3ac145d124af";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.workbooks.get(
    "my-resource-group",
    "deadb33f-5e0d-4064-8ebb-1a4ed0313eb2",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a single workbook by its resourceName.
 *
 * @summary get a single workbook by its resourceName.
 * x-ms-original-file: 2023-06-01/WorkbookManagedGet.json
 */
async function workbookManagedGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b643656-33eb-422f-aee8-3ac145d124af";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.workbooks.get(
    "my-resource-group",
    "deadb33f-5e0d-4064-8ebb-1a4ed0313eb2",
  );
  console.log(result);
}

async function main() {
  await workbookGet();
  await workbookGet1();
  await workbookManagedGet();
}

main().catch(console.error);

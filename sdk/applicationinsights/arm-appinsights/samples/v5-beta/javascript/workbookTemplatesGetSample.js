// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a single workbook template by its resourceName.
 *
 * @summary get a single workbook template by its resourceName.
 * x-ms-original-file: 2020-11-20/WorkbookTemplateGet.json
 */
async function workbookTemplateGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b643656-33eb-422f-aee8-3ac145d124af";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.workbookTemplates.get("my-resource-group", "my-resource-name");
  console.log(result);
}

async function main() {
  await workbookTemplateGet();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a workbook template that has already been added.
 *
 * @summary updates a workbook template that has already been added.
 * x-ms-original-file: 2020-11-20/WorkbookTemplateUpdate.json
 */
async function workbookTemplateUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b643656-33eb-422f-aee8-3ac145d124af";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.workbookTemplates.update("my-resource-group", "my-template-resource");
  console.log(result);
}

async function main() {
  await workbookTemplateUpdate();
}

main().catch(console.error);

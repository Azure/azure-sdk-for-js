// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all Workbook templates defined within a specified resource group.
 *
 * @summary get all Workbook templates defined within a specified resource group.
 * x-ms-original-file: 2020-11-20/WorkbookTemplatesList.json
 */
async function workbookTemplatesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b643656-33eb-422f-aee8-3ac145d124af";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workbookTemplates.listByResourceGroup("my-resource-group")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await workbookTemplatesList();
}

main().catch(console.error);

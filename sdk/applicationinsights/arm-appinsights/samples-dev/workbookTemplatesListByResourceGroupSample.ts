// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get all Workbook templates defined within a specified resource group.
 *
 * @summary Get all Workbook templates defined within a specified resource group.
 * x-ms-original-file: specification/applicationinsights/resource-manager/Microsoft.Insights/stable/2020-11-20/examples/WorkbookTemplatesList.json
 */

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function workbookTemplatesList(): Promise<void> {
  const subscriptionId =
    process.env["APPLICATIONINSIGHTS_SUBSCRIPTION_ID"] ||
    "6b643656-33eb-422f-aee8-3ac145d124af";
  const resourceGroupName =
    process.env["APPLICATIONINSIGHTS_RESOURCE_GROUP"] || "my-resource-group";
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const resArray = new Array();
  for await (let item of client.workbookTemplates.listByResourceGroup(
    resourceGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await workbookTemplatesList();
}

main().catch(console.error);

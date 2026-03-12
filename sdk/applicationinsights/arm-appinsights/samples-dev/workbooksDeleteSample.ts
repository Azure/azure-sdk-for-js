// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a workbook.
 *
 * @summary Delete a workbook.
 * x-ms-original-file: specification/applicationinsights/resource-manager/Microsoft.Insights/stable/2023-06-01/examples/WorkbookDelete.json
 */

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function workbookDelete(): Promise<void> {
  const subscriptionId =
    process.env["APPLICATIONINSIGHTS_SUBSCRIPTION_ID"] ||
    "6b643656-33eb-422f-aee8-3ac145d124af";
  const resourceGroupName =
    process.env["APPLICATIONINSIGHTS_RESOURCE_GROUP"] || "my-resource-group";
  const resourceName = "deadb33f-5e0d-4064-8ebb-1a4ed0313eb2";
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.workbooks.delete(resourceGroupName, resourceName);
  console.log(result);
}

async function main(): Promise<void> {
  await workbookDelete();
}

main().catch(console.error);

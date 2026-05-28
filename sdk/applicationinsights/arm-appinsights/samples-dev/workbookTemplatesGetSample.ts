// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a single workbook template by its resourceName.
 *
 * @summary get a single workbook template by its resourceName.
 * x-ms-original-file: 2020-11-20/WorkbookTemplateGet.json
 */
async function workbookTemplateGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b643656-33eb-422f-aee8-3ac145d124af";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.workbookTemplates.get("my-resource-group", "my-resource-name");
  console.log(result);
}

async function main(): Promise<void> {
  await workbookTemplateGet();
}

main().catch(console.error);

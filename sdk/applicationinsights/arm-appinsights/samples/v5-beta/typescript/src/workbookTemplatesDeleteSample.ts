// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a workbook template.
 *
 * @summary delete a workbook template.
 * x-ms-original-file: 2020-11-20/WorkbookTemplateDelete.json
 */
async function workbookTemplateDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  await client.workbookTemplates.delete("my-resource-group", "my-template-resource");
}

async function main(): Promise<void> {
  await workbookTemplateDelete();
}

main().catch(console.error);

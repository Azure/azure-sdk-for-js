// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a single workbook revision defined by its revisionId.
 *
 * @summary get a single workbook revision defined by its revisionId.
 * x-ms-original-file: 2023-06-01/WorkbookRevisionGet.json
 */
async function workbookRevisionGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b643656-33eb-422f-aee8-3ac145d124af";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.workbooks.revisionGet(
    "my-resource-group",
    "deadb33f-5e0d-4064-8ebb-1a4ed0313eb2",
    "1e2f8435b98248febee70c64ac22e1ab",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await workbookRevisionGet();
}

main().catch(console.error);

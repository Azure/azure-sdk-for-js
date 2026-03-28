// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all issues associated with the specified API.
 *
 * @summary lists all issues associated with the specified API.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListApiIssues.json
 */
async function apiManagementListApiIssues(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apiIssue.listByService(
    "rg1",
    "apimService1",
    "57d1f7558aa04f15146d9d8a",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListApiIssues();
}

main().catch(console.error);

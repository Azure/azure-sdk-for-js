// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all revisions of an API.
 *
 * @summary lists all revisions of an API.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListWorkspaceApiRevisions.json
 */
async function apiManagementListWorkspaceApiRevisions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaceApiRevision.listByService(
    "rg1",
    "apimService1",
    "wks1",
    "57d2ef278aa04f0888cba3f3",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListWorkspaceApiRevisions();
}

main().catch(console.error);

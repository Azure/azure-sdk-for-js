// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists a collection of user entities associated with the group.
 *
 * @summary lists a collection of user entities associated with the group.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListWorkspaceGroupUsers.json
 */
async function apiManagementListWorkspaceGroupUsers(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaceGroupUser.list(
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
  await apiManagementListWorkspaceGroupUsers();
}

main().catch(console.error);

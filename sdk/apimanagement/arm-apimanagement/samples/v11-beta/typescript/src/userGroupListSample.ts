// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all user groups.
 *
 * @summary lists all user groups.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListUserGroups.json
 */
async function apiManagementListUserGroups(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.userGroup.list(
    "rg1",
    "apimService1",
    "57681833a40f7eb6c49f6acf",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListUserGroups();
}

main().catch(console.error);

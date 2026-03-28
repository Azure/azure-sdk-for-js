// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists a collection of schemas registered with workspace in a service instance.
 *
 * @summary lists a collection of schemas registered with workspace in a service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListWorkspaceSchemas.json
 */
async function apiManagementListWorkspaceSchemas(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaceGlobalSchema.listByService(
    "rg1",
    "apimService1",
    "wks1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListWorkspaceSchemas();
}

main().catch(console.error);

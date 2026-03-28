// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists a collection of operations associated with tags.
 *
 * @summary lists a collection of operations associated with tags.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListApiOperationsByTags.json
 */
async function apiManagementListApiOperationsByTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operation.listByTags("rg1", "apimService1", "a1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListApiOperationsByTags();
}

main().catch(console.error);

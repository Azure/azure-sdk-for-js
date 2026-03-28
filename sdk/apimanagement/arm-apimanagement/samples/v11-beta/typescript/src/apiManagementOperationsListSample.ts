// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the available REST API operations of the Microsoft.ApiManagement provider.
 *
 * @summary lists all of the available REST API operations of the Microsoft.ApiManagement provider.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListOperations.json
 */
async function apiManagementListOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.apiManagementOperations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListOperations();
}

main().catch(console.error);

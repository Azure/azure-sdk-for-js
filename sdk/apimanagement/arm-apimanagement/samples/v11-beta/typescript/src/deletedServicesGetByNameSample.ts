// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get soft-deleted Api Management Service by name.
 *
 * @summary get soft-deleted Api Management Service by name.
 * x-ms-original-file: 2025-09-01-preview/ApiManagementGetDeletedServiceByName.json
 */
async function apiManagementGetDeletedServiceByName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.deletedServices.getByName("apimService3", "westus");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetDeletedServiceByName();
}

main().catch(console.error);

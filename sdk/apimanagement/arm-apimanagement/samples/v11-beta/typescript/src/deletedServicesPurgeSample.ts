// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to purges Api Management Service (deletes it with no option to undelete).
 *
 * @summary purges Api Management Service (deletes it with no option to undelete).
 * x-ms-original-file: 2025-09-01-preview/ApiManagementDeletedServicesPurge.json
 */
async function apiManagementDeletedServicesPurge(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.deletedServices.purge("apimService3", "westus");
}

async function main(): Promise<void> {
  await apiManagementDeletedServicesPurge();
}

main().catch(console.error);

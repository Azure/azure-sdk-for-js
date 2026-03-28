// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to purges Api Management Service (deletes it with no option to undelete).
 *
 * @summary purges Api Management Service (deletes it with no option to undelete).
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeletedServicesPurge.json
 */
async function apiManagementDeletedServicesPurge(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.deletedServices.purge("westus", "apimService3");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementDeletedServicesPurge();
}

main().catch(console.error);

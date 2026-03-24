// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified subscription.
 *
 * @summary deletes the specified subscription.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteSubscription.json
 */
async function apiManagementDeleteSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.subscription.delete("rg1", "apimService1", "testsub", "*");
}

async function main(): Promise<void> {
  await apiManagementDeleteSubscription();
}

main().catch(console.error);

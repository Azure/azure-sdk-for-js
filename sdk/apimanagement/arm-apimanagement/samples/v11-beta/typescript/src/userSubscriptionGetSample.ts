// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified Subscription entity associated with a particular user.
 *
 * @summary gets the specified Subscription entity associated with a particular user.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetUserSubscription.json
 */
async function apiManagementGetUserSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.userSubscription.get(
    "rg1",
    "apimService1",
    "1",
    "5fa9b096f3df14003c070001",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetUserSubscription();
}

main().catch(console.error);

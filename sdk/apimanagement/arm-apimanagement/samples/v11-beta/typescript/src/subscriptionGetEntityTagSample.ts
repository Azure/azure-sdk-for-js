// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the entity state (Etag) version of the apimanagement subscription specified by its identifier.
 *
 * @summary gets the entity state (Etag) version of the apimanagement subscription specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadSubscription.json
 */
async function apiManagementHeadSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.subscription.getEntityTag("rg1", "apimService1", "5931a769d8d14f0ad8ce13b8");
}

async function main(): Promise<void> {
  await apiManagementHeadSubscription();
}

main().catch(console.error);
